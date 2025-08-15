import NextLink from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CustomLinkProps {
  href?: string;
  children: ReactNode;
  variant?: "default" | "muted" | "icon" | "project" | "inline";
  size?: "sm" | "base" | "lg";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
  mono?: boolean;
}

export default function Link({
  href,
  children,
  variant = "default",
  size = "base",
  external = false,
  className,
  icon,
  mono = false,
}: CustomLinkProps) {
  const baseClasses = "group flex w-fit items-center gap-2 transition-all duration-300 ease-out";

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const variantClasses = {
    default: "hover:underline hover:text-gray-200",
    muted: "text-muted-foreground group-hover:underline group-hover:text-gray-200",
    icon: "hover:text-gray-200",
    project: "font-semibold",
    inline: "text-muted-foreground hover:underline hover:text-gray-200 inline-block",
  };

  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    mono && "font-mono",
    className
  );

  const content = (
    <>
      {icon && icon}
      {variant === "muted" ? (
        <span className={cn(
          "text-muted-foreground group-hover:underline transition-all duration-300 ease-out group-hover:text-gray-200",
          mono && "font-mono"
        )}>
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </>
  );

  if (!href) {
    return (
      <span className={combinedClasses}>
        {content}
      </span>
    );
  }

  if (external) {
    return (
      <a
        className={combinedClasses}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        className={combinedClasses}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink className={combinedClasses} href={href}>
      {content}
    </NextLink>
  );
}
