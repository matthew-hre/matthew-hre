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
  const sentinelRef = useRef<HTMLDivElement>(null);

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
          className={cn("transition-opacity duration-200 ease-in-out",
            isNavbarVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
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
                       aria-selected={selected}
                       tabIndex={0}
                       onClick={handleClick}
                       className={
                         `rounded-md px-4 py-1 flex-1 transition-colors duration-200 focus:outline-none ` +
                         (selected
                           ? "bg-white/20 text-white"
                           : "text-neutral-300 hover:bg-white/10")
                       }
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
        </section>
      </main>
      <Navbar isVisible={isNavbarVisible} />
    </>
  );
}
