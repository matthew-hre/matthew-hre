import { NextRequest, NextResponse } from "next/server";
import { appendVary, preferredContentType } from "@/lib/content-negotiation";

const DISCOVERY_LINKS =
  '</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"';

function addNegotiationHeaders(response: NextResponse, pathname: string) {
  appendVary(response.headers, "Accept");
  if (pathname === "/") response.headers.set("Link", DISCOVERY_LINKS);
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/index.md") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("__markdown_path", "/");
    return addNegotiationHeaders(NextResponse.rewrite(url), "/");
  }

  if (/\.[^/]+$/.test(pathname)) return NextResponse.next();

  const chosen = preferredContentType(request.headers.get("accept"));
  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("__markdown_path", pathname);
    return addNegotiationHeaders(NextResponse.rewrite(url), pathname);
  }

  if (chosen === null) {
    return new NextResponse(
      "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      },
    );
  }

  return addNegotiationHeaders(NextResponse.next(), pathname);
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
