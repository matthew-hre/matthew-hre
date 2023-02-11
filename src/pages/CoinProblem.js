import Contents from "../Contents";
import "../index.css";
import CoinProblemSketch from "./CoinProblemSketch";

function CoinProblem() {
  return (
    <main>
      <h1>Coin Problem</h1>
      <h2>The Coin Problem</h2>
      <Contents data="The Actual Problem: 1, My Manual Solution: 2, NEAT: 3, Understanding AI: 4, Results: 5, Summary: 6, Source Code: 7, The Actual Game: 8" />
      <h3>The Actual Problem</h3>
      <p>
        This was a problem I was given in my Puzzling Adventures in Mathematics
        course.
      </p>
      <div className="snippet">
        You have n plates, each with one coin.
        <br />
        There are two operations possible. Each operation costs you one coin.
        <br />
        <br />
        <ul>
          <li>
            <b>Promotion</b>: You can pay a coin from plate i.
            <br />
            Add two coins to plate i + 1.
          </li>
          <li>
            <b>Swap</b>: You can pay one coin from plate i.
            <br />
            Swap the coins in plates i + 1 and i + 2.
          </li>
        </ul>
        Note that you pay from one plate, and do something to the next plate(s).
        <br />
        Let c(n) be the maximum number of coins in plate n.
        <ol>
          <li>Prove that c(4) ≥ 20.</li>
          <li>Prove that c(5) ≥ 300.</li>
          <li>What have you managed to get for c(5)? I can get over 800.</li>
        </ol>
      </div>
      <h3>My Manual Solution</h3>
      <p>
        Part 1 was a piece of cake, I just prioritized getting the most coins on
        the left-hand side and promoted as much as possible. Ended up getting an
        answer of 28. No sweat.
        <br />
        <br />
        Part 2 was a bit more fun. I sat down, banged my head against the wall
        for a good half hour, and ended up getting 4096 as my answer. Pretty
        good! I had satisfied both parts 2 and 3, and was content. That is,
        until my professor let me know that my answer was not the largest answer
        he had seen. My ego couldn't handle that.
      </p>
      <h3>NeuroEvolution of Augmenting Topologies</h3>
      <p>
        Brute force was not going to cut it. I had a program running overnight
        to try and find something bigger, but it just sucked. I tried making
        some optimizations to prevent it from performing illegal operations, but
        it still sucked.
        <br />
        <br />
        That night, after a few* drinks, I drunkenly Googled "python ai" and
        started doing some reading. The biggest problem with implementing an AI
        for this problem was needing a dataset. Most AI algorithms require a
        handful of datasets so it can understand how the game / problem actually
        works. I did not have these. At the same time, if I <i>did</i> have
        these, they wouldn't be of a fixed size, and would make teaching the AI
        a lot more difficult. I ended up settling on the NEAT algorithm, which
        requires some arbitrary "input", and gives me some arbitrary "output".
      </p>
      <h3>Understanding AI</h3>
      <p>
        Just a disclaimer, I am no expert in AI. This is how I understand it.
        <br />
        <br />
        Our AI is broken up into sets of nodes: input nodes, output nodes, and
        some hidden nodes in the middle.
        <br />
        <br />
        <ul>
          <li>
            <b>Input nodes</b> are where we give the AI some data that we want
            it to be able to interpret. In this case, I've fed it the values of
            each plate.
          </li>
          <li>
            <b>Outputs nodes</b> are, initially, some random numbers that have
            no meaning to me whatsoever. The nice thing is that they're all
            different, and some are bigger than others.
          </li>
          <li>
            <b>Hidden nodes</b> are a total mystery. They do... something to the
            data? And then that data is outputted? Black box programming at its
            finest.
          </li>
        </ul>
        Now, for our game, we have 5 input nodes, 7 output nodes (for each
        possible move), and 7 hidden nodes. Why 7? It felt right in my heart.
        The AI begins by creating connections between every node. The input data
        is now passed around between everything and spat out as output data. We
        then use the output data to make a new move, and repeat this until we
        either finish the game or do too many illegal moves back to back.
        <br />
        <br />
        From here, we have to tell the AI how "fit" it is. I judge this based
        off its final score. Now, keep in mind that we're not just running one
        AI, we're firing off 2000 AI's at the same time. Once we tell them all
        how fit they are, we can prune out the worst ones, and breed together
        the best ones until we get our population back up to size. "breeding" AI
        just means we create a new AI that shares the connections of its
        parents. These connections can be mutated a little bit, but it's mostly
        a copy of its parent. We do this 750 times.
      </p>
      <h3>Results</h3>
      <p>
        7,725,080. That's the highest it got without crashing my PC. I would
        attach the file of all the AIs move, but, it's 206MB, and GitHub will
        not allow me to add files above 100MB. By the way, that's just under six
        times larger than Zelda: Ocarina of Time for the N64. It had 18,000,000
        at one point, but opening that text file crashed my PC. Blue screen.
      </p>
      <h3>Matthew, please take an Adderall</h3>
      <p>
        What was the point of this whole excursion? No idea. I thought it'd be
        funny at first, then I thought it would be a valuable skill to learn for
        hirability / future projects... Then it just turned into something
        stupid.
      </p>
      <h3>Repos and Such</h3>
      <p>
        <ul>
          <li>
            <a href="https://neat-python.readthedocs.io/en/latest/index.html">
              NEAT-Python
            </a>
            , other than having a super complex configuration system, is a
            relatively intuitive library.
          </li>
          <li>
            <a href="https://github.com/matthew-hre/NEAT-coin-problem">
              NEAT-coin-problem
            </a>{" "}
            is the repo for this project. It's gross. I'm not sorry.
          </li>
        </ul>
      </p>
      <h3>The Actual Game</h3>
      <div className="hide-on-mobile">
        <p>
          I haven't used p5.js since high school, and it does not play well with
          React, so sorry this is a bit buggy when clicking. I couldn't get
          mouse input to register with React getting in the way, so I needed to
          implement mouse imputs and collisions by myself.
        </p>
        <CoinProblemSketch />
      </div>
      <div className="show-on-mobile">
        <p>Sorry, you're on mobile.</p>
      </div>
    </main>
  );
}

export default CoinProblem;
