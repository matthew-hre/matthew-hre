export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-soft-light"
      style={{
        backgroundImage: "url(/noise.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "512px 512px",
        backgroundPosition: "0 0",
      }}
    />
  );
}
