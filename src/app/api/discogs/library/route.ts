import { NextResponse } from 'next/server';
import type { DiscogResponse } from '@/types/discog';

const cache = new Map<string, DiscogResponse>();

let lastRequestTime = 0;
const minRequestInterval = 3000;

async function getLibraryWithRetry(page = 1, retries = 3) {
    const cacheKey = `discogs:library:${page}`;

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as DiscogResponse;
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

            cache.set(cacheKey, result);

            // expire cache after 1 hour
            setTimeout(() => cache.delete(cacheKey), 3600_000);

            return result;
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page') || '1';
        const page = Number(pageParam) || 1;

        const data = await getLibraryWithRetry(page);

        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: message || 'Unknown' }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
