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

// export async function generateStaticParams() {
//   const learningSlugs = await reader.collections.learning.list();

//   const learningPaths = learningSlugs.map((slug) => ({
//     params: {
//       path: ["learning", slug],
//     },
//   }));

//   const blogSlugs = await reader.collections.blog.list();

//   const blogPaths = blogSlugs.map((slug) => ({
//     params: {
//       path: ["blog", slug],
//     },
//   }));

//   const projectSlugs = await reader.collections.projects.list();

//   const projectPaths = projectSlugs.map((slug) => ({
//     params: {
//       path: ["projects", slug],
//     },
//   }));

//   const gamesSlugs = await reader.collections.games.list();

//   const gamePaths = gamesSlugs.map((slug) => ({
//     params: {
//       path: ["games", slug],
//     },
//   }));

//   return [...learningPaths, ...blogPaths, ...projectPaths, ...gamePaths];
// }

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
  ];
}
