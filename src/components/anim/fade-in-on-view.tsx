import { PropsWithChildren } from "react";

type Props = {
  delay?: number;
  className?: string;
};

export default function FadeInOnView({
  children,
  delay = 0,
  className = "",
}: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        animationDelay: `${delay + 120}ms`,
      }}
      className={[
        "fade-in-on-view",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
