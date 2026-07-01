"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function Parallax({ children, className = "", intensity = 50 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const t = Math.max(0, Math.min(1, progress));
        const centered = (t - 0.5) * 2;
        el.style.transform = `translateY(${centered * -intensity}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
