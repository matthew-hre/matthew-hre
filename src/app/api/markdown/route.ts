import { HOME_MARKDOWN, notFoundMarkdown } from "@/lib/site-content";

const MARKDOWN_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=86400",
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

export function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get("__markdown_path");

  if (pathname === "/") {
    return new Response(HOME_MARKDOWN, {
      headers: {
        ...MARKDOWN_HEADERS,
        Link: '</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"',
      },
    });
  }

  return new Response(notFoundMarkdown(pathname ?? "/api/markdown"), {
    status: 404,
    headers: MARKDOWN_HEADERS,
  });
}
