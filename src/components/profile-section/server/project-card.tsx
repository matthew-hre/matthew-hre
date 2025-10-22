import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import Link from "@/components/link";

interface ProjectCardProps {
  title: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  imageFallbackColor?: string;
  techStack: string[];
}

export default function ProjectCard({
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
