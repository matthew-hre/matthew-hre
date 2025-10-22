"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DiscogsLibrarySkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col h-full">
            <Skeleton className="w-full aspect-square" />
            <div className="flex flex-col mt-4 flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
