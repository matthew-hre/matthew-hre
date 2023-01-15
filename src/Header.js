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
    '<a href="https://en.wikipedia.org/wiki/Tron">fights for the users</a>',
    "student",
    "javascript developer",
    "react developer",
    "eclipse hater",
    "python scripter",
    "mediocre guitarist",
    "plastic disk enthusiast",
    "hobbyist game dev",
    '<a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">dijkstra</a> hater',
    '<a href="https://bladerunner.fandom.com/wiki/Voight-Kampff_test">voight-kampf</a> proof',
  ];

  useEffect(() => {
    const taglineHeading = document.getElementById("taglines");
    shuffleArray(taglines);
    taglineHeading.innerHTML = `${taglines[0]}, ${taglines[1]}, ${taglines[2]}.`;
  });

  return (
    <header>
      <Link to="/">
        <h1>matthew hrehirchuk</h1>
      </Link>
      <h4 id="taglines">
        software developer, game designer, all around great guy.
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
