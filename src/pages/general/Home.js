import "../../index.css";
import { Link } from "react-router-dom";
import Contents from "../../Contents";

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <h2>February 2023</h2>
      <Contents data="One Month Down: 1, Recent Projects: 2, Website Updates: 3, Website Roadmap: 4" />
      <h3>One Month Down</h3>
      <p>
        Here's my project for this month: <b>AI Generated Resume</b>. I want my
        resume to be generated on the fly. Of course, still reflecting my actual
        skills. I want to be able to have users select what skills they're
        looking for, and have my resume dynamically update to cater to the
        skills they're looking for. I'm thinking of using the{" "}
        <a href="https://openai.com/api/" target="_blank" rel="noreferrer">
          OpenAI
        </a>{" "}
        API to generate the descriptions of each of my roles, as to cater to the
        user. I could also organize the resume, style it depending on the needs
        of the user, and even show off some relevant projects.
        <br />
        <br />
        Theoretically, I should have a page for this done by the end of the
        month, as well as my old resume being displayed as a webpage instead of
        a pdf.
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
      <h3>Some Recent Things</h3>
      <ul>
        <li>
          <b>
            <Link to="coin-problem">The Coin Problem</Link>
          </b>{" "}
          was a fun little introduction to AI and genetic algorithms.
        </li>
        <li>
          <b>
            <a
              href="https://github.com/matthew-hre/BestVSCodeExtensions"
              target="_blank"
              rel="noreferrer"
            >
              Best VSCode Extensions
            </a>
          </b>{" "}
          is a handy little repo I made to show off some of my favourite VSCode
          extensions.
        </li>
      </ul>

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
