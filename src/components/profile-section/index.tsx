import Header from "./server/header";
import ProjectsList from "./server/projects-list";
import BlogPostsList from "./server/blog-posts-list";
import ProfileClient from "./client/profile-client";

export default function ProfileSection() {
  return (
    <ProfileClient
      header={<Header />}
      projects={<ProjectsList />}
      writing={<BlogPostsList />}
    />
  );
}
