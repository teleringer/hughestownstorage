// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Basic validation
    if (!body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = `Hughestown Self-Storage <no-reply@hughestownstorage.com>`;
    const toOffice = "office@hughestownstorage.com";

    const subjectOffice = `New Contact Form Message from ${body.firstName ?? ""} ${body.lastName ?? ""}`.trim();
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
    await resend.emails.send({
      from,
      to: toOffice,
      replyTo: body.email,
      subject: subjectOffice,
      html: htmlOffice,
    });

    // Auto-reply to user
    await resend.emails.send({
      from,
      to: body.email,
      subject: subjectUser,
      html: htmlUser,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
