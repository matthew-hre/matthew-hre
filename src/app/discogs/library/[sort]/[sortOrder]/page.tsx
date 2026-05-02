import { fetchVinyl, VINYL_SORTS, VINYL_ORDERS, type VinylResponse, type VinylSort, type VinylOrder } from '@/types/vinyl';

// Revalidate every 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const params = [];

  for (const sort of VINYL_SORTS) {
    const orders = VINYL_ORDERS[sort];
    for (const sortOrder of orders) {
      params.push({
        sort,
        sortOrder,
      });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{
    sort: string;
    sortOrder: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function DiscogsLibraryPage({ params, searchParams }: PageProps) {
  const { sort, sortOrder } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1', 10);

  let data: VinylResponse;
  let error: string | null = null;

  try {
    data = await fetchVinyl(
      page,
      sort as VinylSort,
      sortOrder as VinylOrder,
      { next: { revalidate: 86400 } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    error = message;
    return <div className="text-destructive">Error loading library: {error}</div>;
  }

  return (
    <div>
      <h1>Discogs Library</h1>
      <p>Sort: {sort} ({sortOrder})</p>
      <p>Page: {data.pagination.page} of {data.pagination.pages}</p>
      <div>
        {data.releases.map((release) => (
          <div key={release.discogs_id}>
            <h3>{release.title}</h3>
            <p>{release.artist_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
