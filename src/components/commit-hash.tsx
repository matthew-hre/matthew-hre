"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
import Link from "./link";

const REPOSITORY_URL = "https://tangled.org/matthew-hre.com/matthew-hre.com";
const HASH_LENGTH = 7;
const ROLLING_HASHES = ["a8f31c2", "e47b09d", "19dc6a4", "f032be8", "62a7d15", "c94e380"];

function RollingCharacter({ index, finalCharacter }: { index: number; finalCharacter?: string }) {
  const rollingCharacters = ROLLING_HASHES.map((rollingHash) => rollingHash[index]);
  const settleStyle = finalCharacter
    ? ({ "--commit-hash-settle-delay": `${index * 55}ms` } as CSSProperties)
    : undefined;

  return (
    <span
      className={`commit-hash-character${finalCharacter ? " is-settling" : ""}`}
      style={settleStyle}
    >
      <span className="commit-hash-roll">
        {[...rollingCharacters, rollingCharacters[0]].map((character, characterIndex) => (
          <span key={`${character}-${characterIndex}`}>{character}</span>
        ))}
      </span>
      {finalCharacter && (
        <span className="commit-hash-final-character">
          {finalCharacter}
        </span>
      )}
    </span>
  );
}

export default function CommitHash() {
  const [hash, setHash] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const displayHash = hash?.slice(0, HASH_LENGTH);

  useEffect(() => {
    const controller = new AbortController();
    let settleTimer: number;
    const minimumRoll = new Promise<void>((resolve) => {
      settleTimer = window.setTimeout(resolve, 600);
    });

    const commitRequest = fetch("/api/commit", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Commit request failed with ${response.status}`);
        return response.json() as Promise<{ sha: string }>;
      });

    Promise.all([commitRequest, minimumRoll])
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
      window.clearTimeout(settleTimer);
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
        <span aria-hidden className="commit-hash-window w-[7ch] tabular-nums">
          {failed
            ? "Source"
            : Array.from({ length: HASH_LENGTH }, (_, index) => (
              <RollingCharacter
                key={index}
                index={index}
                finalCharacter={displayHash?.[index]}
              />
            ))}
        </span>
        <span className="sr-only">{displayHash ? `Commit ${displayHash}` : "Source repository"}</span>
      </Link>
      <span className="sr-only" role="status" aria-live="polite">
        {displayHash ? `Latest commit ${displayHash} loaded` : failed ? "Latest commit unavailable" : ""}
      </span>
    </>
  );
}
