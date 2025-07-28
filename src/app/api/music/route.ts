import { NextResponse } from 'next/server';

interface LastFmTrack {
    name: string;
    artist: {
        "#text": string;
        mbid?: string;
    };
    album: {
        "#text": string;
        mbid?: string;
    };
    image: Array<{
        "#text": string;
        size: "small" | "medium" | "large" | "extralarge";
    }>;
    url: string;
    "@attr"?: {
        nowplaying?: string;
    };
    date?: {
        uts: string;
        "#text": string;
    };
}

interface LastFmResponse {
    recenttracks: {
        track: LastFmTrack[];
        "@attr": {
            user: string;
            totalPages: string;
            page: string;
            perPage: string;
            total: string;
        };
    };
}

export async function GET() {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
        console.error("Last.fm API key or username not configured");
        return NextResponse.json({ error: "Last.fm API not configured" }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LastFmResponse = await response.json();

        if (data.recenttracks?.track?.[0]) {
            return NextResponse.json({ track: data.recenttracks.track[0] });
        } else {
            return NextResponse.json({ track: null });
        }
    } catch (error) {
        console.error("Error fetching Last.fm data:", error);
        return NextResponse.json({ error: "Failed to fetch music data" }, { status: 500 });
    }
}
