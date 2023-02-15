import "../../index.css";
import poster from "../../images/poster-1984.png";

function Orwell() {
  return (
    <main>
      <h1>1984</h1>
      <h2>1984 - George Orwell</h2>
      <figure>
        <img src={poster} alt="Alt cover for George Orwell's 1984." />
        <figcaption>Matthew Hrehirchuk, 2021</figcaption>
      </figure>

      <p>
        This was a piece I did in high school for a final project. I took photos
        of a bunch of peoples eyes and tried to make a poster out of them. It
        looked really terrible for the longest time, until I tried printing it
        out to cut out the pieces. I left the printer in black & white, and it
        looked waaay better. I cut the pieces out, scanned them, reimported them
        into Photoshop, and then added the text and some color correction.
      </p>
    </main>
  );
}

export default Orwell;
