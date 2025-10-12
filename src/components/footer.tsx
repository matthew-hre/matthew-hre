import { getCommitData } from "@/lib/getCommitData";
import { GitBranch } from "lucide-react";
import Link from "./link";
import MusicPresence from "./music-presence";

export default async function Footer() {
  const commitData = await getCommitData();

  return (
    <footer className="mx-auto max-w-[640px] px-4 pb-16">
      <div className="flex flex-col flex-wrap items-center gap-10 py-5 px-4">
        <MusicPresence />
        <hr className="border-t border-gray-600/20 w-full" />
        <div className="grid w-full grid-flow-col-dense grid-cols-1 items-start gap-4">
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
    </footer>
  );
}
