"use client";

import Button from "../components/Button";
import FaqAccordion from "../components/FaqAccordion";
import { pricingFaqs } from "@/lib/faqs";

export default function Pricing() {
  return (
    <div className="flex flex-col">
      {/* 1. Page Header - Upgraded */}
      <section className="relative py-24 px-4 hero-gradient bg-gradient-to-br from-primary via-primary-dark to-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full font-body text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 animate-slide-up">
            Honest Pricing
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">Pricing & FAQ</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            You pay for what you get. Nothing more, nothing less.
          </p>
        </div>
      </section>

      {/* 2. Pricing Tiers */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-muted rounded-2xl p-8 text-center flex flex-col">
              <h3 className="font-display font-semibold text-xl mb-2 text-primary">Credit Assessment</h3>
              <p className="font-body text-muted-foreground mb-4">One-time analysis</p>
              <div className="font-display text-5xl font-bold mb-6 text-secondary">$99</div>
              <ul className="font-body space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Full credit report review (all 3 bureaus)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Score factor analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Personalized action plan</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>30-minute consultation call</span>
                </li>
              </ul>
              <Button href="/contact" variant="outline" fullWidth>Get Started</Button>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col relative border-2 border-secondary shadow-lg">
              <div className="absolute top-0 right-8 bg-secondary text-white px-4 py-1 text-sm rounded-b-lg font-semibold font-body">
                Most Popular
              </div>
              <h3 className="font-display font-semibold text-xl mb-2 text-primary">Credit Repair Program</h3>
              <p className="font-body text-muted-foreground mb-4">Monthly ongoing support</p>
              <div className="font-display text-5xl font-bold mb-6 text-secondary">$299<span className="text-lg text-muted-foreground">/mo</span></div>
              <ul className="font-body space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Everything in Assessment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Unlimited dispute assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Monthly progress reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Creditor negotiations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Dedicated support line</span>
                </li>
              </ul>
              <Button href="/contact" variant="secondary" fullWidth>Get Started</Button>
            </div>

            {/* Tier 3 */}
            <div className="bg-muted rounded-2xl p-8 text-center flex flex-col">
              <h3 className="font-display font-semibold text-xl mb-2 text-primary">Financial Freedom</h3>
              <p className="font-body text-muted-foreground mb-4">Complete transformation</p>
              <div className="font-display text-5xl font-bold mb-6 text-accent">$499</div>
              <ul className="font-body space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Everything in Repair</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Financial planning session</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Custom budget & savings plan</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Debt management strategy</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Wealth building roadmap</span>
                </li>
              </ul>
              <Button href="/contact" variant="accent" fullWidth>Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ Accordion */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Everything you need to know before getting started.
          </p>
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>

      {/* 4. CTA Band */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Start Your New Life Today
          </h2>
          <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Book your free consultation and let&apos;s build a plan for your financial future.
          </p>
          <Button href="/contact" variant="white" size="lg">
            Book Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}