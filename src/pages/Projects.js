import "../index.css";

function Projects() {
  return (
    <main>
      <h1>projects</h1>
      <h2>projects</h2>
      <h3>
        <a href="https://github.com/matthew-hre/hypixelbot">hypixel bot</a>
      </h3>

      <p>
        a discord bot to track the bank balance of a hypixel skyblock island.
        would send a message to a discord channel when the balance changed, who
        changed it, by how much, and when. i've since taken it down, as i don't
        play skyblock anymore, and i don't want to pay for a server to host it.
      </p>

      <h3>
        <a href="https://github.com/matthew-hre/minesweeper">
          react minesweeper
        </a>
      </h3>

      <p>
        a super simple minesweeper game, made with react. i made it as some
        portfolio eye candy back in high school, but it's still a great showcase
        of my react skills.
      </p>

      <h3>
        <a href="https://github.com/matthew-hre/adventOfCode2021">
          advent of code '21
        </a>
      </h3>

      <p>
        my participation in{" "}
        <a href="https://adventofcode.com/2021">advent of code 2021</a> in js.
        every day, you get a new puzzle, and you have to solve it. unique inputs
        and solutions per user, was a whole lot of fun. did not get far, because{" "}
        <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">
          dijkstra
        </a>{" "}
        is the worst.
      </p>

      <h3>
        <a href="https://github.com/matthew-hre/AOC22">advent of code '22</a>
      </h3>

      <p>
        i attempted{" "}
        <a href="https://adventofcode.com/2022">advent of code 2022</a> in
        python. this time, i had created a boilerplate class that would
        automatically grab my puzzle input from the site, as well as did some
        cool stuff like output formatting. also, did not get far, because{" "}
        <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">
          dijkstra
        </a>{" "}
        is still the worst.
      </p>
    </main>
  );
}

export default Projects;
