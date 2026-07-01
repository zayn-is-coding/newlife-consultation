"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface InfiniteCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfiniteCarousel({ children, className = "" }: InfiniteCarouselProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);

  const items = Array.isArray(children) ? children : [children];
  const totalReal = items.length;

  const getCardStep = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return 0;
    const firstCard = inner.children[0] as HTMLElement;
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 24;
  }, []);

  const resetToStart = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;
    outer.scrollLeft = 0;
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const handleScroll = () => {
      const cardStep = getCardStep();
      if (cardStep === 0) return;
      const halfPoint = cardStep * totalReal;
      if (outer.scrollLeft >= halfPoint - 10) {
        outer.scrollLeft -= halfPoint;
      }
    };

    outer.addEventListener("scroll", handleScroll, { passive: true });
    return () => outer.removeEventListener("scroll", handleScroll);
  }, [getCardStep, totalReal]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    if (autoPlay) {
      timerRef.current = setInterval(() => {
        const cardStep = getCardStep();
        if (cardStep === 0) return;
        outer.scrollBy({ left: cardStep, behavior: "smooth" });
      }, 2500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, getCardStep]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const outer = outerRef.current;
    if (!outer) return;
    const cardStep = getCardStep();
    if (cardStep === 0) return;
    outer.scrollBy({ left: cardStep * direction, behavior: "smooth" });
  }, [getCardStep]);

  const handleManualScroll = useCallback((dir: -1 | 1) => {
    setAutoPlay(false);
    scrollByCard(dir);
    setTimeout(() => setAutoPlay(true), 4000);
  }, [scrollByCard]);

  return (
    <div className={`relative group/carousel ${className}`}>
      <div
        ref={outerRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-2"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        onTouchStart={() => {
          setAutoPlay(false);
          setTimeout(() => setAutoPlay(true), 4000);
        }}
      >
        <div ref={innerRef} className="flex gap-6">
          {items}
          {items}
        </div>
      </div>

      <button
        onClick={() => handleManualScroll(-1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-95"
      >
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={() => handleManualScroll(1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-95"
      >
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
