import Link from "next/link";

interface BlogPostCardProps {
  title: string;
  description: string;
  slug: string;
  dateCreated: string;
  tags?: string[];
}

export default function BlogPostCard({
  title,
  description,
  slug,
  dateCreated,
  tags,
}: BlogPostCardProps) {
  const formattedDate = new Date(dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/writing/${slug}`}
      className="relative block rounded-lg border border-none bg-white/5 p-4 transition-all duration-500 ease-out hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white flex-1">{title}</h3>
        <p className="text-gray-400 text-sm whitespace-nowrap">{formattedDate}</p>
      </div>
      <p className="text-base text-white/80 mt-3">{description}</p>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        {tags &&
          tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-md border border-zinc-700 px-2 py-1 font-mono text-xs font-semibold text-gray-300"
            >
              {tag}
            </span>
          ))}
      </div>
    </Link>
  );
}
