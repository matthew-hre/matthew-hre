import { DocumentRenderer } from "@keystatic/core/renderer";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "@/keystatic.config";

import Link from "next/link";
import { notFound } from "next/navigation";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await reader.collections.learning.read(slug);

  if (!post) notFound();

  return post ? (
    <>
      <h1>{post.title}</h1>
      <DocumentRenderer document={await post.content()} />
      <hr />
      <Link href="/learning">Back to Learning</Link>
    </>
  ) : (
    <div>No Knowledge Found</div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.learning.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
