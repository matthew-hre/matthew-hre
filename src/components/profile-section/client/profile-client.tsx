"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/navbar";
import VinylPanel from "./vinyl-panel";
import FadeInOnView from "@/components/anim/fade-in-on-view";
import StaggerChildren from "@/components/anim/stagger-children";

type Section = "Projects" | "Vinyl" | "Writing";

interface ProfileClientProps {
  header: React.ReactNode;
  projects: React.ReactNode;
  writing: React.ReactNode;
}

export default function ProfileClient({
  header,
  projects,
  writing,
}: ProfileClientProps) {
  const [section, setSection] = useState<Section>("Projects");
  const [hasViewedVinyl, setHasViewedVinyl] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (section === "Vinyl" && !hasViewedVinyl) {
      setHasViewedVinyl(true);
    }
  }, [section, hasViewedVinyl]);

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

  return (
    <>
      <main className="mx-auto max-w-[640px] px-4 pt-8 pb-10 sm:pt-40">
        <div
          className={`transition-opacity duration-200 ease-in-out ${isNavbarVisible
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
            }`}
        >
          <FadeInOnView delay={0}>
            {header}
          </FadeInOnView>
        </div>
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />

        <section className="mt-6 px-4">
          <div className="flex items-center gap-2">
            <h2 className="sr-only">Section</h2>
            <FadeInOnView delay={120} className="w-full">
              <div
                role="tablist"
                aria-label="Content sections"
                className="inline-flex w-full gap-1 rounded-lg bg-white/5 p-1 text-lg font-semibold"
              >
                {(["Projects", "Vinyl", "Writing"] as const).map((key) => {
                  const selected = section === key;
                  const isDisabled = key === "Writing";
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={selected && !isDisabled}
                      aria-disabled={isDisabled || undefined}
                      disabled={isDisabled || undefined}
                      tabIndex={isDisabled ? -1 : 0}
                      onClick={!isDisabled ? () => setSection(key) : undefined}
                      className={
                        `rounded-md px-4 py-1 flex-1 transition-colors duration-200 focus:outline-none ` +
                        (isDisabled
                          ? "cursor-not-allowed text-neutral-500/70"
                          : selected
                            ? "bg-white/20 text-white"
                            : "text-neutral-300 hover:bg-white/10")
                      }
                      title={isDisabled ? "Writing coming soon" : undefined}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </FadeInOnView>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2">
            {hasViewedVinyl && (
              <div className={section === "Vinyl" ? "block" : "hidden"}>
                <VinylPanel />
              </div>
            )}
            <div className={section === "Writing" ? "block" : "hidden"}>
              {writing}
            </div>
            <div className={section === "Projects" ? "block space-y-2" : "hidden"}>
              <StaggerChildren baseDelay={200} step={70}>
                {projects}
              </StaggerChildren>
            </div>
          </div>
        </section>
      </main>
      <Navbar isVisible={isNavbarVisible} />
    </>
  );
}
