"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import DiscogsLibrarySkeleton from "./discogs-library-skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const API_BASE = "https://api.matthew-hre.com";

interface Release {
    discogs_id: number;
    title: string;
    artist_name: string;
    cover_image: string;
    date_added: string;
}

interface VinylResponse {
    pagination: { page: number; pages: number; per_page: number; items: number };
    releases: Release[];
}

type SortOption = 'title-asc' | 'title-desc' | 'artist-asc' | 'artist-desc' | 'added';

async function fetchLibraryPage(page = 1, sortOption: SortOption = 'added', signal?: AbortSignal): Promise<VinylResponse> {
    const sortMapping: Record<SortOption, { sort: string; order: string }> = {
        'title-asc': { sort: 'title', order: 'asc' },
        'title-desc': { sort: 'title', order: 'desc' },
        'artist-asc': { sort: 'artist', order: 'asc' },
        'artist-desc': { sort: 'artist', order: 'desc' },
        'added': { sort: 'added', order: 'desc' },
    };

    const { sort, order } = sortMapping[sortOption];
    const res = await fetch(`${API_BASE}/vinyl?page=${page}&sort=${sort}&order=${order}`, { signal });
    if (!res.ok) throw new Error(`Failed to fetch vinyl page ${page}`);
    return res.json();
}

function ReleaseCard({ release }: { release: Release }) {
    return (
        <div key={release.discogs_id} className="flex flex-col h-full">
            <img
                src={release.cover_image}
                alt={release.title}
                loading="lazy"
                className="w-full aspect-square object-cover"
            />
            <div className="flex flex-col mt-4 flex-1">
                <h3 className="text-md font-bold">{release.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {release.artist_name}
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
    const [sortOption, setSortOption] = useState<SortOption>('added');
    const currentPage = useRef(0);
    const totalPages = useRef<number | null>(null);
    const lastRequestTime = useRef<number>(0);
    const { ref, inView } = useInView({ rootMargin: "200px" });
    const abortRef = useRef<AbortController | null>(null);

    const COOLDOWN_MS = 1000;
    const MIN_SPINNER_MS = 1000;

    const loadPage = useCallback(
        async (page: number, sort?: SortOption) => {
            if (isFetching) return;
            setError("");

            const currentSort = sort ?? sortOption;

            const now = Date.now();
            const sinceLast = now - lastRequestTime.current;
            if (sinceLast < COOLDOWN_MS) {
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
                const data = await fetchLibraryPage(page, currentSort, controller.signal);
                const nextReleases = data.releases || [];
                setReleases((prev) => {
                    const existing = new Set(prev.map((r) => String(r.discogs_id)));
                    const filtered = nextReleases.filter((r) => !existing.has(String(r.discogs_id)));
                    return [...prev, ...filtered];
                });
                currentPage.current = data.pagination.page;
                totalPages.current = data.pagination.pages;
                if (data.pagination.page >= data.pagination.pages) setHasMore(false);
            } catch (err) {
                const maybe = err as { name?: string } | null;
                if (maybe?.name === "AbortError") return;
                console.error("Failed to load vinyl page:", err);
                setError("Failed to load releases. Please try again later.");
            } finally {
                const elapsed = Date.now() - spinnerStart;
                if (page !== 1 && elapsed < MIN_SPINNER_MS) {
                    await sleep(MIN_SPINNER_MS - elapsed);
                }
                setIsFetching(false);
            }
        },
        [isFetching, sortOption]
    );

    useEffect(() => {
        loadPage(1);
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMore = useCallback(() => {
        if (isFetching || !hasMore) return;
        const next = currentPage.current + 1 || 1;
        if (totalPages.current && next > totalPages.current) return;
        loadPage(next);
    }, [isFetching, hasMore, loadPage]);

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            loadMore();
        }
    }, [inView, hasMore, isFetching, loadMore]);

    const handleSortChange = useCallback((value: SortOption) => {
        setSortOption(value);
        setReleases([]);
        setHasMore(true);
        currentPage.current = 0;
        totalPages.current = null;
        loadPage(1, value);
    }, [loadPage]);


    if (releases.length === 0 && !error) {
        return <DiscogsLibrarySkeleton />;
    }

    return (
        <div className="space-y-4">
            <div className="flex pb-2">
                <Select value={sortOption} onValueChange={handleSortChange}>
                    <SelectTrigger id="sort-select" className="w-[200px]">
                        <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                        <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                        <SelectItem value="artist-asc">Artist (A-Z)</SelectItem>
                        <SelectItem value="artist-desc">Artist (Z-A)</SelectItem>
                        <SelectItem value="added">Recently Added</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                {releases.map((r) => (
                    <MemoReleaseCard key={r.discogs_id} release={r} />
                ))}
            </div>
            {error && <div className="text-destructive text-center">{error}</div>}
            {hasMore && (
                <div ref={ref} className="col-span-full flex justify-center p-4 h-20">
                    {isFetching && <Loader2 className="animate-spin" />}
                </div>
            )}
        </div>
    );
}
