import { ViewTransition } from "react";
import Image from "next/image";
import {
  Briefcase,
  Disc3,
  MapPin,
} from "lucide-react";
import { Github, Tangled, Linkedin, Instagram } from "@/components/icons";
import Link from "@/components/link";
import { fetchVinyl } from "@/types/vinyl";

const SOCIAL_LINK_CLASSES = "size-10 justify-center rounded-md bg-card text-foreground backdrop-blur-md transition-[color,background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-card-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 pointer-coarse:size-11";

export default async function Header() {
  const recordCount = await getRecordCount();

  return (
    <div className="flex flex-col items-start text-xl">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex w-full flex-col-reverse items-start justify-between gap-7 pb-5 sm:flex-row sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-linear-to-tl from-background/60 to-gradient-accent shadow-lg p-[3px] ring-[5px] ring-avatar-ring">
              <div className="rounded-full p-px h-24 w-24">
                <ViewTransition name="profile-avatar">
                  <Image
                    className="rounded-full filter"
                    width={96}
                    height={96}
                    sizes="96px"
                    decoding="async"
                    alt="Matthew Hrehirchuk"
                    src="https://avatars.githubusercontent.com/u/49077192?v=4"
                  />
                </ViewTransition>
              </div>
            </div>
            <h1 className="flex flex-col gap-1">
              <span className="max-w-48 text-balance text-3xl font-bold leading-[1.05] tracking-[-0.025em]">Matthew Hrehirchuk</span>
              <span className="font-mono text-base font-normal">
                @matthew_hre
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 self-end text-sm font-bold sm:-mt-16 sm:self-auto">
            <Link
              href="https://github.com/matthew-hre"
              variant="icon"
              size="sm"
              className={SOCIAL_LINK_CLASSES}
            >
              <span aria-hidden><Github className="size-[18px]" /></span>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://tangled.sh/@matthew-hre.com"
              variant="icon"
              size="sm"
              className={SOCIAL_LINK_CLASSES}
            >
              <span aria-hidden><Tangled className="size-[18px]" /></span>
              <span className="sr-only">Tangled</span>
            </Link>
            <Link
              href="https://linkedin.com/in/matthew-hre/"
              variant="icon"
              size="sm"
              className={SOCIAL_LINK_CLASSES}
            >
              <span aria-hidden><Linkedin className="size-[18px]" /></span>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://instagram.com/matthew_hre/"
              variant="icon"
              size="sm"
              className={SOCIAL_LINK_CLASSES}
            >
              <span aria-hidden><Instagram className="size-[18px]" /></span>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-pretty text-base leading-relaxed">
          <p>
            I&apos;m a software developer and a design engineer. I love crafting purposeful interfaces and making web interactions fun.
          </p>
          <p>
            I&apos;m also a record collector, a music nerd, and a terrible guitarist.
          </p>
        </div>
        {/*<p className="text-base">
          Currently seeking internships for this summer – preferably writing code. Reach out to me at <Link variant="inline" href="mailto:me@matthew-hre.com">me@matthew-hre.com</Link>!
        </p>*/}
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-5 border-y border-border/50 py-3 text-sm font-semibold text-muted-foreground sm:justify-between sm:gap-3">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>
              Software Engineer @{" "}
              <a
                href="https://purelend.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="link-inline"
              >
                Purelend.ai
              </a>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Calgary, AB</span>
          </div>
          {recordCount !== null && (
            <div className="flex items-center gap-1">
              <Disc3 className="h-4 w-4" />
              <span>
                {recordCount.total} records
                {recordCount.addedThisYear !== null && ` (+${recordCount.addedThisYear} this year)`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function getRecordCount() {
  try {
    console.log("Fetching vinyl record count");
    const vinyl = await fetchVinyl(1, "added", "desc", {
      next: { revalidate: 60 * 60 * 6 },
    });
    const count = {
      total: vinyl.pagination.items,
      addedThisYear: vinyl.pagination.added_this_year ?? null,
    };
    console.log("Fetched vinyl record count", count);
    return count;
  } catch (error) {
    console.error("Failed to fetch vinyl record count", error);
    return null;
  }
}
