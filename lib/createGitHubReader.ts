import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "@/keystatic.config";

export const reader = createGitHubReader(keystaticConfig, {
  repo: "matthew-hre/matthew-hre",
  token: process.env.GITHUB_ACCESS_TOKEN,
});
