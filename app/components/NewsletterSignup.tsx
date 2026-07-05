"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

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
        toast.error(json.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("You're subscribed! Check your inbox for a welcome email.");
      setEmail("");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Network error. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div>
      <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-3 text-gray-300">
        Stay Updated
      </h4>
      <p className="font-body text-sm text-gray-400 mb-4 leading-relaxed">
        Credit tips, industry updates, and exclusive offers. No spam.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-body text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-4 py-2.5 bg-secondary hover:bg-secondary-light text-white font-body text-sm font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "submitting" ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  );
}
