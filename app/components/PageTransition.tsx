"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"idle" | "exiting" | "entering">("idle");

  useEffect(() => {
    if (pathname) {
      setStage("exiting");
    }
  }, [pathname]);

  useEffect(() => {
    if (stage === "exiting") {
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setStage("entering");
      }, 180);
      return () => clearTimeout(timer);
    }
    if (stage === "entering") {
      const timer = setTimeout(() => {
        setStage("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [children, stage]);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`
          transition-all duration-300 ease-out
          ${stage === "exiting" ? "opacity-0 translate-y-2" : ""}
          ${stage === "entering" ? "opacity-100 translate-y-0" : ""}
          ${stage === "idle" ? "opacity-100 translate-y-0" : ""}
        `}
      >
        {displayChildren}
      </div>
    </div>
  );
}