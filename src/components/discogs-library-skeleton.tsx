"use client";

import FadeInOnView from "@/components/anim/fade-in-on-view";

const SKELETON_COUNT = 10;

function SkeletonSet({ foreground = false }: { foreground?: boolean }) {
  return (
    <div
      aria-hidden
      className={`relative flex shrink-0 flex-row-reverse justify-end ${foreground ? "z-10" : "z-0"}`}
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="relative z-0 -me-5 size-28 shrink-0 [perspective:700px]"
        >
          <div className="size-28 rounded-sm bg-muted shadow-[0_12px_24px_oklch(0_0_0/0.35)] outline -outline-offset-1 outline-image-outline [transform:rotateY(-24deg)]" />
        </div>
      ))}
    </div>
  );
}

export default function DiscogsLibrarySkeleton() {
  return (
    <div
      aria-label="Loading record collection"
      aria-busy="true"
      className="mx-auto w-full max-w-[640px] overflow-hidden px-8"
    >
      <FadeInOnView delay={260}>
        <div className="skeleton-record-viewport relative h-48 overflow-hidden">
          <div className="skeleton-record-track absolute start-0 top-8 flex w-max">
            <SkeletonSet foreground />
            <SkeletonSet />
          </div>
        </div>
      </FadeInOnView>
    </div>
  );
}
