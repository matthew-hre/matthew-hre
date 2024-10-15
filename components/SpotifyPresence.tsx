"use client";

import { useEffect, useState } from "react";
import { set, useLanyard } from "react-use-lanyard";

import { Skeleton } from "./ui/skeleton";
import { Disc, Disc3 } from "lucide-react";

export default function SpotifyPresence() {
  const lanyard = useLanyard({
    userId: "305065512457469952",
  });

  const [showInfo, setShowInfo] = useState(false);

  const { isValidating } = lanyard;

  const setLastPlayed = async () => {
    if (isValidating) return;
    if (!lanyard?.data?.data?.spotify) return;
    try {
      console.log(lanyard?.data?.data?.spotify);
      await set({
        apiKey: process.env.NEXT_PUBLIC_LANYARD_KV_KEY!,
        userId: "305065512457469952",
        key: "spotify_last_played",
        value: JSON.stringify(lanyard?.data?.data?.spotify),
      });
    } catch (error) {
      console.error("Error setting KV pair:", error);
    }
  };

  useEffect(() => {
    if (isValidating) return;
    setLastPlayed();
    if (!lanyard?.data?.data?.kv?.spotify_last_played) {
      console.log("Last played:", lanyard?.data?.data?.kv?.spotify_last_played);
      return;
    }
    if (
      JSON.parse(lanyard?.data?.data?.kv?.spotify_last_played) !==
        lanyard?.data?.data?.spotify &&
      lanyard?.data?.data?.listening_to_spotify
    ) {
      console.log("Setting last played.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lanyard?.data?.data?.kv?.spotify_last_played,
    lanyard?.data?.data?.spotify,
    lanyard?.data?.data?.listening_to_spotify,
  ]);

  let displayData = lanyard?.data?.data?.spotify;
  if (!displayData && lanyard?.data?.data?.kv?.spotify_last_played) {
    displayData = JSON.parse(lanyard?.data?.data?.kv?.spotify_last_played);
  }

  if (!displayData) {
    return <Skeleton className="w-64 h-4 mt-2"></Skeleton>;
  }

  const { song, artist, album, album_art_url, track_id } = displayData;

  return (
    <a
      onClick={() => setShowInfo(!showInfo)}
      className={`transition-all hover:cursor-pointer ${
        showInfo ? "h-24 pt-4" : "h-4 pt-1 hover:underline"
      }`}
    >
      <p className="text-muted-foreground text-md font-inter flex flex-row">
        {lanyard?.data?.data?.listening_to_spotify ? (
          <div
            className={`relative origin-top-left transition-all ease-in-out ${
              showInfo ? "w-24 h-24" : "w-6 h-6"
            }`}
          >
            <Disc3
              className={`animate-spin-slow ${showInfo ? "hidden" : ""}`}
            />
            <img
              src={album_art_url}
              alt="Album art"
              className={` animate-spin-slow absolute top-0 left-0 w-full h-full rounded-full transition-opacity ${
                showInfo ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`${
                showInfo ? "opacity-100" : "opacity-0"
              } w-2 h-2 absolute top-[calc(50%-4px)] left-[calc(50%-4px)] bg-background rounded-full`}
            ></div>
          </div>
        ) : (
          <div
            className={`relative origin-top-left transition-all ease-in-out ${
              showInfo ? "w-24 h-24" : "w-6 h-6"
            }`}
          >
            <Disc
              className={`ease-in-out origin-top-left ${
                showInfo ? "scale-[4]" : "scale-100"
              } transition-transform`}
            />
            <img
              src={album_art_url}
              alt="Album art"
              className={`absolute top-0 left-0 w-full h-full rounded-full transition-opacity ${
                showInfo ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`${
                showInfo ? "opacity-100" : "opacity-0"
              } w-2 h-2 absolute top-[calc(50%-4px)] left-[calc(50%-4px)] bg-background rounded-full`}
            ></div>
          </div>
        )}
        <div
          className={`flex flex-col ml-2 transition-all ${
            showInfo ? "ml-4 space-y-1 h-24 justify-center" : ""
          }`}
        >
          <span className={`${showInfo ? "block text-xs" : "hidden"}`}>
            {lanyard?.data?.data?.listening_to_spotify
              ? "Now Playing"
              : "Last Played"}
          </span>
          <span
            className={`${
              showInfo
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {clampSongTitle(song)}
            <span className={`${showInfo ? "hidden" : "inline"}`}>
              {" "}
              - {artist}
            </span>
          </span>
          <span className={`${showInfo ? "block text-sm" : "hidden"}`}>
            <span className="font-semibold text-foreground">By </span>
            {artist}
          </span>
          <span className={`${showInfo ? "block text-sm" : "hidden"}`}>
            <span className="font-semibold text-foreground">On </span>
            {album}
          </span>
        </div>
      </p>
    </a>
  );
}

function clampSongTitle(title: string) {
  if (title.length > 40) {
    return title.substring(0, 40) + "...";
  }
  return title;
}
