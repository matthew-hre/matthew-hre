import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/grain-overlay";
import { TooltipProvider } from "@/components/ui/tooltip";
import SnowfallBackground from "@/components/snowfall-background";
import { SnowfallProvider } from "@/lib/snowfall";

const satoshi = localFont({
  src: "../Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matthew Hrehirchuk",
  description: "The personal portfolio of Matthew Hrehirchuk",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "https://fav.farm/%F0%9F%91%8B",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${firaCode.variable} font-sans antialiased bg-muted`}
      >
        <SnowfallProvider>
          <SnowfallBackground />
          <TooltipProvider>
            <GrainOverlay />
            {children}
          </TooltipProvider>
        </SnowfallProvider>
      </body>
    </html>
  );
}
