import { PostMetadata, PostMetadataSchema } from "./types";
import { posts as rawPosts } from "./posts.generated";

let cached: PostMetadata[] | null = null;

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  if (cached) return cached;
  cached = rawPosts.map((p) => PostMetadataSchema.parse(p));
  return cached;
}

export async function getPostBySlug(
  slug: string
): Promise<PostMetadata | null> {
  const posts = await getAllPostMetadata();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPostMetadata();
  return posts.map((post) => post.slug);
}
