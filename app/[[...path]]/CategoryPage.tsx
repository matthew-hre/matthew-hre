import { reader } from "@/lib/createGitHubReader";

import CategoryPageClient from "./CategoryPageClient";

export default async function CategoryPage({ category }: { category: string }) {
  const collection = await reader.collections[
    category as keyof typeof reader.collections
  ];

  if (!collection) {
    throw new Error(`No collection found for ${category}`);
  }

  const all = await collection.all();

  const trimmedPosts = all.map((post: any) => ({
    slug: post.slug,
    entry: {
      title: post.entry.title,
      createdDate: post.entry.createdDate,
      lastModifiedDate: post.entry.lastModifiedDate,
      tags: post.entry.tags,
      externalLink: post.entry.externalLink,
    },
  }));

  return <CategoryPageClient category={category} posts={trimmedPosts} />;
}
