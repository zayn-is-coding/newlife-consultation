"use client";

import { useEffect, useState } from "react";

export default function DevErrorPage() {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(true);
  }, []);

  if (errored) {
    throw new Error("This is a test error to verify your error boundary works correctly.");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <p className="font-body text-gray-400 animate-pulse">Triggering error...</p>
    </div>
  );
}
