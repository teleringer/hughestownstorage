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
    const subjectFromClient = (body?.subject ?? "").toString(); // NEW

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

    const toList = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);

    // Use the client subject if provided (reservation uses this),
    // otherwise fall back to the normal contact subject.
    const subject =
      subjectFromClient?.trim() ||
      `New message from ${name || "Website"} (${phone || "no phone"})`;

    // 1) Send to the office
    await resend.emails.send({
      from: CONTACT_FROM,
      to: toList,
      replyTo: email || undefined, // reply goes to customer for the office copy
      subject,
      text:
`Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    });

    // 2) Send customer confirmation (only if they provided an email)
    // For reservation orders, we send the full order text back to them.
    if (email) {
      const isReservation =
        subject.includes("Moving Supplies Reservation") ||
        message.includes("MOVING SUPPLIES RESERVATION ORDER");

      const customerSubject = isReservation
        ? `Copy of your request: ${subject}`
        : "Thanks for contacting Hughestown Self-Storage";

      const customerText = isReservation
        ? `Hi ${name || ""},

Here is a copy of what you submitted to Hughestown Self-Storage:

-----------------------------
${message}
-----------------------------

If anything needs to be changed, just reply to this email.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`
        : `Hi ${name || ""},

Thanks for reaching out! We received your message and will get back to you soon.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`;

      await resend.emails.send({
        from: CONTACT_FROM,
        to: email,
        // IMPORTANT: When the customer hits Reply, it should go to your office.
        replyTo: toList[0],
        subject: customerSubject,
        text: customerText,
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