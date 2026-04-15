"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Disc, Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://api.matthew-hre.com";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  nowPlaying: boolean;
  timestamp: string | null;
}

export default function MusicPresence() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const fetchTrack = useEffectEvent(async () => {
    try {
      const res = await fetch(`${API_BASE}/activity/music`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.track) {
        setTrack(data.track);
      }
    } catch {
      // ignore fetch errors
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !track) {
    return <Skeleton className="w-64 h-6 mt-2 -mb-2"></Skeleton>;
  }

  const { name: song, artist, album, image: albumArtUrl, nowPlaying: isNowPlaying } = track;

  return (
    <a
      onClick={() => setShowInfo((s) => !s)}
      aria-expanded={showInfo}
      className={cn("group mr-auto cursor-pointer transition-[height,padding] text-base",
        showInfo ? "h-28 pt-4" : "h-6 pt-1 hover:underline hover:text-primary")}
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
              : "text-muted-foreground group-hover:text-primary transition-colors duration-300 ease-out")}
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
