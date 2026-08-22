import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";
import { middleware } from "./middleware.ts";

function request(path, accept) {
  return new NextRequest(`https://matthew-hre.com${path}`, {
    headers: { Accept: accept },
  });
}

describe("page content negotiation proxy", () => {
  test("rewrites a Markdown homepage request to its representation", () => {
    const response = middleware(request("/", "text/markdown"));
    const rewrite = new URL(response.headers.get("x-middleware-rewrite"));

    expect(rewrite.pathname).toBe("/api/markdown");
    expect(rewrite.searchParams.get("__markdown_path")).toBe("/");
    expect(response.headers.get("Vary")).toContain("Accept");
  });

  test("preserves the missing path for a Markdown 404", () => {
    const response = middleware(request("/missing", "text/markdown"));
    const rewrite = new URL(response.headers.get("x-middleware-rewrite"));

    expect(rewrite.searchParams.get("__markdown_path")).toBe("/missing");
  });

  test("passes HTML through and rejects unsupported representations", async () => {
    const html = middleware(request("/", "text/html"));
    const unsupported = middleware(request("/", "application/pdf"));

    expect(html.headers.get("x-middleware-next")).toBe("1");
    expect(unsupported.status).toBe(406);
    expect(await unsupported.text()).toContain("Available: text/html, text/markdown");
  });

  test("serves the explicit Markdown URL regardless of Accept", () => {
    const response = middleware(request("/index.md", "*/*"));
    const rewrite = new URL(response.headers.get("x-middleware-rewrite"));

    expect(rewrite.searchParams.get("__markdown_path")).toBe("/");
  });
});
