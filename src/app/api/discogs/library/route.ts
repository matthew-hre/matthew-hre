import { NextResponse } from 'next/server';
import type { DiscogResponse } from '@/types/discog';

const pendingRequests = new Map<string, Promise<DiscogResponse>>();

let lastRequestTime = 0;
const minRequestInterval = 3000;

async function getLibraryWithRetry(page = 1, sort = 'artist', sortOrder = 'asc', retries = 3) {
    const cacheKey = `discogs:library:${page}:${sort}:${sortOrder}`;

    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey) as Promise<DiscogResponse>;
    }

    const promise = (async () => {
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
                    `https://api.discogs.com/users/matthew_hre/collection/folders/0/releases?token=${process.env.DISCOGS_PERSONAL_ACCESS_TOKEN}&per_page=20&sort=${sort}&sort_order=${sortOrder}&page=${page}`,
                    {
                        headers: {
                            'User-Agent': 'matthew-hre/1.0 +https://matthew-hre.com',
                        },
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

                const result: DiscogResponse = {
                    releases: data.releases,
                    pagination: data.pagination,
                };

                return result;
            } catch (error) {
                if (i === retries - 1) throw error;
            }
        }

        throw new Error('Failed to fetch after all retries');
    })();

    pendingRequests.set(cacheKey, promise);
    promise.finally(() => pendingRequests.delete(cacheKey));

    return promise;
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page') || '1';
        const page = Number(pageParam) || 1;
        const sort = url.searchParams.get('sort') || 'artist';
        const sortOrder = url.searchParams.get('sort_order') || 'asc';

        const data = await getLibraryWithRetry(page, sort, sortOrder);

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
