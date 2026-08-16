"use client";

import FadeInOnView from "@/components/anim/fade-in-on-view";
import VinylPanel from "./vinyl-panel";

interface ProfileClientProps {
  header: React.ReactNode;
}

export default function ProfileClient({ header }: ProfileClientProps) {
  return (
    <main className="pt-8 sm:pt-40">
      <div className="mx-auto max-w-[640px] px-4">
        <section>
          <FadeInOnView>{header}</FadeInOnView>
        </section>
      </div>

      <section id="records" aria-label="My record collection" className="overflow-x-clip scroll-mt-24">
        <VinylPanel />
      </section>
    </main>
  );
}
