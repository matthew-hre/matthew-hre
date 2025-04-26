"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SnowfallContextProps {
  enabled: boolean;
  setEnabled: (on: boolean) => void;
}

const SnowfallContext = createContext<SnowfallContextProps | undefined>(
  undefined
);

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export const SnowfallProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabledRaw] = useState(false);
  const [mounted, setMounted] = useState(false);

  // on mount, init state
  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia(REDUCE_QUERY);
    const prefersReduced = mql.matches;

    let initial = !prefersReduced;
    try {
      const saved = localStorage.getItem("snowfall-enabled");
      if (saved !== null) {
        initial = JSON.parse(saved) && !prefersReduced;
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }

    setEnabledRaw(initial);

    // listen for changes to reduce-motion
    const handleReduceChange = () => {
      if (mql.matches) setEnabledRaw(false);
    };
    mql.addEventListener("change", handleReduceChange);
    return () => mql.removeEventListener("change", handleReduceChange);
  }, []);

  // persist whenever enabled flips (client-only)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("snowfall-enabled", JSON.stringify(enabled));
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, [enabled, mounted]);

  const setEnabled = (on: boolean) => {
    if (!mounted) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;
    setEnabledRaw(on);
  };

  return (
    <SnowfallContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </SnowfallContext.Provider>
  );
};

export function useSnowfall(): SnowfallContextProps {
  const ctx = useContext(SnowfallContext);
  if (!ctx) throw new Error("useSnowfall must be inside SnowfallProvider");
  return ctx;
}
