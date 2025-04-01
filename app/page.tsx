import Link from "next/link";
import { Metadata } from "next";

import { getHighlightedPosts } from "@/lib/posts";
import Footer from "@/components/Footer";

import DiscogsLibrary from "@/components/DiscogsLibrary";
import HomeLayoutClient from "./HomeLayoutClient";
import { SocialsSection } from "@/components/SocialsSection";

export const metadata: Metadata = {
  title: "Matthew Hrehirchuk",
  description:
    "Web developer, graphic designer, and student at Mount Royal University",
};

export default async function Home() {
  return <HomeLayoutClient rightSide={rightSide} altRightSide={altRightSide} />;
}

const altRightSide = (
  <aside className="w-full py-12 xl:py-24">
    <h2 className="text-xl text-muted-foreground font-sans mb-1">
      Record Collection
    </h2>
    <p className="leading-7 mb-6">
      All of the records I own, catalogued on{" "}
      <Link
        href="https://www.discogs.com/user/matthew_hre/collection"
        target="_blank"
        className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
      >
        Discogs
      </Link>
      .
    </p>
    <DiscogsLibrary />
  </aside>
);

const rightSide = (
  <aside className="w-full py-12 xl:py-24">
    <WorkSection />
    <div className="block md:hidden">
      <SocialsSection />
    </div>
    {/* <Footer /> */}
  </aside>
);

async function WorkSection() {
  const projectPosts = await getHighlightedPosts("projects");
  const learningPosts = await getHighlightedPosts("learning");
  const gamePosts = await getHighlightedPosts("games");
  const blogPosts = await getHighlightedPosts("blog", 1);

  return (
    <>
      <div className="flex flex-col space-y-6 mb-12">
        {/* <WorkCategory
          title="Projects"
          posts={projectPosts}
          allLink="/projects"
        />
        <WorkCategory
          title="Learning"
          posts={learningPosts}
          allLink="/learning"
        />
        <WorkCategory title="Games" posts={gamePosts} allLink="/games" /> */}
        <WorkCategory title="Blog" posts={blogPosts} allLink="/blog" />
      </div>
    </>
  );
}

function WorkCategory({
  title,
  posts,
  allLink,
}: {
  title: string;
  posts: any[];
  allLink: string;
}) {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl text-muted-foreground font-sans mb-4">{title}</h2>
      {posts.map((post, idx) => (
        <Card
          key={idx}
          title={post.entry.title}
          description={
            post.entry.description ||
            new Date(post.entry.createdDate)
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              .replace("Invalid Date", "")
          }
          href={`/${title.toLowerCase()}/${post.slug}`}
        />
      ))}
      {/* <Card
        title={`All ${title === "Blog" ? "Posts" : title} →`}
        description=""
        href={allLink}
      /> */}
    </div>
  );
}

const Card = ({
  title,
  description,
  href,
}: {
  title: any;
  description: string;
  href: string;
}) => {
  return (
    <div className="py-0 md:py-2 space-y-2">
      <h3 className="underline decoration-muted-foreground hover:decoration-foreground transition-all">
        <Link href={href} className="flex flex-row">
          {title}
        </Link>
      </h3>
      <p className="text-muted-foreground leading-7">{description}</p>
    </div>
  );
};
