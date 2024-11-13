"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SpotifyPresence from "@/components/SpotifyPresence";
import { SocialsSection } from "@/components/SocialsSection";
import FadeIn from "@/components/FadeIn";
import MyTerminal from "@/components/Terminal";

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
      <MyTerminal />
      <div
        className="fixed -top-1 right-0 bottom-0 left-0 bg-amber-500/80 z-[1] pointer-events-none"
        style={{ mixBlendMode: "darken" }}
      ></div>
      <div
        className="fixed -top-1 right-0 bottom-0 left-0 bg-scanlines bg-[100%\ 4px] z-[2] opacity-[0.07] pointer-events-none animate-scanlines"
        style={{ backgroundSize: "100% 4px" }}
      ></div>
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
        I was previously the Executive Director of{" "}
        <Link
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href="https://mruhacks.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          MRUHacks 2024
        </Link>
        , Mount Royal University&apos;s premier hackathon. Nowadays, I&apos;m
        taking some much needed rest and relaxation, and focusing on my studies,
        my personal projects, and my{" "}
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
