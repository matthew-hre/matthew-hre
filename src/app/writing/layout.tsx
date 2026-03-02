"use client";

import NavbarWithTabs from "@/components/navbar-with-tabs";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarWithTabs />
      {children}
    </>
  );
}
