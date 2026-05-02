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
  const url = `${API_BASE}/vinyl?page=${page}&sort=${sort}&order=${order}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch vinyl. Status: ${res.status}`);
  }
  return res.json();
}
