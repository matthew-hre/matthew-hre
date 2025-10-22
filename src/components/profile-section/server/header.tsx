import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import Link from "@/components/link";

export default function Header() {
  return (
    <div className="flex flex-col items-start text-xl">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex w-full flex-col-reverse items-start justify-between gap-7 pb-5 sm:flex-row sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gradient-to-tl from-background/60 to-emerald-400/60 shadow-lg p-[3px] ring-[5px] ring-emerald-700/10">
              <div className="rounded-full p-px h-24 w-24">
                <Image
                  className="rounded-full filter"
                  width={96}
                  height={96}
                  sizes="96px"
                  decoding="async"
                  alt="Matthew Hrehirchuk"
                  src="https://avatars.githubusercontent.com/u/49077192?v=4"
                />
              </div>
            </div>
            <h1 className="flex flex-col gap-1">
              <span className="text-3xl font-bold w-1/2">Matthew Hrehirchuk</span>
              <span className="font-mono text-base font-medium">
                @matthew_hre
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-4 self-end text-sm font-bold sm:-mt-16 sm:self-auto">
            <Link href="https://github.com/matthew-hre" variant="icon" size="sm">
              <Github
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
            <Link href="https://linkedin.com/in/matthew-hre/" variant="icon" size="sm">
              <Linkedin
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
            <Link href="https://instagram.com/matthew_hre/" variant="icon" size="sm">
              <Instagram
                size={32}
                className="bg-gray-100/30 p-1 text-gray-100 rounded-md transition-all duration-300 ease-out group-hover:bg-gray-100/40"
              />
            </Link>
          </div>
        </div>
        <p className="text-base">
          A web developer, graphic designer, and student. Makes plenty of games,
          a few helpful tools, and – at the moment – lots of studying resources.
        </p>
        <div className="flex flex-row flex-wrap items-center justify-start gap-5 border-y-[1px] border-gray-600/20 w-full py-3 text-sm font-semibold text-neutral-400/80 sm:justify-between sm:gap-3">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>
              Senior Data Quality Specialist @{" "}
              <a
                href="https://cohere.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400/80 hover:text-gray-200 underline transition-all duration-300 ease-out"
              >
                Cohere
              </a>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Calgary, AB</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <a
              href="https://www.mtroyal.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400/80 hover:text-gray-200 underline transition-all duration-300 ease-out"
            >
              Mount Royal University
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
