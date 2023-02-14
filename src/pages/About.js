import "../index.css";

function Home() {
  return (
    <main>
      <h1>About</h1>
      <h2>About</h2>
      <h3>What is "Matthew"</h3>

      <p>
        Hello! I'm Matthew Hrehirchuk. I'm a Computer Information System student
        at{" "}
        <a href="https://www.mtroyal.ca/" target="_blank" rel="noreferrer">
          Mount Royal University
        </a>{" "}
        in Calgary, Alberta, Canada. I make lots of games, a few helpful tools,
        and at the moment, lots of studying resources for students like myself.
      </p>

      <h3>My History</h3>
      <p>
        My programming journey started waaaay back in middle school. I found out
        that Google Sheets had a "scripts" menu that was unrestricted for
        students - even on shared documents. I ended up allocating a ton of my
        time into learning how to make scripts for Google Docs and Google
        Sheets, and I ended up accidentally learning the fundamentals of
        programming. Whoops. I ended up making a ton of fun projects in Google
        Sheets, things like group randomizers, maze games, fun stuff like that.
      </p>
      <h3>Games</h3>
      <p>
        Tail end of middle school, I caught wind of a programming competition
        called{" "}
        <a href="ldjam.com" target="_blank" rel="noreferrer">
          Ludum Dare
        </a>
        : 48 hours to make a game from scratch, based off a voted theme. I
        partnered with my buddy Connell and my cousin Evan, and we ended up
        making a platformer mixed with a text adventure for Ludum Dare 41. This
        game is now lost to time, as I cannot find it. Connell, if you're
        reading this, please let me know if you have a copy of platSCII.
      </p>
      <p>
        That project, I ended up taking the role of the artist. I was{" "}
        <i>fine</i> at it, but I really struggled with now having control over
        the programming aspect of things, and not being able to tweak things to
        my liking - we were working in Unity, an engine I wasn't (and still am
        not) familiar with. I ended up investing some time learning GameMaker
        Studio, and started doing jams on my own. Put out a bunch of great
        games, met some great people, and ended up running the{" "}
        <a href="https://discord.gg/ucGcvKK" target="_blank" rel="noreferrer">
          Ludum Dare Discord server
        </a>
        . I've personally run a few jams myself, and have only won one.
      </p>

      <h3>Web Dev</h3>
      <p>
        Also near the end of middle school, I enrolled in an "intro to
        programming" option. It sucked, big time. I was bored out of my mind,
        and we all ended up on some crappy website that ran us through
        fundamentals. Luckily, I had some experience, and a dad who knew how to
        get Ubuntu and Apache running on an old laptop. I ended up building a
        chat client from the ground up: Front end, all styled, PHP backend with
        a MySQL database. Was also lost to time, unfortunately.
      </p>
      <p>
        Ended up doing some more web dev in high school, mostly working with JS.
        Near the end of high school, I started working with React and Bootstrap
        to try and get an internship. Got one, just not with React. Nowadays
        I'll use react with Tailwind to whip up some quick projects.
      </p>
    </main>
  );
}

export default Home;
