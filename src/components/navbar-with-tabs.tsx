"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Instagram } from "@/components/icons";
import Link from "./link";
import { cn } from "@/lib/utils";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";

const TABS = [
  { key: "Projects", href: "/" },
  { key: "Vinyl", href: "/?tab=vinyl" },
  { key: "Writing", href: "/?tab=writing" },
] as const;

export default function NavbarWithTabs() {
  const isVisible = useScrollNavbar();
  const pathname = usePathname();

  const activeTab = pathname.startsWith("/writing") ? "Writing" : null;

  return (
    <nav className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr_min(640px,100%)_1fr] px-4">
      <div
        className={cn(
          "pointer-events-auto col-start-2 col-end-3 group/nav -mx-px rounded-lg bg-[#313131]/80 px-1 py-1 backdrop-blur-lg will-change-transform transition-[translate,opacity] duration-200 ease-in-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-3 pt-1.5 pb-1.5">
          <div className="flex items-center space-x-4">
            <ViewTransition name="profile-avatar">
              <Link
                className="group flex w-fit items-center gap-2 text-base rounded-full"
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
            </ViewTransition>
            <ViewTransition name="profile-name">
              <div className="flex flex-col">
                <p className="text-base">
                  Matthew Hrehirchuk
                </p>
                <p className="text-muted-foreground text-sm font-mono">
                  @matthew_hre
                </p>
              </div>
            </ViewTransition>
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
        <div className="grid grid-rows-[0fr] group-hover/nav:grid-rows-[1fr] transition-[grid-template-rows] duration-200 ease-in-out">
          <div className="overflow-hidden">
            <div
              role="tablist"
              aria-label="Content sections"
              className="mt-2 inline-flex w-full gap-1 rounded-lg text-lg font-semibold"
            >
              {TABS.map(({ key, href }) => {
                return (
                  <NextLink
                    key={key}
                    role="tab"
                    href={href}
                    className="rounded-md px-4 py-1 flex-1 text-center transition-colors duration-200 focus:outline-none text-foreground hover:bg-white/15"
                  >
                    {key}
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
