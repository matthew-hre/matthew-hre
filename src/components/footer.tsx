import { getCommitData } from "@/lib/getCommitData";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import SpotifyPresence from "./spotify-presence";
import SnowToggle from "./snow-toggle";

export default async function Footer() {
  const commitData = await getCommitData();

  return (
    <footer className="mt-10 mx-auto max-w-[640px] px-4 pb-16">
      <div className="my-5 border-b border-emerald-100/20"></div>
      <div className="flex flex-col flex-wrap items-center gap-10 py-5 px-4">
        <SpotifyPresence />
        <div className="grid w-full grid-flow-col-dense grid-cols-2 items-start gap-4">
          <div className="flex flex-col items-start gap-4">
            <Link
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              href="/"
            >
              Home
            </Link>
            <Link
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              href="/about"
            >
              About
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/matthew-hre"
            >
              GitHub
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/matthew-hre/"
            >
              LinkedIn
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/matthew_hre/"
            >
              Instagram
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-base hover:underline transition-all duration-300 ease-out hover:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:mhreh594@mtroyal.ca"
            >
              Email
            </a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <SnowToggle />
            <a
              className="group flex w-fit items-center gap-2 text-base"
              target="_blank"
              rel="noopener noreferrer"
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
            >
              <span className="text-muted-foreground group-hover:underline transition-all duration-300 ease-out group-hover:text-emerald-200">
                CC BY-SA 4.0
              </span>
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-base"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/matthew-hre/matthew-hre/commit/${commitData?.sha}`}
            >
              <GitBranch className="h-4 w-4 text-muted-foreground group-hover:scale-[1.2] group-hover:text-emerald-200 transition-all duration-300 ease-out" />
              <span className="font-mono text-muted-foreground group-hover:underline transition-all duration-300 ease-out group-hover:text-emerald-200">
                {commitData?.sha.slice(0, 7)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
