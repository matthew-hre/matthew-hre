"use client";

import { Children, PropsWithChildren } from "react";
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
  const arr = Children.toArray(children).map((child) => ({
    key: crypto.randomUUID(),
    child,
  }));

  return (
    <>
      {arr.map(({ key, child }, i) => (
        <FadeInOnView key={key} delay={baseDelay + i * step} className={wrapClassName}>
          {child}
        </FadeInOnView>
      ))}
    </>
  );
}
