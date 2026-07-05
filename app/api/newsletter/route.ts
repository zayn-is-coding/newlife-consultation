import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
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

    // Add contact to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: "New Life Consulting <noreply@newlifeconsulting.com>",
      to: email,
      subject: "Welcome to New Life Consulting",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; margin-bottom: 16px;">Welcome to New Life Consulting!</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">
            Thanks for subscribing. You'll receive credit tips, industry updates, and exclusive offers directly to your inbox.
          </p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">
            If you're ready to take the next step, book a free consultation:
          </p>
          <a href="https://www.newlifeconsulting.com/booking" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Book Free Consultation
          </a>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 32px;">
            New Life Consulting | Credit Consulting for Everyday People
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
