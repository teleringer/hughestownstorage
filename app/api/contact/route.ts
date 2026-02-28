// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // Resend SDK needs Node runtime

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name ?? "").toString();
    const email = (body?.email ?? "").toString();
    const phone = (body?.phone ?? "").toString();
    const message = (body?.message ?? "").toString();
    const subjectFromClient = (body?.subject ?? "").toString();

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

    // Use subject from client if provided (reservation flow), otherwise default (contact form)
    const subject =
      subjectFromClient.trim().length > 0
        ? subjectFromClient.trim()
        : `New message from ${name || "Website"} (${phone || "no phone"})`;

    const officeTo = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);

    // 1) Send to the office
    await resend.emails.send({
      from: CONTACT_FROM,
      to: officeTo,
      replyTo: email || undefined,
      subject,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    });

    // 2) Send confirmation to customer (best-effort)
    const safeEmail = email.trim();
    if (safeEmail) {
      try {
        await resend.emails.send({
          from: CONTACT_FROM,
          to: safeEmail,
          replyTo: "office@hughestownstorage.com",
          subject: `✅ We received your reservation order — Hughestown Self-Storage`,
          text: `Hi ${name || ""},

Thanks — we received your reservation order. Here is a copy for your records:

${message}

If you have questions or need to update your order, reply to this email or call us.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`,
        });
      } catch (customerErr: any) {
        // Don’t fail the whole request; just log it.
        console.error("CUSTOMER CONFIRMATION EMAIL FAILED:", customerErr);
      }
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