"use client";

import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";

const DISMISSED_KEY = "nl_newsletter_dismissed";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;

    setStatus("submitting");
    const loadingToast = toast.loading("Subscribing...");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.dismiss(loadingToast);
        toast.error(json.error || "Something went wrong.");
        setStatus("idle");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("You're in! Check your inbox for a welcome gift.");
      sessionStorage.setItem(DISMISSED_KEY, "1");
      setOpen(false);
      setEmail("");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Network error. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />

        <div className="p-8 md:p-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Get Your Free Credit Repair Guide
          </h2>
          <p className="font-body text-gray-500 mb-2 leading-relaxed">
            Join 2,400+ people who got our <strong className="text-foreground">5-step checklist</strong> to raise their credit score — sent straight to your inbox.
          </p>
          <p className="font-body text-sm text-gray-400 mb-6">
            Plus weekly tips, industry updates, and exclusive offers. Unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email"
              required
              autoFocus
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-body text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 bg-secondary hover:bg-secondary-light text-white font-display font-semibold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-secondary/25"
            >
              {status === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Me the Guide"
              )}
            </button>
          </form>

          <p className="font-body text-xs text-gray-400 text-center mt-4">
            No spam. Just real advice that works.
          </p>
        </div>
      </div>
    </div>
  );
}
