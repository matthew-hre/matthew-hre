import { Metadata } from "next";
import {
  getPostSlugs,
  getPostBySlug,
} from "@/lib/blog/get-posts";
import { notFound } from "next/navigation";
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

  let Post;
  try {
    const module = await import(`@/content/posts/${slug}.mdx`);
    Post = module.default;
  } catch {
    notFound();
  }

  return (
    <>
      <main className="pt-20">
        <article className="mx-auto max-w-[640px] px-4 pt-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
            <div className="text-muted-foreground text-sm space-y-1 mb-4">
              <p>
                Published{" "}
                {new Date(metadata.dateCreated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}

                {metadata.dateModified && (
                  <span>
                    , updated{" "}
                    {new Date(metadata.dateModified).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </p>
            </div>
            {metadata.tags && (
              <div className="mt-4 flex gap-2 flex-wrap mb-4">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-card px-2 py-1 rounded text-foreground"
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
                    className="text-sm text-primary hover:text-primary/80 transition-default"
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
        </article>
      </main>
      <Footer />
    </>
  );
}
