import type { DiscogResponse } from '@/types/discog';
import { validateDiscogsResponse } from '@/lib/validators/discogs';

export type SortOption = 'title' | 'artist' | 'added';
export type SortOrder = 'asc' | 'desc';

export const SORT_OPTIONS: SortOption[] = ['title', 'artist', 'added'];
export const SORT_ORDERS: Record<SortOption, SortOrder[]> = {
  title: ['asc', 'desc'],
  artist: ['asc', 'desc'],
  added: ['desc'], // only descending for 'added'
};

async function getLibraryPage(
  page: number = 1,
  sort: SortOption = 'artist',
  sortOrder: SortOrder = 'asc',
  retries: number = 3
): Promise<DiscogResponse> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `https://api.discogs.com/users/matthew_hre/collection/folders/0/releases?token=${process.env.DISCOGS_PERSONAL_ACCESS_TOKEN}&per_page=20&sort=${sort}&sort_order=${sortOrder}&page=${page}`,
        {
          headers: {
            'User-Agent': 'matthew-hre/1.0 +https://matthew-hre.com',
          },
          next: { revalidate: 86400 }, // Cache for 24 hours
        }
      );

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        await new Promise((resolve) =>
          setTimeout(resolve, parseInt(retryAfter || '60') * 1000)
        );
        continue;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch Discogs library. Status: ${response.status}`);
      }

      const data = await response.json();
      return validateDiscogsResponse(data);
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error('Failed to fetch after all retries');
}

export { getLibraryPage };
