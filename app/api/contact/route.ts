import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICE_LABELS: Record<string, string> = {
  "credit-analysis": "Credit Score Analysis",
  "credit-repair": "Credit Repair",
  "financial-planning": "Financial Planning",
  "debt-management": "Debt Management",
  "financial-literacy": "Financial Literacy",
  consulting: "Expert Consulting",
  other: "Not sure yet",
};

const PLAN_LABELS: Record<string, { name: string; price: string }> = {
  assessment: { name: "Credit Assessment", price: "$99" },
  repair: { name: "Credit Repair Program", price: "$299/mo" },
  freedom: { name: "Financial Freedom", price: "$499" },
  consultation: { name: "Free Consultation", price: "Free" },
  "credit-analysis": { name: "Credit Score Analysis", price: "$99" },
  "credit-repair": { name: "Credit Repair", price: "$299/mo" },
  "financial-planning": { name: "Financial Planning", price: "$499" },
  "debt-management": { name: "Debt Management", price: "$499" },
  "financial-literacy": { name: "Financial Literacy", price: "" },
  consulting: { name: "Expert Consulting", price: "" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, plan, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const serviceLabel = SERVICE_LABELS[service] || service || "Not specified";
    const planInfo = plan ? PLAN_LABELS[plan] : null;

    let subject: string;
    let heading: string;
    if (planInfo && type === "plan") {
      subject = `New Plan Inquiry: ${name} — ${planInfo.name} (${planInfo.price})`;
      heading = "New Plan Inquiry";
    } else if (type === "service") {
      subject = `New Service Inquiry: ${name} — ${serviceLabel}`;
      heading = "New Service Inquiry";
    } else {
      subject = `New Contact: ${name} — ${serviceLabel}`;
      heading = "New Contact Form Submission";
    }

    await resend.emails.send({
      from: "New Life Consulting <noreply@newlifeconsulting.com>",
      to: process.env.CONTACT_EMAIL || "baptistesteffon@gmail.com",
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; margin-bottom: 8px;">${heading}</h2>
          <p style="color: #64748b; margin-bottom: 24px;">Submitted via the New Life Consulting website</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;"><a href="mailto:${email}" style="color: #1e40af;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${phone || "Not provided"}</td>
            </tr>
            ${type === "plan" && planInfo ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Plan</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${planInfo.name}${planInfo.price ? ` — ${planInfo.price}` : ""}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${serviceLabel}</td>
            </tr>
          </table>

          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="color: #1e293b; margin: 0; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
