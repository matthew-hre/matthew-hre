"use client";

import { Snowflake } from "lucide-react";
import { useSnowfall } from "@/lib/snowfall";

export default function SnowToggle() {
  const { enabled, setEnabled } = useSnowfall();

  // Wrap localStorage access in try-catch to handle cases where DOM storage is disabled
  const handleClick = () => {
    setEnabled(!enabled);
    try {
      if (enabled) {
        localStorage.setItem("snowfall-enabled", "false");
      } else {
        localStorage.setItem("snowfall-enabled", "true");
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  };

  return (
    <button
      className="group flex w-fit items-center gap-2 text-base"
      onClick={handleClick}
    >
      <Snowflake className="h-4 w-4 text-muted-foreground group-hover:scale-[1.2] group-hover:text-emerald-200 transition-all duration-300 ease-out" />
      <span className="text-muted-foreground group-hover:underline transition-all duration-300 ease-out group-hover:text-emerald-200">
        {enabled ? "Disable Snow" : "Enable Snow"}
      </span>
    </button>
  );
}
