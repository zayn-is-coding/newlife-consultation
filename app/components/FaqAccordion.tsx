"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.q}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-shadow duration-300"
          style={{ boxShadow: openFaq === i ? "0 4px 16px -4px rgba(0,0,0,0.08)" : "none" }}
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-foreground text-lg hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            {item.q}
            <span
              className="ml-4 shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: openFaq === i ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "" }}
            >
              <svg
                className="w-4 h-4 text-gray-400 transition-all duration-300"
                style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: openFaq === i ? "var(--primary)" : "" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
          <div className={`accordion-content ${openFaq === i ? "open" : ""}`}>
            <div>
              <div className="px-5 pb-5">
                <div className="h-px bg-gray-100 mb-4" />
                <p className="font-body text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
