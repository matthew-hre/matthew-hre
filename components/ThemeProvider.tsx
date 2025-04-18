"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      themes={["light", "dark", "crt-amber", "crt-green"]}
    >
      {children}
    </NextThemesProvider>
  );
}
