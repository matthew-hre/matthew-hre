import { afterEach, describe, expect, mock, test } from "bun:test";
import { GET } from "./route.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("latest source commit", () => {
  test("reads the GitHub main commit and returns its full SHA", async () => {
    const sha = "0123456789abcdef0123456789abcdef01234567";
    globalThis.fetch = mock(async () => Response.json({ sha }));

    const response = await GET();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/matthew-hre/matthew-hre/commits/main",
      expect.objectContaining({
        headers: { Accept: "application/vnd.github+json", "User-Agent": "matthew-hre.com" },
        next: { revalidate: 300 },
      }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ sha });
  });

  test("does not expose an invalid GitHub response as a commit link", async () => {
    globalThis.fetch = mock(async () => Response.json({ sha: "not-a-commit" }));
    const originalError = console.error;
    console.error = mock(() => {});
    try {
      const response = await GET();
      expect(response.status).toBe(502);
      expect(await response.json()).toEqual({ error: "Latest commit unavailable" });
    } finally {
      console.error = originalError;
    }
  });
});
