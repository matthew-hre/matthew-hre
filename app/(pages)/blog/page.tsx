import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const blog = await reader.collections.blog.all();

  return (
    <ul>
      {blog.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.entry.title}</Link>
        </li>
      ))}
    </ul>
  );
}
