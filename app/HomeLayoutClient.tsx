"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SpotifyPresence from "@/components/SpotifyPresence";
import { SocialsSection } from "@/components/SocialsSection";
import FadeIn from "@/components/FadeIn";

export default function HomeLayoutClient({
  rightSide,
  altRightSide,
}: {
  rightSide: React.ReactNode;
  altRightSide: React.ReactNode;
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-grow w-full flex max-w-screen-xl flex-col md:flex-row md:space-x-16 2xl:space-x-32 px-8 md:px-20">
        <FadeIn
          className="w-full md:sticky md:top-0 md:h-screen md:overflow-auto"
          transitionDuration={500}
        >
          <div className="pt-12 xl:py-24 space-y-8">
            <Header />
            <Introduction showInfo={showInfo} setShowInfo={setShowInfo} />
            <div className="hidden md:block">
              <SocialsSection />
            </div>
          </div>
        </FadeIn>

        <div className={`${showInfo ? "block w-full" : "hidden"}`}>
          <FadeIn>{altRightSide}</FadeIn>
        </div>
        <div className={`${showInfo ? "hidden" : "block w-full"}`}>
          <FadeIn delay={300} transitionDuration={500}>
            {rightSide}
          </FadeIn>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <h1 className="mb-6 w-full flex flex-row items-center justify-between col-span-2">
      <div className="flex flex-col w-full">
        <p className="text-foreground font-semibold text-2xl font-inter w-full flex flex-row justify-between">
          Matthew Hrehirchuk
          <ThemeSwitcher />
        </p>
        <SpotifyPresence />
      </div>
    </h1>
  );
}

function Introduction({
  showInfo,
  setShowInfo,
}: {
  showInfo: boolean;
  setShowInfo: (showInfo: boolean) => void;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-foreground leading-7 mb-6">
        I&apos;m a web developer, a graphic designer, and a student at{" "}
        <Link
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href="https://mtroyal.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mount Royal University
        </Link>{" "}
        in Calgary, Alberta. I make plenty of games, a few helpful tools, and
        &ndash; at the moment &ndash; lots of studying resources for students
        like myself.
      </p>
      <p className="text-foreground leading-7">
        I&apos;m currently a Senior Data Quality Specialist at{" "}
        <Link
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href="https://cohere.com"
          target="_blank"
          rel="noopener noreferrer"
        >
Cohere</Link>, where I spend my days ranking and auditing data to improve our LLMs. When I&apos;m not wired in, I&apos;m spending my time playing board games, listening to music, and fleshing out my{" "}
        <a
          className={`underline decoration-muted-foreground hover:decoration-foreground hover:cursor-pointer transition-all ${
            showInfo ? "text-muted-foreground" : ""
          }`}
          onClick={() => setShowInfo(!showInfo)}
        >
          record collection.
        </a>
      </p>
    </div>
  );
}
