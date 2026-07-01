"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "nl-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[80] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-[#0f172a] text-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold">We value your privacy</h3>
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={reject}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/20 font-body text-sm font-semibold text-gray-300 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            >
              Reject
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-secondary font-body text-sm font-semibold text-white hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
