export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-xl mx-auto pt-6 md:pt-12 pb-8">{children}</div>
  );
}
