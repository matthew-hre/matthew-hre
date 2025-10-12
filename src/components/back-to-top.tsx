"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export default function BackToTop() {
    const [show, setShow] = useState(false);
    const THRESHOLD = 200;

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > THRESHOLD);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={clsx(
                "fixed bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 flex items-center justify-center rounded-md bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all duration-300 backdrop-blur-md",
                show
                    ? "translate-y-0 opacity-100 pointer-events-auto"
                    : "translate-y-16 opacity-0 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            ↑
        </button>
    );
}
