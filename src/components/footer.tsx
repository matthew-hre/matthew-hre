import { getCommitData } from "@/lib/getCommitData";
import { GitBranch } from "lucide-react";
import MusicPresence from "./music-presence";
import Link from "./link";

export default async function Footer() {
  const commitData = await getCommitData();

  return (
    <footer className="mt-10 mx-auto max-w-[640px] px-4 pb-16">
      <div className="my-5 border-b border-gray-100/20"></div>
      <div className="flex flex-col flex-wrap items-center gap-10 py-5 px-4">
        <MusicPresence />
        <div className="grid w-full grid-flow-col-dense grid-cols-2 items-start gap-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/">
              Home
            </Link>
            <Link href="/about">
              About
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link href="https://github.com/matthew-hre">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/matthew-hre/">
              LinkedIn
            </Link>
            <Link href="https://www.instagram.com/matthew_hre/">
              Instagram
            </Link>
            <Link href="mailto:mhreh594@mtroyal.ca">
              Email
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
              variant="muted"
            >
              CC BY-SA 4.0
            </Link>
            <Link
              href={`https://github.com/matthew-hre/matthew-hre/commit/${commitData?.sha}`}
              variant="muted"
              mono
              icon={<GitBranch className="h-4 w-4 text-muted-foreground group-hover:text-gray-200 transition-all duration-300 ease-out" />}
            >
              {commitData?.sha.slice(0, 7)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
