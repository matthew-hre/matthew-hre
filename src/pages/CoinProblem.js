import Contents from "../Contents";
import "../index.css";
import CoinProblemSketch from "./CoinProblemSketch";
import Snippet from "../Snippet";

function CoinProblem() {
  return (
    <main>
      <h1>Coin Problem</h1>
      <h2>The Coin Problem</h2>
      <Contents data="The Actual Problem: 1, My Manual Solution: 2, NEAT: 3, Understanding AI: 4, Evolution of the AI: 5, Species and Evolution: 6, Results: 7, Summary: 8, Source Code: 9, The Actual Game: 10" />
      <h3>The Actual Problem</h3>
      <p>
        This was a problem I was given in my Puzzling Adventures in Mathematics
        course. The problem was written by Brady Killough, a professor at{" "}
        <a href="https://www.mtroyal.ca/" target="_blank" rel="noreferrer">
          Mount Royal University
        </a>{" "}
        in Calgary, Alberta.
      </p>
      <Snippet>
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
        <ol style={{ marginBottom: "0" }}>
          <li>Prove that c(4) ≥ 20.</li>
          <li>Prove that c(5) ≥ 300.</li>
          <li>What have you managed to get for c(5)? I can get over 800.</li>
        </ol>
      </Snippet>
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
        possible. My ego couldn't handle that.
      </p>
      <h3>NeuroEvolution of Augmenting Topologies</h3>
      <p>
        Brute force was not going to cut it. I had a program running overnight
        to try and find something bigger, but it just sucked. I tried making
        some optimizations to prevent it from performing illegal operations, but
        it still sucked.
        <br />
        <br />
        That night, after chatting with some people smarter than me, I Googled
        "python ai" and started doing some reading. The biggest problem with
        implementing an AI for this problem was needing a dataset. Most AI
        algorithms require a handful of datasets so it can understand how the
        game / problem actually works. I did not have these. At the same time,
        if I <i>did</i> have these, they wouldn't be of a fixed size, and would
        make teaching the AI a lot more difficult. I ended up settling on the
        NEAT algorithm, which requires some arbitrary "input", and gives me some
        arbitrary "output".
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
      <h3>Robots Can Learn, But Can They Love?</h3>
      <p>
        Let's talk a bit about how the AI actually processed this problem. For
        the first few generations, we got some pretty bad results. Let's take a
        look, shall we?
        <br />
        <br />
        <Snippet>
          PROCESS FOR (1) POINTS
          <br />
          [1, 1, 1, 1, 1]
          <br />
          [0, 1, 1, 1, 1]
          <br />
          [0, 1, 1, 1, 1]
          <br />
          [0, 1, 1, 1, 1]
          <br />
          END OF PROGRAM OUTPUT
        </Snippet>
        <br />
        See what it did there? It payed a coin from the first plate, and then
        swapped plates 2 and 3. Which worked, sure, but then it kept doing it.
        Even though it couldn't afford it. It just kept on doing it until the
        program decided to put this robot out of its misery. Let's look at one
        of its brothers:
        <br />
        <br />
        <Snippet>
          PROCESS FOR (3) POINTS
          <br />
          [1, 1, 1, 1, 1]
          <br />
          [1, 1, 1, 0, 3]
          <br />
          [0, 1, 1, 0, 3]
          <br />
          [0, 1, 1, 0, 3]
          <br />
          END OF PROGRAM OUTPUT
        </Snippet>
        <br />
        Yeah these robots fucking suck. But this one sucks less! See, it got
        three points! At this point, there are a few programs that have gotten
        three points, so we've bred those together. Now we got outputs like
        this:
        <br />
        <br />
        <Snippet>
          PROCESS FOR (7) POINTS
          <br />
          [1, 1, 1, 1, 1]
          <br />
          [1, 1, 0, 3, 1]
          <br />
          [1, 1, 0, 2, 3]
          <br />
          [1, 1, 0, 1, 5]
          <br />
          [1, 1, 0, 0, 7]
          <br />
          [1, 1, 0, 0, 7]
          <br />
          [1, 1, 0, 0, 7]
          <br />
          END OF PROGRAM OUTPUT
        </Snippet>
        <br />
        Progress baby, yeah! It knows how to promote! It's getting a lot better
        at managing different columns, but that's where it gets stuck.
        <br />
        <br />
        At this point, we've reached a problem. The AI really likes promoting,
        because that's what allows it to continue breeding. It really doesn't
        like swapping because it doesn't give that instant gratification.
      </p>
      <h3>Diversification of Robots</h3>
      <p>
        At this point, the maximum score the robot can get is 448. Here's the
        problem: every AI is currently evolving in the exact same way. Their
        neurons are connecting and working in the same way across the board. By
        allowing new <b>species</b>, we can allow different neuron connections
        without the risk of getting killed off for sucking. This may seem like a
        waste of resources, but it's not. Sure, we'll have some stupid bot that
        only like swapping, but eventually, that swapping "gene" is gonna get
        breeded into the promoting bot. At that point, we can create a hardy mix
        of swaps and promotions.
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
            <a
              href="https://neat-python.readthedocs.io/en/latest/index.html"
              target="_blank"
              rel="noreferrer"
            >
              NEAT-Python
            </a>
            , other than having a super complex configuration system, is a
            relatively intuitive library.
          </li>
          <li>
            <a
              href="https://github.com/matthew-hre/NEAT-coin-problem"
              target="_blank"
              rel="noreferrer"
            >
              NEAT-coin-problem
            </a>{" "}
            is the repo for this project. It's gross. I'm not sorry.
          </li>
          <li>
            Some special thanks to Nathan, David, and Sunny for giving me some
            pointers along the way.
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
