import ProfileSection from "@/components/profile-section";
import Footer from "@/components/footer";
import { PERSON_JSON_LD } from "@/lib/site-content";

const personJsonLd = JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
      <ProfileSection />
      <Footer />
    </>
  );
}
