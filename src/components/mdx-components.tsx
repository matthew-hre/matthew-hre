import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ id, children }) => (
      <h1 id={id} className="text-4xl font-bold mt-8 mb-4 scroll-m-24">{children}</h1>
    ),
    h2: ({ id, children }) => (
      <h2 id={id} className="text-3xl font-bold mt-6 mb-3 scroll-m-24">{children}</h2>
    ),
    h3: ({ id, children }) => (
      <h3 id={id} className="text-2xl font-bold mt-4 mb-2 scroll-m-24">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base leading-7 mb-4">{children}</p>
    ),
    a: ({ id, href, children, ...props }) => {
      const isExternal = href?.startsWith('http://') || href?.startsWith('https://')

      return (
        <Link
          id={id}
          href={href || "#"}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary hover:text-primary/80 underline transition-default"
          {...props}
        >
          {children}
        </Link>
      )
    },
    code: ({ children }) => (
      <code className="bg-popover px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-popover text-popover-foreground p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    img: (props) => (
      <>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
          alt={props.alt || ""}
          className="rounded-lg my-4 mx-8"
          sizes="(max-width: 768px) 100vw, 768px"
          width={768}
          height={0}
        />
        <span className="text-sm text-center block mx-auto text-muted-foreground mb-4">
          {props.title}
        </span>
      </>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mt-1 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mt-1 space-y-1">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative rounded-lg border border-border bg-card p-4 mb-4">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <table className="w-full table-auto border-collapse mb-4">
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th className="border border-border bg-card px-4 py-2 text-left">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2">{children}</td>
    ),
    ...components,
  };
}
