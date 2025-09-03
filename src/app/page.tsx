import ProfileSection from "@/components/profile-section";
import Footer from "@/components/footer";
import type { DiscogResponse } from "@/types/discog";

async function fetchInitialDiscogs(): Promise<DiscogResponse | null> {
  try {
    const res = await fetch(`/api/discogs/library?page=1`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const initialDiscogs = await fetchInitialDiscogs();

  return (
    <>
      <ProfileSection initialDiscogs={initialDiscogs ?? undefined} />
      <Footer />
    </>
  );
}
