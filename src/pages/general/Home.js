import "../../index.css";
import { Link } from "react-router-dom";
import Contents from "../../Contents";

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <h2>May 2023</h2>
      <Contents data="Life Up To Now: 1, Website Updates: 2, Website Roadmap: 3" />
      <h3>Life, Up To Now</h3>
      <p>
        Happy May! Final exams are all wrapped up, and I'm now on full time
        summer break. I'm going to be working on a couple of projects, as well
        as doing some work, but if you want to hire me (internship plz) then I'm
        all ears.
      </p>
      <p>
        I've just recently finished my Ludum Dare 53 entry Sender Not Found,
        which was made in React! A fun change from the usual GML or Godot
        submission. This horror thriller game clocks in as my ninth Ludum Dare
        entry, and my 17th game jam entry overall. Jesus Christ.{" "}
        <a
          href="https://ldjam.com/events/ludum-dare/53/sender-not-found"
          target="_blank"
          rel="noreferrer"
        >
          Check it out here
        </a>
        .
      </p>
      <p>
        Calgary Hacks 2023 happened a while back, and we ended up taking first
        place in our category. I had a great team of people, and we ended up
        making a really cool project.{" "}
        <Link to="calgary-hacks">Check it out here</Link>.
      </p>
      <p>
        If you're a recruiter or someone looking to hire me, welcome! Take a
        peek at some <Link to="projects">projects</Link> of mine and play a
        couple of my <Link to="games">games</Link>. If you're interested in
        working with me, <Link to="contact">contact</Link> me! I'm always
        looking for&nbsp;
        <a href="https://ldjam.com/" target="_blank" rel="noreferrer">
          Ludum Dare
        </a>{" "}
        teammates.
      </p>

      <h3>Website Updates</h3>
      <ul>
        <li>
          <b>Code Snippets</b> will slowly start popping up across the site.
          Stay tuned for colored formatting, copy to clipboard, and possibly
          interactive code snippets.
        </li>
        <li>
          <b>Tables of Contents</b> are now implemented, and I can now add them
          to pages at my will. They're not assigned to IDs or anything, they're
          instead assigned by index. This is super cool, because it allows me to
          create a table of contents for a page super fast, and then add more
          sections to the page without having to update the table of contents.
          It's a bit of a hack, but it's super fast for when I'm writing.
        </li>
      </ul>

      <h3>
        Plans for <strike>world domination</strike> Expansion
      </h3>
      <ul>
        <li>
          <b>AI Generated Resume</b>. Instead of having some pdf download, I
          want to be able to have users select the skills they're interested in
          and have the resume dynamically update to show off those skills.{" "}
          <a href="https://openai.com/api/" target="_blank" rel="noreferrer">
            OpenAI
          </a>{" "}
          has a neat little API that might be able to help with this.
        </li>
        <li>
          <b>Light/Dark</b> themes are implemented, but are determined by system
          preference. Would love to make a button to be able to switch these on
          the fly.
        </li>
        <li>
          <b>Spotify Listening History</b>, as nerdy as that sounds, is
          something I thought would be really neat to have. Maybe display my
          current song in the header, or show my listening history somewhere.
          Just something to show off my API skills.
        </li>
        <li>
          <b>Markdown Interpretation</b> is an idea that's been in my head for a
          few days now. All these pages are really basic HTML for the most part,
          nothing really crazy... would love to be able to write these pages in
          Markdown, and have them compile to HTML on the fly. Would eliminate
          the need for all these annoying .js files, and would make creating
          pages really easy.
        </li>
      </ul>
    </main>
  );
}

export default Home;
