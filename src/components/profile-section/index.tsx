import Header from "./server/header";
import FadeInOnView from "@/components/anim/fade-in-on-view";
import DiscogsLibrary from "@/components/discogs-library";

export default function ProfileSection() {
  return (
    <main className="pt-8 sm:pt-40">
      <div className="mx-auto max-w-[640px] px-4">
        <section>
          <FadeInOnView>
            <Header />
          </FadeInOnView>
        </section>
      </div>

      <section id="records" aria-label="My record collection" className="overflow-x-clip scroll-mt-24">
        <DiscogsLibrary />
      </section>
    </main>
  );
}
