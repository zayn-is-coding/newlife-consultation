"use client";

import { useRef, useState, ReactNode } from "react";

export default function TiltOnHover({
  children,
  className = "",
  maxTilt = 8,
  maxShift = 5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  maxShift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(400px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateX(${x * maxShift}px) translateY(${y * maxShift}px)`,
      transition: "transform 0.15s ease-out",
    });
  };

  const reset = () =>
    setStyle({
      transform: "perspective(400px) rotateY(0deg) rotateX(0deg) translateX(0px) translateY(0px)",
      transition: "transform 0.4s ease-out",
    });

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}