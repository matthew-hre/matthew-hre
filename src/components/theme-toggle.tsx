"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemePreference = "dark" | "light" | "system";

const STORAGE_KEY = "theme";

function getResolvedTheme(preference: ThemePreference) {
  return preference === "system"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
    : preference;
}

function applyTheme(preference: ThemePreference) {
  const theme = getResolvedTheme(preference);
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("dark");

  useEffect(() => {
    const appliedPreference = document.documentElement.dataset.themePreference;
    if (appliedPreference === "light" || appliedPreference === "dark" || appliedPreference === "system") {
      setPreference(appliedPreference);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      if (preference === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [preference]);

  const setTheme = (nextPreference: ThemePreference) => {
    applyTheme(nextPreference);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextPreference);
    } catch {}
    setPreference(nextPreference);
  };

  return (
    <div className="flex w-fit items-center gap-1" role="group" aria-label="Color theme">
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-pressed={preference === value}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          className="flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-[color,background-color] duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:bg-card aria-pressed:text-foreground"
        >
          <Icon aria-hidden className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
