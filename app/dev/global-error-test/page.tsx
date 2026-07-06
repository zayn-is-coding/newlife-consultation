"use client";

import { useEffect } from "react";

export default function DevGlobalErrorPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      throw new Error("Global error test: unhandled error in useEffect crashes the React tree.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-body text-gray-400 animate-pulse">Crashing in 100ms...</p>
      </div>
    </div>
  );
}
