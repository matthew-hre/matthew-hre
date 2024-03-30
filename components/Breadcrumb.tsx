import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function BreadcrumbDemo({
  path,
}: {
  path: { slug: string; title: string }[];
}) {
  return (
    <Breadcrumb
      className="py-4 sticky top-0 bg-background w-full flex flex-row justify-between"
      aria-label="Breadcrumb"
    >
      <BreadcrumbList>
        <BreadcrumbItem className="text-xs">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator className="size-3.2" />
        </BreadcrumbItem>

        {path.map((segment, index) => (
          <BreadcrumbItem key={segment.slug} className="text-xs">
            <BreadcrumbLink asChild>
              <Link href={`/${segment.slug}`} passHref>
                {segment.title}
              </Link>
            </BreadcrumbLink>
            {index < path.length - 1 && (
              <BreadcrumbSeparator className="size-3.2" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
      <ThemeSwitcher />
    </Breadcrumb>
  );
}
