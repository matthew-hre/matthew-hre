"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Link from "next/link";
import Image from "next/image";

import { useTheme } from "next-themes";

import {
  tomorrow,
  oneLight,
  // @ts-ignore
} from "react-syntax-highlighter/dist/esm/styles/prism";
import FadeIn from "@/components/FadeIn";

export default function Article({ content }: { content: string }) {
  const { theme, systemTheme } = useTheme();

  return (
    <main>
      <FadeIn>
        <ReactMarkdown
          remarkPlugins={[remarkToc, remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            a: ({ node, ...props }) => {
              return (
                <Link
                  {...props}
                  href={props.href || ""}
                  target={props?.href?.startsWith("#") ? "" : "_blank"}
                  rel={props?.href?.startsWith("#") ? "" : "noreferrer"}
                  className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
                >
                  {props.children}
                </Link>
              );
            },
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <div className="mb-6">
                  <SyntaxHighlighter
                    {...props}
                    style={theme === "dark" ? tomorrow : oneLight}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
            img: ({ node, ...props }) => {
              const fileName = String(node?.properties?.src).replace("./", "");
              if (
                !fileName.startsWith("https://") &&
                !fileName.startsWith("http://")
              ) {
                props.src = `/images/${fileName}`;
              }

              return (
                <Image
                  src={props.src || ""}
                  alt={props?.alt || ""}
                  width={0}
                  height={0}
                />
              );
            },
            h1: ({ node, ...props }) => {
              return (
                <h1 {...props} className="text-sm font-serif italic mb-4" />
              );
            },
            h2: ({ node, ...props }) => {
              return <h2 {...props} className="text-4xl font-serif mb-6" />;
            },
            h3: ({ node, ...props }) => {
              return <h3 {...props} className="text-2xl font-serif mb-6" />;
            },
            h4: ({ node, ...props }) => {
              return <h4 {...props} className="text-xl font-serif mb-6" />;
            },
            p: ({ node, ...props }) => {
              return <p {...props} className="font-sans leading-7 mb-6" />;
            },
            ul: ({ node, ...props }) => {
              return (
                <ul {...props} className="list-disc font-sans mb-6 ml-8" />
              );
            },
            ol: ({ node, ...props }) => {
              return (
                <ol {...props} className="list-decimal font-sans mb-6 ml-8" />
              );
            },
            li: ({ node, ...props }) => {
              return <li {...props} className="font-sans mb-2 leading-7" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </FadeIn>
    </main>
  );
}
