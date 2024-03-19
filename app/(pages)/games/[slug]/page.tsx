import { DocumentRenderer } from "@keystatic/core/renderer";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "@/keystatic.config";

import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.games.read(params.slug);
  return post ? (
    <>
      <h1 className="text-foreground mb-6 font-light text-4xl font-serif">
        {post.title}
      </h1>
      <DocumentRenderer
        document={await post.content()}
        componentBlocks={{
          a: (props) => (
            <Link href={props.href} {...props}>
              {props.children}
            </Link>
          ),
        }}
      />
      <hr />
      <Link href="/games">Back to Games</Link>
    </>
  ) : (
    <div>No Post Found</div>
  );
}
