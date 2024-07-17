import { reader } from "@/lib/createReader";

export async function getAllPosts() {
  const blogPosts = await getPosts(reader.collections.blog, "blog");
  const projectPosts = await getPosts(reader.collections.projects, "projects");
  const learningPosts = await getPosts(reader.collections.learning, "projects");
  const gamePosts = await getPosts(reader.collections.games, "games");

  const data = [...blogPosts, ...projectPosts, ...learningPosts, ...gamePosts];

  const sorted = data.sort((a: any, b: any) => {
    return (
      new Date(b.entry.createdDate).getTime() -
      new Date(a.entry.createdDate).getTime()
    );
  });

  console.log(sorted);

  return sorted;
}

export async function getPosts(collection: any, collectionName: string) {
  const data = await collection.all();

  // add the collection name to each entry
  return data.map((entry: any) => {
    return {
      ...entry,
      collection: collectionName,
    };
  });
}
