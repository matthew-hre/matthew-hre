export interface VinylRelease {
  discogs_id: number;
  title: string;
  artist_name: string;
  cover_image: string;
  date_added: string;
}

export interface VinylPagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  added_this_year?: number;
}

export interface VinylResponse {
  pagination: VinylPagination;
  releases: VinylRelease[];
}

export type VinylSort = 'title' | 'artist' | 'added';
export type VinylOrder = 'asc' | 'desc';

export const VINYL_SORTS: VinylSort[] = ['title', 'artist', 'added'];
export const VINYL_ORDERS: Record<VinylSort, VinylOrder[]> = {
  title: ['asc', 'desc'],
  artist: ['asc', 'desc'],
  added: ['desc'],
};

export const API_BASE = 'https://api.matthew-hre.com';

export async function fetchVinyl(
  page: number = 1,
  sort: VinylSort = 'added',
  order: VinylOrder = 'desc',
  init?: RequestInit,
): Promise<VinylResponse> {
  const path = `/vinyl?page=${page}&sort=${sort}&order=${order}`;
  const res = await apiFetch(path, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch vinyl. Status: ${res.status}`);
  }
  return res.json();
}

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  // On the server (Cloudflare Worker), prefer the API service binding to skip
  // DNS/TLS/public network. Falls back to public fetch in the browser, during
  // `next dev`, or if the binding isn't present.
  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'development') {
    try {
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const env = getCloudflareContext().env as { API?: { fetch: typeof fetch } };
      if (env?.API?.fetch) {
        return env.API.fetch(`${API_BASE}${path}`, init);
      }
    } catch {
      // not running on Cloudflare (e.g. `next dev` without bindings) — fall through
    }
  }
  return fetch(`${API_BASE}${path}`, init);
}
