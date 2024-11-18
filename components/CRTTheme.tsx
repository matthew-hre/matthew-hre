"use client";

import { useTheme } from "next-themes";

export default function CRTTheme() {
  const { theme } = useTheme();

  if (theme === "crt-amber") {
    return (
      <>
        <div
          className="fixed -top-1 right-0 bottom-0 left-0 bg-amber-500/80 z-[60] pointer-events-none"
          style={{ mixBlendMode: "darken" }}
        ></div>
        <div
          className="fixed -top-1 right-0 bottom-0 left-0 bg-scanlines bg-[100%\ 4px] z-[70] opacity-[0.07] pointer-events-none animate-scanlines"
          style={{ backgroundSize: "100% 4px" }}
        ></div>
      </>
    );
  }
}
