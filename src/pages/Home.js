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
    </main>
  );
}

export default Home;
