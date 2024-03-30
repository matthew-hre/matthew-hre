import { type MDXRemoteSerializeResult } from "next-mdx-remote";

import { reader } from "@/lib/createReader";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";

import { serialize } from "next-mdx-remote/serialize";
import ArticlePage from "./ArticlePageClient";
import Footer from "@/components/Footer";

import { toTitleCase } from "@/lib/utils";

type Frontmatter = {
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  tags: string[];
  externalLink: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

async function getPost(
  category: string,
  fileName: string
): Promise<Post<Frontmatter>> {
  const collection = await reader.collections[
    category as keyof typeof reader.collections
  ];

  if (!collection) {
    console.log("Collection not found: " + category);
    return notFound();
  }

  const page = await collection.read(fileName);

  if (!page) {
    console.log("Page not found: " + fileName);
    return notFound();
  }

  const frontmatter = {
    title: page.title,
    description: "description" in page ? page.description || "" : "",
    createdDate: page.createdDate,
    updatedDate: page.lastModifiedDate,
    tags: page.tags,
    externalLink: "externalLink" in page ? page.externalLink : "",
  } as Frontmatter;

  let content;

  if (typeof page.content === "function") {
    content = await page.content();
  } else {
    content = page.content;
  }
  const serialized = await serialize(String(content), {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
  });

  return {
    frontmatter,
    serialized,
  };
}

export default async function Page({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  const { serialized, frontmatter } = await getPost(
    params.path[0],
    params.path[1]
  );

  const formattedPath = [
    {
      slug: params.path[0],
      title: toTitleCase(params.path[0]),
    },
    {
      slug: params.path[0] + "/" + params.path[1],
      title: frontmatter.title,
    },
  ];

  return (
    <>
      <ArticlePage
        frontmatter={frontmatter}
        serialized={serialized}
        path={formattedPath}
      />
      <Footer />
    </>
  );
}
