"use client";

import { useEffect, useState } from "react";

export default function ParallaxText({
  children,
  className = "",
  speed = 0.15,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  as?: "div" | "h1" | "h2" | "p" | "span";
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOffset(y * speed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <Tag
      className={className}
      style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}