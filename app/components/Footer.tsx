"use client";

import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";
import Magnetic from "./Magnetic";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Newsletter — full width above the grid */}
        <div className="mb-14 pb-14 border-b border-white/10">
          <div className="md:max-w-2xl">
            <NewsletterSignup />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-xl font-bold mb-4">
              <Link href="/" className="hover:text-secondary transition-colors duration-200">
                New Life<span className="text-secondary"> Consulting</span>
              </Link>
            </h3>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-6">
              Expert credit consulting for everyday people. Transform your financial future with a team that cares.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" },
                { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" },
              ].map((social) => (
                <Magnetic strength={4} key={social.label}>
                  <Link
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-secondary/20 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-secondary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Credit Score Analysis", href: "/services#credit-analysis" },
                { label: "Credit Repair", href: "/services#credit-repair" },
                { label: "Financial Planning", href: "/services#financial-planning" },
                { label: "Debt Management", href: "/services#debt-management" },
                { label: "Financial Literacy", href: "/services#financial-literacy" },
                { label: "Expert Consulting", href: "/services#consulting" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-body text-sm text-gray-400 hover:text-secondary transition-colors duration-200">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/pricing" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-body text-sm text-gray-400 hover:text-secondary transition-colors duration-200">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Get in Touch</h4>
            <ul className="space-y-3">
              <Magnetic strength={2}>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <Link href="mailto:baptistesteffon@gmail.com" className="font-body text-sm text-gray-400 hover:text-secondary transition-colors duration-200 break-all">
                    baptistesteffon@gmail.com
                  </Link>
                </li>
              </Magnetic>
              <Magnetic strength={2}>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <Link href="tel:9178089765" className="font-body text-sm text-gray-400 hover:text-secondary transition-colors duration-200">
                  (917) 808-9765
                </Link>
              </li>
              </Magnetic>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-sm text-gray-400">
                  Serving clients nationwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-500">
            &copy; {currentYear} New Life Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="font-body text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
