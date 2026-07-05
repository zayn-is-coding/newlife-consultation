"use client";

import Image from "next/image";
import Button from "../components/Button";
import CreditSpeedometer from "../components/CreditSpeedometer";
import Magnetic from "../components/Magnetic";
import Parallax from "../components/Parallax";
import ReviewsCarousel from "../components/ReviewsCarousel";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
};

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
  { text: "My student loans were in default and I thought there was no way out. New Life helped me negotiate a payment plan I could actually afford and got my credit back on track.", name: "Brian K.", role: "Debt Management Client", initials: "BK", cssVar: "--success" },
  { text: "I was paying $300/month for car insurance because of my credit. After working with New Life, my score went up 150 points and my insurance dropped to $140/month. That's $1,920/year back in my pocket.", name: "Latisha J.", role: "Credit Repair Client", initials: "LJ", cssVar: "--warning" },
  { text: "I applied for a mortgage and got denied. My realtor recommended New Life. Six months later I closed on my dream home at a rate I never thought possible.", name: "Robert H.", role: "Credit Repair Client", initials: "RH", cssVar: "--danger" },
  { text: "As a veteran, I thought I knew everything about finances. I was wrong. The financial literacy session opened my eyes to things I'd been doing wrong for 20 years.", name: "Derek S.", role: "Financial Literacy Client", initials: "DS", cssVar: "--primary" },
  { text: "My wife and I were drowning in credit card debt. $67K total. New Life helped us consolidate and negotiate. We're now debt-free and actually saving money.", name: "Michael & Lisa W.", role: "Debt Management Client", initials: "MW", cssVar: "--secondary" },
  { text: "I'm a freelancer with irregular income. Banks kept denying me because they couldn't verify my income. New Life found a way to make it work. Now I have a business credit card with a $25K limit.", name: "Jasmine C.", role: "Business Credit Client", initials: "JC", cssVar: "--accent" },
  { text: "The best investment I ever made. Period. My credit score went from 510 to 740 in 8 months. I saved over $40,000 in interest on my mortgage refinance.", name: "William D.", role: "Credit Repair Client", initials: "WD", cssVar: "--success" },
  { text: "I was about to lose my apartment because of a collections item from 2017. New Life got it removed in 3 weeks and my landlord renewed my lease. I can't thank them enough.", name: "Tamara R.", role: "Credit Repair Client", initials: "TR", cssVar: "--warning" },
  { text: "My credit was ruined by a business failure. 420 score. Nobody would help me. New Life took my case and got my score to 680. I'm back in business.", name: "Andre L.", role: "Credit Repair Client", initials: "AL", cssVar: "--danger" },
  { text: "I'm a nurse working 60 hours a week. I didn't have time to deal with my credit. New Life handled everything. Score went from 580 to 720 while I focused on my patients.", name: "Keisha N.", role: "Credit Repair Client", initials: "KN", cssVar: "--primary" },
  { text: "My identity was stolen and 7 fraudulent accounts were opened in my name. New Life got every single one removed and my score recovered in 4 months.", name: "David P.", role: "Credit Repair Client", initials: "DP", cssVar: "--secondary" },
  { text: "I run a nonprofit and we needed a line of credit for operations. New Life helped me build business credit separate from my personal. Game changer.", name: "Rebecca F.", role: "Business Credit Client", initials: "RF", cssVar: "--accent" },
  { text: "My kids are going to college next year and I needed to fix my credit to co-sign their loans. New Life made it happen in time. Both got approved.", name: "Patricia G.", role: "Credit Repair Client", initials: "PG", cssVar: "--success" },
];

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
            From Client to Founder
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">How One Credit Problem Became a Mission to Help 500+ People</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            From client to founder: the story behind New Life Consulting.
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
                Steffon Knows What It Feels Like to Be Stuck
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
            <Image src="/images/about/hannah-busing-Zyx1bK9mqmA-unsplash.jpg" alt="" className="w-full h-[120%] object-cover mt-[-10%]" width={1000} height={1000} />
          </Parallax>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="font-body text-white/80 font-semibold mb-3">What We Stand For</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
            Credit Is a System.<br />We Know How It Works.
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
              500+ Clients Served From Right Here
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
                <Image src={photo.image} alt={photo.alt} className="w-full h-full object-cover" width={500} height={500} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Client Reviews */}
      <section id="reviews" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              500+ Clients, Real Results
            </h2>
            <p className="font-body text-gray-500 max-w-2xl mx-auto">
              Don&apos;t take our word for it. Here&apos;s what our clients say about working with New Life Consulting.
            </p>
          </div>
          <ReviewsCarousel reviews={REVIEWS} />
        </div>
      </section>

      {/* 7. CTA Band */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Your New Life Starts With One Call
          </h2>
          <p className="font-body text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let&apos;s figure out where you are and where you want to be.
          </p>
          <Magnetic>
            <Button href="/booking" variant="white" size="lg">
              Book Free Consultation
            </Button>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}