"use client";

import { useState } from "react";

export default function DevErrorTester() {
  const [open, setOpen] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9998]">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-foreground text-white shadow-lg flex items-center justify-center text-xs font-mono font-bold cursor-pointer hover:scale-110 transition-transform"
        title="Dev Error Tester"
      >
        !
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 bg-foreground text-white rounded-xl shadow-2xl p-4 w-64 animate-scale-in">
          <p className="font-body text-xs font-semibold mb-3 text-gray-300 uppercase tracking-wider">
            Dev Error Tester
          </p>
          <div className="space-y-2">
            <a
              href="/dev/error-test"
              className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-body text-sm transition-colors"
            >
              <span className="text-danger font-semibold">Error Boundary</span>
              <span className="text-gray-400 text-xs block mt-0.5">Renders a component that throws</span>
            </a>
            <a
              href="/this-page-does-not-exist"
              className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-body text-sm transition-colors"
            >
              <span className="text-warning font-semibold">404 Not Found</span>
              <span className="text-gray-400 text-xs block mt-0.5">Navigates to a missing page</span>
            </a>
            <a
              href="/dev/global-error-test"
              className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-body text-sm transition-colors"
            >
              <span className="text-accent font-semibold">Global Error</span>
              <span className="text-gray-400 text-xs block mt-0.5">Throws in root layout boundary</span>
            </a>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs cursor-pointer"
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
