import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "@/components/link";

export default function About() {
  return (
    <>
      <Navbar isVisible />
      <main className="mx-auto min-h-screen max-w-[640px] px-4 pt-32 pb-10 sm:pt-40">
        <div className="flex flex-col px-4 gap-4">
          <h2 className="text-xl font-bold mb-4">About me</h2>
          <p className="text-base">{"Hey, I'm Matthew!"}</p>
          <p className="text-base">
            {
              "I'm a web developer, a graphic designer, and a student at Mount Royal University in Calgary, Alberta. I make plenty of games, a few helpful tools, and – at the moment – lots of studying resources for students like myself."
            }
          </p>
          <p className="text-base">
            {
              "I'm currently a Senior Data Quality Specialist at Cohere, where I spend my days ranking and auditing data to improve our LLMs. When I'm not wired in, I'm spending my time playing board games, listening to music, and fleshing out my record collection."
            }
          </p>
          <div className="my-5 border-b border-gray-100/20"></div>
          <p>
            {
              "I've had some really cool opportunities to work with some amazing people in some pretty incredible roles. I was previously the co-founder and Executive Director of MRUHacks 2024, a 150+ attendee hackathon at Mount Royal University, sponsored by big names like GitHub and StackOverflow."
            }
          </p>
          <p className="text-base">
            {
              "I've also done my fair share of hackathon attending, managing to snag a win at CalgaryHacks 2023, as well as plenty of – what I think are – really cool submissions at events like HackUTD, Hack the North, and NWHacks."
            }
          </p>
          <div className="my-5 border-b border-gray-100/20"></div>
          <h2 className="text-xl font-bold mb-4 mt-8">{"Now?"}</h2>
          <p className="text-base">
            {
              "Currently chipping away at the following (in no particular order):"
            }
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              {"Ted Chaing's "}
              <Link
                href="https://www.goodreads.com/book/show/18050243-stories-of-your-life-and-others"
                variant="inline"
              >
                Stories of Your Life and Others
              </Link>
              , an incredible collection of stories.
            </li>
            <li>
              <Link
                href="https://store.steampowered.com/app/1569580/Blue_Prince/"
                variant="inline"
              >
                Blue Prince
              </Link>
              {
                ", one of the most interesting puzzle games I've played in a while."
              }
            </li>
            <li>Always, always, collecting more records.</li>
          </ul>
          <div className="my-5 border-b border-gray-100/20"></div>
          <h2 className="text-xl font-bold mb-4 mt-8">
            {'What\'s "Maintenance Mode"?'}
          </h2>
          <p className="text-base">
            {
              "The tl;dr is that I've always used my website as a home to showcase projects that I worked on, no matter the state they were in. When I was in high school or early university, this was just a cool thing to show off the "
            }
            <span className="italic">quantity</span>
            {" of projects I had."}
          </p>
          <p className="text-base">
            {
              "Now that I'm older and (arguably) wiser, I realize it's about the "
            }
            <span className="italic">quality</span>
            {
              " of projects I have. I want to show off the things that I'm proud of, and that I think are worth showing off. Although probably a bad choice of nomenclature, \"maintenance mode\" is what I'm calling the barren state of my website. I want to comb back through some old projects and give them a fresh coat of paint."
            }
          </p>
          <p className="text-base">
            {
              "If you've noticed that a lot of the projects I have up are missing links, repos, or even just look sloppy, that's because I'm in the process of updating them."
            }
          </p>
          <p className="text-base">
            {
              "Also, if you're reading this on the new website, try not to call me a hypocrite."
            }
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
