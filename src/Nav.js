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
          <b>menu</b>
        </summary>
        <section className="site-nav">
          <section>
            <h2>general</h2>
            <ul className="nobull">
              <li>
                <Link to="about">about</Link>
              </li>
              <li>
                <Link to="contact">contact</Link>
              </li>
              <li>
                <Link to="socials">socials</Link>
              </li>
              <li>
                <a href="matthew-hrehirchuk-resume-2023.pdf" download>
                  resume
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="projects" className="navheader" to="projects">
                projects
              </Link>
            </h2>
            <ul className="nobull">
              <li>
                <a href="https://github.com/matthew-hre/hypixelbot">
                  hypixel bot
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/minesweeper">
                  react minesweeper
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/adventOfCode2021">
                  advent of code '21
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/AOC22">
                  advent of code '22
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="learning" className="navheader" to="learning">
                learning
              </Link>
            </h2>
            <ul className="nobull">
              <li>
                <a href="https://github.com/matthew-hre/1501-practice-site">
                  1501 practice site
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/python_classes_practice">
                  1501 python classes
                </a>
              </li>
              <li>
                <a href="https://github.com/matthew-hre/python-to-java">
                  python to java
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>
              <Link id="games" className="navheader" to="games">
                games
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
        </section>
      </details>
    </nav>
  );
}

export default Nav;
