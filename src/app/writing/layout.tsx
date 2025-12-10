"use client";

import Navbar from "@/components/navbar";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isNavbarVisible = useScrollNavbar();

  return (
    <>
      <Navbar isVisible={isNavbarVisible} />
      {children}
    </>
  );
}
