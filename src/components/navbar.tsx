import Image from "next/image";
import { Github, Linkedin, Instagram } from "@/components/icons";
import Link from "./link";
import { cn } from "@/lib/utils";

export default function Navbar({ isVisible }: { isVisible: boolean }) {
  return (
    <nav className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr_min(640px,100%)_1fr] px-4">
      <div
        className={cn("pointer-events-auto col-start-2 col-end-3 -mx-px rounded-2xl bg-card px-4 py-2.5 backdrop-blur will-change-transform [@supports(backdrop-filter:blur(0px))]:bg-card transition-all duration-200 ease-in-out", isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              className="group flex w-fit items-center gap-2  text-base rounded-full"
              href="/"
            >
              <div className="rounded-full bg-linear-to-tl to-gradient-accent shadow-lg p-0.5 group transform transition ease-out hover:scale-105 hover:to-gradient-accent-hover active:translate-y-0.5">
                <div className="rounded-full p-px h-10 w-10 transition duration-300 group-hover:scale-105">
                  <Image
                    alt="A picture of Matthew"
                    width="40"
                    height="40"
                    decoding="async"
                    className="rounded-full"
                    src="https://avatars.githubusercontent.com/u/49077192?v=4"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-base font-semibold leading-none text-foreground sm:space-x-5">
            <Link href="https://github.com/matthew-hre" variant="icon">
              <Github className="icon-button" />
            </Link>
            <Link href="https://linkedin.com/in/matthew-hre/" variant="icon">
              <Linkedin className="icon-button" />
            </Link>
            <Link href="https://instagram.com/matthew_hre/" variant="icon">
              <Instagram className="icon-button" />
            </Link>
          </div>
        </div>
      </div>
    </nav >
  );
}
