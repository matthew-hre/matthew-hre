"use client";

import { useInView } from "react-intersection-observer";
import { PropsWithChildren } from "react";

type Props = {
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
};

export default function FadeInOnView({
  children,
  delay = 0,
  className = "",
  threshold = 0,
  rootMargin = "0px 0px 100px 0px",
}: PropsWithChildren<Props>) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold, rootMargin });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transform-gpu will-change-transform transition-all duration-500 ease-out",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
