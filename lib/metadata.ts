import type { Metadata } from "next";

const SITE_NAME = "New Life Consulting";
const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";
const DEFAULT_DESCRIPTION = "Expert credit consulting for everyday people. Transform your financial future with a team that cares.";
const LOGO_URL = `${SITE_URL}/images/Screenshot_20260627_184529_209.jpg`;

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
  ogImage,
  noindex = false,
}: PageMetadata): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage
    ? `${SITE_URL}${ogImage}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

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
          url: ogImageUrl,
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
      images: [ogImageUrl],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// --- Structured Data Helpers ---

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: DEFAULT_DESCRIPTION,
    email: "baptistesteffon@gmail.com",
    telephone: "+1-917-808-9765",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: "US",
    serviceType: ["Credit Consulting", "Credit Repair", "Financial Planning", "Debt Management"],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-917-808-9765",
      email: "baptistesteffon@gmail.com",
      url: `${SITE_URL}/contact`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Credit Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Credit Score Analysis",
            description: "Full tri-bureau credit report review with personalized action plan.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Credit Repair",
            description: "Dispute inaccurate negative items with all three bureaus.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Financial Planning",
            description: "Custom budget, savings, and wealth building strategies.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Debt Management",
            description: "Creditor negotiations and payoff strategy structuring.",
          },
        },
      ],
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-US",
  };
}

export function buildLocalBusinessSchema() {
  return {
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
    image: LOGO_URL,
    sameAs: [],
  };
}

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildLocalBusinessSchema(),
    ],
  };
}

export function buildBreadcrumbs(crumbs: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${SITE_URL}${crumb.path}` } : {}),
    })),
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
