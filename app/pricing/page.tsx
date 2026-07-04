import type { Metadata } from "next";
import PricingContent from "./_pricing-content";
import { buildBreadcrumbs, buildFAQSchema } from "@/lib/metadata";
import { pricingFaqs } from "@/lib/faqs";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for credit consulting services. Choose the plan that fits your needs. No hidden fees.",
  openGraph: {
    title: "Pricing",
    description:
      "Transparent pricing for credit consulting services. Choose the plan that fits your needs.",
    url: `${SITE_URL}/pricing`,
    images: [{ url: `${SITE_URL}/api/og?title=Pricing&subtitle=Transparent%20Pricing%20for%20Credit%20Consulting&image=/images/Screenshot_20260503_114017_Telegram.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbs = buildBreadcrumbs([
  { name: "Home", path: "/" },
  { name: "Pricing" },
]);

const faqSchema = buildFAQSchema(
  pricingFaqs.map((faq) => ({ question: faq.q, answer: faq.a }))
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PricingContent />
    </>
  );
}
