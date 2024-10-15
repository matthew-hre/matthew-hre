"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  useCallback,
  Fragment,
} from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { DiscogResponse } from "@/types/Discog";

export default function DiscogsLibraryClient({
  initialData,
  loadMoreReleases,
}: {
  initialData: DiscogResponse;
  loadMoreReleases: (
    data: DiscogResponse[],
    formData: FormData
  ) => Promise<DiscogResponse[]>;
}) {
  const [data, setData] = useState([initialData]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });
  const currentPage = useRef(1);
  const prevY = useRef(0);

  const loadMore = useCallback(() => {
    if (!isPending && hasMore) {
      startTransition(() => {
        const formData = new FormData();
        formData.append("page", String(currentPage.current + 1));
        loadMoreReleases(data, formData)
          .then((newData: DiscogResponse[]) => {
            if (newData.length > data.length) {
              setData(newData);
              currentPage.current += 1;
              setError("");
              // Check if we've reached the end of the data
              const lastPage = newData[newData.length - 1];
              if (lastPage.pagination.page >= lastPage.pagination.pages) {
                setHasMore(false);
              }
            } else {
              setHasMore(false);
            }
          })
          .catch((error) => {
            console.error("Failed to load more releases:", error);
            setError("Failed to load more releases. Please try again later.");
          });
      });
    }
  }, [isPending, hasMore, data, loadMoreReleases]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > prevY.current) {
        // Scrolling down
        const scrolledToBottom =
          window.innerHeight + currentY >=
          document.documentElement.scrollHeight - 200;
        if (scrolledToBottom && inView) {
          loadMore();
        }
      }

      prevY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView, loadMore]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.releases.map((release: any) => {
              const { basic_information } = release;

              return (
                <div
                  key={release.id}
                  className="flex flex-col h-full bg-background"
                >
                  <Image
                    src={basic_information.cover_image}
                    alt={basic_information.title}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-album.jpg";
                    }}
                  />
                  <div className="flex flex-col mt-4 flex-1">
                    <h3 className="text-md font-bold">
                      {basic_information.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {basic_information.artists[0].name}
                    </p>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {hasMore && (
        <div ref={ref} className="col-span-full flex justify-center p-4 h-20">
          {isPending && <Loader2 className="animate-spin" />}
        </div>
      )}
    </div>
  );
}
