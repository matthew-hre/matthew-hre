"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import Navbar from "@/components/navbar";
import { debounce } from "lodash";
import Link from "./link";
import DiscogsLibrary from "./discogs-library";

export default function ProfileSection() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  type SectionState = "Projects" | "Writing" | "Vinyl";
  const [section, setSection] = useState<SectionState>("Projects");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = debounce(
      ([entry]: IntersectionObserverEntry[]) => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const threshold = headerHeight - 96;
        setIsNavbarVisible(entry.boundingClientRect.top <= -threshold);
      },
      50
    );

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-96px",
      threshold: [0, 1],
    });

    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) {
      observer.observe(currentHeaderRef);
    }

    return () => {
      observerCallback.cancel();
      if (currentHeaderRef) {
        observer.unobserve(currentHeaderRef);
      }
    };
  }, []);

  return (
    <>
      <main className="mx-auto min-h-screen max-w-[640px] px-4 pt-8 pb-10 sm:pt-40">
        <Header
          headerRef={headerRef}
          isVisible={isNavbarVisible}
        />
        <Projects
          state={section}
          onChange={(next) => setSection(next)}
        />
      </main>
      <Navbar isVisible={isNavbarVisible} />
    </>
  );
}

function Header({
  headerRef,
  isVisible,
}: {
  headerRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}) {
  return (
    <div
      ref={headerRef} // Attach ref to the entire header
      className={`flex flex-col items-start text-xl transition duration-300 ${isVisible ? "opacity-0" : "opacity-100"
        }`}
    >
      <div className="flex flex-col gap-4 px-4">
        <div className="flex w-full flex-col-reverse items-start justify-between gap-7 pb-5 sm:flex-row sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-tl from-background/60 to-emerald-400/60 shadow-lg p-[3px] ring-[5px] ring-emerald-700/10">
              <div className="rounded-full p-px h-24 w-24">
                <Image
                  className="rounded-full filter"
                  width={96}
                  height={96}
                  decoding="async"
                  alt="Matthew Hrehirchuk"
                  src="https://avatars.githubusercontent.com/u/49077192?v=4"
                />
              </div>
            </div>
            <h1 className="flex flex-col gap-1">
              <span className="text-3xl font-bold w-1/2">Matthew Hrehirchuk</span>
              <span className="font-mono text-base font-medium">
                @matthew_hre
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 self-end text-sm font-bold sm:-mt-16 sm:self-auto">
            <Link href="https://github.com/matthew-hre" variant="icon" size="sm">
              <Github
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
            <Link href="https://linkedin.com/in/matthew-hre/" variant="icon" size="sm">
              <Linkedin
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
            <Link href="https://instagram.com/matthew_hre/" variant="icon" size="sm">
              <Instagram
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
          </div>
        </div>
        <p className="text-base">
          A web developer, graphic designer, and student. Makes plenty of games,
          a few helpful tools, and – at the moment – lots of studying resources.
        </p>
        <div className="flex flex-row flex-wrap items-center justify-start gap-5 border-y-[1px] border-gray-600/20 w-full py-3 text-sm font-semibold text-neutral-400/80 sm:justify-between sm:gap-3">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>
              Senior Data Quality Specialist @{" "}
              <a
                href="https://cohere.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400/80 hover:text-gray-200 underline transition-all duration-300 ease-out"
              >
                Cohere
              </a>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Calgary, AB</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <a
              href="https://www.mtroyal.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400/80 hover:text-gray-200 underline transition-all duration-300 ease-out"
            >
              Mount Royal University
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects({
  state = "Projects",
  onChange,
}: {
  state?: "Projects" | "Vinyl" | "Writing";
  onChange?: (next: "Projects" | "Vinyl" | "Writing") => void;
}) {
  return (
    <section className="mt-10 px-4">
      <div className="flex items-center gap-2">
        <h2 className="sr-only">Section</h2>
        <div role="tablist" aria-label="Content sections" className="inline-flex w-full gap-1 rounded-lg bg-white/5 p-1 text-lg font-semibold">
          {(["Projects", "Vinyl", "Writing"] as const).map((key) => {
            const selected = state === key;
            const isDisabled = key === "Writing";
            return (
              <button
                key={key}
                role="tab"
                aria-selected={selected && !isDisabled}
                aria-disabled={isDisabled || undefined}
                disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : 0}
                onClick={!isDisabled ? () => onChange?.(key) : undefined}
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
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2">
        {/* Keep DiscogsLibrary mounted but hidden to preserve state */}
        <div className={state === "Vinyl" ? "block" : "hidden"}>
          <DiscogsLibrary />
        </div>
        <div className={state === "Writing" ? "block" : "hidden"}>
          <p className="text-base">
            Not yet!
          </p>
        </div>
        <div className={state === "Projects" ? "block space-y-2" : "hidden"}>
          <ProjectCard
            title="matt-init"
            description="A CLI tool for scaffolding Next.js projects the way I like 'em."
            githubUrl="https://github.com/matthew-hre/matt-init"
            projectUrl="https://init.matthew-hre.com"
            imageFallbackColor="bg-black/60"
            techStack={[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "BetterAuth",
              "Turso",
              "LibSQL",
              "Nix",
              "NPM",
              "Monorepo",
            ]}
          />
          <ProjectCard
            title="Peerfect"
            description="A peer-to-peer life skills exchange platform."
            githubUrl="https://github.com/burtonjong/peerfect"
            imageFallbackColor="bg-blue-600/60"
            techStack={[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Supabase",
              "WebSockets",
              "PostgreSQL",
              "Nix",
            ]}
          />
          <ProjectCard
            title="Shelf'd"
            description="An interactive bookshelf app to track your reading."
            githubUrl="https://github.com/matthew-hre/nwHacks2025"
            imageFallbackColor="bg-red-600/60"
            techStack={[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Supabase",
              "PostgreSQL",
              "Nix",
            ]}
          />
          <ProjectCard
            title="Tabinator"
            description="A cross-platform desktop tab management utility."
            githubUrl="https://github.com/matthew-hre/HackTheNorth2024"
            imageFallbackColor="bg-purple-600/60"
            techStack={[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Tauri",
              "Rust",
              "PowerShell",
              "Swift",
              "ConvexDB",
            ]}
          />
          <ProjectCard
            title="Hunchifier"
            description="A full-stack app for managing software project ideas."
            githubUrl="https://github.com/matthew-hre/hunchifier"
            techStack={[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Supabase",
              "PostgreSQL",
            ]}
          />
          <ProjectCard
            title="Bait and Switch"
            description="A game about using bugs as a form of ammunition."
            projectUrl="https://whycardboard.itch.io/bait-and-switch"
            imageFallbackColor="bg-[#f5555d]/70"
            techStack={["GameMaker", "GML", "Aseprite"]}
          />
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  imageFallbackColor?: string;
  techStack: string[];
}

function ProjectCard({
  title,
  description,
  projectUrl,
  githubUrl,
  imageUrl,
  imageFallbackColor = "bg-gray-100/30",
  techStack,
}: ProjectCardProps) {
  return (
    <div className="relative rounded-lg border-[1px] border-none bg-white/5 p-4 transition-all duration-500 ease-out hover:bg-white/10">
      <div className="flex flex-col space-y-3">
        <Link
          href={projectUrl}
          variant="project"
          size="lg"
          className="group flex w-fit items-center gap-2"
        >
          {imageUrl ? (
            <div className="relative h-8 w-8">
              <Image
                className="rounded-lg"
                width={32}
                height={32}
                decoding="async"
                alt={title}
                src={imageUrl || "/placeholder.svg"}
              />
            </div>
          ) : (
            <div className={`h-8 w-8 rounded-lg ${imageFallbackColor}`} />
          )}
          <span>{title}</span>
          {projectUrl && (
            <SquareArrowOutUpRight className="bg-gray-100/30 p-1 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40" />
          )}
        </Link>
        <Link
          href={githubUrl}
          variant="icon"
          className="group absolute top-4 right-4 rounded-lg px-2 py-1"
        >
          {githubUrl && (
            <Github className="fill-gray-100/30 transition-all duration-300 ease-out group-hover:fill-white w-6 h-6" />
          )}
        </Link>
      </div>
      <p className="text-base">{description}</p>
      <div className="flex flex-wrap items-center">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="mr-2 mt-2 inline-block rounded-md border-[1px] border-zinc-700 px-2 py-1 font-mono text-xs font-semibold"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
