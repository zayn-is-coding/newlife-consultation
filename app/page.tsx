import type { Metadata } from "next";
import HomeContent from "./_home-content";

export const metadata: Metadata = {
  title: "Credit Consulting for Everyday People",
  description:
    "Expert credit consulting for everyday people. Credit repair, financial planning, debt management, and more. Transform your financial future with a team that cares.",
  openGraph: {
    title: "Credit Consulting for Everyday People",
    description:
      "Expert credit consulting for everyday people. Credit repair, financial planning, debt management, and more.",
    url: "https://www.newlifeconsulting.com",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <HomeContent />;
}
