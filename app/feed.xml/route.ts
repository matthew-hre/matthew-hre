import RSS from "rss";
import { getAllPosts } from "@/lib/getAllPosts";

export async function GET() {
  const feed = new RSS({
    title: "Matthew Hrehirchuk",
    description: "Matthew's personal blog and portfolio site",
    generator: "RSS for Node and Next.js",
    site_url: "https://matthew-hre.com/",
    feed_url: "https://matthew-hre.com/feed.xml",
    managingEditor: "matthew_hre@outlook.com (Matthew Hrehirchuk)",
    webMaster: "matthew_hre@outlook.com (Matthew Hrehirchuk)",
    copyright: `Copyright ${new Date()
      .getFullYear()
      .toString()}, Matthew Hrehirchuk`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const data = await getAllPosts();

  data.forEach((entry) => {
    feed.item({
      title: replaceUnicodeCharacters(entry.entry.title),
      description: entry.entry.description,
      url: `https://matthew-hre.com/${entry.collection}/${entry.slug}`,
      categories: entry.entry.tags,
      date: entry.entry.createdDate,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function replaceUnicodeCharacters(title: string) {
  return title
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
