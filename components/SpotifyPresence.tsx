"use client";

import { useEffect } from "react";
import { set, useLanyard } from "react-use-lanyard";

import { GoArrowUpRight } from "react-icons/go";

import Image from "next/image";
import Link from "next/link";

export const SpotifyPresence = () => {
  const lanyard = useLanyard({
    userId: "305065512457469952",
  });

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
    return (
      <p>
        Something went wrong. This is likely due to Matthew not listening to
        Spotify since the last time NextJS built this page.
      </p>
    );
  }

  const { song, artist, album, album_art_url, track_id } = displayData;

  return (
    <Link href={`https://open.spotify.com/track/${track_id}`} passHref>
      <div className="relative flex z-1 h-32 w-full flex-row items-center hover:border hover:bg-accent hover:border-muted-foreground rounded-md group transition-all">
        <Image
          src={album_art_url}
          alt="Album art"
          width={0}
          height={0}
          className="border border-border grayscale aspect-square w-20 h-20 mr-4 group-hover:ml-6 group-hover:grayscale-0 transition-all"
          unoptimized
        />
        <GoArrowUpRight className="absolute top-4 right-4 text-2xl text-muted-foreground transition-all group-hover:rotate-[-8deg] group-hover:right-2 group-hover:top-2" />
        <div className="flex flex-col flex-1">
          <span className="mb-2 flex gap-2">
            {lanyard?.data?.data?.listening_to_spotify ? (
              <span className="text-sm text-primary">Now playing</span>
            ) : (
              <span className="text-sm text-primary">Last played</span>
            )}
          </span>
          <span className="text-md mb-2 line-clamp-2 font-bold leading-none">
            {song}
          </span>
          <span className="line-clamp-1 w-[85%] text-xs text-muted-foreground">
            <span className="text-secondary-foreground font-semibold">by</span>{" "}
            {artist}
          </span>
          <span className="line-clamp-1 w-[85%] text-xs text-muted-foreground">
            <span className="text-secondary-foreground font-semibold">on</span>{" "}
            {album}
          </span>
        </div>
      </div>
    </Link>
  );
};
