import type { Metadata } from "next";
import ServicesContent from "./_services-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Credit score analysis, credit repair, financial planning, debt management, financial literacy, and expert consulting. We help you take control of your financial future.",
  openGraph: {
    title: "Our Services",
    description:
      "Credit score analysis, credit repair, financial planning, debt management, financial literacy, and expert consulting.",
    url: "https://www.newlifeconsulting.com/services",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServicesContent />;
}
