import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

import SpotifyPresence from "@/components/SpotifyPresence";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import { getHighlightedPosts } from "@/lib/posts";
import Footer from "@/components/Footer";

import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Matthew Hrehirchuk",
  description:
    "Web developer, graphic designer, and student at Mount Royal University",
};

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow w-full flex flex-col md:flex-row md:space-x-32 px-4 md:px-8 lg:px-32">
        <div className="w-full md:sticky md:top-0 md:h-screen md:overflow-auto">
          <div className="py-8 md:py-16 space-y-8">
            <Header />
            <Introduction />
            <div className="hidden 2xl:block">
              <BlogSection />
            </div>
            <div className="hidden md:block">
              <SocialsSection />
            </div>
          </div>
        </div>
        <aside className="w-full py-8 md:py-16">
          <WorkSection />
          <div className="block 2xl:hidden">
            <BlogSection />
          </div>
          <div className="block md:hidden">
            <SocialsSection />
          </div>
          <Footer />
        </aside>
      </main>
    </div>
  );
}

function Header() {
  return (
    <h1 className="mb-6 w-full flex flex-row items-center justify-between col-span-2">
      <div className="flex flex-col w-full">
        <p className="text-foreground font-semibold text-2xl font-inter w-full flex flex-row justify-between">
          Matthew Hrehirchuk
          <ThemeSwitcher />
        </p>
        <SpotifyPresence />
      </div>
    </h1>
  );
}

function Introduction() {
  return (
    <div className="flex flex-col">
      <p className="text-foreground leading-7 mb-6">
        I&apos;m a web developer, a graphic designer, and a student at{" "}
        <Link
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href="https://mtroyal.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mount Royal University
        </Link>{" "}
        in Calgary, Alberta. I make plenty of games, a few helpful tools, and
        &ndash; at the moment &ndash; lots of studying resources for students
        like myself.
      </p>
      <p className="text-foreground leading-7">
        I was previously the Executive Director of{" "}
        <Link
          className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
          href="https://mruhacks.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          MRUHacks 2024
        </Link>
        , Mount Royal University&apos;s premier hackathon. Nowadays, I&apos;m
        taking some much needed rest and relaxation, and focusing on my studies,
        my personal projects, and my record collection.
      </p>
    </div>
  );
}

function SocialsSection() {
  return (
    <div className="flex flex-row space-x-6 w-full px-16 md:px-0 justify-around md:justify-start pt-2">
      <Link
        href="https://instagram.com/matthew_hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="https://linkedin.com/in/matthew-hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="mailto:mhreh594@mtroyal.ca"
        target="_blank"
        rel="noopener noreferrer"
      >
        <EnvelopeClosedIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
      <Link
        href="https://github.com/matthew-hre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogoIcon className="text-foreground hover:text-muted-foreground transition-all w-6 h-6" />
      </Link>
    </div>
  );
}

async function WorkSection() {
  const projectPosts = await getHighlightedPosts("projects");
  const learningPosts = await getHighlightedPosts("learning");
  const gamePosts = await getHighlightedPosts("games");

  return (
    <>
      <div className="flex flex-col space-y-6 mb-12">
        <WorkCategory
          title="Projects"
          posts={projectPosts}
          allLink="/projects"
        />
        <WorkCategory
          title="Learning"
          posts={learningPosts}
          allLink="/learning"
        />
        <WorkCategory title="Games" posts={gamePosts} allLink="/games" />
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
          description={post.entry.description || ""}
          href={`/${title.toLowerCase()}/${post.slug}`}
        />
      ))}
      <Card title={`All ${title} →`} description="" href={allLink} />
    </div>
  );
}

async function BlogSection() {
  const blogPosts = await getHighlightedPosts("blog", 3);

  return (
    <>
      <h2 className="text-xl text-muted-foreground font-sans mb-4">Blog</h2>
      <div className="flex flex-col">
        {blogPosts.map((post, idx: number) => (
          <BlogLink
            key={idx}
            title={post.entry.title}
            date={post.entry.createdDate || ""}
            href={`/blog/${post.slug}`}
          />
        ))}
        <BlogLink title="All Posts →" date="" href="/blog" />
      </div>
    </>
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

const BlogLink = ({
  title,
  date,
  href,
}: {
  title: string;
  date: string;
  href: string;
}) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace("Invalid Date", "");

  return (
    <Link
      href={href}
      className="flex flex-col 2xl:flex-row justify-between 2xl:items-end mb-4"
    >
      <h3 className="underline decoration-muted-foreground hover:decoration-foreground group flex flex-row transition-all leading-7">
        <p className="text-foreground">{title}</p>
      </h3>
      <p className="text-muted-foreground leading-7 transition-all">
        <time dateTime={date}>{formattedDate}</time>
      </p>
    </Link>
  );
};
