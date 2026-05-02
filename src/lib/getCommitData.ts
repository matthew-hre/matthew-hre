const tangledFeedUrl =
  "https://tangled.org/matthew-hre.com/matthew-hre.com/feed.atom?types=commits";

let cachedCommitData: CommitData | null = null;
let cacheTimestamp: number | null = null;
const cacheTTL = 5 * 60 * 1000; // cache time-to-live: 5 minutes

export async function getCommitData(): Promise<CommitData | null> {
  try {
    const now = Date.now();

    if (cachedCommitData && cacheTimestamp && now - cacheTimestamp < cacheTTL) {
      return cachedCommitData;
    }

    const response = await fetch(tangledFeedUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const xml = await response.text();

    // Find the first <entry> block.
    const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
    if (!entryMatch) {
      return null;
    }

    const entry = entryMatch[1];

    // Title is in the form: "[Commit a233570] readme update"
    const titleMatch = entry.match(/<title>\s*\[Commit\s+([^\]]+)\]\s*([\s\S]*?)\s*<\/title>/);
    // Fall back to extracting sha from the link if title format ever changes.
    const linkMatch = entry.match(/<link[^>]*href="([^"]*\/commit\/([a-f0-9]+))"/);
    const updatedMatch = entry.match(/<updated>([^<]+)<\/updated>/);

    if (!titleMatch && !linkMatch) {
      return null;
    }

    const sha = linkMatch ? linkMatch[2] : "";
    const message = titleMatch ? titleMatch[2].trim() : "";

    const commitTime = updatedMatch
      ? new Date(updatedMatch[1]).toLocaleString("en-US", {
        timeZone: "MST",
        hour12: false,
      })
      : "";

    cachedCommitData = {
      sha,
      time: commitTime.replace(", ", " at "),
      message,
    };
    cacheTimestamp = now;

    return cachedCommitData;
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw error;
  }
}

interface CommitData {
  sha: string;
  time: string;
  message: string;
}
