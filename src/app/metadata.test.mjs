import { describe, expect, test } from "bun:test";
import robots from "./robots.ts";
import sitemap from "./sitemap.ts";

describe("crawler metadata", () => {
  test("sitemap contains only the one-page site", () => {
    expect(sitemap()).toEqual([
      {
        url: "https://matthew-hre.com",
        changeFrequency: "monthly",
        priority: 1,
      },
    ]);
  });

  test("robots allows crawling and identifies the sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://matthew-hre.com/sitemap.xml",
    });
  });
});
