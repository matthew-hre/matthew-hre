import { reader } from "@/lib/createReader";

export async function getHighlightedPosts(
  collectionName: any,
  count: number = 3
) {
  let collection = null;

  switch (collectionName) {
    case "projects":
      collection = reader.collections.projects;
      break;
    case "learning":
      collection = reader.collections.learning;
      break;
    case "games":
      collection = reader.collections.games;
      break;
    case "prog_3":
      collection = reader.collections.prog_3;
      break;
    case "web_2":
      collection = reader.collections.web_2;
      break;
    default:
      collection = reader.collections.blog;
      break;
  }

  const data = await collection.all();

  const sorted = data.sort((a: any, b: any) => {
    return (
      new Date(b.entry.createdDate).getTime() -
      new Date(a.entry.createdDate).getTime()
    );
  });

  return sorted.slice(0, count);
}

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
