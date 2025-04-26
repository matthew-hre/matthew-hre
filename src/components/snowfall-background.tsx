"use client";

import { useSnowfall } from "@/lib/snowfall";

import { useEffect, useRef } from "react";

const SnowfallBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { enabled: isSnowEnabled } = useSnowfall();

  useEffect(() => {
    if (!isSnowEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const calculateParticleCount = (baseCount: number) =>
      Math.floor(baseCount * (width / 1920));

    const layers = [
      {
        count: calculateParticleCount(50),
        speed: 0.1,
        parallax: 0.005,
        sizeRange: [0.5, 1],
      },
      {
        count: calculateParticleCount(30),
        speed: 0.25,
        parallax: 0.01,
        sizeRange: [1, 2],
      },
      {
        count: calculateParticleCount(20),
        speed: 0.4,
        parallax: 0.02,
        sizeRange: [2, 3],
      },
    ];

    const particles = layers.flatMap(({ count, sizeRange }, i) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        alpha: Math.random() * 0.5 + 0.2,
        layer: i,
      }))
    );

    let lastScrollY = window.scrollY;
    let scrollOffset = 0;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollOffset = -delta;
      lastScrollY = window.scrollY;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225,255,225,${p.alpha})`;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        const { speed, parallax } = layers[p.layer];
        p.y += speed;
        p.y += scrollOffset * parallax * 10;
        if (p.y > height) p.y -= height;
        if (p.y < 0) p.y += height;
      });
      scrollOffset = 0;
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSnowEnabled]);

  return (
    <>
      {isSnowEnabled && (
        <canvas
          ref={canvasRef}
          style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        />
      )}
    </>
  );
};

export default SnowfallBackground;
