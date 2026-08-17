const TANGLED_FEED_URL =
  "https://tangled.org/matthew-hre.com/matthew-hre.com/feed.atom?types=commits";

export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch(TANGLED_FEED_URL, {
      next: { revalidate },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Tangled returned ${response.status}`);

    const xml = await response.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    const sha = entry?.match(/<link[^>]*href="[^"]*\/commit\/([a-f0-9]+)"/)?.[1];
    if (!sha) throw new Error("The latest Tangled commit was missing a SHA");

    return Response.json(
      { sha },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch the latest commit:", error);
    return Response.json({ error: "Latest commit unavailable" }, { status: 502 });
  }
}
