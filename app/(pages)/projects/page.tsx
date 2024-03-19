import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const projects = await reader.collections.projects.all();

  return (
    <ul>
      {projects.map((post) => (
        <li key={post.slug}>
          <Link href={`/projects/${post.slug}`}>{post.entry.title}</Link>
        </li>
      ))}
    </ul>
  );
}
