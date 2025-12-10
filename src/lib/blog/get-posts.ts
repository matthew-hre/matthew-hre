import { globby } from "globby";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { PostMetadata, PostMetadataSchema } from "./types";

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/posts");

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  const files = await globby("**/*.mdx", {
    cwd: POSTS_DIRECTORY,
  });

  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(path.join(POSTS_DIRECTORY, file), "utf8");
      const { data } = matter(content);

      const slug = file.replace(/\.mdx$/, "");

      // Validate frontmatter against schema
      try {
        const validated = PostMetadataSchema.parse({
          ...data,
          slug,
        });
        return validated;
      } catch (error) {
        if (error instanceof Error) {
          console.error(`\n❌ Build error in ${file}:`);
          console.error(error.message);
          process.exit(1);
        }
        throw error;
      }
    })
  );

  // Sort by date created descending
  return posts.sort(
    (a, b) =>
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );
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
