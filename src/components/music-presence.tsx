"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Disc, Disc3 } from "lucide-react";

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
    return <Skeleton className="w-64 h-4 mt-2 -mb-2"></Skeleton>;
  }

  if (!trackData) {
    return <Skeleton className="w-64 h-4 mt-2 -mb-2"></Skeleton>;
  }

  const song = trackData.name;
  const artist = trackData.artist["#text"];
  const album = trackData.album["#text"];
  const albumArtUrl = trackData.image.find(img => img.size === "large")?.["#text"] ||
    trackData.image.find(img => img.size === "medium")?.["#text"] || "";
  const isNowPlaying = trackData["@attr"]?.nowplaying === "true";

  return (
    <a
      onClick={() => setShowInfo(!showInfo)}
      className={`transition-all hover:cursor-pointer mr-auto ${showInfo
        ? "h-28 pt-4"
        : "h-6 pt-1 group hover:underline hover:text-emerald-200"
        }`}
    >
      <div className="text-muted-foreground text-md font-inter flex flex-row">
        {isNowPlaying ? (
          <div
            className={`relative origin-top-left transition-all ease-in-out ${showInfo
              ? "w-24 h-24 min-w-24 min-h-24"
              : "w-6 h-6 min-w-6 min-h-6"
              }`}
          >
            <Disc3
              className={`animate-spin-slow group-hover:text-emerald-200 transition-all duration-300 ease-out ${showInfo ? "hidden" : ""
                }`}
            />
            {albumArtUrl && (
              /*eslint-disable-next-line @next/next/no-img-element*/
              <img
                src={albumArtUrl}
                alt="Album art"
                className={`animate-spin-slow absolute top-0 left-0 w-full h-full rounded-full transition-opacity ${showInfo ? "opacity-100" : "opacity-0"
                  }`}
              />
            )}
            <div
              className={`${showInfo ? "opacity-100" : "opacity-0"
                } w-2 h-2 absolute top-[calc(50%-4px)] left-[calc(50%-4px)] bg-background rounded-full`}
            ></div>
          </div>
        ) : (
          <div
            className={`relative origin-top-left transition-all ease-in-out ${showInfo
              ? "w-24 h-24 min-w-24 min-h-24"
              : "w-6 h-6 min-w-6 min-h-6"
              }`}
          >
            <Disc
              className={`ease-in-out origin-top-left group-hover:text-emerald-200 transition-all duration-300 ${showInfo ? "scale-[4]" : "scale-100"
                } transition-transform`}
            />
            {albumArtUrl && (
              /*eslint-disable-next-line @next/next/no-img-element*/
              <img
                src={albumArtUrl}
                alt="Album art"
                className={`absolute top-0 left-0 w-full h-full rounded-full transition-opacity ${showInfo ? "opacity-100" : "opacity-0"
                  }`}
              />
            )}
            <div
              className={`${showInfo ? "opacity-100" : "opacity-0"
                } w-2 h-2 absolute top-[calc(50%-4px)] left-[calc(50%-4px)] bg-background rounded-full`}
            ></div>
          </div>
        )}
        <div
          className={`flex flex-col ml-2 transition-all ${showInfo ? "ml-4 space-y-1 h-24 justify-center" : ""
            }`}
        >
          <span className={`${showInfo ? "block text-xs" : "hidden"}`}>
            {isNowPlaying ? "Now Playing" : "Last Played"}
          </span>
          <span
            className={`${showInfo
              ? "text-foreground font-semibold"
              : "text-muted-foreground group-hover:text-emerald-200 transition-all duration-300 ease-out"
              }`}
          >
            {clampSongTitle(song)}
            <span className={`${showInfo ? "hidden" : "inline"}`}>
              {" "}
              - {artist}
            </span>
          </span>
          <span className={`${showInfo ? "block text-sm" : "hidden"}`}>
            <span className="font-semibold text-inherit">By </span>
            {artist}
          </span>
          <span className={`${showInfo ? "block text-sm" : "hidden"}`}>
            <span className="font-semibold text-inherit">On </span>
            {album}
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
