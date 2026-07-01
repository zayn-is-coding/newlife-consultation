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
import { homeFaqs } from "@/lib/faqs";

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
                  Your New Life Starts Here
                </StaggerText>
              </ParallaxText>
              <p className="font-body text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up-delay">
                Expert credit consulting that delivers real results. We help you fix your credit, build wealth, and reclaim your financial freedom.
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
      <ParallaxSection className="py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <StaggerText as="h2" className="px-heading font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            How We Help You Win
          </StaggerText>
          <p className="px-subtitle font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
            We make credit consulting simple, personal, and effective.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 stagger-children visible">
            {[
              { title: "Proven Results", desc: "100+ point score increases are common within the first few months. We don't make promises we can't keep. Our track record speaks for itself.", image: "/images/home/proven-results.jpg", color: "--secondary" },
              { title: "Personal Touch", desc: "Every client gets a customized plan tailored to their unique situation. No cookie-cutter solutions, just real strategies that work for you.", image: "/images/home/personal-touch.jpg", color: "--accent" },
              { title: "Fast & Simple", desc: "No complicated jargon. We handle the heavy lifting, from disputes and negotiations to paperwork, so you can focus on living your life.", image: "/images/home/fast-simple.jpg", color: "--success" },
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
      </ParallaxSection>

      {/* 4. Services Carousel */}
      <ScrollReveal className="py-32 overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What We <span className="text-primary">Offer</span>
          </StaggerText>
          <p className="font-body text-gray-500 mt-3 max-w-xl">From credit analysis to full financial transformation, we&apos;ve got you covered.</p>
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
        <div className="absolute inset-0">
          <Parallax intensity={-200}>
            <img src="/images/home/matt-foxx-IUY_3DvM__w-unsplash.jpg" alt="" className="w-full h-[120%] object-cover mt-[-10%]" />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <StaggerText as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Credit Journey<br />Starts With One Step
            </StaggerText>
            <p className="font-body text-white/80 text-lg mb-8 max-w-lg">
              Whether you&apos;re fixing your credit or building from scratch, we&apos;re with you every step of the way. No judgment, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button href="/contact" variant="primary">Start Free Consultation</Button>
              </Magnetic>
              <Magnetic>
                <Button href="/pricing" variant="outline">View Pricing</Button>
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
                  <Button href="/about" variant="primary">Read My Story</Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/contact" variant="outline">Free Consultation</Button>
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
      <Parallax intensity={30}>
        <ScrollReveal className="py-32 px-4 bg-gray-50 reveal">
          <div className="max-w-7xl mx-auto">
            <StaggerText as="h2" className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              What Our Clients Say
            </StaggerText>
            <p className="font-body text-gray-500 text-center max-w-2xl mx-auto mb-16">
              Real stories from real people who transformed their credit.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children visible">
              {[
                { text: "My score jumped 120 points in 4 months. I never thought I'd qualify for a mortgage, and now I'm a homeowner.", name: "James R.", role: "Credit Repair Client", initials: "JR", cssVar: "--primary" },
                { text: "Steffon made the whole process easy. No confusing jargon, just real help. I finally feel in control of my finances.", name: "Tanya M.", role: "Financial Planning Client", initials: "TM", cssVar: "--secondary" },
                { text: "12 items deleted from my report! New Life Consulting changed everything. My score went from 520 to 710.", name: "Derek W.", role: "Credit Repair Client", initials: "DW", cssVar: "--accent" },
                { text: "I was drowning in debt. They helped me create a plan and now I'm debt-free in 18 months. Best decision ever.", name: "Sandra L.", role: "Debt Management Client", initials: "SL", cssVar: "--success" },
                { text: "Finally understood my credit report. The financial literacy session was a game-changer. I know exactly what to do now.", name: "Marcus B.", role: "Financial Literacy Client", initials: "MB", cssVar: "--warning" },
                { text: "From denied to approved in 90 days. These people know what they're doing. My car loan was approved at a great rate.", name: "Priya K.", role: "Credit Repair Client", initials: "PK", cssVar: "--danger" },
              ].map((review) => (
                <div key={review.name} className="p-8 bg-white rounded-2xl border border-gray-200 image-card">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-gray-600 mb-6">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, var(${review.cssVar}) 15%, transparent)` }}>
                      <span className="font-body font-semibold text-sm" style={{ color: `var(${review.cssVar})` }}>{review.initials}</span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-foreground text-sm">{review.name}</p>
                      <p className="font-body text-gray-400 text-xs">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Parallax>

      {/* 7b. Large Image Break */}
      <section className="relative py-32 sm:py-40 min-h-screen flex items-center justify-start px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Parallax intensity={-200}>
            <img src="/images/home/proven-results.jpg" alt="" className="w-full h-[120%] object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl sm:ml-20 ml-10 relative z-10">
          <div className="max-w-2xl">
            <StaggerText as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Real People.<br />Real Score Increases.
            </StaggerText>
            <p className="font-body text-white/80 text-lg mb-8 max-w-lg">
              Our clients don&apos;t just see number changes. They see car approvals, mortgage offers, and financial freedom they never thought possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button href="/services" variant="primary">See Our Services</Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact" variant="outline">Get Started Today</Button>
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
              Ready for Your New Life?
            </StaggerText>
            <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Take the first step today. Book a free consultation and let&apos;s talk about your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic strength={1}>
                <Button href="/contact" variant="white" size="lg">Book Free Consultation</Button>
              </Magnetic>
              <Magnetic strength={1}>
                <Button href="/pricing" variant="white" size="lg">View Pricing</Button>
              </Magnetic>
            </div>
          </div>
        </Parallax>
      </ScrollReveal>
    </div>
  );
}
