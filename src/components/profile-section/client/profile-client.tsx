"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import VinylPanel from "./vinyl-panel";
import FadeInOnView from "@/components/anim/fade-in-on-view";
import StaggerChildren from "@/components/anim/stagger-children";
import { cn } from "@/lib/utils";

type Section = "Projects" | "Vinyl" | "Writing";

interface ProfileClientProps {
  header: React.ReactNode;
  projects: React.ReactNode;
  writing: React.ReactNode;
}

const NAVBAR_TOP = 24; // top-6 = 1.5rem

export default function ProfileClient({
  header,
  projects,
  writing,
}: ProfileClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [section, setSection] = useState<Section>("Projects");
  const [hasViewedVinyl, setHasViewedVinyl] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isTabStuck, setIsTabStuck] = useState(false);
  const [stickyTop, setStickyTop] = useState(0);
  const [expansion, setExpansion] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tabSentinelRef = useRef<HTMLDivElement>(null);
  const navbarCardRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const navClipRef = useRef<SVGRectElement>(null);
  const tabClipRef = useRef<SVGRectElement>(null);

  const isMerged = isTabStuck && isNavbarVisible;

  // Initialize section from URL params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "vinyl" || tabParam === "writing") {
      setSection(tabParam === "vinyl" ? "Vinyl" : "Writing");
    }
  }, [searchParams]);

  useEffect(() => {
    if (section === "Vinyl" && !hasViewedVinyl) {
      setHasViewedVinyl(true);
    }
  }, [section, hasViewedVinyl]);

  // Navbar visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-128px 0px 0px 0px",
        threshold: 0,
      }
    );

    const currentSentinelRef = sentinelRef.current;
    if (currentSentinelRef) {
      observer.observe(currentSentinelRef);
    }

    return () => {
      if (currentSentinelRef) {
        observer.unobserve(currentSentinelRef);
      }
    };
  }, []);

  // Measure navbar card dimensions for sticky positioning and width matching
  useEffect(() => {
    const update = () => {
      const card = navbarCardRef.current;
      const container = stickyContainerRef.current;
      if (card) {
        setStickyTop(NAVBAR_TOP + card.offsetHeight);
      }
      if (card && container) {
        setExpansion(
          Math.max(0, (card.offsetWidth - container.offsetWidth) / 2)
        );
      }
    };
    requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Detect when tab group reaches the navbar (stuck state)
  useEffect(() => {
    const sentinel = tabSentinelRef.current;
    if (!sentinel || stickyTop === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTabStuck(!entry.isIntersecting);
      },
      {
        rootMargin: `-${stickyTop}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.unobserve(sentinel);
  }, [stickyTop]);

  // Unified blur layer: update SVG clip-path rects to track navbar card & tablist
  useEffect(() => {
    const update = () => {
      const navCard = navbarCardRef.current;
      const navSvg = navClipRef.current;
      const tab = tablistRef.current;
      const tabSvg = tabClipRef.current;

      if (navCard && navSvg) {
        if (isMerged) {
          const r = navCard.getBoundingClientRect();
          const rx =
            parseFloat(getComputedStyle(navCard).borderTopLeftRadius) || 0;
          navSvg.setAttribute("x", `${r.left}`);
          navSvg.setAttribute("y", `${r.top}`);
          navSvg.setAttribute("width", `${r.width}`);
          navSvg.setAttribute("height", `${r.height + rx + 4}`);
          navSvg.setAttribute("rx", `${rx}`);
          navSvg.setAttribute("ry", `${rx}`);
        } else {
          navSvg.setAttribute("width", "0");
          navSvg.setAttribute("height", "0");
        }
      }

      if (tab && tabSvg) {
        const r = tab.getBoundingClientRect();
        const rx = Math.max(
          parseFloat(getComputedStyle(tab).borderTopLeftRadius) || 0,
          parseFloat(getComputedStyle(tab).borderBottomLeftRadius) || 0
        );
        tabSvg.setAttribute("x", `${r.left}`);
        tabSvg.setAttribute("y", `${r.top}`);
        tabSvg.setAttribute("width", `${r.width}`);
        tabSvg.setAttribute("height", `${r.height}`);
        tabSvg.setAttribute("rx", `${rx}`);
        tabSvg.setAttribute("ry", `${rx}`);
      }
    };

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [isMerged]);

  return (
    <>
      <main className="mx-auto max-w-[640px] px-4 pt-8 pb-10 sm:pt-40">
        <div
          className={cn("transition-opacity duration-200 ease-in-out",
            isNavbarVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <FadeInOnView delay={0}>
            {header}
          </FadeInOnView>
        </div>
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />

        <div className="mt-6 px-4">
          <h2 className="sr-only">Section</h2>
          <div ref={tabSentinelRef} aria-hidden className="h-px w-full" />
          <div
            ref={stickyContainerRef}
            className="sticky z-20"
            style={{ top: stickyTop > 0 ? `${stickyTop}px` : undefined }}
          >
            <div
              className="transition-[margin] duration-300 ease-in-out"
              style={{
                marginLeft: isMerged ? `-${expansion}px` : '0px',
                marginRight: isMerged ? `-${expansion}px` : '0px',
              }}
            >
              <FadeInOnView delay={120} className="w-full">
                <div
                  ref={tablistRef}
                  role="tablist"
                  aria-label="Content sections"
                  className={cn(
                    "inline-flex w-full gap-1 p-1 text-lg font-semibold transition-[border-radius,background-color] duration-300",
                    isMerged ? "rounded-t-none rounded-b-lg bg-[#313131]/80" : "rounded-lg bg-card"
                  )}
                >
                  {(["Projects", "Vinyl", "Writing"] as const).map((key) => {
                    const selected = section === key;
                    const handleClick = () => {
                      setSection(key);
                      const tabValue = key === "Vinyl" ? "vinyl" : key === "Writing" ? "writing" : "projects";
                      const params = new URLSearchParams(searchParams);
                      if (tabValue === "projects") {
                        params.delete("tab");
                      } else {
                        params.set("tab", tabValue);
                      }
                      router.push(`?${params.toString()}`);
                    };
                    return (
                      <button
                        key={key}
                        role="tab"
                        onClick={handleClick}
                        className={cn(
                          "rounded-md px-4 py-1 flex-1 transition-colors duration-200 focus:outline-none",
                          selected
                            ? cn("text-foreground", isMerged ? "bg-white/25" : "bg-card-active")
                            : cn("text-muted-foreground", isMerged ? "hover:bg-white/15" : "hover:bg-card-hover")
                        )}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </FadeInOnView>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2">
            {hasViewedVinyl && (
              <div className={section === "Vinyl" ? "block" : "hidden"}>
                <VinylPanel />
              </div>
            )}
            <div className={section === "Writing" ? "block space-y-2" : "hidden"}>
              <StaggerChildren baseDelay={200} step={70}>
                {writing}
              </StaggerChildren>
            </div>
            <div className={section === "Projects" ? "block space-y-2" : "hidden"}>
              <StaggerChildren baseDelay={200} step={70}>
                {projects}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </main>
      <div
        className="pointer-events-none fixed inset-0 z-15 backdrop-blur"
        style={{ clipPath: "url(#blur-clip)" }}
        aria-hidden
      />
      <svg
        className="pointer-events-none fixed"
        width="0"
        height="0"
        aria-hidden
      >
        <defs>
          <clipPath id="blur-clip" clipPathUnits="userSpaceOnUse">
            <rect ref={navClipRef} />
            <rect ref={tabClipRef} />
          </clipPath>
        </defs>
      </svg>
      <Navbar isVisible={isNavbarVisible} isMerged={isMerged} cardRef={navbarCardRef} />
    </>
  );
}
