import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const learning = await reader.collections.learning.all();

  return (
    <ul>
      {learning.map((post) => (
        <li key={post.slug}>
          <Link href={`/learning/${post.slug}`}>{post.entry.title}</Link>
        </li>
      ))}
    </ul>
  );
}
