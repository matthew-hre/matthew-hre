import ProjectCard from "./project-card";

export default function ProjectsList() {
  return (
    <>
      <ProjectCard
        title="matt-init"
        description="A CLI tool for scaffolding Next.js projects the way I like 'em."
        githubUrl="https://github.com/matthew-hre/matt-init"
        projectUrl="https://init.matthew-hre.com"
        imageFallbackColor="bg-background/60"
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
    </>
  );
}
