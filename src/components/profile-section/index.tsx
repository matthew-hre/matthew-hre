import Header from "./server/header";
import ProfileClient from "./client/profile-client";

export default function ProfileSection() {
  return <ProfileClient header={<Header />} />;
}
