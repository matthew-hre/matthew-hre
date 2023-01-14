function setRandomTagline() {
  let taglines = [
    "software developer",
    "game designer",
    "all around great guy",
    "educator",
    "artist",
    "graphic designer",
    "master of the web",
    "fights for the users",
    "student",
    "javascript developer",
    "react developer",
    "eclipse hater",
    "python scripter",
    "mediocre guitarist",
    "plastic disk enthusiast",
    "hobbyist game dev",
  ];
  shuffleArray(taglines);
  let heading = document.querySelector("#taglines");
  heading.innerText = `${taglines[0]}, ${taglines[1]}, ${taglines[2]}.`;
}

document.addEventListener("DOMContentLoaded", setRandomTagline);

// credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
