"use client";

import { useTheme } from "next-themes";
import { GoSun, GoMoon, GoTerminal } from "react-icons/go";
import { useEffect, useState } from "react";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={
        "rounded-md bg-background text-foreground group-hover:bg-primary group-hover:text-primary" +
        (className ? ` ${className}` : "")
      }
    >
      {resolvedTheme === "light" ? (
        <GoMoon size={24} />
      ) : resolvedTheme?.includes("crt") ? (
        <GoTerminal size={24} />
      ) : (
        <GoSun size={24} />
      )}
    </button>
  );
}
