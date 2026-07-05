import type { Metadata } from "next";
import ServicesContent from "./_services-content";
import { buildBreadcrumbs } from "@/lib/metadata";

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

export const metadata: Metadata = {
  title: "Our Services | Credit Repair, Financial Planning & More",
  description:
    "Credit score analysis, credit repair, financial planning, debt management, and financial literacy. Every service built around your situation.",
  openGraph: {
    title: "Our Services | Credit Repair, Financial Planning & More",
    description:
      "Credit score analysis, credit repair, financial planning, debt management, and financial literacy.",
    url: `${SITE_URL}/services`,
    images: [{ url: `${SITE_URL}/api/og?title=Our%20Services&subtitle=Credit%20Repair%2C%20Financial%20Planning%20%26%20More&image=/images/Screenshot_20260501_164240_Drive.jpg`, width: 1200, height: 630 }],
  },
};

const breadcrumbs = buildBreadcrumbs([
  { name: "Home", path: "/" },
  { name: "Services" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ServicesContent />
    </>
  );
}
