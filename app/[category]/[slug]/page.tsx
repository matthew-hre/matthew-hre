import { getGithubFileContents } from "@/lib/getGithubFileContents";

import Article from "./Article";
import Link from "next/link";

import { articles, Article as ArticleType } from "@/articles.config";
import { getArticleBySlug } from "@/lib/articleUtils";

export default async function Home({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(articles, slug);

  if (!article) {
    return (
      <main>
        <p>Article not found.</p>
      </main>
    );
  }

  const fileContents = await getGithubFileContents(article.url);

  return (
    <main className="pl-20">
      <p>
        <Link
          href="/"
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all text-sm italic mb-6"
        >
          ← Back
        </Link>
      </p>
      <Article content={fileContents} />
    </main>
  );
}
