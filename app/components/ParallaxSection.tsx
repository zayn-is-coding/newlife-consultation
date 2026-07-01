"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function ParallaxSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const deco1 = el.querySelector<HTMLElement>(".deco-1");
    const deco2 = el.querySelector<HTMLElement>(".deco-2");
    const deco3 = el.querySelector<HTMLElement>(".deco-3");
    const deco4 = el.querySelector<HTMLElement>(".deco-4");
    const heading = el.querySelector<HTMLElement>(".px-heading");
    const subtitle = el.querySelector<HTMLElement>(".px-subtitle");
    const cards = el.querySelectorAll<HTMLElement>(".px-card");

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const t = Math.max(0, Math.min(1, progress));
        const centered = (t - 0.5) * 2;

        if (deco1) deco1.style.transform = `translateY(${centered * -140}px) rotate(${centered * 50}deg)`;
        if (deco2) deco2.style.transform = `translateY(${centered * 100}px) translateX(${centered * -50}px)`;
        if (deco3) deco3.style.transform = `translateY(${centered * -180}px) scale(${0.6 + t * 0.8})`;
        if (deco4) deco4.style.transform = `translateY(${centered * 120}px) translateX(${centered * 40}px) rotate(${-centered * 25}deg)`;

        if (heading) heading.style.transform = `translateY(${centered * 30}px)`;
        if (subtitle) subtitle.style.transform = `translateY(${centered * 20}px)`;

        cards.forEach((card, i) => {
          const offset = centered * (45 - i * 15);
          card.style.transform = `translateY(${offset}px)`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Decorative ring, top left */}
      <div className="deco-1 absolute -top-16 -left-16 w-56 h-56 rounded-full border border-secondary/20 pointer-events-none" />
      {/* Decorative dots, right side */}
      <div className="deco-2 absolute top-1/4 -right-6 pointer-events-none flex flex-col gap-3">
        <div className="w-3 h-3 rounded-full bg-accent/20" />
        <div className="w-4 h-4 rounded-full bg-secondary/15 ml-4" />
        <div className="w-2 h-2 rounded-full bg-primary/20 ml-1" />
        <div className="w-3.5 h-3.5 rounded-full bg-success/15 ml-5" />
        <div className="w-2 h-2 rounded-full bg-warning/20 ml-2" />
      </div>
      {/* Decorative blob, bottom right */}
      <div className="deco-3 absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      {/* Decorative cross, left middle */}
      <div className="deco-4 absolute top-1/2 -left-4 pointer-events-none text-secondary/15">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="16" y1="4" x2="16" y2="28" />
          <line x1="4" y1="16" x2="28" y2="16" />
        </svg>
      </div>
      {children}
    </div>
  );
}