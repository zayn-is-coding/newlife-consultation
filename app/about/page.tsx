import type { Metadata } from "next";
import Button from "../components/Button";
import CreditSpeedometer from "../components/CreditSpeedometer";
import Parallax from "../components/Parallax";
import { buildBreadcrumbs } from "@/lib/metadata";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about New Life Consulting. We help everyday people take control of their credit and build a stronger financial future.",
  openGraph: {
    title: "About Us",
    description:
      "Learn about New Life Consulting. We help everyday people take control of their credit.",
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/api/og?title=About%20Us&subtitle=Learn%20about%20New%20Life%20Consulting&image=/images/about/hannah-busing-Zyx1bK9mqmA-unsplash.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbs = buildBreadcrumbs([
  { name: "Home", path: "/" },
  { name: "About" },
]);

export default function About() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* 1. Page Header */}
      <section className="relative py-24 px-4 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full font-body text-sm font-medium mb-6 backdrop-blur-sm animate-slide-up">
            The Story Behind the Mission
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">Our Story</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            The story behind the mission.
          </p>
        </div>
      </section>

      {/* 2. Founder Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center image-card">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-4 shadow-xl">
                <p className="font-display text-2xl font-bold">10+</p>
                <p className="font-body text-sm text-blue-100">Years Experience</p>
              </div>
            </div>
            <div>
              <p className="font-body text-secondary font-semibold mb-2">Steffon Jean-Baptiste</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
                The person behind New Life Consulting
              </h2>
              <div className="font-body text-gray-500 space-y-4">
                <p>
                  I know what it feels like to stare at a credit score and feel stuck. Denied for apartments, hit with ridiculous interest rates, and nobody to help me figure it out. That was me.
                </p>
                <p>
                  Then things started to change. I learned how the system works, how to fix what was broken, and how to build something real. Watching those numbers climb changed my life.
                </p>
                <p>
                  That experience is why I started this company. I wanted everyday people to have the same access to credit guidance that banks and wealthy families get, at a price that actually works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Image */}
      <section className="relative py-32 sm:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          <Parallax intensity={-200} className="flex-1">
            <img src="/images/about/hannah-busing-Zyx1bK9mqmA-unsplash.jpg" alt="" className="w-full h-[120%] object-cover mt-[-10%]" />
          </Parallax>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="font-body text-white/80 font-semibold mb-3">What We Stand For</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
            Credit shouldn&apos;t be a mystery. It&apos;s a system. We know how it works.
          </h2>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Every decision we make, every plan we build, every conversation we have comes down to one thing: getting you real results, not just promises.
          </p>
        </div>
      </section>

      {/* 3b. Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Integrity", desc: "We do right by our clients, even when it's easier not to. No hidden fees, no runaround, no cutting corners.", color: "--secondary", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { title: "Transparency", desc: "You'll always know what we're doing and why. Monthly reports, direct access to your consultant, zero surprises.", color: "--accent", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
              { title: "Results", desc: "We care about one thing: moving your score forward. 120+ point average increases. 500+ clients served.", color: "--success", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            ].map((value) => (
              <div key={value.title} className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `color-mix(in srgb, var(${value.color}) 12%, transparent)` }}>
                  <svg className="w-6 h-6" style={{ color: `var(${value.color})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground">{value.title}</h3>
                <p className="font-body text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why "New Life" */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Why &ldquo;New Life&rdquo;?
              </h2>
              <p className="font-body text-lg text-gray-500 mb-6">
                The name says it all. When your credit changes, your life changes. Better rates. Approval letters instead of denial letters. Sleep instead of anxiety.
              </p>
              <p className="font-body text-gray-500">
                That&apos;s what we mean by &ldquo;new life.&rdquo; It&apos;s not just about numbers on a screen. It&apos;s about what those numbers let you do.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[380px] bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <CreditSpeedometer size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Workspace */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Where the Work Happens
            </h2>
            <p className="font-body text-gray-500 max-w-2xl mx-auto">
              A look inside New Life Consulting. Real office, real work, real results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: "/images/about/redd-francisco-5U_28ojjgms-unsplash.jpg", alt: "Office space" },
              { image: "/images/about/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg", alt: "Consultation room" },
              { image: "/images/about/charlesdeluvio-Lks7vei-eAg-unsplash.jpg", alt: "Working with clients" },
            ].map((photo) => (
              <div key={photo.alt} className="rounded-2xl overflow-hidden aspect-4/3 bg-gray-200 image-card">
                <img src={photo.image} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Band */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your New Life?
          </h2>
          <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let&apos;s figure out where you are and where you want to be.
          </p>
          <Button href="/contact" variant="white" size="lg">
            Book Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}