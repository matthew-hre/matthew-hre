import { Octokit } from "@octokit/core";

/*
 * This method gets the contents of a .md file from a GitHub repository.
 */
export async function getGithubFileContents(pageRoute: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const url = getGithubFileRouteFromUrl(pageRoute);

  const { data } = await octokit.request(`GET ${url}`, {
    owner: "matthew-hre",
    repo: "matthew-hre",
    path: pageRoute,
  });

  const decodedContent = Buffer.from(data.content, "base64").toString("utf-8");

  return decodedContent;
}

export function getGithubFileRouteFromUrl(url: string) {
  const urlParts = url.split("/");
  const repo = urlParts[3];
  const owner = urlParts[4];
  const path = urlParts.slice(7).join("/");
  return `/repos/${owner}/${repo}/contents/${path}`;
}
