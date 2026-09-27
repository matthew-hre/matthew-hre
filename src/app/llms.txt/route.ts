import { LLMS_TEXT } from "@/lib/site-content";

export function GET() {
  return new Response(LLMS_TEXT, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
      Link: '</llms.txt>; rel="describedby"',
    },
  });
}
