"use client";

import { MdxContent } from "../../components/mdx-content";
import styles from "@/styles/article.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";

import { useTheme } from "next-themes";

import { DarkTheme, LightTheme } from "@/styles/github-themes";

import { useEffect, useState } from "react";

export default function ArticlePage({
  frontmatter,
  serialized,
  path,
}: {
  frontmatter: any;
  serialized: any;
  path: { slug: string; title: string }[];
}) {
  const { theme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="bg-background h-screen"></div>;
  }

  return (
    <div className="flex flex-col px-8 md:px-20 mb-16 relative min-h-[calc(100vh-9.3em)] md:min-h-[calc(100vh-13.3rem)]">
      <Breadcrumb path={path} />
      <div className="mb-4">
        <h1 className="text-4xl font-serif mb-4">{frontmatter.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Published {formatDate(frontmatter.createdDate)}
          {frontmatter.createdDate !== frontmatter.updatedDate
            ? `, last updated ${formatDate(frontmatter.updatedDate)}`
            : ""}
        </p>
        <hr className="mb-2 border-muted" />
      </div>

      <article className={`${styles.article} flex-1`}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
        <MdxContent source={serialized} />
      </article>
    </div>
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
