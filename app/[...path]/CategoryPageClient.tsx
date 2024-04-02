"use client";

import Link from "next/link";

import styles from "@/styles/article.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";

export default function CategoryPageClient({
  path,
  posts,
}: {
  path: { slug: string; title: string }[];
  posts: any[];
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="bg-background h-screen"></div>;
  }

  return (
    <>
      <div className="flex flex-col px-8 md:px-20 mb-16 relative min-h-[calc(100vh-9.3em)] md:min-h-[calc(100vh-13.3rem)]">
        <Breadcrumb path={path} />
        <div className="mb-4">
          <h1 className="text-4xl font-serif mb-4">
            {path[path.length - 1].title}
          </h1>
        </div>

        <article className={`${styles.article} flex-1`}>
          {
            <div className="flex flex-col">
              {posts.map((post, idx) => (
                <div key={idx} className="mb-4">
                  <Link
                    href={`/${path[path.length - 1].slug}/${post.slug}`}
                    className="text-foreground hover:underline"
                  >
                    <h2 className="text-2xl font-serif">{post.entry.title}</h2>
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.entry.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Published {formatDate(post.entry.createdDate || "")}
                    {post.entry.createdDate !== post.entry.lastModifiedDate
                      ? `, last updated ${formatDate(
                          post.entry.lastModifiedDate || ""
                        )}`
                      : ""}
                  </p>
                  <hr className="mb-2 border-muted" />
                </div>
              ))}
            </div>
          }
        </article>
      </div>
    </>
  );
}

const formatDate = (date: string) => {
  // march 17, 2024, 2:00 pm
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
