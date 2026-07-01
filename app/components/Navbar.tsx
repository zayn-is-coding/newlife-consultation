"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "./Button";
import Magnetic from "./Magnetic";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="font-display text-xl font-bold text-primary hover:text-primary-dark transition-colors">
              New Life Consulting
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`
                        relative px-4 py-2 rounded-lg font-body text-sm font-medium nav-link-hover transition-all duration-200
                        ${isActive
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-gray-600 hover:text-primary hover:bg-gray-100"
                        }
                      `}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Magnetic strength={30}>
                <Button href="/contact" variant="primary" size="sm" className="btn-nav">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Now
                </Button>
              </Magnetic>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile panel */}
      <div className={`nav-mobile-panel ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="font-display text-lg font-bold text-primary">
            New Life Consulting
          </Link>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-2 mb-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    block px-4 py-3 rounded-lg font-body font-medium transition-all duration-200
                    ${isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto">
          <Button href="/contact" variant="primary" fullWidth className="btn-nav">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Now
          </Button>
        </div>
      </div>
    </>
  );
}