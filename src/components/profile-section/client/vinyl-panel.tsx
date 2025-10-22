"use client";

import dynamic from "next/dynamic";
import DiscogsLibrarySkeleton from "@/components/discogs-library-skeleton";

const DiscogsLibrary = dynamic(
  () => import("@/components/discogs-library"),
  {
    ssr: false,
    loading: () => <DiscogsLibrarySkeleton />,
  }
);

export default function VinylPanel() {
  return <DiscogsLibrary />;
}
