import { reader } from "@/lib/createReader";
import CategoryPageClient from "./CategoryPageClient";

import { toTitleCase } from "@/lib/utils";

import Footer from "@/components/Footer";
export default async function CategoryPage({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  const category = params.path[params.path.length - 1];

  const collection = await reader.collections[
    category as keyof typeof reader.collections
  ];

  if (!collection) {
    throw new Error(`No collection found for ${category}`);
  }

  const all = await collection.all();

  const trimmedPosts = all
    .map((post: any) => ({
      slug: post.slug,
      entry: {
        title: post.entry.title,
        createdDate: post.entry.createdDate,
        lastModifiedDate: post.entry.lastModifiedDate,
        tags: post.entry.tags,
        externalLink: post.entry.externalLink,
      },
    }))
    .sort((a: any, b: any) => {
      return (
        new Date(b.entry.createdDate).getTime() -
        new Date(a.entry.createdDate).getTime()
      );
    });

  const formattedPath = params.path.map((item, index) => ({
    slug: params.path.slice(0, index + 1).join("/"),
    title: toTitleCase(item),
  }));

  return (
    <>
      <CategoryPageClient path={formattedPath} posts={trimmedPosts} />{" "}
      <Footer />
    </>
  );
}
