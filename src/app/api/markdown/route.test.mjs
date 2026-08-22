import { describe, expect, test } from "bun:test";
import { GET } from "./route.ts";

describe("Markdown representation route", () => {
  test("serves the homepage as cache-safe Markdown", async () => {
    const response = GET(new Request("https://matthew-hre.com/api/markdown?__markdown_path=/"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("Vary")).toBe("Accept");
    expect(response.headers.get("Link")).toContain('rel="alternate"');
    expect(await response.text()).toStartWith("# Matthew Hrehirchuk");
  });

  test("serves an agent-recoverable Markdown 404", async () => {
    const response = GET(new Request("https://matthew-hre.com/api/markdown?__markdown_path=/missing"));

    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("Vary")).toBe("Accept");
    expect(await response.text()).toContain("## Where to look next");
  });
});
