"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  opacity: number;
}

interface StarFieldProps {
  count?: number;
  className?: string;
}

export default function StarField({ count = 60, className = "" }: StarFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear existing stars
    el.innerHTML = "";

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.5,
      dur: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    stars.forEach((star) => {
      const s = document.createElement("div");
      s.className = "star-particle";
      s.style.cssText = `
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        --dur: ${star.dur}s;
        --delay: ${star.delay}s;
        animation-delay: ${star.delay}s;
        opacity: ${star.opacity};
      `;
      el.appendChild(s);
    });

    return () => {
      if (el) el.innerHTML = "";
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}
