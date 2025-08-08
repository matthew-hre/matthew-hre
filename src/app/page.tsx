import Footer from '@/components/footer'
import ProfileSection from '@/components/profile-section'
import { content } from '@/lib/cms'

export default async function Home() {
  const profile = await content.static.profile.get()
  const projects = await content.collections.projects.getAll()

  return (
    <>
      <ProfileSection profile={profile} projects={projects} />
      <Footer />
    </>
  )
} 