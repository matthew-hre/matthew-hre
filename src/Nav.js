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
                <Link to="resume">Resume</Link>
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
                <a
                  href="https://github.com/matthew-hre/hypixelbot"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hypixel Bot
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/minesweeper"
                  target="_blank"
                  rel="noreferrer"
                >
                  React Minesweeper
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/adventOfCode2021"
                  target="_blank"
                  rel="noreferrer"
                >
                  Advent of Code '21
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/AOC22"
                  target="_blank"
                  rel="noreferrer"
                >
                  Advent of Code '22
                </a>
              </li>
              <li>
                <Link to="calgary-hacks">Calgary Hacks</Link>
              </li>
              <li>
                <Link to="coin-problem">Coin Problem</Link>
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
                <a
                  href="https://github.com/matthew-hre/1501-practice-site"
                  target="_blank"
                  rel="noreferrer"
                >
                  1501 Practice Site
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/python_classes_practice"
                  target="_blank"
                  rel="noreferrer"
                >
                  1501 Python Classes
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/python-to-java"
                  target="_blank"
                  rel="noreferrer"
                >
                  Python to Java
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/matthew-hre/BestVSCodeExtensions"
                  target="_blank"
                  rel="noreferrer"
                >
                  VSCode Extensions
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
                <a
                  href="https://whycardboard.itch.io/populator"
                  target="_blank"
                  rel="noreferrer"
                >
                  populator
                </a>
              </li>
              <li>
                <a
                  href="https://whycardboard.itch.io/depopulator"
                  target="_blank"
                  rel="noreferrer"
                >
                  (de)populator
                </a>
              </li>
              <li>
                <a
                  href="https://whycardboard.itch.io/rorschach"
                  target="_blank"
                  rel="noreferrer"
                >
                  rorschach
                </a>
              </li>
              <li>
                <a
                  href="https://whycardboard.itch.io/clipscale"
                  target="_blank"
                  rel="noreferrer"
                >
                  clipscale
                </a>
              </li>
              <li>
                <a
                  href="https://whycardboard.itch.io/bloodsucker"
                  target="_blank"
                  rel="noreferrer"
                >
                  bloodsucker
                </a>
              </li>
              <li>
                <a
                  href="https://ld53.matthew-hre.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sender Not Found
                </a>
              </li>
            </ul>
          </section>
          {/* <section>
            <h2>Design</h2>
            <ul className="nobull">
              <li>
                <Link to="1984">1984 Cover</Link>
              </li>
              <li>
                <Link to="band-posters">Band Posters</Link>
              </li>
            </ul>
          </section> */}
        </section>
      </details>
    </nav>
  );
}

export default Nav;
