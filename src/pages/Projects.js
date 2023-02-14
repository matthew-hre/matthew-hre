import "../index.css";

function Projects() {
  return (
    <main>
      <h1>Projects</h1>
      <h2>Projects</h2>
      <h3>
        <a
          href="https://github.com/matthew-hre/hypixelbot"
          target="_blank"
          rel="noreferrer"
        >
          Hypixel Bot
        </a>
      </h3>

      <p>
        A Discord bot to track the bank balance of a Hypixel Skyblock island.
        Would send a message to a Discord channel when the balance changed, who
        changed it, by how much, and when. I've since taken it down, as I don't
        play skyblock anymore, and I don't want to pay for a server to host it.
      </p>

      <h3>
        <a
          href="https://github.com/matthew-hre/minesweeper"
          target="_blank"
          rel="noreferrer"
        >
          React Minesweeper
        </a>
      </h3>

      <p>
        A super simple minesweeper game, made with React. I made it as some
        portfolio eye candy back in high school, but it's still a great showcase
        of my react skills.
      </p>

      <h3>
        <a
          href="https://github.com/matthew-hre/adventOfCode2021"
          target="_blank"
          rel="noreferrer"
        >
          Advent of Code '21
        </a>
      </h3>

      <p>
        My participation in{" "}
        <a
          href="https://adventofcode.com/2021"
          target="_blank"
          rel="noreferrer"
        >
          Advent of Code 2021
        </a>{" "}
        in JS. Every day, you get a new puzzle, and you have to solve it. Unique
        inputs and solutions per user, was a whole lot of fun. Did not get far,
        because{" "}
        <a
          href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
          target="_blank"
          rel="noreferrer"
        >
          Dijkstra
        </a>{" "}
        is the worst.
      </p>

      <h3>
        <a
          href="https://github.com/matthew-hre/AOC22"
          target="_blank"
          rel="noreferrer"
        >
          Advent of Code '22
        </a>
      </h3>

      <p>
        I attempted{" "}
        <a
          href="https://adventofcode.com/2022"
          target="_blank"
          rel="noreferrer"
        >
          Advent of Code 2022
        </a>{" "}
        in Python. This time, I had created a boilerplate class that would
        automatically grab my puzzle input from the site, as well as did some
        cool stuff like output formatting. Also, did not get far, because{" "}
        <a
          href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
          target="_blank"
          rel="noreferrer"
        >
          Dijkstra
        </a>{" "}
        is still the worst.
      </p>
    </main>
  );
}

export default Projects;
