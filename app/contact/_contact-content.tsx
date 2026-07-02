"use client";

import { useState, FormEvent, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";
import CharGauge from "../components/CharGauge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "submitting";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  plan: string;
  type: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const MAX_CHARS = 500;
const MIN_CHARS = 10;

const SERVICES = [
  { value: "credit-analysis", label: "Credit Score Analysis" },
  { value: "credit-repair", label: "Credit Repair" },
  { value: "financial-planning", label: "Financial Planning" },
  { value: "debt-management", label: "Debt Management" },
  { value: "financial-literacy", label: "Financial Literacy" },
  { value: "consulting", label: "Expert Consulting" },
  { value: "other", label: "Not sure yet" },
];

const PLAN_CONFIG: Record<string, { type: "plan" | "service" | "consultation"; service: string; heading: string; subheading: string; planName: string; price: string; period: string; features: string[]; dropdownLabel: string; defaultMessage: string; badge?: string }> = {
  assessment: {
    type: "plan",
    service: "credit-analysis",
    heading: "Get Started with Credit Assessment",
    subheading: "A one-time deep dive into your credit report from all three bureaus.",
    planName: "Credit Assessment",
    price: "$99",
    period: "one-time",
    features: [
      "Full credit report review (all 3 bureaus)",
      "Score factor analysis",
      "Personalized action plan",
      "30-minute consultation call",
    ],
    dropdownLabel: "Credit Assessment ($99)",
    defaultMessage: "Hi, I'm interested in the Credit Assessment plan ($99). I'd like to schedule my credit report review and consultation call. Please reach out to get started.",
  },
  repair: {
    type: "plan",
    service: "credit-repair",
    heading: "Get Started with Credit Repair",
    subheading: "Ongoing support to dispute errors and boost your score.",
    planName: "Credit Repair Program",
    price: "$299",
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Everything in Assessment",
      "Unlimited dispute assistance",
      "Monthly progress reports",
      "Creditor negotiations",
      "Dedicated support line",
    ],
    dropdownLabel: "Credit Repair Program ($299/mo)",
    defaultMessage: "Hi, I'm interested in the Credit Repair Program ($299/mo). I'd like to start the dispute process and work on improving my credit score. Please reach out to get started.",
  },
  freedom: {
    type: "plan",
    service: "financial-planning",
    heading: "Get Started with Financial Freedom",
    subheading: "Complete transformation with planning, budgeting, and wealth building.",
    planName: "Financial Freedom",
    price: "$499",
    period: "one-time",
    features: [
      "Everything in Repair",
      "Financial planning session",
      "Custom budget & savings plan",
      "Debt management strategy",
      "Wealth building roadmap",
    ],
    dropdownLabel: "Financial Freedom ($499)",
    defaultMessage: "Hi, I'm interested in the Financial Freedom plan ($499). I'd like to get started with financial planning, budgeting, and debt management. Please reach out to discuss next steps.",
  },
  consultation: {
    type: "consultation",
    service: "",
    heading: "Book Your Free Consultation",
    subheading: "No pressure, no sales pitch. Just an honest conversation about your credit.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "",
  },
  "credit-analysis": {
    type: "service",
    service: "credit-analysis",
    heading: "Inquire about Credit Score Analysis",
    subheading: "Full breakdown of your credit report from all three bureaus.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about the Credit Score Analysis service. Could you walk me through what's included and how to get started?",
  },
  "credit-repair": {
    type: "service",
    service: "credit-repair",
    heading: "Inquire about Credit Repair",
    subheading: "We handle the entire dispute process with all three bureaus.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about the Credit Repair service. Could you walk me through the dispute process and how to get started?",
  },
  "financial-planning": {
    type: "service",
    service: "financial-planning",
    heading: "Inquire about Financial Planning",
    subheading: "Build a real financial plan covering budgeting, saving, and investing.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about Financial Planning. Could you walk me through what's included and how to get started?",
  },
  "debt-management": {
    type: "service",
    service: "debt-management",
    heading: "Inquire about Debt Management",
    subheading: "Stop collection calls. We negotiate to cut balances and build a payoff strategy.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about Debt Management. Could you walk me through how the negotiation process works and how to get started?",
  },
  "financial-literacy": {
    type: "service",
    service: "financial-literacy",
    heading: "Inquire about Financial Literacy",
    subheading: "Learn how credit really works with one-on-one sessions and workshops.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about Financial Literacy sessions. Could you share what's covered and how to sign up?",
  },
  consulting: {
    type: "service",
    service: "consulting",
    heading: "Inquire about Expert Consulting",
    subheading: "Direct access to an experienced credit professional for any financial question.",
    planName: "",
    price: "",
    period: "",
    features: [],
    dropdownLabel: "",
    defaultMessage: "Hi, I'd like to learn more about Expert Consulting. Could you share availability and how to schedule a session?",
  },
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(data.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!data.service) {
    errors.service = "Please select a service.";
  }

  if (!data.message.trim()) {
    errors.message = "Please tell us about your situation.";
  } else if (data.message.trim().length < MIN_CHARS) {
    errors.message = `Message must be at least ${MIN_CHARS} characters.`;
  }

  return errors;
}

function isValid(data: FormData): boolean {
  return (
    data.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    (data.phone === "" || /^\(\d{3}\) \d{3}-\d{4}$/.test(data.phone)) &&
    data.service !== "" &&
    data.message.trim().length >= MIN_CHARS &&
    data.message.length <= MAX_CHARS
  );
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1.5 font-body text-xs text-danger">
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      {error}
    </p>
  );
}

export default function Contact() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const planConfig = planParam ? PLAN_CONFIG[planParam] : null;

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: planConfig?.service ?? "",
    message: planConfig?.defaultMessage ?? "",
    plan: planParam ?? "",
    type: planConfig?.type ?? "",
  });

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Validate immediately on blur
    setForm((prev) => {
      const errs = validate(prev);
      setErrors(errs);
      return prev;
    });
  }, []);

  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Debounced validation for touched fields (500ms)
  useEffect(() => {
    Object.keys(touched).forEach((field) => {
      if (!touched[field]) return;
      if (timersRef.current[field]) clearTimeout(timersRef.current[field]);
      timersRef.current[field] = setTimeout(() => {
        const errs = validate(form);
        setErrors(errs);
      }, 500);
    });
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [form, touched]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTouched({ name: true, email: true, phone: true, service: true, message: true });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors below.");
      return;
    }

    setStatus("submitting");
    const loadingToast = toast.loading("Sending your message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.dismiss(loadingToast);
        const msg = json.error || "";
        toast.error(msg.length > 60 ? "Something went wrong. Please try again." : msg || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Message sent successfully!");
      setSubmittedName(form.name.split(" ")[0]);
      setShowSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "", plan: "", type: "" });
      setErrors({});
      setTouched({});
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Network error. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  const ready = isValid(form) && status !== "submitting";

  function getMissing(): string[] {
    const missing: string[] = [];
    if (!form.name.trim()) missing.push("your name");
    else if (form.name.trim().length < 2) missing.push("a valid name (2+ chars)");
    if (!form.email.trim()) missing.push("your email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) missing.push("a valid email");
    if (form.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(form.phone)) missing.push("a valid phone or leave it blank");
    if (!form.service) missing.push("a service");
    if (!form.message.trim()) missing.push("a message");
    else if (form.message.trim().length < MIN_CHARS) missing.push(`at least ${MIN_CHARS} chars in your message`);
    return missing;
  }

  const missingFields = !ready ? getMissing() : [];

  const inputBase = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors duration-200";

  return (
    <div className="flex flex-col">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} name={submittedName} planName={planConfig?.planName} />

      {/* 1. Page Header */}
      <section className="relative py-24 px-4 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full font-body text-sm font-medium mb-6 backdrop-blur-sm animate-slide-up">
            Let&apos;s Talk
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">Contact Us</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            Ready to take the first step? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* 2. Quick Contact Bar */}
      <section className="py-6 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {[
              { label: "Call", value: "(917) 808-9765", href: "tel:9178089765", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
              { label: "Text", value: "(917) 808-9765", href: "sms:9178089765", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { label: "Email", value: "baptistesteffon@gmail.com", href: "mailto:baptistesteffon@gmail.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-body text-sm font-medium">{item.label}:</span>
                <span className="font-body text-sm text-gray-500">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Booking + Form */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Booking Info */}
            <div>
              <p className="font-body text-secondary font-semibold mb-3">Free Consultation</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                {planConfig?.heading ?? "Let\u2019s talk about\nyour credit."}
              </h2>
              <p className="font-body text-gray-500 mb-10 text-lg">
                {planConfig?.subheading ?? "No pressure, no sales pitch. Just an honest conversation about where you are and where you want to be."}
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "30-Minute Free Call", desc: "Discuss your situation with zero commitment" },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "FCRA Compliant", desc: "Fully protected under federal credit laws" },
                  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Average 120+ Point Increase", desc: "Our clients see real, measurable results" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-0.5">{item.title}</h3>
                      <p className="font-body text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="tel:9178089765" variant="outline" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-body font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </Button>
                <Button href="sms:9178089765" variant="outline" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-foreground font-body font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Text Us
                </Button>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-100">
              {planConfig?.type === "plan" && planConfig.planName && (
                <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{planConfig.planName}</h3>
                      {planConfig.price && (
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-display text-3xl font-bold text-primary">{planConfig.price}</span>
                          {planConfig.period && (
                            <span className="font-body text-sm text-gray-400">{planConfig.period}</span>
                          )}
                        </div>
                      )}
                    </div>
                    {planConfig.badge && (
                      <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold font-body rounded-full">
                        {planConfig.badge}
                      </span>
                    )}
                  </div>
                  {planConfig.features.length > 0 && (
                    <ul className="space-y-2">
                      {planConfig.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <svg className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-body text-sm text-gray-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <h2 className="font-display text-2xl font-bold mb-2 text-foreground">Send a Message</h2>
              <p className="font-body text-gray-500 mb-8">We&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} noValidate className="font-body space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`${inputBase} ${errors.name && touched.name ? "border-danger focus:ring-danger/30 focus:border-danger" : "border-gray-200 focus:border-primary"}`}
                    placeholder="Your name"
                  />
                  <FieldError error={touched.name ? errors.name : undefined} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`${inputBase} ${errors.email && touched.email ? "border-danger focus:ring-danger/30 focus:border-danger" : "border-gray-200 focus:border-primary"}`}
                    placeholder="your@email.com"
                  />
                  <FieldError error={touched.email ? errors.email : undefined} />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", formatPhone(e.target.value))}
                    onBlur={() => handleBlur("phone")}
                    className={`${inputBase} ${errors.phone && touched.phone ? "border-danger focus:ring-danger/30 focus:border-danger" : "border-gray-200 focus:border-primary"}`}
                    placeholder="(555) 123-4567"
                    maxLength={14}
                  />
                  <FieldError error={touched.phone ? errors.phone : undefined} />
                </div>

                {/* Service — shadcn Select */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What do you need help with? <span className="text-danger">*</span>
                  </label>
                  {planConfig && planConfig.type !== "consultation" && (
                    <div className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-lg ${
                      planConfig.type === "plan"
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-gray-100 border border-gray-200"
                    }`}>
                      <svg className={`w-4 h-4 shrink-0 ${
                        planConfig.type === "plan" ? "text-primary" : "text-gray-500"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`font-body text-sm font-semibold ${
                        planConfig.type === "plan" ? "text-primary" : "text-gray-600"
                      }`}>
                        {planConfig.type === "plan" ? planConfig.dropdownLabel : planConfig.heading.replace("Inquire about ", "")}
                      </span>
                      <span className="font-body text-xs text-gray-400 ml-auto">
                        {planConfig.type === "plan" ? "Plan selected" : "Service selected"}
                      </span>
                    </div>
                  )}
                  <Select
                    value={form.service}
                    onValueChange={(val: string | null) => {
                      update("service", val ?? "");
                      setTouched((prev) => ({ ...prev, service: true }));
                    }}
                  >
                    <SelectTrigger
                      className={`w-full py-7 cursor-pointer capitalize px-4 bg-white border rounded-xl text-sm font-body focus:ring-2 focus:ring-primary/30 transition-colors duration-200 ${
                        errors.service && touched.service
                          ? "border-danger focus:ring-danger/30 focus:border-danger"
                          : "border-gray-200 focus:border-primary"
                      }`}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-200">
                      {SERVICES.map((s) => (
                        <SelectItem key={s.value} value={s.value} className="font-body capitalize p-3 cursor-pointer text-sm">
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError error={touched.service ? errors.service : undefined} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Tell us about your situation <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value.slice(0, MAX_CHARS))}
                    onBlur={() => handleBlur("message")}
                    className={`${inputBase} ${errors.message && touched.message ? "border-danger focus:ring-danger/30 focus:border-danger" : "border-gray-200 focus:border-primary"} field-sizing-content resize-none min-h-32`}
                    placeholder="Share as much or as little as you'd like..."
                    maxLength={MAX_CHARS}
                  />
                  <div className="mx-auto w-fit">
                    <CharGauge count={form.message.length} max={MAX_CHARS} min={MIN_CHARS} />
                  </div>
                  <FieldError error={touched.message ? errors.message : undefined} />
                </div>

                <Button type="submit" variant="primary" fullWidth disabled={!ready}>
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send My Message
                    </>
                  )}
                </Button>

                {!ready && status !== "submitting" && missingFields.length > 0 && (
                  <p className="text-center font-body text-xs text-gray-400 mt-1">
                    {missingFields.length === 1
                      ? <>Add <span className="text-gray-500 font-medium">{missingFields[0]}</span> to send.</>
                      : <>Add <span className="text-gray-500 font-medium">{missingFields[0]}</span> and <span className="text-gray-500 font-medium">{missingFields.length - 1} more</span> to send.</>
                    }
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wide Map */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              We Serve Clients Nationwide
            </h2>
            <p className="font-body text-gray-500 max-w-2xl mx-auto">
              Based in New York, working with clients across all 50 states. Phone and video consultations available.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432977337!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Life Consulting location"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
