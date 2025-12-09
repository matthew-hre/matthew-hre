"use client";

import { Children, PropsWithChildren, ReactNode } from "react";
import FadeInOnView from "./fade-in-on-view";

type Props = {
  baseDelay?: number;
  step?: number;
  wrapClassName?: string;
};

export default function StaggerChildren({
  children,
  baseDelay = 0,
  step = 50,
  wrapClassName = "",
}: PropsWithChildren<Props>) {
  const arr = Children.toArray(children) as ReactNode[];

  return (
    <>

      {arr.map((child, i) => (
        <FadeInOnView key={i} delay={baseDelay + i * step} className={wrapClassName}>
          {child}
        </FadeInOnView>
      ))}
    </>
  );
}
