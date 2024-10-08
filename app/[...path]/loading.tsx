import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="flex flex-col px-8 md:px-20 mb-16 relative min-h-[calc(100vh-9.3em)] md:min-h-[calc(100vh-13.3rem)]">
      <Skeleton className="w-1/3 h-3 mt-4" />
      <Skeleton className="w-1/2 h-12 mt-6" />
      <div className="flex flex-row flex-wrap gap-2 mb-1">
        <Skeleton className="w-16 h-4 inline mt-4" />
        <Skeleton className="w-16 h-4 inline mt-4" />
        <Skeleton className="w-16 h-4 inline mt-4" />
      </div>
      <Skeleton className="w-3/4 h-3 mt-4" />
      <hr className="mb-2 mt-4 border-muted" />
      <Skeleton className="w-full h-24 mt-4" />
    </div>
  );
}
