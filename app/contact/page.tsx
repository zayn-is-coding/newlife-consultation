import type { Metadata } from "next";
import { Suspense } from "react";
import ContactContent from "./_contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with New Life Consulting. Free consultations, call, text, or email. We respond within 24 hours.",
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with New Life Consulting. Free consultations, call, text, or email.",
    url: "https://www.newlifeconsulting.com/contact",
    images: [{ url: "/api/og?title=Contact%20Us&subtitle=Free%20Consultations%20%E2%80%94%20Call%2C%20Text%20or%20Email", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
