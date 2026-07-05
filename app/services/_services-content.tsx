"use client";

import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Parallax from "../components/Parallax";
import Image from "next/image";
import Link from "next/link";

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const services = [
  {
    id: "credit-analysis",
    title: "Credit Score Analysis",
    desc: "Know exactly where your credit stands and what to fix first. We pull all three reports and give you a clear roadmap.",
    features: ["Full tri-bureau credit report review", "Score factor breakdown", "Identification of all negative items", "Personalized action plan", "30-minute walkthrough consultation"],
    icon: "/svgs/Work Collaboration 2.svg",
    color: "--secondary",
  },
  {
    id: "credit-repair",
    title: "Credit Repair",
    desc: "We fight to remove errors from your credit report. You stay informed every step of the way.",
    features: ["Dispute of all inaccurate negative items", "Direct communication with all three bureaus", "Creditor negotiations and goodwill adjustments", "Monthly progress reports", "FCRA-compliant process", "Average 40-80 point increase in 90 days"],
    icon: "/svgs/Approval 4.svg",
    color: "--accent",
  },
  {
    id: "financial-planning",
    title: "Financial Planning",
    desc: "A real plan for your money that covers budgeting, saving, and building wealth that lasts.",
    features: ["Custom budget tailored to your lifestyle", "Emergency fund strategy", "Debt payoff roadmap with projections", "Savings and investment strategies", "Retirement planning", "Quarterly check-ins"],
    icon: "/svgs/financial-literacy.svg",
    color: "--success",
  },
  {
    id: "debt-management",
    title: "Debt Management",
    desc: "Stop collection calls. We negotiate with creditors to cut what you owe and build a payoff strategy.",
    features: ["Complete debt audit", "Creditor negotiations for reduced balances", "Collection agency cease-and-desist", "Consolidation and settlement evaluation", "Payment plan structuring", "FDCPA protection"],
    icon: "/svgs/manager-desk.svg",
    color: "--warning",
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    desc: "Understand your credit report, your rights, and exactly what to do next. One-on-one sessions and group workshops.",
    features: ["How credit scores actually work", "Reading and interpreting credit reports", "Your rights under FCRA and FDCPA", "Building credit from scratch", "Smart borrowing strategies", "Group workshops available"],
    icon: "/svgs/Team Brainstorming 1.svg",
    color: "--primary",
  },
  {
    id: "consulting",
    title: "Expert Consulting",
    desc: "Get answers to any credit question from someone who's done this 500+ times.",
    features: ["One-on-one sessions (in-person or virtual)", "Mortgage readiness assessment", "Business credit building", "Real estate investment planning", "Post-bankruptcy rebuilding", "Priority scheduling"],
    icon: "/svgs/Consult Experts.svg",
    color: "--danger",
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <section className="relative py-20 sm:py-24 md:py-28 px-4 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full font-body text-sm font-medium mb-6 text-primary">
                What We Offer
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] text-foreground">
                Credit Consulting That<br />
                <span className="text-primary">Delivers Results</span>
              </h1>
              <p className="font-body text-lg text-gray-600 mb-8 max-w-lg">
                Everything you need to fix your credit, manage your debt, and build a stronger financial future.
              </p>
              <Button className="max-sm:w-full" href="#credit-analysis" variant="primary" size="lg">Explore Services</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-3/4 bg-gray-100">
                <Image src="/images/Screenshot_20260501_164240_Drive.jpg" alt="Credit report analysis" className="w-full h-full object-cover" width={500} height={500} />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-primary/5 p-6 flex flex-col justify-center aspect-square">
                  <p className="font-body text-sm text-gray-500 mb-1">Served</p>
                  <p className="font-display text-4xl font-bold text-foreground">500+</p>
                  <p className="font-body text-sm text-gray-400 mt-1">Clients</p>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-gray-100">
                  <Image src="/images/Screenshot_20260503_114031_Telegram.jpg" alt="Client results" className="w-full h-full object-cover" width={500} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Stats */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500, suffix: "+", label: "Clients Served" },
              { value: 120, suffix: "+", label: "Avg. Score Increase" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 45, suffix: "", label: "Days to First Results" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-body text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services" className="py-24 sm:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Every Service We Offer, Explained Simply
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-xl">
              Comprehensive credit consulting. Every service is built around your situation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="group p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="mb-5">
                  <Image src={service.icon} alt="" className="w-28 h-28" width={112} height={112} />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">{service.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: `var(${service.color})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/contact?plan=${service.id}`} className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: `var(${service.color})` }}>
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 sm:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-xl">
              Four steps to a better credit score.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Consultation", desc: "We discuss your situation, goals, and what's holding you back.", color: "--primary" },
              { step: "02", title: "Credit Analysis", desc: "We pull all three reports, find every issue, and map out opportunities.", color: "--secondary" },
              { step: "03", title: "Custom Plan", desc: "A strategy built around your timeline, budget, and goals.", color: "--accent" },
              { step: "04", title: "See Results", desc: "Your score starts climbing as we handle everything.", color: "--success" },
            ].map((item) => (
              <div key={item.step} className="bg-white p-8 rounded-2xl border border-gray-100">
                <span className="font-display text-5xl font-bold" style={{ color: `color-mix(in srgb, var(${item.color}) 15%, transparent)` }}>{item.step}</span>
                <h3 className="font-display font-semibold text-lg mt-4 mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Real Results */}
      <section className="py-24 sm:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Real Results
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-xl">
              Actual credit reports and score improvements from people we&apos;ve worked with.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { image: "/images/IMG_20260627_184529_209.jpg", stat: "+128 points", desc: "Equifax score jumped from 570 to 698" },
              { image: "/images/IMG_20260627_184524_507.jpg", stat: "9 deleted", desc: "Negative items cleared in a single round" },
              { image: "/images/Screenshot_20260503_114017_Telegram.jpg", stat: "3/3 bureaus", desc: "All three reports improved: 698, 684, 697" },
            ].map((result, i) => (
              <div key={i} className="group">
                <div className="rounded-2xl overflow-hidden mb-4 aspect-4/3 bg-gray-100">
                  <Image src={result.image} alt="Client result" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={500} height={500} />
                </div>
                <p className="font-display text-xl font-bold text-foreground mb-1">{result.stat}</p>
                <p className="font-body text-sm text-gray-500">{result.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 sm:py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why 500+ People Chose New Life
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-xl">
              Plenty of credit companies out there. Here&apos;s why people pick us.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "No Upfront Fees", desc: "You pay after we deliver. Payment plans built around your budget.", color: "--primary" },
              { title: "Transparent Process", desc: "Monthly reports, direct access to your consultant, zero surprises.", color: "--secondary" },
              { title: "Real Results", desc: "Average 120+ point boost. 500+ clients and counting.", color: "--success" },
              { title: "FCRA Compliant", desc: "Fully compliant with federal law. Your rights are protected, always.", color: "--accent" },
              { title: "Personalized Service", desc: "No cookie-cutter plans. Every strategy built around your situation.", color: "--warning" },
              { title: "Nationwide Service", desc: "Based in New York, serving clients everywhere. Virtual consultations.", color: "--danger" },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `color-mix(in srgb, var(${item.color}) 12%, transparent)` }}>
                  <svg className="w-5 h-5" style={{ color: `var(${item.color})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6b. Large Image Break */}
      <section className="relative py-32 sm:py-40 px-4 min-h-screen flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          <Parallax intensity={-300} className="flex-1">
            <Image 
              src="/images/services/helena-lopes-PGnqT0rXWLs-unsplash.jpg" 
              alt="" 
              width={1920} 
              height={1080} 
              className="w-full h-[120%] object-cover" 
            />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Every Month You Wait<br />Costs You Real Money
            </h2>
            <p className="font-body text-white/80 text-lg mb-8 max-w-lg">
              Every month you wait is another month of high interest rates, denied applications, and missed opportunities. Let&apos;s change that today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/booking" className="max-sm:w-full" variant="primary">
                Book Free Consultation
              </Button>
              <Button href="/pricing" className="max-sm:w-full" variant="outline">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Meet Your Consultant */}
      <section className="py-24 sm:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden aspect-4/5 bg-gray-100">
              <Image src="/images/about/consultant.jpg" alt="Steffon Jean-Baptiste" className="w-full h-full object-cover" width={500} height={500} />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full font-body text-sm font-medium mb-6 text-primary">
                Your Consultant
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                Steffon Jean-Baptiste
              </h2>
              <p className="font-body text-gray-500 mb-6 leading-relaxed">
                10+ years in credit consulting. 500+ clients transformed. His approach: treat every client like family, explain everything in plain English, and do the work.
              </p>
              <p className="font-body text-gray-500 mb-8 leading-relaxed">
                Whether you&apos;re rebuilding after a setback or starting from scratch, Steffon will meet you where you are and build a plan that fits your life.
              </p>
              <Button href="/about" variant="primary">Learn More About Steffon</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing */}
      <section className="py-24 sm:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Simple Pricing
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-xl">
              You pay for what you get. Nothing more, nothing less.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="font-display font-semibold text-xl mb-1 text-foreground">Assessment</h3>
              <p className="font-body text-sm text-gray-400 mb-4">One-time analysis</p>
              <p className="font-display text-5xl font-bold text-primary mb-6">$99</p>
              <ul className="space-y-3 mb-8">
                {["Tri-bureau report review", "Score factor analysis", "Personalized action plan"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-body text-sm text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact?plan=assessment" variant="outline" fullWidth>Get Started</Button>
            </div>
            <div className="bg-primary p-8 rounded-2xl text-white relative sm:scale-105 sm:shadow-xl sm:shadow-primary/20">
              <div className="absolute -top-3 right-6 bg-white text-primary px-3 py-1 text-xs rounded-full font-semibold font-body shadow-sm">Most Popular</div>
              <h3 className="font-display font-semibold text-xl mb-1">Repair Program</h3>
              <p className="font-body text-sm text-blue-100 mb-4">Ongoing credit repair</p>
              <p className="font-display text-5xl font-bold mb-6">$299<span className="text-lg font-normal text-blue-200">/mo</span></p>
              <ul className="space-y-3 mb-8">
                {["Everything in Assessment", "Bureau disputes", "Monthly progress reports", "Creditor negotiations"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-body text-sm text-blue-100">{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact?plan=repair" variant="white" fullWidth>Get Started</Button>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="font-display font-semibold text-xl mb-1 text-foreground">Full Package</h3>
              <p className="font-body text-sm text-gray-400 mb-4">Complete transformation</p>
              <p className="font-display text-5xl font-bold text-accent mb-6">$499</p>
              <ul className="space-y-3 mb-8">
                {["Everything in Repair", "Financial planning", "Debt management", "Financial literacy sessions"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-body text-sm text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact?plan=freedom" variant="outline" fullWidth>Get Started</Button>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button href="/pricing" variant="primary" size="lg">View Full Pricing</Button>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-24 sm:py-32 px-4 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Let&apos;s Transform Your Credit
          </h2>
          <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Start with a free consultation. We&apos;ll tell you exactly where your credit stands and what to do next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/booking" variant="white" size="lg">Book Free Consultation</Button>
            <Button href="/pricing" variant="outline" size="lg">View Pricing</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
