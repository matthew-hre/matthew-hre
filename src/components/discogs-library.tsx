"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { DiscogResponse, Release } from "@/types/discog";
import { Skeleton } from "@/components/ui/skeleton";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchLibraryPage(page = 1, signal?: AbortSignal): Promise<DiscogResponse> {
    const res = await fetch(`/api/discogs/library?page=${page}`, { signal });
    if (!res.ok) throw new Error(`Failed to fetch discogs page ${page}`);
    return res.json();
}

function ReleaseCard({ release }: { release: Release }) {
    const { basic_information } = release;
    return (
        <div key={release.id} className="flex flex-col h-full">
            <Image
                src={basic_information.cover_image}
                alt={basic_information.title}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
                onError={(e) => {
                    try {
                        const target = e.currentTarget as unknown as HTMLImageElement;
                        if (target && "src" in target) target.src = "/placeholder-album.jpg";
                    } catch {
                        // ignore
                    }
                }}
            />
            <div className="flex flex-col mt-4 flex-1">
                <h3 className="text-md font-bold">{basic_information.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {basic_information.artists?.[0]?.name}
                </p>
            </div>
        </div>
    );
}

const MemoReleaseCard = memo(ReleaseCard);

export default function DiscogsLibrary() {
    const [releases, setReleases] = useState<Release[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const currentPage = useRef(0);
    const totalPages = useRef<number | null>(null);
    const lastRequestTime = useRef<number>(0);
    const { ref, inView } = useInView({ rootMargin: "200px" });
    const abortRef = useRef<AbortController | null>(null);

    const COOLDOWN_MS = 1000;
    const MIN_SPINNER_MS = 1000;

    const loadPage = useCallback(
        async (page: number) => {
            if (isFetching) return;
            setError("");

            const now = Date.now();
            const sinceLast = now - lastRequestTime.current;
            if (sinceLast < COOLDOWN_MS) {
                // show spinner while waiting
                setIsFetching(true);
                await sleep(COOLDOWN_MS - sinceLast);
            } else {
                setIsFetching(true);
            }

            if (abortRef.current) {
                abortRef.current.abort();
            }
            const controller = new AbortController();
            abortRef.current = controller;

            const spinnerStart = Date.now();
            lastRequestTime.current = spinnerStart;

            try {
                const data = await fetchLibraryPage(page, controller.signal);
                const nextReleases = (data.releases as unknown as Release[]) || [];
                setReleases((prev) => {
                    const existing = new Set(prev.map((r) => String(r.id)));
                    const filtered = nextReleases.filter((r) => !existing.has(String(r.id)));
                    return [...prev, ...filtered];
                });
                currentPage.current = data.pagination.page;
                totalPages.current = data.pagination.pages;
                if (data.pagination.page >= data.pagination.pages) setHasMore(false);
            } catch (err) {
                const maybe = err as { name?: string } | null;
                if (maybe?.name === "AbortError") return;
                console.error("Failed to load discogs page:", err);
                setError("Failed to load releases. Please try again later.");
            } finally {
                const elapsed = Date.now() - spinnerStart;
                // Don't force the minimum spinner time for the initial page (page 1)
                if (page !== 1 && elapsed < MIN_SPINNER_MS) {
                    await sleep(MIN_SPINNER_MS - elapsed);
                }
                setIsFetching(false);
            }
        },
        [isFetching]
    );

    useEffect(() => {
        // initial load
        loadPage(1);
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
        // intentionally only on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMore = useCallback(() => {
        if (isFetching || !hasMore) return;
        const next = currentPage.current + 1 || 1;
        // guard if totalPages known
        if (totalPages.current && next > totalPages.current) return;
        loadPage(next);
    }, [isFetching, hasMore, loadPage]);

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            loadMore();
        }
    }, [inView, hasMore, isFetching, loadMore]);


    if (releases.length === 0 && !error) {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col h-full">
                            <Skeleton className="w-full aspect-square" />
                            <div className="flex flex-col mt-4 flex-1">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                {releases.map((r) => (
                    <MemoReleaseCard key={r.id} release={r} />
                ))}
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {hasMore && (
                <div ref={ref} className="col-span-full flex justify-center p-4 h-20">
                    {isFetching && <Loader2 className="animate-spin" />}
                </div>
            )}
        </div>
    );
}