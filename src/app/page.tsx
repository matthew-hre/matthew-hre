import { Suspense } from "react";
import ProfileSection from "@/components/profile-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <ProfileSection />
      </Suspense>
      <Footer />
    </>
  );
}
