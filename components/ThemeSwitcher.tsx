"use client";

import { useTheme } from "next-themes";
import { GoSun, GoMoon, GoTerminal } from "react-icons/go";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={
        "rounded-md bg-background text-foreground group-hover:bg-primary group-hover:text-primary" +
        (className ? ` ${className}` : "")
      }
    >
      {theme === "light" ? (
        <GoMoon size={24} />
      ) : theme === "crt-amber" ? (
        <GoTerminal size={24} />
      ) : (
        <GoSun size={24} />
      )}
    </button>
  );
}
