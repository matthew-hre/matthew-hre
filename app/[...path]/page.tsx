import CategoryPage from "./CategoryPage";
import ArticlePage from "./ArticlePage";

import { reader } from "@/lib/createReader";

export default async function Page({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  if (params.path.length === 1) {
    return <CategoryPage params={params} />;
  }

  return <ArticlePage params={params} />;
}

export async function generateStaticParams() {
  const blogPaths = await reader.collections.blog.list();
  const learningPaths = await reader.collections.learning.list();
  const projectPaths = await reader.collections.projects.list();
  const gamePaths = await reader.collections.games.list();

  return [
    ...blogPaths.map((slug) => ({ path: ["blog", slug] })),
    ...learningPaths.map((slug) => ({ path: ["learning", slug] })),
    ...projectPaths.map((slug) => ({ path: ["projects", slug] })),
    ...gamePaths.map((slug) => ({ path: ["games", slug] })),
    { path: ["games"] },
    { path: ["projects"] },
    { path: ["blog"] },
    { path: ["learning"] },
  ];
}
