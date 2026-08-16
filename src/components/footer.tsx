import { getCommitData } from "@/lib/getCommitData";
import { GitBranch } from "lucide-react";
import FadeInOnView from "./anim/fade-in-on-view";
import Link from "./link";

export default async function Footer() {
  const commitData = await getCommitData();

  return (
    <footer>
      <FadeInOnView>
        <div className="mx-auto max-w-[640px] px-4">
          <div className="flex flex-col flex-wrap items-center gap-10 px-4 py-5 pt-0">
            <hr className="w-full border-t border-border" />
            <div className="grid w-full grid-flow-col-dense grid-cols-1 items-start gap-4">
              <Link
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
                variant="muted"
              >
                CC BY-SA 4.0
              </Link>
              <Link
                href={`https://tangled.org/matthew-hre.com/matthew-hre.com/commit/${commitData?.sha}`}
                variant="muted"
                mono
                icon={<GitBranch className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-default" />}
              >
                {commitData?.sha.slice(0, 7)}
              </Link>
            </div>
          </div>
        </div>
      </FadeInOnView>
    </footer>
  );
}
