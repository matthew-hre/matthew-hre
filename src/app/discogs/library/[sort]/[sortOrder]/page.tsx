import { getLibraryPage, SORT_OPTIONS, SORT_ORDERS } from '@/lib/discogs';
import type { DiscogResponse } from '@/types/discog';

// Revalidate every 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const params = [];

  for (const sort of SORT_OPTIONS) {
    const orders = SORT_ORDERS[sort];
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

  let data: DiscogResponse;
  let error: string | null = null;

  try {
    data = await getLibraryPage(
      page,
      sort as 'title' | 'artist' | 'added',
      sortOrder as 'asc' | 'desc'
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
          <div key={release.id}>
            <h3>{release.basic_information.title}</h3>
            <p>{release.basic_information.artists[0]?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
