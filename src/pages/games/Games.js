import "../../index.css";

function Games() {
  return (
    <main>
      <h1>Games</h1>
      <h2>Games</h2>
      <h3>
        <a
          href="https://whycardboard.itch.io/populator"
          target="_blank"
          rel="noreferrer"
        >
          populator
        </a>
      </h3>
      <img
        src="https://img.itch.zone/aW1nLzI0Mjc4NzIuZ2lm/original/01i16y.gif"
        className="medium"
        alt="populator cover art"
      />
      <p>
        My submission to an internally hosted game jam on the{" "}
        <a href="https://discord.gg/ucGcvKK" target="_blank" rel="noreferrer">
          Ludum Dare Discord server
        </a>
        . You get a tiny plot of land, and need to expand. This was a fun little
        project that I still have tons of ideas for, and would love to remake
        one of these days.
      </p>

      <h3>
        <a
          href="https://whycardboard.itch.io/depopulator"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          (de)populator{" "}
        </a>
      </h3>
      <img
        src="https://img.itch.zone/aW1nLzY2OTc0MDYucG5n/original/4%2FVJEu.png"
        className="medium"
        alt="depopulator cover art"
      />
      <p>
        Yet another internal game jam submission, this one being a play on
        populator's concept. Instead of building a city, you tear it down.
      </p>

      <h3>
        <a
          href="https://whycardboard.itch.io/rorschach"
          target="_blank"
          rel="noreferrer"
        >
          rorschach
        </a>
      </h3>
      <img
        src="https://img.itch.zone/aW1nLzI4MDcxMzAucG5n/original/yVUFBE.png"
        className="medium"
        alt="rorschach cover art"
      />
      <p>
        This was <b>yet another</b> internal jam submission, but this time I
        won. This platformer was inspired by{" "}
        <a
          href="https://en.wikipedia.org/wiki/Rorschach_test"
          target="_blank"
          rel="noreferrer"
        >
          the Rorschach Inkblot test
        </a>
        , and the gameplay followed a similar concept. you needed to use ink to
        reveal parts of the map. This game went on to get a{" "}
        <a
          href="https://store.steampowered.com/app/1499210/Rorschach_Plus/"
          target="_blank"
          rel="noreferrer"
        >
          Steam release
        </a>{" "}
        by my good buddy{" "}
        <a href="https://emcannon.itch.io" target="_blank" rel="noreferrer">
          EmCannon
        </a>
        , so give that a look.
      </p>

      <h3>
        <a
          href="https://whycardboard.itch.io/clipscale"
          target="_blank"
          rel="noreferrer"
        >
          clipscale
        </a>
      </h3>
      <img
        src="https://img.itch.zone/aW1nLzE5MDI5MjYucG5n/original/MNWTiA.png"
        className="medium"
        alt="clipscale cover art"
      />
      <p>
        I was playing a lot of{" "}
        <a
          href="https://en.wikipedia.org/wiki/Roguelike"
          target="_blank"
          rel="noreferrer"
        >
          roguelikes
        </a>{" "}
        during this period, and wanted to try my hand at developing my own. This
        one revolved around a shrinking viewport, which was based on both your
        health and your ammo.
      </p>
      <h3>
        <a
          href="https://whycardboard.itch.io/bloodsucker"
          target="_blank"
          rel="noreferrer"
        >
          bloodsucker
        </a>
      </h3>
      <img
        src="https://img.itch.zone/aW1nLzIwNTEwODUucG5n/original/xsyIPR.png"
        className="medium"
        alt="bloodsucker cover art"
      />
      <p>
        Heavily inspired by{" "}
        <a
          href="https://en.wikipedia.org/wiki/Splendor_(game)"
          target="_blank"
          rel="noreferrer"
        >
          Splendor
        </a>
        , this board game I was addicted to for a while, bloodsucker revolved
        around you stealing people's souls, to then spend on buying property. A
        pretty stupid game, mostly due to starting the jam late.
      </p>
    </main>
  );
}

export default Games;
