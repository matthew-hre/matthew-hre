import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import ArticlePage from "./ArticlePage";
import CategoryPage from "./CategoryPage";
import HomePage from "./HomePage";
import Footer from "@/components/Footer";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

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

type DynamicStaticPaths = { path: Array<string> };
type DynamicParams = { params: DynamicStaticPaths };

const reader = createReader(process.cwd(), keystaticConfig);

async function getPost(
  category: string,
  fileName: string
): Promise<Post<Frontmatter>> {
  const collection = await reader.collections[
    category as keyof typeof reader.collections
  ];

  if (!collection) {
    throw new Error(`No collection found for ${category}`);
  }

  const page = await collection.read(fileName);

  if (!page) {
    throw new Error(`No page found at ${category}/${fileName}`);
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

export default async function Page({ params }: DynamicParams) {
  const { path = [] } = params;

  if (path.length === 0) {
    return (
      <>
        <HomePage />
        <Footer />
      </>
    );
  }

  if (path.length === 1) {
    return (
      <>
        <CategoryPage category={path[0]} />
        <Footer />
      </>
    );
  }

  if (path[0] === "_next") {
    return null;
  }

  const { serialized, frontmatter } = await getPost(path[0], path[1]);

  const formattedPath = [
    {
      slug: path[0],
      title: toTitleCase(path[0]),
    },
    {
      slug: path[0] + "/" + path[1],
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

export async function generateStaticParams() {
  const projectsSlugs = await reader.collections.projects.list();
  const blogSlugs = await reader.collections.blog.list();
  const gamesSlugs = await reader.collections.games.list();
  const learningSlugs = await reader.collections.learning.list();

  const slugs = [
    ...mapSlugs(projectsSlugs),
    ...mapSlugs(blogSlugs),
    ...mapSlugs(gamesSlugs),
    ...mapSlugs(learningSlugs),
  ];

  return slugs.map((slug) => ({
    params: { path: slug },
  }));
}

function mapSlugs(slugs: string[]) {
  return slugs.map((slug) => {
    const [category, fileName] = slug.split("/");
    return [category, fileName];
  });
}

function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
