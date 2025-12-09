import { Metadata } from "next";
import {
  getPostSlugs,
  getPostBySlug,
  getAllPostMetadata,
} from "@/lib/blog/get-posts";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getPostBySlug(slug);

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const metadata = await getPostBySlug(slug);

  if (!metadata) {
    notFound();
  }

  // Dynamic import of MDX content
  let Post;
  try {
    const module = await import(`@/content/posts/${slug}.mdx`);
    Post = module.default;
  } catch {
    notFound();
  }

  const allPosts = await getAllPostMetadata();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = allPosts[currentIndex + 1] || null;
  const nextPost = allPosts[currentIndex - 1] || null;

  return (
    <>
      <Navbar isVisible={true} />
      <main className="pt-20">
        <article className="mx-auto max-w-[640px] px-4 py-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
            <div className="text-gray-400 text-sm space-y-1 mb-4">
              <p>
                Published{" "}
                {new Date(metadata.dateCreated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {metadata.dateModified && (
                <p>
                  Updated{" "}
                  {new Date(metadata.dateModified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
            {metadata.tags && (
              <div className="mt-4 flex gap-2 flex-wrap mb-4">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {metadata.links && metadata.links.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {metadata.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-invert max-w-none mb-12">
            <Post />
          </div>

          <nav className="border-t border-gray-600/20 pt-8 space-y-4">
            {previousPost && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Previous</p>
                <a
                  href={`/writing/${previousPost.slug}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {previousPost.title}
                </a>
              </div>
            )}
            {nextPost && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Next</p>
                <a
                  href={`/writing/${nextPost.slug}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {nextPost.title}
                </a>
              </div>
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
