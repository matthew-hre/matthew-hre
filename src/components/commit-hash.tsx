"use client";

import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
import Link from "./link";

const REPOSITORY_URL = "https://tangled.org/matthew-hre.com/matthew-hre.com";
const HASH_LENGTH = 7;

export default function CommitHash() {
  const [hash, setHash] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const displayHash = hash?.slice(0, HASH_LENGTH);

  useEffect(() => {
    const controller = new AbortController();
    let skeletonTimer: number;
    const minimumSkeleton = new Promise<void>((resolve) => {
      skeletonTimer = window.setTimeout(resolve, 800);
    });
    const commitRequest = fetch("/api/commit", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Commit request failed with ${response.status}`);
        return response.json() as Promise<{ sha: string }>;
      });

    Promise.all([commitRequest, minimumSkeleton])
      .then(([{ sha }]) => {
        setHash(sha);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string }).name !== "AbortError") {
          setFailed(true);
        }
      });

    return () => {
      controller.abort();
      window.clearTimeout(skeletonTimer);
    };
  }, []);

  return (
    <>
      <Link
        href={hash ? `${REPOSITORY_URL}/commit/${hash}` : REPOSITORY_URL}
        variant="muted"
        mono
        icon={<GitBranch className="h-4 w-4 text-muted-foreground transition-default group-hover:text-primary" />}
      >
        <span aria-hidden className="relative inline-flex h-[1lh] w-[7ch] items-center align-middle tabular-nums">
          {!failed && (
            <span
              className={`commit-hash-skeleton absolute start-0 top-1/2 h-[0.7em] w-[7ch] -translate-y-1/2 rounded-[2px] bg-muted-foreground/30${displayHash ? " is-loaded" : ""}`}
            />
          )}
          {displayHash && (
            <span className="commit-hash-loaded absolute inset-0 flex items-center">{displayHash}</span>
          )}
          {failed && "Source"}
        </span>
        <span className="sr-only">{displayHash ? `Commit ${displayHash}` : "Source repository"}</span>
      </Link>
      <span className="sr-only" role="status" aria-live="polite">
        {displayHash ? `Latest commit ${displayHash} loaded` : failed ? "Latest commit unavailable" : ""}
      </span>
    </>
  );
}
