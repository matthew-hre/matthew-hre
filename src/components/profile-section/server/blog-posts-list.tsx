import { getAllPostMetadata } from "@/lib/blog/get-posts";
import BlogPostCard from "./blog-post-card";

export default async function BlogPostsList() {
  const posts = await getAllPostMetadata();

  return (
    <>
      {posts.map((post) => (
        <BlogPostCard
          key={post.slug}
          title={post.title}
          description={post.description}
          slug={post.slug}
          dateCreated={post.dateCreated}
          tags={post.tags}
        />
      ))}
    </>
  );
}
