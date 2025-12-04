"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Disc, Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LastFmTrack {
  name: string;
  artist: {
    "#text": string;
    mbid?: string;
  };
  album: {
    "#text": string;
    mbid?: string;
  };
  image: Array<{
    "#text": string;
    size: "small" | "medium" | "large" | "extralarge";
  }>;
  url: string;
  "@attr"?: {
    nowplaying?: string;
  };
  date?: {
    uts: string;
    "#text": string;
  };
}

export default function MusicPresence() {
  const [trackData, setTrackData] = useState<LastFmTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const fetchRecentTracks = async () => {
    try {
      const response = await fetch('/api/music');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.track) {
        setTrackData(data.track);
      }
    } catch (error) {
      console.error("Error fetching music data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTracks();

    // poll for updates every 30 seconds
    const interval = setInterval(fetchRecentTracks, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Skeleton className="w-64 h-6 mt-2 -mb-2"></Skeleton>;
  }

  if (!trackData) {
    return <Skeleton className="w-64 h-6 mt-2 -mb-2"></Skeleton>;
  }

  const song = trackData.name;
  const artist = trackData.artist["#text"];
  const album = trackData.album["#text"];
  const albumArtUrl = trackData.image.find(img => img.size === "large")?.["#text"] ||
    trackData.image.find(img => img.size === "medium")?.["#text"] || "";
  const isNowPlaying = trackData["@attr"]?.nowplaying === "true";

  return (
    <a
      onClick={() => setShowInfo((s) => !s)}
      aria-expanded={showInfo}
      className={cn("group mr-auto cursor-pointer transition-[height,padding] text-base",
        showInfo ? "h-28 pt-4" : "h-6 pt-1 hover:underline hover:text-gray-200")}
    >
      <div className="text-muted-foreground text-md font-inter flex flex-row items-start">
        <div
          className={cn("relative origin-top-left aspect-square transition-[width,height,transform] ease-out",
            showInfo ? "w-24 h-24" : "w-6 h-6")}
        >
          <span
            className={cn("absolute inset-0 grid place-items-center backface-hidden transition-opacity duration-300",
              albumArtUrl && showInfo ? "opacity-0" : "opacity-100")}
            aria-hidden
          >
            <span className={cn("will-change-transform", isNowPlaying ? "animate-spin-slow" : "")}>
              {isNowPlaying ? <Disc3 className="w-full h-full" /> : <Disc className="w-full h-full" />}
            </span>
          </span>

          {albumArtUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={albumArtUrl}
              alt="Album art"
              draggable={false}
              className={cn("absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-300 ease-out",
                showInfo ? "opacity-100" : "opacity-0",
                isNowPlaying ? "animate-spin-slow" : "")}
            />
          )}

          <span
            className={cn("absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-background transition-opacity duration-300",
              showInfo ? "opacity-100" : "opacity-0")}
            aria-hidden
          />
        </div>

        <div className={cn("flex flex-col ml-2 transition-all", showInfo ? "ml-4 space-y-1 h-24 justify-center" : "")}>
          <span className={cn(showInfo ? "block text-xs" : "hidden")}>
            {isNowPlaying ? "Now Playing" : "Last Played"}
          </span>
          <span
            className={cn(showInfo
              ? "text-foreground font-semibold"
              : "text-muted-foreground group-hover:text-gray-200 transition-colors duration-300 ease-out")}
          >
            {clampSongTitle(song)}
            <span className={cn(showInfo ? "hidden" : "inline")}> — {artist}</span>
          </span>
          <span className={cn(showInfo ? "block text-sm" : "hidden")}>
            <span className="font-semibold">By </span>{artist}
          </span>
          <span className={cn(showInfo ? "block text-sm" : "hidden")}>
            <span className="font-semibold">On </span>{album}
          </span>
        </div>
      </div>
    </a>

  );
}

function clampSongTitle(title: string) {
  if (title.length > 80) {
    return title.substring(0, 80) + "...";
  }
  return title;
}
