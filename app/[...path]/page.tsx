import CategoryPage from "./CategoryPage";
import ArticlePage from "./ArticlePage";

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
