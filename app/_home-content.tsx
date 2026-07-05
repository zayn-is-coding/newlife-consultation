"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import CreditSpeedometer from "./components/CreditSpeedometer";
import StaggerText from "./components/StaggerText";
import Magnetic from "./components/Magnetic";
import ParallaxText from "./components/ParallaxText";
import ScrollReveal from "./components/ScrollReveal";
import ParallaxSection from "./components/ParallaxSection";
import Marquee from "./components/InfiniteCarousel";
import Parallax from "./components/Parallax";
import FaqAccordion from "./components/FaqAccordion";
import ReviewsCarousel from "./components/ReviewsCarousel";
import { homeFaqs } from "@/lib/faqs";

const REVIEWS = [
  { text: "I was 29, renting, and getting denied for everything. Steffon walked me through my report line by line. Four months later I closed on my first house. I still can't believe it.", name: "James R.", role: "Credit Repair Client", initials: "JR", cssVar: "--primary" },
  { text: "My husband and I were paying 22% interest on a car loan because of one collections item from 2019. New Life got it removed in 6 weeks. We refinanced at 4.5%.", name: "Tanya M.", role: "Credit Repair Client", initials: "TM", cssVar: "--secondary" },
  { text: "Honestly I was skeptical. I'd tried DIY credit repair for years and nothing worked. But they found 12 errors I'd never caught. Score went from 520 to 710.", name: "Derek W.", role: "Credit Repair Client", initials: "DW", cssVar: "--accent" },
  { text: "I'm a single mom with two kids and $34K in credit card debt. I thought I'd be paying it off forever. They negotiated my balances down and built a plan I could actually follow. Debt-free in 18 months.", name: "Sandra L.", role: "Debt Management Client", initials: "SL", cssVar: "--success" },
  { text: "I'm a teacher. Nobody taught me about credit growing up. The financial literacy session connected dots I'd been confused about for 20 years. Now I'm teaching my kids what I wish someone had taught me.", name: "Marcus B.", role: "Financial Literacy Client", initials: "MB", cssVar: "--warning" },
  { text: "Applied for a car loan in January, got denied. Called New Life the same week. By April I was driving a new car at a rate I could afford. That's not a typo.", name: "Priya K.", role: "Credit Repair Client", initials: "PK", cssVar: "--danger" },
  { text: "After my divorce my credit was destroyed. 480 score. New Life didn't judge me, they just got to work. Two years later I bought my own place. Steffon changed my life.", name: "Angela T.", role: "Credit Repair Client", initials: "AT", cssVar: "--primary" },
  { text: "I own a small business and needed capital. Banks kept saying no because of my personal credit. New Life fixed my credit and now I have a $50K line of credit at 6%.", name: "Carlos M.", role: "Business Credit Client", initials: "CM", cssVar: "--secondary" },
  { text: "The financial literacy session was a wake-up call. I learned things in one hour that would have taken me years to figure out. My score jumped 80 points in 3 months.", name: "Nicole P.", role: "Financial Literacy Client", initials: "NP", cssVar: "--accent" },
  { text: "I was paying $300/month for car insurance because of my credit. After working with New Life, my score went up 150 points and my insurance dropped to $140/month. That's $1,920/year back in my pocket.", name: "Latisha J.", role: "Credit Repair Client", initials: "LJ", cssVar: "--warning" },
];

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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-20 sm:right-0 md:right-10 lg:right-20 -translate-y-1/2 w-[500px] h-[600px] sm:w-[600px] sm:h-[700px] lg:w-[700px] lg:h-[800px] opacity-[0.04] rotate-[-8deg] hidden sm:block">
            <img src="/images/Screenshot_20260501_164240_Drive.jpg" alt="" className="w-full h-full object-cover rounded-3xl" />
          </div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full font-body text-sm font-medium mb-6 text-primary animate-slide-up">
                Credit Consulting for Everyday People
              </span>
              <ParallaxText as="div" speed={0.08}>
                <StaggerText as="h1" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.95] text-foreground">
                  500+ People Fixed Their Credit<br className="hidden sm:block" /> With New Life Consulting
                </StaggerText>
              </ParallaxText>
              <p className="font-body text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up-delay">
                We help you raise your credit score, get approved for loans, and stop losing money to high interest rates.
              </p>
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 justify-center lg:justify-start animate-slide-up-delay-2">
                <Magnetic strength={1.5}>
                  <Button href="/contact" className="max-sm:w-full" variant="primary" size="lg">Update your credit score</Button>
                </Magnetic>
                <Magnetic strength={1.5}>
                  <Button href="/services" className="max-sm:w-full" variant="outline" size="lg">Our Services</Button>
                </Magnetic>
              </div>
            </div>
            <div className="flex justify-center animate-scale-in w-full">
              <CreditSpeedometer />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <ScrollReveal className="py-14 px-4 bg-gray-50 border-y border-gray-100 reveal">
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
      </ScrollReveal>

      {/* 3. Value Props */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <StaggerText as="h2" className="px-heading font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            What New Life Consulting Does For You
          </StaggerText>
          <p className="px-subtitle font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
            Real results, not empty promises. Here&apos;s how we help.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 stagger-children visible">
            {[
              { title: "Higher Scores, Faster", desc: "Our clients see 100+ point increases within the first few months. We don't make promises we can't keep. Our track record speaks for itself.", image: "/images/home/proven-results.jpg", color: "--secondary" },
              { title: "A Plan Built Around You", desc: "No cookie-cutter solutions. Every strategy is built around your unique situation, your budget, and your timeline.", image: "/images/home/personal-touch.jpg", color: "--accent" },
              { title: "We Handle Everything", desc: "From disputes to negotiations to paperwork, we handle the heavy lifting so you can focus on living your life.", image: "/images/home/fast-simple.jpg", color: "--success" },
            ].map((card) => (
              <div key={card.title} className="px-card bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="h-44 overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Carousel */}
      <ScrollReveal className="py-32 overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Six Ways <span className="text-primary">New Life</span> Can Help You
          </StaggerText>
          <p className="font-body text-gray-500 mt-3 max-w-xl">From credit analysis to full financial transformation, every service is built around your situation.</p>
        </div>
        <div className="pl-4 sm:pl-8 lg:pl-16 pr-4 sm:pr-8 lg:pr-16">
          <Marquee className="mb-4">
            {[
              { title: "Credit Score\nAnalysis", icon: "/svgs/Work Collaboration 2.svg", cssVar: "--secondary", desc: "Know exactly where you stand", link: "/services#credit-analysis" },
              { title: "Credit\nRepair", icon: "/svgs/Approval 4.svg", cssVar: "--accent", desc: "We dispute errors for you", link: "/services#credit-repair" },
              { title: "Financial\nPlanning", icon: "/svgs/financial-literacy.svg", cssVar: "--success", desc: "Build a roadmap to wealth", link: "/services#financial-planning" },
              { title: "Debt\nManagement", icon: "/svgs/manager-desk.svg", cssVar: "--warning", desc: "Pay off debt effectively", link: "/services#debt-management" },
              { title: "Financial\nLiteracy", icon: "/svgs/Team Brainstorming 1.svg", cssVar: "--primary", desc: "Understand your finances", link: "/services#financial-literacy" },
              { title: "Consulting", icon: "/svgs/Consult Experts.svg", cssVar: "--danger", desc: "Expert guidance, always", link: "/services#consulting" },
            ].map((card) => (
              <a
                key={card.title}
                href={card.link}
                className="group shrink-0 w-[260px] sm:w-[320px] flex flex-col justify-between min-h-[320px] sm:min-h-[380px] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border-2 bg-white hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: `color-mix(in srgb, var(${card.cssVar}) 20%, transparent)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `var(${card.cssVar})`;
                  e.currentTarget.style.boxShadow = `0 10px 24px -6px color-mix(in srgb, var(${card.cssVar}) 15%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `color-mix(in srgb, var(${card.cssVar}) 20%, transparent)`;
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="flex items-center justify-center py-12 sm:py-16">
                  <img src={card.icon} alt="" className="w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground leading-snug whitespace-pre-line">{card.title}</h3>
                  <p className="font-body text-sm text-gray-500 mt-1">{card.desc}</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300" style={{ borderColor: `color-mix(in srgb, var(${card.cssVar}) 30%, transparent)` }}>
                    <svg className="w-4 h-4" style={{ color: `color-mix(in srgb, var(${card.cssVar}) 60%, transparent)` }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </Marquee>
        </div>
      </ScrollReveal>

      {/* 4b. Large Image Break */}
      <section className="relative py-32 sm:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          <Parallax intensity={-200} className="flex-1">
            <img src="/images/home/matt-foxx-IUY_3DvM__w-unsplash.jpg" alt="" className="w-full min-h-auto h-[120%] object-cover mt-[-10%]" />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <StaggerText as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Every Client Starts With<br />a Free Consultation
            </StaggerText>
            <p className="font-body text-white/80 text-lg mb-8 max-w-lg">
              In 30 minutes, we'll tell you exactly where your credit stands and what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button href="/contact" className="max-sm:w-full" variant="primary">                Book Free Consultation</Button>
              </Magnetic>
              <Magnetic>
                <Button href="/pricing" className="max-sm:w-full" variant="outline">View Pricing</Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Teaser */}
      <ScrollReveal className="py-32 px-4 bg-gray-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl aspect-4/3 flex items-center justify-center image-card">
                <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-sm">500+</p>
                  <p className="font-body text-gray-400 text-xs">Clients Served</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-body text-secondary font-semibold mb-2">Meet the Founder</p>
              <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Hi, I&apos;m Steffon Jean-Baptiste
              </StaggerText>
              <p className="font-body text-gray-500 mb-4">
                I started New Life Consulting because I believe everyone deserves a fair shot at financial success. Too many people are held back by credit issues, but they don&apos;t have to be.
              </p>
              <p className="font-body text-gray-500 mb-8">
                Your new life starts with a conversation. Let&apos;s talk about where you are and where you want to be.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Magnetic>
                  <Button href="/about" className="max-sm:w-full" variant="primary">Read My Story</Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/contact" className="max-sm:w-full" variant="outline">Free Consultation</Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 6. Process */}
      <ScrollReveal className="py-32 px-4 bg-white reveal">
        <div className="max-w-5xl mx-auto">
          <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            How It Works
          </StaggerText>
          <p className="font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
            Four simple steps to a better credit score.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Free Consultation", desc: "We discuss your situation, goals, and what's holding you back.", color: "--primary" },
              { step: "2", title: "Credit Analysis", desc: "We pull all three reports and identify every opportunity for improvement.", color: "--secondary" },
              { step: "3", title: "Custom Plan", desc: "A personalized strategy built around your unique financial situation.", color: "--accent" },
              { step: "4", title: "See Results", desc: "Watch your score improve as we handle disputes and negotiations.", color: "--success" },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                {i < 3 && <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gray-200" />}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10" style={{ backgroundColor: `var(${item.color})` }}>
                  <span className="font-display text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 7. Social Proof */}
      <ScrollReveal className="py-32 px-4 bg-gray-50 reveal">
        <div className="max-w-7xl mx-auto">
          <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            What Our Clients Say
          </StaggerText>
          <p className="font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
            Real stories from real people who transformed their credit.
          </p>
          <ReviewsCarousel reviews={REVIEWS} />
          <div className="text-center mt-12">
            <Magnetic>
              <Button href="/about#reviews" variant="outline">See All Reviews</Button>
            </Magnetic>
          </div>
        </div>
      </ScrollReveal>

      {/* 7b. Large Image Break */}
      <section className="relative py-32 sm:py-40 min-h-screen flex items-center justify-start px-4 overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          <Parallax intensity={-200} className="flex-1">
            <img src="/images/home/proven-results.jpg" alt="" className="w-full h-[120%] object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl sm:ml-20 ml-10 relative z-10">
          <div className="max-w-2xl">
            <StaggerText as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              From Denied to Approved:<br />Real Client Transformations
            </StaggerText>
            <p className="font-body text-white/80 text-lg mb-8 max-w-lg">
              Our clients don&apos;t just see number changes. They see car approvals, mortgage offers, and financial freedom they never thought possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button href="/services" className="max-sm:w-full" variant="primary">See Our Services</Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" className="max-sm:w-full" variant="outline">Get Started Today</Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <ScrollReveal className="py-32 px-4 bg-white reveal">
        <div className="max-w-3xl mx-auto">
          <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Common Questions
          </StaggerText>
          <p className="font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
            Got questions? We&apos;ve got answers.
          </p>
          <FaqAccordion items={homeFaqs} />
          <div className="text-center mt-10">
            <Magnetic>
              <Button href="/pricing" variant="primary">View All FAQs & Pricing</Button>
            </Magnetic>
          </div>
        </div>
      </ScrollReveal>

      {/* 9. CTA Band */}
      <ScrollReveal className="py-32 px-4 bg-primary text-white relative overflow-hidden reveal">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />
        </div>
        <Parallax intensity={60}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <StaggerText as="h2" className="font-display text-3xl md:text-5xl font-bold mb-6">
              Your Credit Score Is<br />Costing You Money Every Month
            </StaggerText>
            <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Take the first step today. Book a free consultation and let&apos;s talk about your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic strength={1}>
                <Button href="/booking" className="max-sm:w-full" variant="white" size="lg">Book Free Consultation</Button>
              </Magnetic>
              <Magnetic strength={1}>
                <Button href="/pricing" className="max-sm:w-full" variant="white" size="lg">View Pricing</Button>
              </Magnetic>
            </div>
          </div>
        </Parallax>
      </ScrollReveal>
    </div>
  );
}
