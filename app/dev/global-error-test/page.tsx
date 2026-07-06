"use client";

import { useEffect, useState } from "react";

export default function DevSlowPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="font-body text-gray-400 animate-pulse">Still loading... (5s delay)</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Loaded!</h1>
        <p className="font-body text-gray-500">The loading state worked. You should have seen the spinner for 5 seconds.</p>
      </div>
    </div>
  );
}
