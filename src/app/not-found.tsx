import Footer from "@/components/footer";
import Link from "@/components/link";

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex min-h-[70vh] max-w-[640px] items-center px-4 py-16">
        <div className="flex flex-col px-4 gap-4">
          <h1 className="text-xl font-bold">404</h1>
          <p className="text-base text-muted-foreground">There’s nothing here.</p>
          <Link href="/" variant="inline" className="w-fit">
            Return home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
