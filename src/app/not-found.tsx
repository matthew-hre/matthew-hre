import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar isVisible />
      <main className="mx-auto max-w-[640px] px-4 pt-24 pb-10 sm:pt-40">
        <div className="flex flex-col px-4 gap-4">
          <h2 className="text-xl font-bold mb-4">404</h2>
          <p className="text-base">
            {
              "If you're looking for some content that used to be here, sorry! The website is getting completely reworked, and some things are still being moved over. Feel free to check out the "
            }
            <a
              className="text-base underline hover:text-gray-200 hover:underline transition-all duration-300 ease-out"
              href="https://github.com/matthew-hre/matthew-hre/tree/v3"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"old website's branch on Github"}
            </a>
            {
              " for whatever was there before. If you're looking for something specific, feel free to reach out to me on any of my socials, or through email."
            }
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
