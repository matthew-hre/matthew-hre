import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaGithub as Github } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";

export default function Navbar({ isVisible }: { isVisible: boolean }) {
  return (
    <nav className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr_min(640px,100%)_1fr] px-4">
      <div
        className={`pointer-events-auto col-start-2 col-end-3 -mx-px rounded-2xl bg-gray-800/95 px-4 py-2.5 backdrop-blur will-change-transform [@supports(backdrop-filter:blur(0px))]:bg-white/[5%] transition duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              className="group flex w-fit items-center gap-2  text-base rounded-full"
              href="/"
            >
              <div className="rounded-full bg-gradient-to-tl from-midnight/60 to-emerald-400/60 shadow-lg p-[2px] group transform transition ease-out hover:scale-105 hover:from-midnight hover:to-emerald-400 hover:shadow-emerald-500/25 active:translate-y-[2px]">
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
          <div className="flex items-center space-x-2 text-base font-semibold leading-none text-emerald-100/90 sm:space-x-5">
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="/about"
            >
              <FileText className="bg-gray-100/30 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out" />

              <span className="transition-all duration-300 ease-out group-hover:text-emerald-200">
                About
              </span>
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://github.com/matthew-hre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github
                size={32}
                className="bg-gray-100/30 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://linkedin.com/in/matthew-hre/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                size={32}
                className="bg-gray-100/30 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
            <a
              className="group flex w-fit items-center gap-2 text-sm"
              href="https://instagram.com/matthew_hre/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={32}
                className="bg-gray-100/30 p-1 shadow-md rounded-md group-hover:scale-[1.2] group-hover:shadow-emerald-500/40 group-active:translate-y-[2px] transition-all duration-300 ease-out"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
