import { getCommitData } from "@/lib/getCommitData";

export default async function Footer() {
  const commitData = await getCommitData();
  return (
    <footer className="border-t border-muted absolute mt-auto w-full left-0 flex flex-col md:flex-row justify-between p-4 font-mono">
      <p className="md:hidden text-muted-foreground text-sm w-full text-center">
        <a
          href="
          https://creativecommons.org/licenses/by-nc-sa/4.0"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
        >
          Matthew Hrehirchuk © 2024
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
      <p className="text-muted-foreground text-sm hidden md:block">
        Matthew Hrehirchuk © 2024 —{" "}
        <a
          href="
          https://creativecommons.org/licenses/by-nc-sa/4.0"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
        >
          BY-NC-SA 4.0
        </a>
      </p>
      <p className="text-muted-foreground text-sm hidden md:block">
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
    </footer>
  );
}
