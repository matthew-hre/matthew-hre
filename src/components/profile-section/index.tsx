import Header from "./server/header";
import ProjectsList from "./server/projects-list";
import ProfileClient from "./client/profile-client";

function Writing() {
  return <p className="text-base">Not yet!</p>;
}

export default function ProfileSection() {
  return (
    <ProfileClient
      header={<Header />}
      projects={<ProjectsList />}
      writing={<Writing />}
    />
  );
}
