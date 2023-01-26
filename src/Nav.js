import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1100) {
        setIsDetailsOpen(false);
      } else {
        setIsDetailsOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <details open={isDetailsOpen}>
        <summary>
          <b>Menu</b>
        </summary>
        <section className="site-nav">
          <section>
            <h2>General</h2>
            <ul className="nobull">
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
              <li>
                <Link to="socials">Socials</Link>
              </li>
              <li>
                <a href="matthew-hrehirchuk-resume-2023.pdf" download>
                  Resume
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="projects" className="navheader" to="projects">
                Projects
              </Link>
            </h2>
            <ul className="nobull">
              <li>
                <a href="https://github.com/matthew-hre/hypixelbot">
                  Hypixel Bot
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/minesweeper">
                  React Minesweeper
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/adventOfCode2021">
                  Advent of Code '21
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/AOC22">
                  Advent of Code '22
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="learning" className="navheader" to="learning">
                Learning
              </Link>
            </h2>
            <ul className="nobull">
              <li>
                <a href="https://github.com/matthew-hre/1501-practice-site">
                  1501 Practice Site
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/python_classes_practice">
                  1501 Python Classes
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/python-to-java">
                  Python to Java
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/BestVSCodeExtensions">
                  Best VSCode Extensions
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="games" className="navheader" to="games">
                Games
              </Link>
            </h2>
            <ul className="nobull">
              <li>
                <a href="https://whycardboard.itch.io/populator">populator</a>
              </li>
              <li>
                <a href="https://whycardboard.itch.io/depopulator">
                  (de)populator
                </a>
              </li>
              <li>
                <a href="https://whycardboard.itch.io/rorschach">rorschach</a>
              </li>
              <li>
                <a href="https://whycardboard.itch.io/clipscale">clipscale</a>
              </li>
              <li>
                <a href="https://whycardboard.itch.io/bloodsucker">
                  bloodsucker
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>Design</h2>
            <ul className="nobull">
              <li>
                <Link to="1984">1984 Cover</Link>
              </li>
              <li>
                <Link to="band-posters">Band Posters</Link>
              </li>
            </ul>
          </section>
        </section>
      </details>
    </nav>
  );
}

export default Nav;
