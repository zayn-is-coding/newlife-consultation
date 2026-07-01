"use client";

import { useEffect, useRef, ReactNode } from "react";

interface StaggerTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

export default function StaggerText({
  children,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".stagger-word");
    words.forEach((word, i) => {
      word.style.transitionDelay = `${delay + i * 80}ms`;
    });
  }, [delay]);

  const processText = (text: string) =>
    text
      .split(/(\s+)/)
      .map((segment, i) => {
        if (/^\s+$/.test(segment)) return segment;
        return `<span class="stagger-word" style="display:inline-block;opacity:0;transform:translateY(12px);transition:opacity 0.4s ease-out,transform 0.4s ease-out">${segment}</span>`;
      })
      .join("");

  const processChildren = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return <span dangerouslySetInnerHTML={{ __html: processText(node) }} />;
    }
    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <span key={i}>{processChildren(child)}</span>
      ));
    }
    return node;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.querySelectorAll<HTMLElement>(".stagger-word").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "translateY(0)";
      });
    });
  });

  return (
    <Tag ref={ref} className={className}>
      {processChildren(children)}
    </Tag>
  );
}