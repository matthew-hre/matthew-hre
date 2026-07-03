import ProjectCard from "./project-card";

export default function ProjectsList() {
  return (
    <>
      <ProjectCard
        title="BobrChat"
        description="A multi-model, Bring Your Own Key AI chat application."
        githubUrl="https://github.com/matthew-hre/bobrchat/"
        projectUrl="https://bobrchat.com"
        imageFallbackColor="bg-[#77bc32]"
        techStack={[
          "TypeScript",
          "React",
          "Next.js",
          "OpenNext",
          "React Query",
          "Zustand",
          "BetterAuth",
          "PostgreSQL",
          "NeonDB",
          "Nix",
          "AI-SDK",
          "Cloudflare",
        ]}
      />
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
        title="Bait and Switch"
        description="A game about using bugs as a form of ammunition."
        projectUrl="https://whycardboard.itch.io/bait-and-switch"
        imageFallbackColor="bg-[#f5555d]/70"
        techStack={["GameMaker", "GML", "Aseprite"]}
      />
    </>
  );
}
