import { describe, expect, test } from "bun:test";
import {
  HOME_MARKDOWN,
  LLMS_TEXT,
  PERSON_JSON_LD,
  SITE_URL,
  notFoundMarkdown,
} from "./site-content.ts";

describe("agent-readable site content", () => {
  test("provides a substantial, structured Markdown homepage", () => {
    expect(HOME_MARKDOWN).toStartWith("# Matthew Hrehirchuk\n");
    expect(HOME_MARKDOWN.length).toBeGreaterThan(500);
    expect(HOME_MARKDOWN).toContain("## Current role");
    expect(HOME_MARKDOWN).toContain(`${SITE_URL}/llms.txt`);
  });

  test("follows the llms.txt section and link-list format", () => {
    const headings = LLMS_TEXT.match(/^#{1,6} .+$/gm);
    expect(headings).toEqual([
      "# Matthew Hrehirchuk",
      "## Site content",
      "## Optional",
    ]);
    expect(LLMS_TEXT.split("\n")[2]).toStartWith("> ");
    expect(LLMS_TEXT).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\): .+$/m);
  });

  test("describes the homepage as a schema.org Person", () => {
    expect(PERSON_JSON_LD["@context"]).toBe("https://schema.org");
    expect(PERSON_JSON_LD["@type"]).toBe("Person");
    expect(PERSON_JSON_LD.url).toBe(SITE_URL);
    expect(PERSON_JSON_LD.sameAs.length).toBeGreaterThan(0);
  });

  test("gives agents recovery links in a Markdown 404", () => {
    const body = notFoundMarkdown("/missing");
    expect(body).toStartWith("# 404: Not found");
    expect(body).toContain("`/missing`");
    expect(body).toContain(`${SITE_URL}/sitemap.xml`);
    expect(body).toContain(`${SITE_URL}/llms.txt`);
  });
});
