import { NextResponse } from 'next/server';
import type { DiscogResponse } from '@/types/discog';
import { getLibraryPage, type SortOption, type SortOrder } from '@/lib/discogs';

const pendingRequests = new Map<string, Promise<DiscogResponse>>();

async function getLibraryWithDedup(
    page: number = 1,
    sort: SortOption = 'artist',
    sortOrder: SortOrder = 'asc'
): Promise<DiscogResponse> {
    const cacheKey = `discogs:library:${page}:${sort}:${sortOrder}`;

    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey) as Promise<DiscogResponse>;
    }

    const promise = getLibraryPage(page, sort, sortOrder);
    pendingRequests.set(cacheKey, promise);
    promise.finally(() => pendingRequests.delete(cacheKey));

    return promise;
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page') || '1';
        const page = Number(pageParam) || 1;
        const sort = (url.searchParams.get('sort') || 'artist') as SortOption;
        const sortOrder = (url.searchParams.get('sort_order') || 'asc') as SortOrder;

        const data = await getLibraryWithDedup(page, sort, sortOrder);

        const response = NextResponse.json(data);
        response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
        return response;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        const response = new Response(JSON.stringify({ error: message || 'Unknown' }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    }
}
