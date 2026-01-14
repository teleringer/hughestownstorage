// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // IMPORTANT: Resend SDK needs Node runtime

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO = process.env.CONTACT_TO;
    const CONTACT_FROM = process.env.CONTACT_FROM;

    if (!RESEND_API_KEY) {
      return Response.json({ ok: false, error: "ENV_MISSING_RESEND_API_KEY" }, { status: 500 });
    }
    if (!CONTACT_TO) {
      return Response.json({ ok: false, error: "ENV_MISSING_CONTACT_TO" }, { status: 500 });
    }
    if (!CONTACT_FROM) {
      return Response.json({ ok: false, error: "ENV_MISSING_CONTACT_FROM" }, { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `New message from ${name || "Website"} (${phone || "no phone"})`;

    // Send to the office
    await resend.emails.send({
      from: CONTACT_FROM,           // e.g. 'Hughestown <no-reply@hughestownstorage.com>'
      to: CONTACT_TO.split(",").map(s => s.trim()),
      replyTo: email || undefined,  // lets you reply directly to the sender
      subject,
      text:
`Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    });

    // Auto-reply to the sender (only if they provided an email)
    if (email) {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: email,
        subject: "Thanks for contacting Hughestown Self-Storage",
        text:
`Hi ${name || ""},

Thanks for reaching out! We received your message and will get back to you soon.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`,
      });
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    // Log the full error to Vercel function logs and return a readable message
    console.error("CONTACT API ERROR:", err);
    const msg = err?.message || err?.name || "Unknown error";
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, route: "contact", runtime });
}
