import type { Metadata } from "next";

const SITE_NAME = "New Life Consulting";
const SITE_URL = "https://www.newlifeconsulting.com";
const DEFAULT_DESCRIPTION = "Expert credit consulting for everyday people. Transform your financial future with a team that cares.";
const DEFAULT_OG_IMAGE = "/api/og";

interface PageMetadata {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadata): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    telephone: "+1-917-808-9765",
    email: "baptistesteffon@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: "US",
    serviceType: ["Credit Consulting", "Credit Repair", "Financial Planning", "Debt Management"],
    priceRange: "$$",
    sameAs: [],
  };
}
