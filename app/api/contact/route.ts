// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // Resend SDK needs Node runtime

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Accept both contact form and reservation payloads
    const name: string = (body?.name ?? "").toString();
    const email: string = (body?.email ?? "").toString();
    const phone: string = (body?.phone ?? "").toString();
    const message: string = (body?.message ?? "").toString();
    const subjectFromClient: string = (body?.subject ?? "").toString();

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO = process.env.CONTACT_TO;     // comma-separated list
    const CONTACT_FROM = process.env.CONTACT_FROM; // e.g. 'HSS <no-reply@hughestownstorage.com>'

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

    // If the client passed a subject (reservation), use it; otherwise fallback to contact subject.
    const subject =
      subjectFromClient?.trim() ||
      `New message from ${name || "Website"} (${phone || "no phone"})`;

    const officeRecipients = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);

    // 1) Send to the office
    await resend.emails.send({
      from: CONTACT_FROM,
      to: officeRecipients,
      replyTo: email?.trim() || undefined,
      subject,
      text:
`Name: ${name || "(not provided)"}
Email: ${email || "(not provided)"}
Phone: ${phone || "(not provided)"}

Message:
${message || "(no message)"}`,
    });

    // 2) Send confirmation copy to the customer (if email provided)
    if (email?.trim()) {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: [email.trim()], // force array
        subject: `Copy of your request: ${subject}`,
        text:
`Hi ${name || ""},

Here is a copy of what you submitted to Hughestown Self-Storage:

-----------------------------
${message || "(no message)"}
-----------------------------

If anything needs to be changed, just reply to this email.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`,
      });
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT API ERROR:", err);
    const msg = err?.message || err?.name || "Unknown error";
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, route: "contact", runtime });
}