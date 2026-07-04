import type { Metadata } from "next";
import { Suspense } from "react";
import ContactContent from "./_contact-content";
import { buildBreadcrumbs } from "@/lib/metadata";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with New Life Consulting. Free consultations, call, text, or email. We respond within 24 hours.",
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with New Life Consulting. Free consultations, call, text, or email.",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/api/og?title=Contact%20Us&subtitle=Free%20Consultations%20%E2%80%94%20Call%2C%20Text%20or%20Email&image=/images/home/matt-foxx-IUY_3DvM__w-unsplash.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbs = buildBreadcrumbs([
  { name: "Home", path: "/" },
  { name: "Contact" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Suspense>
        <ContactContent />
      </Suspense>
    </>
  );
}
