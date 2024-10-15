import { Suspense } from "react";
import DiscogsLibraryClient from "./DiscogsLibraryClient";

const cache = new Map();

let lastRequestTime = 0;
const minRequestInterval = 3000;

async function getLibraryWithRetry(page = 1, retries = 3) {
  const cacheKey = `discogs:library:${page}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  for (let i = 0; i < retries; i++) {
    try {
      const now = Date.now();
      if (now - lastRequestTime < minRequestInterval) {
        await new Promise((resolve) =>
          setTimeout(resolve, minRequestInterval - (now - lastRequestTime))
        );
      }
      lastRequestTime = Date.now();

      const response = await fetch(
        `https://api.discogs.com/users/matthew_hre/collection/folders/0/releases?token=${process.env.DISCOGS_PERSONAL_ACCESS_TOKEN}&per_page=20&sort=artist&page=${page}`,
        {
          headers: {
            "User-Agent": "matthew-hre/1.0 +https://matthew-hre.com",
          },
        }
      );

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        await new Promise((resolve) =>
          setTimeout(resolve, parseInt(retryAfter || "60") * 1000)
        );
        continue;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Discogs library. Status: ${response.status}`
        );
      }

      const data = await response.json();

      const result = {
        releases: data.releases,
        pagination: data.pagination,
      };

      cache.set(cacheKey, result);

      setTimeout(() => cache.delete(cacheKey), 3600000);

      return result;
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}

export async function loadMoreReleases(prevState: any, formData: FormData) {
  "use server";
  const page = Number(formData.get("page"));
  const newData = await getLibraryWithRetry(page);
  return [...prevState, newData];
}

export default async function DiscogsLibraryServer() {
  const initialData = await getLibraryWithRetry();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiscogsLibraryClient
        initialData={initialData}
        loadMoreReleases={loadMoreReleases}
      />
    </Suspense>
  );
}
