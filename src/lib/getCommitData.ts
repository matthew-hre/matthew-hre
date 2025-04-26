const githubApiUrl =
  "https://api.github.com/repos/matthew-hre/matthew-hre/commits";

let cachedCommitData: CommitData | null = null;
let cacheTimestamp: number | null = null;
const cacheTTL = 5 * 60 * 1000; // cache time-to-live: 5 minutes

export async function getCommitData(): Promise<CommitData | null> {
  try {
    const now = Date.now();

    if (cachedCommitData && cacheTimestamp && now - cacheTimestamp < cacheTTL) {
      return cachedCommitData;
    }

    const response = await fetch(githubApiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const commitData = await response.json();

    if (!commitData || commitData.length === 0) {
      return null;
    }

    const latestCommit = commitData[0];
    const commitSha = latestCommit.sha;
    const commitMessage = latestCommit.commit.message;

    const commitTime = new Date(latestCommit.commit.author.date).toLocaleString(
      "en-US",
      { timeZone: "MST", hour12: false }
    );

    cachedCommitData = {
      sha: commitSha,
      time: commitTime.replace(", ", " at "),
      message: commitMessage,
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
