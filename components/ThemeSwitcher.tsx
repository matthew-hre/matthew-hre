"use client";

import { useTheme } from "next-themes";
import { GoSun, GoMoon } from "react-icons/go";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();

  const toggleTheme = () => {
    // If the user has yet to push the button, the theme is set to "system",
    // this accounts for that
    const displayed_theme = /light|dark/.test(theme || "")
      ? theme
      : systemTheme;

    if (displayed_theme === "light") {
      setTheme("dark");
    }
    if (displayed_theme === "dark") {
      setTheme("light");
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
      {theme === "dark" ? <GoSun /> : <GoMoon />}
    </button>
  );
}
