import type { Metadata } from "next";
import { buildBreadcrumbs } from "@/lib/metadata";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";
const CALENDLY_URL = process.env.CALENDLY_URL || "https://calendly.com/your-link";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Schedule a free 30-minute consultation with New Life Consulting. No pressure, no sales pitch — just an honest conversation about your credit.",
  openGraph: {
    title: "Book a Free Consultation",
    description:
      "Schedule a free 30-minute consultation. No pressure, no sales pitch.",
    url: `${SITE_URL}/booking`,
    images: [{ url: `${SITE_URL}/api/og?title=Book%20a%20Free%20Consultation&subtitle=No%20Pressure%20%E2%80%94%20Just%20an%20Honest%20Conversation`, width: 1200, height: 630 }],
  },
};

const breadcrumbs = buildBreadcrumbs([
  { name: "Home", path: "/" },
  { name: "Book a Consultation" },
]);

export default function BookingPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="relative py-24 px-4 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full font-body text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 animate-slide-up">
            Free Consultation
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">
            Book Your Free Call
          </h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            30 minutes. No pressure. No sales pitch. Just an honest conversation about your credit and where you want to be.
          </p>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <iframe
              src={`${CALENDLY_URL}?embed_domain=${typeof window !== "undefined" ? window.location.hostname : "www.newlifeconsulting.com"}&embed_source=parent`}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a consultation"
              className="w-full min-h-[700px]"
              loading="lazy"
            />
          </div>

          {/* Trust signals below */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "30-Minute Free Call", desc: "Discuss your situation with zero commitment" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Zero Pressure", desc: "No sales pitch — just honest advice" },
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Real Results", desc: "Average 120+ point score increase" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
