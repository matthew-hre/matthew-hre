import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <h2>January 2023</h2>
      <h3>Happy New Year</h3>

      <p>
        I've set out quite a few goals for myself this year, and one of them is
        keeping an <b>updated</b> portfolio. That means frequent additions to
        projects, and hopefully some new games. Oh, and learning sections, as I
        intend to make more study guides for people. And more frequent updates
        to this page, of course.
      </p>
      <p>
        I'm also going to try to keep a more regular schedule of updates, so
        that I can keep track of what I've been doing. I'm going to try to write
        a short summary of what I've been up to every month, to incentivise
        working on more projects. I'll also try to keep the most important
        things in the <Link to="about">about</Link> section.
      </p>
      <p>
        If you're a recruiter or someone looking to hire me, welcome! Take a
        peek at some <Link to="projects">projects</Link> of mine, play a couple
        of my <Link to="games">games</Link>, and grab a copy of my&nbsp;
        <a href="./matthew-hrehirchuk-resume-2023.pdf" download>
          resume
        </a>
        . If you're interested in working with me,{" "}
        <Link to="contact">contact</Link> me! I'm always looking for&nbsp;
        <a href="https://ldjam.com/">Ludum Dare</a> teammates.
      </p>
      <h3>Some Recent Things</h3>
      <ul>
        <li>
          <b>This website</b> now exists! Was going to try and do something real
          fancy with Tailwind, but I decided against it.
        </li>
        <li>
          <b>
            <a href="https://github.com/matthew-hre/AOC22">
              Advent of Code 2022
            </a>
          </b>{" "}
          wrapped up, although I kind of lost steam on it. Doing it in Python
          was a fun switch from my JS roots, but definitely a challenge.
        </li>
      </ul>

      <h3>Website Updates</h3>
      <ul>
        <li>
          <b>Capitalization</b> was changed across the board, because stylistic
          decisions aren't "professional".
        </li>
        <li>
          <b>Github Revision History</b> now appears at the bottom of the page,
          and updates when the site is updated. It's a bit of a hack, as I
          haven't registered an API key, and have just been using the
          unauthenticated API, but hey, it works.
        </li>
        <li>
          <b>React Routing</b> is now implemented site-wide, so no more nasty
          .html extensions in the URL. For everyone out there who I gave a
          testing URL ending in /home.html, I am sorry that every time you check
          the site it throws you a 404.
        </li>
      </ul>

      <h3>
        Plans for <strike>world domination</strike> Expansion
      </h3>
      <ul>
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
          the need for all these annoying .jsx files, and would make creating
          pages really easy.
        </li>
        <li>
          <b>Tables of contents</b> for bigger pages like these. I'm thinking
          instead of assigning each heading an ID and then linking to it, I'll
          do it based on the number of elements, and just make it spit me
          between H2 tags. Just something to make megapages like this a little
          more tolerable.
        </li>
      </ul>
    </main>
  );
}

export default Home;
