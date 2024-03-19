const githubApiUrl =
  "https://api.github.com/repos/matthew-hre/matthew-hre/commits";

export async function getCommitData(): Promise<CommitData | null> {
  try {
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

    return {
      sha: commitSha,
      time: commitTime.replace(", ", " at "),
      message: commitMessage,
    };
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
