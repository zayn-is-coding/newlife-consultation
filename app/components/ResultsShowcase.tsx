"use client";

import { useState } from "react";
import Button from "./Button";

const results = [
  {
    image: "/images/IMG_20260627_184529_209.jpg",
    title: "Credit Score Boost",
    description: "698 Equifax score, up 128 points from 570",
    stat: "+128",
    label: "Points",
  },
  {
    image: "/images/IMG_20260627_184524_507.jpg",
    title: "Items Deleted",
    description: "9 negative items removed in a single round",
    stat: "09",
    label: "Deleted",
  },
  {
    image: "/images/Screenshot_20260503_114017_Telegram.jpg",
    title: "Full Recovery",
    description: "All three bureaus improved: 698, 684, 697",
    stat: "3/3",
    label: "Bureaus",
  },
];

export default function ResultsShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="font-body text-secondary font-semibold mb-3 tracking-wide uppercase text-sm">
              Real Results
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Numbers Don&apos;t Lie.<br />
              <span className="text-primary">Neither Do We.</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg">
              Every client gets a personalized plan, and every plan delivers measurable results. Here&apos;s a look at what we&apos;ve achieved.
            </p>

            {/* Tab selector */}
            <div className="flex gap-3 mb-8">
              {results.map((result, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`
                    px-5 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 cursor-pointer
                    ${active === i
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }
                  `}
                >
                  {result.label}
                </button>
              ))}
            </div>

            {/* Active result info */}
            <div className="animate-scale-in" key={active}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-5xl font-bold text-primary">
                  {results[active].stat}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {results[active].title}
              </h3>
              <p className="font-body text-muted-foreground">
                {results[active].description}
              </p>
            </div>

            <div className="mt-10">
              <Button href="/contact" variant="primary" size="lg">
                See Your Results
              </Button>
            </div>
          </div>

          {/* Image stack */}
          <div className="relative h-[400px] md:h-[480px]">
            {results.map((result, i) => (
              <div
                key={i}
                className={`
                  absolute image-card cursor-pointer
                  ${i === 0 ? "left-0 top-0 z-30 w-72 md:w-80" : ""}
                  ${i === 1 ? "left-12 md:left-16 top-8 z-20 w-64 md:w-72" : ""}
                  ${i === 2 ? "left-6 md:left-10 top-16 z-10 w-60 md:w-68" : ""}
                  ${active === i ? "opacity-100 scale-100" : "opacity-40 scale-95"}
                `}
                style={{
                  transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  transform: active === i
                    ? "translateY(0) rotate(0deg)"
                    : `translateY(${i * 8}px) rotate(${i === 1 ? 3 : i === 2 ? -2 : 0}deg)`,
                }}
                onClick={() => setActive(i)}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ))}

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}