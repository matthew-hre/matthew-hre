import Link from "next/link";
import { getAllPostMetadata } from "@/lib/blog/get-posts";

export default async function WritingPage() {
  const posts = await getAllPostMetadata();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Writing</h1>
      <p className="text-gray-600 mb-12">
        Thoughts on development, design, and technology.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/writing/${post.slug}`}>
              <h2 className="text-2xl font-bold hover:text-blue-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mb-3">
              {new Date(post.dateCreated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-700">{post.description}</p>
            {post.tags && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
