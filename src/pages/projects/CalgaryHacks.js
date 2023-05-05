import "../../index.css";
import HAX2720 from "../../images/HAX2720.jpg";
function CalgaryHacks() {
  return (
    <main>
      <h1>Calgary Hacks 2023</h1>
      <h2>Calgary Hacks 2023</h2>

      <figure>
        <img src={HAX2720} alt="Calgary Hacks 2023" />
        <figcaption>
          Our presentation at Calgary Hacks 2023.{" "}
          <i>Left to right: Myself, Triumph, Jaunie, Marusia.</i>
        </figcaption>
      </figure>
      <h3>Winner winner, chicken dinner.</h3>
      <p>
        Calgary Hacks 2023 was a hackathon hosted by the University of Calgary.
        A couple of us Mount Royal students came into their house, and
        absolutely cleaned up. First place in the first division.
      </p>
      <p>
        RoomWise allows students to see the spaces that can be used for studying
        on a map and set up regular meetings for study groups, partner
        assignments, or clubs. Students can sort rooms based on accessibility,
        noise level, floor, and capacity and view recurring study groups. Check
        out our Devpost submission{" "}
        <a
          href="https://devpost.com/software/calgaryhacks23"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </p>
    </main>
  );
}

export default CalgaryHacks;
