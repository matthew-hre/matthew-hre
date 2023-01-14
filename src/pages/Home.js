import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>home</h1>
      <h2>january 2023</h2>
      <h3>happy new year</h3>

      <p>
        i've set out quite a few goals for myself this year, and one of them is
        keeping an <b>updated</b> portfolio. that means frequent additions to
        projects, and hopefully some new games. oh, and learning sections, as i
        intend to make more study guides for poeple. and more frequent updates
        to this page, of course.
      </p>
      <p>
        i'm also going to try to keep a more regular schedule of updates, so
        that i can keep track of what i've been doing. i'm going to try to write
        a short summary of what i've been up to every month, to incentivise
        working on more projects. i'll also try to keep the most important
        things in the <Link to="about">about</Link> section.
      </p>
      <p>
        if you're a recruiter or someone looking to hire me, welcome! take a
        peek at some <Link to="projects">projects</Link> of mine, play a couple
        of my <Link to="games">games</Link>, and grab a copy of my&nbsp;
        <a href="./matthew-hrehirchuk-resume-2023.pdf" download>
          resume
        </a>
        . if you're interested in working with me,{" "}
        <Link to="contact">contact</Link> me! i'm always looking for&nbsp;
        <a href="https://ldjam.com/">ludum dare</a> teammates.
      </p>
      <h3>some recent things</h3>
      <ul>
        <li>
          <b>this website</b> now exists! was going to try and do something real
          fancy with react and tailwind, but i decided against it.
        </li>
        <li>
          <b>
            <a href="https://github.com/matthew-hre/AOC22">
              advent of code 2022
            </a>
          </b>{" "}
          wrapped up, although i kind of lost steam on it. doing it in python
          was a fun switch from my js roots, but definitely a challenge.
        </li>
      </ul>
    </main>
  );
}

export default Home;
