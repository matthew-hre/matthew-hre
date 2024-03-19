import { Article, Category } from "@/articles.config";

export const filterArticlesByCategory = (
  articles: Article[],
  category: Category
): Article[] => {
  return articles.filter((article) => article.categories.includes(category));
};

export const getArticleBySlug = (
  articles: Article[],
  slug: string
): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};
