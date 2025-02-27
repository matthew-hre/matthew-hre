"use client";

import { useEffect, useState } from "react";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const ICON_SIZE = 16;

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size={"icon"}
      onClick={toggleTheme}
      className="absolute bottom-4 right-4 z-[10000] rounded-full border bg-background hover:border-muted-foreground"
    >
      {theme === "light" ? (
        <Sun key="light" size={ICON_SIZE} className={"text-muted-foreground"} />
      ) : theme === "dark" ? (
        <Moon key="dark" size={ICON_SIZE} className={"text-muted-foreground"} />
      ) : (
        <Laptop
          key="system"
          size={ICON_SIZE}
          className={"text-muted-foreground"}
        />
      )}
    </Button>
  );
};

export default ThemeToggle;
