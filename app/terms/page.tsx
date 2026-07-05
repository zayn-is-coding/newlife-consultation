import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of New Life Consulting services and website.",
  path: "/terms",
});

export default function TermsAndConditions() {
  const lastUpdated = "July 1, 2026";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full font-body text-sm font-medium mb-6 backdrop-blur-sm animate-slide-up">
            Legal
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">Terms & Conditions</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            Please read these terms carefully.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto font-body text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

          <div className="space-y-10">
            {/* 1 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the New Life Consulting website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Services Provided</h2>
              <p className="mb-4">
                New Life Consulting provides credit consulting services including but not limited to credit score analysis, credit repair, financial planning, debt management, financial literacy education, and expert consulting. The specific scope of services is outlined in individual agreements or proposals provided to clients.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Not Financial or Legal Advice</h2>
              <p className="mb-4">
                The information and services provided by New Life Consulting are for educational and informational purposes only. They do not constitute financial, legal, tax, or investment advice. You should consult with qualified professionals before making financial decisions. We do not guarantee specific credit score improvements or financial outcomes.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Client Responsibilities</h2>
              <p className="mb-4">As a client, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information necessary for our services.</li>
                <li>Respond to requests for information in a timely manner.</li>
                <li>Review and take action on recommendations provided within a reasonable timeframe.</li>
                <li>Maintain the confidentiality of your account and login credentials.</li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. Fees and Payment</h2>
              <p className="mb-4">
                Fees for services are outlined in individual service agreements or proposals. Payment terms are specified in your service agreement. Late payments may result in suspension of services. All fees are non-refundable unless otherwise stated in your service agreement.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. No Guarantees</h2>
              <p className="mb-4">
                While we strive to achieve the best possible outcomes for our clients, we do not guarantee specific results. Credit repair and financial improvement depend on many factors including your individual situation, creditor responses, and credit bureau processes. Past results do not guarantee future outcomes.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, New Life Consulting shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to the use of our services or website. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, and materials, is the property of New Life Consulting and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">9. Privacy</h2>
              <p className="mb-4">
                Your use of our services is also governed by our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated into these terms by reference. Please review it to understand how we collect and handle your information.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">10. Termination</h2>
              <p className="mb-4">
                Either party may terminate the service relationship at any time with written notice. Upon termination, you remain responsible for any fees incurred prior to the termination date. Sections of these terms that by their nature should survive termination will remain in effect.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">11. Dispute Resolution</h2>
              <p className="mb-4">
                Any disputes arising from these terms or our services shall first be addressed through good-faith negotiation. If unresolved, disputes will be submitted to binding arbitration in accordance with applicable rules. The laws of the State of New York govern these terms.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">12. Changes to These Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services after changes are posted constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <Link href="mailto:baptistesteffon@gmail.com" className="text-primary hover:underline">baptistesteffon@gmail.com</Link></li>
                <li>Phone: <Link href="tel:9178089765" className="text-primary hover:underline">(917) 808-9765</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
