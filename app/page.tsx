import { SpotifyPresence } from "@/components/SpotifyPresence";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

import FadeIn from "@/components/FadeIn";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const blogPosts = await reader.collections.blog.all();
  const projectPosts = await reader.collections.projects.all();
  const learningPosts = await reader.collections.learning.all();
  const gamePosts = await reader.collections.games.all();

  return (
    <main className="flex min-h-screen flex-col px-8 md:px-20 mb-16">
      <FadeIn>
        <h1 className="text-foreground mb-6 font-light text-2xl font-serif w-full flex flex-row items-center justify-between">
          <p>Matthew Hrehirchuk</p>
          <ThemeSwitcher />
        </h1>
        <p className="border-l-2 border-yellow-500 italic border-foreground pl-2 mb-6 bg-muted py-2">
          WARNING: This website is currently under heavy development. I pushed
          to main by accident and now I&apos;m stuck here. Please be patient
          while I fix it.
        </p>
        <p className="text-foreground leading-7 mb-6">
          I&apos;m a web developer, a graphic designer, and a student at{" "}
          <Link
            className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
            href="https://mtroyal.ca"
            target="_blank"
          >
            Mount Royal University
          </Link>{" "}
          in Calgary, Alberta. I make plenty of games, a few helpful tools, and
          &ndash; at the moment &ndash; lots of studying resources for students
          like myself.
        </p>
        <p className="text-foreground leading-7 mb-16">
          I&apos;m currently the Executive Director of{" "}
          <Link
            className="underline decoration-muted-foreground hover:decoration-foreground transition-all"
            href="https://mruhacks.ca"
            target="_blank"
          >
            MRUHacks 2024
          </Link>
          , Mount Royal University&apos;s premier hackathon.
        </p>
        <h2 className="text-foreground mb-6 font-light text-2xl font-serif">
          Work
        </h2>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 mb-12">
          <div className="w-full md:w-48 space-y-4">
            <h2 className="text-muted-foreground text-sm mb-4">Projects</h2>
            {projectPosts.map((post, idx) => (
              <Card
                key={idx}
                title={post.entry.title}
                description={post.entry.description || ""}
                href={`/projects/${post.slug}`}
              />
            ))}
            <Card title="All Projects →" description="" href="/projects" />
          </div>
          <div className="w-full md:w-48 md:ml-12 space-y-4">
            <h2 className="text-muted-foreground text-sm mb-4">Learning</h2>
            {learningPosts.map((post, idx) => (
              <Card
                key={idx}
                title={post.entry.title}
                description={post.entry.description || ""}
                href={`/learning/${post.slug}`}
              />
            ))}
            <Card title="All Learning →" description="" href="/learning" />
          </div>
          <div className="w-full md:w-48 md:ml-12 space-y-4">
            <h2 className="text-muted-foreground text-sm mb-4">Games</h2>
            {gamePosts.map((post, idx) => (
              <Card
                key={idx}
                title={post.entry.title}
                description={post.entry.description || ""}
                href={`/games/${post.slug}`}
              />
            ))}
            <Card title="All Games →" description="" href="/games" />
          </div>
        </div>
        <h2 className="text-foreground mb-6 font-light text-2xl font-serif">
          Blog
        </h2>
        <div className="flex flex-col mb-12">
          {blogPosts.map((post, idx) => (
            <BlogLink
              key={idx}
              title={post.entry.title}
              date={post.entry.createdDate || ""}
              href={`/blog/${post.slug}`}
            />
          ))}
          <BlogLink title="All Posts →" date="" href="/blog" />
        </div>
        <h2 className="text-foreground mb-2 font-light text-2xl font-serif">
          Now
        </h2>
        <SpotifyPresence />
        <p className="text-foreground leading-7 mt-2">
          In between hackathon organizing and studying, I&apos;m working on
          finishing off some of my vinyl discographies. Currently, I&apos;m on
          the hunt for a copy of Boards of Canada&apos;s &quot;Twosim&quot; and
          a copy of &quot;The Campfire Headphase&quot;.
        </p>
      </FadeIn>
    </main>
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
      className="flex flex-col md:flex-row justify-between md:items-end mb-4"
    >
      <h3 className="underline decoration-muted-foreground hover:decoration-foreground group flex flex-row transition-all">
        <p className="text-foreground">{title}</p>
      </h3>
      <p className="text-muted-foreground text-xs md:text-sm italic transition-all">
        <time dateTime={date}>{formattedDate}</time>
      </p>
    </Link>
  );
};
