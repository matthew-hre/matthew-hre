import NextMdx from "@next/mdx";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withMdx = NextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

const nextConfig = withMdx({
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
});

export default nextConfig;
