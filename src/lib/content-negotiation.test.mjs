import { describe, expect, test } from "bun:test";
import { appendVary, preferredContentType } from "./content-negotiation.ts";

describe("preferredContentType", () => {
  test.each([
    [null, "text/html"],
    ["*/*", "text/html"],
    ["text/html", "text/html"],
    ["text/markdown", "text/markdown"],
    ["text/markdown, text/html;q=0.8", "text/markdown"],
    ["text/html, text/markdown;q=0.8", "text/html"],
    ["text/markdown;q=0, text/html", "text/html"],
    ["text/html;q=0, */*;q=1", "text/markdown"],
    ["text/*;q=0.8, text/markdown;q=0.9", "text/markdown"],
    ["application/pdf", null],
    ["text/html;q=0, text/markdown;q=0", null],
  ])("negotiates %p as %p", (accept, expected) => {
    expect(preferredContentType(accept)).toBe(expected);
  });
});

describe("appendVary", () => {
  test("adds Accept without replacing existing values", () => {
    const headers = new Headers({ Vary: "RSC, Accept-Encoding" });
    appendVary(headers, "Accept");
    expect(headers.get("Vary")).toBe("RSC, Accept-Encoding, Accept");
  });

  test("does not duplicate a case-insensitive value", () => {
    const headers = new Headers({ Vary: "RSC, accept" });
    appendVary(headers, "Accept");
    expect(headers.get("Vary")).toBe("RSC, accept");
  });
});
