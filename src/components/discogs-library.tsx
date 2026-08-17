"use client";

import { memo, startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Select } from "@base-ui/react/select";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { animate, type AnimationPlaybackControls } from "motion";
import { fetchVinyl, type VinylRelease } from "@/types/vinyl";
import { cn } from "@/lib/utils";
import FadeInOnView from "./anim/fade-in-on-view";
import DiscogsLibrarySkeleton from "./discogs-library-skeleton";

const ALBUM_SIZE = 112;
const ALBUM_OVERLAP = 20;
const ALBUM_STRIDE = ALBUM_SIZE - ALBUM_OVERLAP;
const SET_GAP = 12;
const VIRTUAL_OVERSCAN = 12;
const INITIAL_HIGH_PRIORITY_IMAGES = 8;
const ADDED_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});
const RECORD_COLLATOR = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

type RecordSort = "added" | "artist" | "title";

const RECORD_SORT_OPTIONS: ReadonlyArray<{ value: RecordSort; label: string }> = [
  { value: "added", label: "Recently added" },
  { value: "artist", label: "Artist A–Z" },
  { value: "title", label: "Album A–Z" },
];

function getLowResolutionImageUrl(source: string) {
  return `/_next/image?url=${encodeURIComponent(source)}&w=32&q=75`;
}

function setRecordExpanded(record: HTMLDivElement, expanded: boolean) {
  record.querySelector<HTMLButtonElement>(".album-trigger")?.setAttribute("aria-expanded", String(expanded));
}

function getRecordTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLDivElement>(".album-record") : null;
}

function getAlbumVisual(record: Element) {
  return record.querySelector<HTMLElement>(".album-visual");
}

const AlbumRecord = memo(function AlbumRecord({
  release,
  releaseIndex,
  virtualIndex,
  setWidth,
  totalItems,
  loadFullImage,
}: {
  release: VinylRelease;
  releaseIndex: number;
  virtualIndex: number;
  setWidth: number;
  totalItems: number;
  loadFullImage: boolean;
}) {
  const cycle = Math.floor(virtualIndex / (totalItems / 3));
  const hidden = cycle !== 1;
  const highPriority = cycle === 1 && releaseIndex < INITIAL_HIGH_PRIORITY_IMAGES;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      aria-hidden={hidden}
      className="album-record group absolute top-0 block size-28 rounded-sm"
      style={{
        left: cycle * setWidth + releaseIndex * ALBUM_STRIDE,
      }}
    >
      <div
        className="album-visual relative size-28 [perspective:700px]"
        style={{ zIndex: totalItems - virtualIndex }}
      >
        <button
          type="button"
          tabIndex={hidden ? -1 : undefined}
          aria-label={`Show details for ${release.title} by ${release.artist_name}`}
          aria-expanded="false"
          className={cn(
            "album-trigger album-cover relative block aspect-square w-full origin-center cursor-grab overflow-hidden rounded-sm border-0 bg-muted p-0 shadow-[0_12px_24px_oklch(0_0_0/0.5)] outline -outline-offset-1 outline-white/10 [touch-action:pan-x] [transform:rotateY(var(--album-rotation))] [--album-rotation:-24deg] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4",
            !release.cover_image && "is-missing-cover",
          )}
        >
          {release.cover_image && (
            <span
              aria-hidden
              data-thumbnail-url={getLowResolutionImageUrl(release.cover_image)}
              className={cn(
                "pointer-events-none absolute -inset-1 scale-110 bg-cover bg-center blur-[4px] transition-opacity duration-[180ms] ease-out motion-reduce:transition-none",
                imageLoaded ? "opacity-0" : "opacity-100",
              )}
              style={{ backgroundImage: `url("${getLowResolutionImageUrl(release.cover_image)}")` }}
            />
          )}
          {release.cover_image && loadFullImage && (
            <Image
              src={release.cover_image}
              alt=""
              fill
              draggable={false}
              loading={highPriority ? "eager" : "lazy"}
              fetchPriority={highPriority ? "high" : "auto"}
              sizes="112px"
              className={cn(
                "object-cover transition-opacity duration-[180ms] ease-out motion-reduce:transition-none",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setImageLoaded(true)}
              onError={(event) => {
                setImageLoaded(true);
                event.currentTarget.style.display = "none";
                event.currentTarget.closest(".album-cover")?.classList.add("is-missing-cover");
              }}
            />
          )}
        </button>
      </div>
      <span className="album-details pointer-events-none absolute start-full top-1/2 w-56 -translate-y-1/2 py-5 pe-4 ps-5 opacity-0 sm:w-64">
        <span className="line-clamp-2 text-pretty text-sm font-bold leading-tight">{release.title}</span>
        <span className="mt-1 block truncate text-xs text-muted-foreground">{release.artist_name}</span>
        <span className="mt-3 block font-mono text-xs text-muted-foreground">
          Added {ADDED_DATE_FORMATTER.format(new Date(release.date_added))}
        </span>
      </span>
    </div>
  );
});

function VirtualAlbumTrack({
  releases,
  range,
  setWidth,
  loadFullImages,
  onRecordEnter,
  onRecordLeave,
  onRecordTap,
}: {
  releases: VinylRelease[];
  range: { start: number; end: number };
  setWidth: number;
  loadFullImages: boolean;
  onRecordEnter: (record: HTMLDivElement) => void;
  onRecordLeave: (record: HTMLDivElement) => void;
  onRecordTap: (record: HTMLDivElement) => void;
}) {
  const totalItems = releases.length * 3;
  const lastIntentionalRecord = useRef<HTMLDivElement | null>(null);
  const visibleItems = Array.from(
    { length: Math.max(0, range.end - range.start) },
    (_, offset) => range.start + offset,
  );

  return (
    <div
      className="relative h-28"
      style={{ width: setWidth * 3 + ALBUM_OVERLAP }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const record = getRecordTarget(event.target);
        const previousRecord = lastIntentionalRecord.current;
        if (record === previousRecord) return;
        lastIntentionalRecord.current = record;
        if (record) onRecordEnter(record);
        else if (previousRecord) onRecordLeave(previousRecord);
      }}
      onFocus={(event) => {
        const record = getRecordTarget(event.target);
        if (record && (event.target as HTMLElement).matches(":focus-visible")) onRecordEnter(record);
      }}
      onBlur={(event) => {
        const record = getRecordTarget(event.target);
        if (record && record !== getRecordTarget(event.relatedTarget)) onRecordLeave(record);
      }}
      onClick={(event) => {
        const trigger = (event.target as Element).closest<HTMLButtonElement>(".album-trigger");
        if (!trigger) return;
        const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        if (event.detail > 0 && !isTouchLike) return;
        const record = trigger.closest<HTMLDivElement>(".album-record");
        if (!record) return;
        if (event.detail > 0) onRecordTap(record);
        else onRecordEnter(record);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        const previousRecord = lastIntentionalRecord.current;
        lastIntentionalRecord.current = null;
        if (previousRecord) onRecordLeave(previousRecord);
      }}
    >
      {visibleItems.map((virtualIndex) => {
        const releaseIndex = virtualIndex % releases.length;
        const release = releases[releaseIndex];
        const cycle = Math.floor(virtualIndex / releases.length);

        return (
          <AlbumRecord
            key={`${release.discogs_id}-${cycle}`}
            release={release}
            releaseIndex={releaseIndex}
            virtualIndex={virtualIndex}
            setWidth={setWidth}
            totalItems={totalItems}
            loadFullImage={loadFullImages}
          />
        );
      })}
    </div>
  );
}

function ScrollShelf({ releases, onReady }: { releases: VinylRelease[]; onReady: () => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const didSignalReady = useRef(false);
  const [loadFullImages, setLoadFullImages] = useState(false);
  const [virtualRange, setVirtualRange] = useState(() => ({
    start: Math.max(0, releases.length - VIRTUAL_OVERSCAN),
    end: Math.min(releases.length * 3, releases.length + VIRTUAL_OVERSCAN * 2),
  }));
  const targetScroll = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const dragPointer = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragLastX = useRef(0);
  const dragLastTime = useRef(0);
  const dragVelocity = useRef(0);
  const dragMoved = useRef(false);
  const preserveExpandedDuringScroll = useRef(false);
  const centeringTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);
  const isPointerOver = useRef(false);
  const isScrolling = useRef(false);
  const restoreHoverAfterScroll = useRef(true);
  const scrollingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverLockUntil = useRef(0);
  const pendingCollapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRecord = useRef<HTMLDivElement | null>(null);
  const hoverAnimations = useRef<AnimationPlaybackControls[]>([]);
  const staleResetFrame = useRef<number | null>(null);
  const touchedRecords = useRef(new Set<HTMLDivElement>());
  const shiftedSets = useRef(new Set<HTMLElement>());

  const stopHoverAnimations = () => {
    if (staleResetFrame.current !== null) cancelAnimationFrame(staleResetFrame.current);
    staleResetFrame.current = null;
    hoverAnimations.current.forEach((animation) => animation.stop());
    hoverAnimations.current = [];
  };

  const clearPendingCollapse = () => {
    if (pendingCollapseTimer.current !== null) clearTimeout(pendingCollapseTimer.current);
    pendingCollapseTimer.current = null;
  };

  const resetHoverImmediately = () => {
    const scroller = scrollerRef.current;
    clearPendingCollapse();
    hoverLockUntil.current = 0;
    stopHoverAnimations();
    activeRecord.current = null;
    touchedRecords.current.clear();
    shiftedSets.current.clear();
    if (!scroller) return;

    scroller.querySelectorAll<HTMLElement>(".album-record").forEach((record) => {
      getAlbumVisual(record)?.style.removeProperty("transform");
      setRecordExpanded(record as HTMLDivElement, false);
    });
    scroller.querySelectorAll<HTMLElement>(".album-cover").forEach((cover) => {
      cover.style.removeProperty("--album-rotation");
    });
    scroller.querySelectorAll<HTMLElement>(".album-details").forEach((details) => {
      details.style.opacity = "";
      details.style.pointerEvents = "";
    });
  };

  const releaseHoverForScrolling = () => {
    const record = activeRecord.current;
    if (!record) {
      resetHoverImmediately();
      return;
    }

    clearPendingCollapse();
    hoverLockUntil.current = 0;
    stopHoverAnimations();
    activeRecord.current = null;
    setRecordExpanded(record, false);

    touchedRecords.current.forEach((touchedRecord) => {
      if (touchedRecord === record) return;
      setRecordExpanded(touchedRecord, false);
      touchedRecord.querySelector<HTMLElement>(".album-cover")?.style.removeProperty("--album-rotation");
      const staleDetails = touchedRecord.querySelector<HTMLElement>(".album-details");
      if (staleDetails) {
        staleDetails.style.opacity = "";
        staleDetails.style.pointerEvents = "";
      }
    });

    const albumSet = record.parentElement;
    shiftedSets.current.forEach((shiftedSet) => {
      if (shiftedSet === albumSet) return;
      shiftedSet.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
        getAlbumVisual(sibling)?.style.removeProperty("transform");
      });
    });
    touchedRecords.current.clear();
    shiftedSets.current.clear();

    albumSet?.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
      const visual = getAlbumVisual(sibling);
      if (!visual) return;
      hoverAnimations.current.push(
        animate(visual, { x: 0 }, { duration: 0.16, ease: [0.22, 1, 0.36, 1] }),
      );
    });
    const cover = record.querySelector<HTMLElement>(".album-cover");
    const details = record.querySelector<HTMLElement>(".album-details");
    if (cover) {
      hoverAnimations.current.push(
        animate(cover, { "--album-rotation": "-24deg" }, { duration: 0.14, ease: "easeOut" }),
      );
    }
    if (details) {
      details.style.pointerEvents = "none";
      hoverAnimations.current.push(animate(details, { opacity: 0 }, { duration: 0.1, ease: "easeOut" }));
    }
  };

  const collapseRecord = (record: HTMLDivElement): void => {
    if (isScrolling.current || activeRecord.current !== record) return;
    const hoverLockRemaining = hoverLockUntil.current - performance.now();
    if (hoverLockRemaining > 0) {
      clearPendingCollapse();
      pendingCollapseTimer.current = setTimeout(() => {
        pendingCollapseTimer.current = null;
        if (!record.matches(":hover")) collapseRecord(record);
      }, hoverLockRemaining);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resetHoverImmediately();
      return;
    }
    clearPendingCollapse();
    hoverLockUntil.current = 0;
    stopHoverAnimations();
    activeRecord.current = null;
    setRecordExpanded(record, false);

    const albumSet = record.parentElement;
    if (albumSet) {
      albumSet.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
        const visual = getAlbumVisual(sibling);
        if (visual) {
          hoverAnimations.current.push(animate(visual, { x: 0 }, { duration: 0.22, ease: [0.22, 1, 0.36, 1] }));
        }
      });
    }

    const cover = record.querySelector<HTMLElement>(".album-cover");
    const details = record.querySelector<HTMLElement>(".album-details");
    if (cover) {
      hoverAnimations.current.push(
        animate(cover, { "--album-rotation": "-24deg" }, { duration: 0.18, ease: "easeOut" }),
      );
    }
    if (details) {
      details.style.pointerEvents = "none";
      hoverAnimations.current.push(animate(details, { opacity: 0 }, { duration: 0.12, ease: "easeOut" }));
    }
  };

  const expandRecord = (record: HTMLDivElement) => {
    if (isScrolling.current || activeRecord.current === record) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resetHoverImmediately();
      activeRecord.current = record;
      setRecordExpanded(record, true);
      touchedRecords.current.add(record);
      if (record.parentElement) shiftedSets.current.add(record.parentElement);
      record.parentElement?.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
        if (sibling === record) return;
        const visual = getAlbumVisual(sibling);
        if (visual) visual.style.transform = `translateX(${sibling.offsetLeft < record.offsetLeft ? -30 : 272}px)`;
      });
      const cover = record.querySelector<HTMLElement>(".album-cover");
      const details = record.querySelector<HTMLElement>(".album-details");
      if (cover) cover.style.setProperty("--album-rotation", "0deg");
      if (details) {
        details.style.opacity = "1";
        details.style.pointerEvents = "auto";
      }
      return;
    }

    clearPendingCollapse();
    hoverLockUntil.current = performance.now() + 440;
    const previousRecord = activeRecord.current;
    stopHoverAnimations();

    const resetStaleRecords = () => {
      record.parentElement?.querySelectorAll<HTMLDivElement>(".album-record").forEach((staleRecord) => {
        if (staleRecord === previousRecord || staleRecord === record) return;
        setRecordExpanded(staleRecord, false);
        const staleCover = staleRecord.querySelector<HTMLElement>(".album-cover");
        const staleDetails = staleRecord.querySelector<HTMLElement>(".album-details");
        if (staleCover) staleCover.style.setProperty("--album-rotation", "-24deg");
        if (staleDetails) {
          staleDetails.style.opacity = "0";
          staleDetails.style.pointerEvents = "none";
        }
      });
    };
    resetStaleRecords();

    const currentSet = record.parentElement;
    const previousSet = previousRecord?.parentElement;
    shiftedSets.current.forEach((shiftedSet) => {
      if (shiftedSet === currentSet || shiftedSet === previousSet) return;
      shiftedSet.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
        getAlbumVisual(sibling)?.style.removeProperty("transform");
      });
    });
    touchedRecords.current.clear();
    shiftedSets.current.clear();

    if (previousRecord) {
      setRecordExpanded(previousRecord, false);
      previousRecord.querySelector<HTMLElement>(".album-details")?.style.setProperty("pointer-events", "none");
      const previousCover = previousRecord.querySelector<HTMLElement>(".album-cover");
      const previousDetails = previousRecord.querySelector<HTMLElement>(".album-details");
      if (previousCover) {
        hoverAnimations.current.push(
          animate(previousCover, { "--album-rotation": "-24deg" }, { duration: 0.18, ease: "easeOut" }),
        );
      }
      if (previousDetails) hoverAnimations.current.push(animate(previousDetails, { opacity: 0 }, { duration: 0.12, ease: "easeOut" }));
      if (previousRecord.parentElement !== record.parentElement) {
        previousRecord.parentElement?.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
          const visual = getAlbumVisual(sibling);
          if (visual) hoverAnimations.current.push(animate(visual, { x: 0 }, { duration: 0.2, ease: "easeOut" }));
        });
      }
    }

    activeRecord.current = record;
    setRecordExpanded(record, true);
    touchedRecords.current.add(record);
    if (currentSet) shiftedSets.current.add(currentSet);
    if (previousRecord) touchedRecords.current.add(previousRecord);
    if (previousSet) shiftedSets.current.add(previousSet);

    record.parentElement?.querySelectorAll<HTMLElement>(".album-record").forEach((sibling) => {
      const visual = getAlbumVisual(sibling);
      if (!visual) return;
      const transform = getComputedStyle(visual).transform;
      const currentX = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;

      if (sibling === record) {
        if (Math.abs(currentX) > 0.5) {
          hoverAnimations.current.push(animate(visual, { x: 0 }, { duration: 0.12, ease: "easeOut" }));
        }
        return;
      }

      const isLeft = sibling.offsetLeft < record.offsetLeft;
      if (isLeft) {
        if (Math.abs(currentX + 30) > 0.5) {
          hoverAnimations.current.push(
            animate(visual, { x: -30 }, { duration: 0.08, ease: "easeOut" }),
          );
        }
      } else {
        if (Math.abs(currentX - 272) <= 0.5) return;

        hoverAnimations.current.push(
          Math.abs(currentX) <= 0.5
            ? animate(
                visual,
                { x: [currentX, 24, 272] },
                { duration: 0.36, times: [0, 0.14, 1], ease: [0.22, 1, 0.36, 1] },
              )
            : animate(visual, { x: 272 }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] }),
        );
      }
    });

    const cover = record.querySelector<HTMLElement>(".album-cover");
    const details = record.querySelector<HTMLElement>(".album-details");
    if (cover) {
      hoverAnimations.current.push(
        animate(
          cover,
          { "--album-rotation": "0deg" },
          { delay: 0.04, duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        ),
      );
    }
    if (details) {
      details.style.pointerEvents = "auto";
      hoverAnimations.current.push(animate(details, { opacity: 1 }, { delay: 0.1, duration: 0.2, ease: "easeOut" }));
    }
    staleResetFrame.current = requestAnimationFrame(() => {
      staleResetFrame.current = null;
      resetStaleRecords();
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const width = releases.length * ALBUM_STRIDE + SET_GAP;
    const totalItems = releases.length * 3;

    const updateVirtualRange = () => {
      const start = Math.max(0, Math.floor(scroller.scrollLeft / ALBUM_STRIDE) - VIRTUAL_OVERSCAN);
      const end = Math.min(
        totalItems,
        Math.ceil((scroller.scrollLeft + scroller.clientWidth) / ALBUM_STRIDE) + VIRTUAL_OVERSCAN,
      );
      setVirtualRange((current) => current.start === start && current.end === end ? current : { start, end });
    };

    const measure = () => {
      const previousWidth = setWidth.current;
      setWidth.current = width;
      if (width > 0 && previousWidth === 0) {
        scroller.scrollLeft = width;
        targetScroll.current = width;
      }
      updateVirtualRange();
    };

    const normalizePosition = () => {
      const width = setWidth.current;
      if (width === 0) return;

      if (scroller.scrollLeft < width * 0.5) {
        scroller.scrollLeft += width;
        targetScroll.current += width;
        updateVirtualRange();
      } else if (scroller.scrollLeft >= width * 1.5) {
        scroller.scrollLeft -= width;
        targetScroll.current -= width;
        updateVirtualRange();
      }
    };

    const markScrolling = () => {
      if (!isScrolling.current) {
        if (!preserveExpandedDuringScroll.current) {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) resetHoverImmediately();
          else releaseHoverForScrolling();
        }
      }
      isScrolling.current = true;

      if (scrollingTimer.current !== null) clearTimeout(scrollingTimer.current);
      scrollingTimer.current = setTimeout(() => {
        isScrolling.current = false;
        preserveExpandedDuringScroll.current = false;
        scrollingTimer.current = null;
        const shouldRestoreHover = restoreHoverAfterScroll.current;
        restoreHoverAfterScroll.current = true;
        const hoveredRecord = shouldRestoreHover && isPointerOver.current
          ? scroller.querySelector<HTMLDivElement>(".album-record:hover")
          : null;
        if (hoveredRecord) requestAnimationFrame(() => expandRecord(hoveredRecord));
      }, 160);
    };

    const animateScroll = () => {
      isAnimating.current = true;
      const remaining = targetScroll.current - scroller.scrollLeft;
      scroller.scrollLeft += remaining * 0.1;
      normalizePosition();

      if (Math.abs(remaining) > 0.25) {
        animationFrame.current = requestAnimationFrame(animateScroll);
      } else {
        scroller.scrollLeft = targetScroll.current;
        normalizePosition();
        animationFrame.current = null;
        isAnimating.current = false;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const horizontalInput = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      event.preventDefault();
      restoreHoverAfterScroll.current = true;
      markScrolling();
      const wheelDelta = horizontalInput ? event.deltaX : event.deltaY;
      const pixelDelta = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? wheelDelta * 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? wheelDelta * window.innerHeight
          : wheelDelta;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scroller.scrollLeft += pixelDelta * 0.28;
        normalizePosition();
        targetScroll.current = scroller.scrollLeft;
        return;
      }

      targetScroll.current += pixelDelta * 0.28;

      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(animateScroll);
      }
    };

    const handleNativeScroll = () => {
      markScrolling();
      updateVirtualRange();
      if (isAnimating.current) return;
      normalizePosition();
      targetScroll.current = scroller.scrollLeft;
    };

    measure();
    let cancelled = false;
    let readyFrame = requestAnimationFrame(() => {
      readyFrame = requestAnimationFrame(async () => {
        const scrollerRect = scroller.getBoundingClientRect();
        const visibleRecords = Array.from(scroller.querySelectorAll<HTMLElement>(".album-record"))
          .filter((record) => {
            const recordRect = record.getBoundingClientRect();
            return recordRect.right > scrollerRect.left && recordRect.left < scrollerRect.right;
          });
        const thumbnailUrls = visibleRecords.flatMap((record) => {
          const url = record.querySelector<HTMLElement>("[data-thumbnail-url]")?.dataset.thumbnailUrl;
          return url ? [url] : [];
        });
        await Promise.all(thumbnailUrls.map((url) => new Promise<void>((resolve) => {
          const thumbnail = new window.Image();
          thumbnail.addEventListener("load", () => resolve(), { once: true });
          thumbnail.addEventListener("error", () => resolve(), { once: true });
          thumbnail.src = url;
          if (thumbnail.complete) resolve();
        })));
        if (!cancelled) {
          setLoadFullImages(true);
          readyFrame = requestAnimationFrame(() => {
            if (didSignalReady.current) return;
            didSignalReady.current = true;
            onReady();
          });
        }
      });
    });

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    scroller.addEventListener("scroll", handleNativeScroll, { passive: true });
    scroller.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(readyFrame);
      stopHoverAnimations();
      if (centeringTimer.current !== null) clearTimeout(centeringTimer.current);
      if (scrollingTimer.current !== null) clearTimeout(scrollingTimer.current);
      if (pendingCollapseTimer.current !== null) clearTimeout(pendingCollapseTimer.current);
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
      scroller.removeEventListener("scroll", handleNativeScroll);
      scroller.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", measure);
    };
  }, [onReady, releases]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    scroller.scrollLeft += event.key === "ArrowRight" ? 96 : -96;
  };

  const handleRecordTap = (record: HTMLDivElement) => {
    if (activeRecord.current === record) {
      preserveExpandedDuringScroll.current = false;
      isScrolling.current = false;
      if (centeringTimer.current !== null) clearTimeout(centeringTimer.current);
      centeringTimer.current = null;
      if (scrollingTimer.current !== null) clearTimeout(scrollingTimer.current);
      scrollingTimer.current = null;
      collapseRecord(record);
      return;
    }

    expandRecord(record);
    requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const details = record.querySelector<HTMLElement>(".album-details");
      if (!scroller || !details || activeRecord.current !== record) return;

      const recordRect = record.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const groupCenter = recordRect.left + (record.offsetWidth + details.offsetWidth) / 2;
      const viewportCenter = scrollerRect.left + scroller.clientWidth / 2;
      const distance = groupCenter - viewportCenter;
      if (Math.abs(distance) < 1) return;

      preserveExpandedDuringScroll.current = true;
      if (centeringTimer.current !== null) clearTimeout(centeringTimer.current);
      centeringTimer.current = setTimeout(() => {
        preserveExpandedDuringScroll.current = false;
        centeringTimer.current = null;
      }, 700);
      scroller.scrollTo({
        left: scroller.scrollLeft + distance,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || event.pointerType !== "mouse" || event.button !== 0) return;

    event.preventDefault();
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
      isAnimating.current = false;
    }
    targetScroll.current = scroller.scrollLeft;
    dragPointer.current = event.pointerId;
    dragStartX.current = event.clientX;
    dragStartScroll.current = scroller.scrollLeft;
    dragLastX.current = event.clientX;
    dragLastTime.current = event.timeStamp;
    dragVelocity.current = 0;
    dragMoved.current = false;
    isAnimating.current = true;
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || dragPointer.current !== event.pointerId) return;
    if (!dragMoved.current) {
      if (Math.abs(event.clientX - dragStartX.current) <= 2) return;
      dragMoved.current = true;
      if (scrollingTimer.current !== null) clearTimeout(scrollingTimer.current);
      scrollingTimer.current = null;
      restoreHoverAfterScroll.current = false;
      isScrolling.current = true;
      if (activeRecord.current) releaseHoverForScrolling();
      else resetHoverImmediately();
    }
    const elapsed = event.timeStamp - dragLastTime.current;
    if (elapsed > 0) {
      const nextVelocity = -(event.clientX - dragLastX.current) / elapsed;
      dragVelocity.current = dragVelocity.current * 0.65 + nextVelocity * 0.35;
      dragLastX.current = event.clientX;
      dragLastTime.current = event.timeStamp;
    }
    scroller.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
    targetScroll.current = scroller.scrollLeft;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || dragPointer.current !== event.pointerId) return;
    dragPointer.current = null;
    if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);

    let velocity = Math.max(-1.4, Math.min(1.4, dragVelocity.current));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(velocity) < 0.02) {
      isAnimating.current = false;
      targetScroll.current = scroller.scrollLeft;
      return;
    }

    let previousTime = performance.now();
    const glide = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      scroller.scrollLeft += velocity * elapsed;

      const width = setWidth.current;
      if (width > 0 && scroller.scrollLeft < width * 0.5) scroller.scrollLeft += width;
      else if (width > 0 && scroller.scrollLeft >= width * 1.5) scroller.scrollLeft -= width;

      targetScroll.current = scroller.scrollLeft;
      velocity *= Math.pow(0.9, elapsed / 16.67);
      if (Math.abs(velocity) > 0.02) {
        animationFrame.current = requestAnimationFrame(glide);
      } else {
        animationFrame.current = null;
        isAnimating.current = false;
      }
    };

    animationFrame.current = requestAnimationFrame(glide);
  };

  const albumSetWidth = releases.length * ALBUM_STRIDE + SET_GAP;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Record collection. Scroll while pointing at the shelf, drag, or use the arrow keys to browse."
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") isPointerOver.current = true;
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          isPointerOver.current = false;
          if (activeRecord.current) {
            hoverLockUntil.current = 0;
            collapseRecord(activeRecord.current);
          }
        }}
        className="record-scroller relative h-48 cursor-grab touch-pan-x select-none overflow-x-auto overflow-y-hidden overscroll-contain active:cursor-grabbing [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-[-2px] [&::-webkit-scrollbar]:hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[5.5rem] h-px bg-white/15" aria-hidden />
        <div className="absolute start-0 top-8 w-max pb-4">
          <VirtualAlbumTrack
            releases={releases}
            range={virtualRange}
            setWidth={albumSetWidth}
            loadFullImages={loadFullImages}
            onRecordEnter={expandRecord}
            onRecordLeave={collapseRecord}
            onRecordTap={handleRecordTap}
          />
        </div>
      </div>
    </div>
  );
}

export default function DiscogsLibrary() {
  const [releases, setReleases] = useState<VinylRelease[]>([]);
  const [error, setError] = useState(false);
  const [shelfReady, setShelfReady] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [sort, setSort] = useState<RecordSort>("added");
  const [displaySort, setDisplaySort] = useState<RecordSort>("added");
  const shelfRef = useRef<HTMLDivElement>(null);
  const reorderAnimation = useRef<AnimationPlaybackControls | null>(null);
  const reorderSequence = useRef(0);
  const handleShelfReady = useCallback(() => setShelfReady(true), []);
  const sortedReleases = useMemo(() => {
    return [...releases].sort((first, second) => {
      if (displaySort === "added") return second.date_added.localeCompare(first.date_added);

      const primary = displaySort === "artist"
        ? RECORD_COLLATOR.compare(first.artist_name, second.artist_name)
        : RECORD_COLLATOR.compare(first.title, second.title);
      if (primary !== 0) return primary;

      return displaySort === "artist"
        ? RECORD_COLLATOR.compare(first.title, second.title)
        : RECORD_COLLATOR.compare(first.artist_name, second.artist_name);
    });
  }, [displaySort, releases]);

  const handleSortChange = useCallback(async (nextSort: RecordSort) => {
    if (nextSort === sort) return;
    setSort(nextSort);

    const sequence = ++reorderSequence.current;
    reorderAnimation.current?.stop();
    const shelf = shelfRef.current;
    if (
      !shelf
      || !shelfReady
      || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches
    ) {
      setDisplaySort(nextSort);
      return;
    }

    reorderAnimation.current = animate(
      shelf,
      { opacity: 0, transform: "translate3d(-10px, 0, 0)" },
      { duration: 0.15, ease: [0.4, 0, 1, 1] },
    );
    await reorderAnimation.current;
    if (sequence !== reorderSequence.current) return;

    setDisplaySort(nextSort);
    requestAnimationFrame(() => {
      if (sequence !== reorderSequence.current || !shelf.isConnected) return;
      reorderAnimation.current = animate(
        shelf,
        {
          opacity: [0, 1],
          transform: ["translate3d(10px, 0, 0)", "translate3d(0, 0, 0)"],
        },
        { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
      );
    });
  }, [shelfReady, sort]);

  useEffect(() => {
    return () => {
      reorderSequence.current += 1;
      reorderAnimation.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!shelfReady) return;
    const timer = setTimeout(() => setShowSkeleton(false), 600);
    return () => clearTimeout(timer);
  }, [shelfReady]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCollection = async () => {
      const firstPage = await fetchVinyl(1, "added", "desc", { signal: controller.signal });
      const remainingPages = await Promise.all(
        Array.from(
          { length: Math.max(0, firstPage.pagination.pages - 1) },
          (_, index) => fetchVinyl(index + 2, "added", "desc", { signal: controller.signal }),
        ),
      );

      const collection = [
        ...(firstPage.releases ?? []),
        ...remainingPages.flatMap((page) => page.releases ?? []),
      ];

      startTransition(() => setReleases(collection));
    };

    loadCollection()
      .catch((caughtError: unknown) => {
        if ((caughtError as { name?: string }).name !== "AbortError") {
          console.error("Failed to load Discogs shelf:", caughtError);
          setError(true);
        }
      });

    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="mt-3 px-4 text-sm text-muted-foreground">The shelf is temporarily out of reach.</p>;
  }

  return (
    <div className="pt-5">
      <div className="mx-auto mb-2 w-full max-w-[640px] px-4 sm:px-8">
        <FadeInOnView delay={140} className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">My record collection</h2>
          <Select.Root
            value={sort}
            onValueChange={(value) => {
              if (value) void handleSortChange(value as RecordSort);
            }}
          >
            <Select.Trigger
              aria-label="Sort record collection"
              className="group flex h-8 items-center gap-1 bg-transparent px-1 text-base text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-xs"
            >
              <Select.Value>
                {(value: RecordSort) => RECORD_SORT_OPTIONS.find((option) => option.value === value)?.label}
              </Select.Value>
              <Select.Icon>
                <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner align="end" alignItemWithTrigger={false} sideOffset={4} className="z-50 outline-none">
                <Select.Popup className="min-w-40 origin-top-right rounded-md border border-border bg-background p-1 shadow-[0_12px_32px_oklch(0_0_0/0.45)] outline-none transition-[opacity,transform] duration-[180ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] data-[starting-style]:translate-y-1 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 data-[ending-style]:translate-y-0.5 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:duration-[120ms] motion-reduce:transform-none motion-reduce:duration-150">
                  <Select.List>
                    {RECORD_SORT_OPTIONS.map(({ value, label }) => (
                      <Select.Item
                        key={value}
                        value={value}
                        className="relative flex cursor-default items-center rounded-sm py-1.5 pe-7 ps-2 text-sm text-muted-foreground outline-none data-[highlighted]:bg-card-hover data-[highlighted]:text-foreground data-[selected]:text-foreground"
                      >
                        <Select.ItemText>{label}</Select.ItemText>
                        <Select.ItemIndicator className="absolute end-2">
                          <Check aria-hidden className="size-3.5" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </FadeInOnView>
      </div>
      <div className="grid">
        {showSkeleton && (
          <div
            aria-hidden={shelfReady}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,filter] duration-500 ease-out motion-reduce:transition-none",
              shelfReady ? "pointer-events-none opacity-0 blur-sm" : "opacity-100 blur-none",
            )}
          >
            <DiscogsLibrarySkeleton />
          </div>
        )}
        {sortedReleases.length > 0 && (
          <div
            ref={shelfRef}
            inert={!shelfReady ? true : undefined}
            aria-hidden={!shelfReady}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,filter,translate] duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:transition-none",
              shelfReady
                ? "translate-x-0 opacity-100 blur-none"
                : "pointer-events-none translate-x-4 opacity-0 blur-[1px]",
            )}
          >
            <ScrollShelf releases={sortedReleases} onReady={handleShelfReady} />
          </div>
        )}
      </div>
    </div>
  );
}
