import { getCommitData } from "@/lib/getCommitData";

export default async function Footer() {
  const commitData = await getCommitData();
  return (
    <footer className="w-full flex-col font-sans items-center space-y-1 mt-6">
      <p className="md:hidden text-muted-foreground/80 text-sm w-full text-center">
        <a
          href="
          https://creativecommons.org/licenses/by-nc-sa/4.0"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
        >
          Matthew Hrehirchuk © 2025
        </a>{" "}
        — [
        <a
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href={`https://github.com/matthew-hre/matthew-hre/commit/${commitData?.sha}`}
          target="_blank"
        >
          commit #{commitData?.sha.slice(0, 7)}
        </a>
        ]
      </p>
      <p className="text-muted-foreground/80 text-sm hidden md:block text-center">
        Matthew Hrehirchuk © 2025 —{" "}
        <a
          href="
          https://creativecommons.org/licenses/by-nc-sa/4.0"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
        >
          BY-NC-SA 4.0
        </a>
      </p>
      <p className="text-muted-foreground/80 text-sm hidden md:block text-center">
        Last updated on{" "}
        {commitData?.time.substring(0, commitData?.time.length - 3)} [
        <a
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href={`https://github.com/matthew-hre/matthew-hre/commit/${commitData?.sha}`}
          target="_blank"
        >
          commit #{commitData?.sha.slice(0, 7)}
        </a>
        ]
      </p>
      <p className="invisible md:visible text-sm w-max mx-auto text-muted-foreground/80">
        [C] to open the console
      </p>
    </footer>
  );
}
