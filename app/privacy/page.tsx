import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How New Life Consulting collects, uses, and protects your personal information. Your privacy matters to us.",
  path: "/privacy",
});

export default function PrivacyPolicy() {
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
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up-delay">Privacy Policy</h1>
          <p className="font-body text-xl text-blue-100 max-w-2xl mx-auto animate-slide-up-delay-2">
            Your privacy matters to us.
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
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                When you use our website or services, we may collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and any information you provide through our contact form or during consultations.</li>
                <li><strong>Credit Information:</strong> Credit report details you choose to share with us for analysis and consulting purposes.</li>
                <li><strong>Usage Data:</strong> Browser type, pages visited, time spent on pages, and other analytics data collected automatically through cookies and similar technologies.</li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide credit consulting services and respond to your inquiries.</li>
                <li>Send you appointment confirmations, updates, and relevant communications.</li>
                <li>Analyze credit data and deliver personalized recommendations.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Comply with legal obligations and protect our rights.</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. How We Share Your Information</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in operating our website or providing services (e.g., email delivery, scheduling tools), bound by confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">
                Our website uses cookies and similar technologies to enhance your browsing experience and collect analytics data. You can control cookie preferences through your browser settings. Essential cookies required for the site to function cannot be disabled.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of marketing communications at any time.</li>
                <li>Request a copy of the data we hold about you.</li>
                <li>Withdraw consent for data processing where applicable.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:baptistesteffon@gmail.com" className="text-primary hover:underline">baptistesteffon@gmail.com</a>.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only for as long as necessary to provide our services and fulfill the purposes described in this policy. When your data is no longer needed, we securely delete or anonymize it.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">9. Children&apos;s Privacy</h2>
              <p className="mb-4">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:baptistesteffon@gmail.com" className="text-primary hover:underline">baptistesteffon@gmail.com</a></li>
                <li>Phone: <a href="tel:9178089765" className="text-primary hover:underline">(917) 808-9765</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
