import { DocumentRenderer } from "@keystatic/core/renderer";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "@/keystatic.config";

import Link from "next/link";
import { notFound } from "next/navigation";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const game = await reader.collections.games.read(slug);

  if (!game) notFound();

  return game ? (
    <>
      <h1>{game.title}</h1>
      <DocumentRenderer document={await game.content()} />
      <hr />
      <Link href="/games">Back to Games</Link>
    </>
  ) : (
    <div>No Game Found</div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.games.list();

  return slugs.map((slug) => ({
    slug,
  }));
}
