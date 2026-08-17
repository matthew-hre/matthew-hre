import FadeInOnView from "./anim/fade-in-on-view";
import CommitHash from "./commit-hash";
import Link from "./link";

export default function Footer() {
  return (
    <footer>
      <FadeInOnView>
        <div className="mx-auto max-w-[640px] px-4">
          <div className="flex flex-col flex-wrap items-center gap-10 px-4 py-5 pt-0">
            <hr className="w-full border-t border-border" />
            <div className="grid w-full grid-flow-col-dense grid-cols-1 items-start gap-4">
              <Link
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
                variant="muted"
              >
                CC BY-SA 4.0
              </Link>
              <CommitHash />
            </div>
          </div>
        </div>
      </FadeInOnView>
    </footer>
  );
}
