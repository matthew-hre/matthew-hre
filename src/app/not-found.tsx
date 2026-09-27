import Footer from "@/components/footer";
import Link from "@/components/link";

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex min-h-[70vh] max-w-[640px] items-center px-4 py-16">
        <div className="flex flex-col px-4 gap-4">
          <h1 className="text-xl font-bold">404</h1>
          <p className="text-base text-muted-foreground">There’s nothing here.</p>
          <p className="text-base text-muted-foreground">
            Return to the <Link href="/" variant="inline">homepage</Link>, or use the{" "}
            <Link href="/sitemap.xml" variant="inline">sitemap</Link> and{" "}
            <Link href="/llms.txt" variant="inline">agent resource index</Link> to find what is available.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
