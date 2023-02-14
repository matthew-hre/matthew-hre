import "./index.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

function Header() {
  let taglines = [
    "software developer",
    "game designer",
    "all around great guy",
    "educator",
    'prefixed "cool"',
    "artist",
    "graphic designer",
    '<a href="https://en.wikipedia.org/wiki/Tron" target="_blank" rel="noreferrer">fights for the users</a>',
    "student",
    "JavaScript developer",
    "React developer",
    "Eclipse hater",
    "Python scripter",
    "mediocre guitarist",
    "plastic disk enthusiast",
    "hobbyist game dev",
    '<a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank" rel="noreferrer">Dijkstra</a> hater',
    '<a href="https://bladerunner.fandom.com/wiki/Voight-Kampff_test" target="_blank" rel="noreferrer">Voight-Kampf</a> proof',
  ];

  useEffect(() => {
    const taglineHeading = document.getElementById("taglines");
    shuffleArray(taglines);
    let tagline = `${taglines[0]}, ${taglines[1]}, ${taglines[2]}.`;
    taglineHeading.innerHTML =
      tagline.charAt(0).toUpperCase() + tagline.slice(1);
  });

  return (
    <header>
      <Link to="/">
        <h1>Matthew Hrehirchuk</h1>
      </Link>
      <h4 id="taglines">
        Software developer, game designer, all around great guy.
      </h4>
    </header>
  );
}

export default Header;

// credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
