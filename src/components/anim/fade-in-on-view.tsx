"use client";

import { useEffect, useState, PropsWithChildren } from "react";

type Props = {
  delay?: number;
  className?: string;
};

export default function FadeInOnView({
  children,
  delay = 0,
  className = "",
}: PropsWithChildren<Props>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        transitionDelay: `${delay}ms`,
        filter: show ? "blur(0px)" : "blur(6px)",
      }}
      className={[
        "transform-gpu will-change-[opacity,transform,filter] transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-none",
        show ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
