import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fav.farm",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.itch.zone",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.discogs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default (async (): Promise<NextConfig> => {
  const createMDX = (await import("@next/mdx")).default;
  const remarkGfm = (await import("remark-gfm")).default;
  const remarkFrontmatter = (await import("remark-frontmatter")).default;
  const remarkToc = (await import("remark-toc")).default;
  const rehypePrettyCode = (await import("rehype-pretty-code")).default;
  const rehypeSlug = (await import("rehype-slug")).default;
  const rehypeAutolinkHeadings = (await import("rehype-autolink-headings"))
    .default;

  const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkToc, { tight: true }]],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onVisitLine(node: any) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    },
  });

  return withMDX(nextConfig);
})();
