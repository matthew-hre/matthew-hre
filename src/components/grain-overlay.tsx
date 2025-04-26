export default function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed isolate z-50 opacity-20 mix-blend-soft-light"
      width="100%"
      height="100%"
      id="texture"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        ></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
}
