const GITHUB_COMMIT_URL =
  "https://api.github.com/repos/matthew-hre/matthew-hre/commits/main";

export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch(GITHUB_COMMIT_URL, {
      next: { revalidate },
      signal: AbortSignal.timeout(8_000),
      headers: { Accept: "application/vnd.github+json", "User-Agent": "matthew-hre.com" },
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const { sha } = await response.json();
    if (typeof sha !== "string" || !/^[a-f0-9]{40}$/.test(sha)) {
      throw new Error("The latest GitHub commit was missing a SHA");
    }

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
