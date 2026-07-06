import type { Metadata } from "next";
import { Stack_Sans_Notch, Montserrat, Geist } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import NewsletterPopup from "./components/NewsletterPopup";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { buildStructuredData } from "@/lib/metadata";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const newRocker = Stack_Sans_Notch({
  variable: "--font-new-rocker",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.SITE_URL || "https://www.newlifeconsulting.com";

export const metadata: Metadata = {
  title: {
    default: "New Life Consulting | Credit Consulting for Everyday People",
    template: "%s | New Life Consulting",
  },
  description: "Expert credit consulting for everyday people. Transform your financial future with a team that cares. Credit repair, financial planning, and debt management.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: "New Life Consulting",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/api/og?title=New%20Life%20Consulting&subtitle=Credit%20Consulting%20for%20Everyday%20People&image=/images/Screenshot_20260627_184529_209.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/api/og?title=New%20Life%20Consulting&subtitle=Credit%20Consulting%20for%20Everyday%20People&image=/images/Screenshot_20260627_184529_209.jpg`],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", newRocker.variable, montserrat.variable, "font-sans", geist.variable)}
    >
      <head>
        <link href="https://fonts.cdnfonts.com/css/digital-7-mono" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieConsent />
        <NewsletterPopup />
      </body>
    </html>
  );
}