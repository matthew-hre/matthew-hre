import { reader } from "@/lib/createReader";
import CategoryPageClient from "./CategoryPageClient";

import Footer from "@/components/Footer";
export default async function CategoryPage({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  const collection = await reader.collections[
    params.path[0] as keyof typeof reader.collections
  ];

  if (!collection) {
    throw new Error(`No collection found for ${params.path[0]}`);
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

  return (
    <>
      <CategoryPageClient category={params.path[0]} posts={trimmedPosts} />{" "}
      <Footer />
    </>
  );
}
