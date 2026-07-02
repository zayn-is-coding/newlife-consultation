import type { Metadata } from "next";
import PricingContent from "./_pricing-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for credit consulting services. Choose the plan that fits your needs. No hidden fees.",
  openGraph: {
    title: "Pricing",
    description:
      "Transparent pricing for credit consulting services. Choose the plan that fits your needs.",
    url: "https://www.newlifeconsulting.com/pricing",
    images: [{ url: "/api/og?title=Pricing&subtitle=Transparent%20Pricing%20for%20Credit%20Consulting", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PricingContent />;
}
