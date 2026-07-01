"use client";

import { useRef, useState, ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnetic({
  children,
  className = "",
  strength = 1,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setStyle({
      transform: `translate(${x * (strength / 10)}px, ${y * (strength / 10)}px)`,
      transition: "transform 0.2s ease-out",
    });
  };

  const reset = () =>
    setStyle({
      transform: "translate(0px, 0px)",
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