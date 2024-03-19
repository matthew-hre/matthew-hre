import { DocumentRenderer } from "@keystatic/core/renderer";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "@/keystatic.config";

import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.blog.read(params.slug);
  return post ? (
    <>
      <h1>{post.title}</h1>
      <DocumentRenderer document={await post.content()} />
      <hr />
      <Link href="/blog">Back to Blog</Link>
    </>
  ) : (
    <div>No Post Found</div>
  );
}
