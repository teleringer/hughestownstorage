// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure Node runtime (Resend SDK needs Node, not Edge)
export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  interests?: string[];
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: email and message are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY on server." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // QUICK TEST SENDER: works without domain verification.
    // After it works, switch to: `Hughestown Self-Storage <no-reply@hughestownstorage.com>`
    const from = "Hughestown Self-Storage <onboarding@resend.dev>";
    const toOffice = "office@hughestownstorage.com";

    const subjectOffice = `New Contact Form Message from ${[body.firstName, body.lastName].filter(Boolean).join(" ") || "Website Visitor"}`;
    const subjectUser = "We received your message — Hughestown Self-Storage";

    const htmlOffice = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${[body.firstName, body.lastName].filter(Boolean).join(" ") || "(not provided)"}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || "(not provided)"}</p>
      <p><strong>Interests:</strong> ${(body.interests && body.interests.join(", ")) || "(none selected)"}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${body.message}</pre>
    `;

    const htmlUser = `
      <p>Hi ${body.firstName ?? ""}${body.firstName ? "," : ""}</p>
      <p>Thanks for contacting <strong>Hughestown Self-Storage</strong>. We’ve received your message and will get back to you shortly.</p>
      <p><strong>Copy of your message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${body.message}</pre>
      <p>— Hughestown Self-Storage<br/>133 New Street, Hughestown, PA 18640<br/>(570) 362-6150</p>
    `;

    // Send to office
    const officeRes = await resend.emails.send({
      from,
      to: toOffice,
      replyTo: body.email,
      subject: subjectOffice,
      html: htmlOffice,
    });

    // Auto-reply to user
    const userRes = await resend.emails.send({
      from,
      to: body.email,
      subject: subjectUser,
      html: htmlUser,
    });

    // If Resend returns errors, surface them
    if ((officeRes as any)?.error || (userRes as any)?.error) {
      return NextResponse.json(
        { ok: false, error: (officeRes as any)?.error || (userRes as any)?.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Return error to client for easier debugging (remove later if you prefer)
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}

// Optional: a simple GET to verify the route is deployed
export async function GET() {
  return NextResponse.json({ ok: true, route: "contact", method: "GET" });
}
