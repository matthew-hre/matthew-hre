"use client";

import { useEffect, useState } from "react";

export function useScrollNavbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);

          // Only update if scrolled more than 5px to avoid jitter
          if (scrollDelta > 5) {
            // Scrolling down = hide navbar
            // Scrolling up = show navbar
            // Don't hide if near top (< 100px)
            const shouldShow =
              currentScrollY < lastScrollY || currentScrollY < 100;
            setIsNavbarVisible(shouldShow);
            setLastScrollY(currentScrollY);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return isNavbarVisible;
}
