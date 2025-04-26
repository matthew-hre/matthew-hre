"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Briefcase,
  FileText,
  GraduationCap,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import Navbar from "@/components/navbar";

export default function ProfileSection() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const profilePictureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarVisible(!entry.isIntersecting);
      },
      { rootMargin: "96px 0px 0px 0px" }
    );

    if (profilePictureRef.current) {
      observer.observe(profilePictureRef.current);
    }

    return () => {
      if (profilePictureRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(profilePictureRef.current);
      }
    };
  }, []);

  return (
    <>
      <main className="mx-auto min-h-screen max-w-[640px] px-4 pt-24 pb-10 sm:pt-40">
        <Header
          profilePictureRef={profilePictureRef}
          isVisible={isNavbarVisible}
        />
        <Projects />
      </main>
      <Navbar isVisible={isNavbarVisible} />
    </>
  );
}

function Header({
  profilePictureRef,
  isVisible,
}: {
  profilePictureRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-start text-xl transition duration-300 ${
        isVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col gap-4 px-4">
        <div className="flex w-full flex-col-reverse items-start justify-between gap-7 pb-5 sm:flex-row sm:gap-0">
          <div className="flex items-center space-x-4">
            <div
              ref={profilePictureRef} // Attach ref to the profile picture container
              className="rounded-full bg-gradient-to-tl from-background/60 to-emerald-400/60 shadow-lg p-[3px] ring-[5px] ring-emerald-700/10"
            >
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
              <span className="text-3xl font-bold">Matthew Hrehirchuk</span>
              <span className="font-mono text-base font-medium">
                @matthew_hre
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 self-end text-sm font-bold sm:-mt-16 sm:self-auto">
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="/about"
            >
              <FileText className="bg-gray-100/30 text-emerald-100 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out" />

              <span className="transition-all text-emerald-100 duration-300 ease-out group-hover:text-emerald-200">
                About
              </span>
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://github.com/matthew-hre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github
                size={32}
                className="bg-gray-100/30 p-1 text-emerald-100 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://linkedin.com/in/matthew-hre/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                size={32}
                className="bg-gray-100/30 p-1 text-emerald-100 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://instagram.com/matthew_hre/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={32}
                className="bg-gray-100/30 p-1 text-emerald-100 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
          </div>
        </div>
        <p className="text-base">
          A web developer, graphic designer, and student. Makes plenty of games,
          a few helpful tools, and – at the moment – lots of studying resources.
        </p>
        <p className="text-base">
          Currently rebuilding his entire portfolio, including all his projects,
          from scratch. Has a wickedly cool (and slightly too big){" "}
          <span className="underline">vinyl collection</span>.
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
                className="text-neutral-400/80 hover:text-emerald-200 underline transition-all duration-300 ease-out"
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
              className="text-neutral-400/80 hover:text-emerald-200 underline transition-all duration-300 ease-out"
            >
              Mount Royal University
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="mt-10 px-4">
      <h2 className="text-xl">{"Things I've made"}</h2>
      <div className="mt-5 grid grid-cols-1 gap-2">
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
        <ProjectCard
          title="MRUHacks 2024 Library Display"
          description="An interactive photo display for MRUHacks 2024."
          githubUrl="https://github.com/matthew-hre/mruhackslibrarydisplay"
          imageFallbackColor="bg-cyan-400/70"
          techStack={[
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Google Drive",
          ]}
        />
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
        <a
          className="group flex w-fit items-center gap-2 text-lg font-semibold"
          target="_blank"
          rel="noopener noreferrer"
          href={projectUrl}
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
            <SquareArrowOutUpRight className="bg-emerald-100/30 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out" />
          )}
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute top-4 right-4 rounded-lg px-2 py-1"
          href={githubUrl}
        >
          {githubUrl && (
            <Github className="fill-emerald-100/30 transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:fill-white w-6 h-6" />
          )}
        </a>
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
