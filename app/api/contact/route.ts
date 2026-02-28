// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // Resend SDK needs Node runtime

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, subject } = await req.json();

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

    const safeName = (name || "Website").toString();
    const safePhone = (phone || "no phone").toString();
    const safeEmail = (email || "").toString().trim();
    const safeMessage = (message || "").toString();

    // If the frontend passed a subject (reservation form does), use it.
    // Otherwise fall back to the standard contact subject.
    const officeSubject =
      (subject && String(subject).trim()) ||
      `New message from ${safeName} (${safePhone})`;

    // 1) Send to the office
    await resend.emails.send({
      from: CONTACT_FROM, // e.g. 'Hughestown <no-reply@hughestownstorage.com>'
      to: CONTACT_TO.split(",").map((s) => s.trim()),
      replyTo: safeEmail || undefined,
      subject: officeSubject,
      text: `Name: ${safeName}
Email: ${safeEmail || "N/A"}
Phone: ${safePhone}

Message:
${safeMessage}`,
    });

    // 2) Send a copy to the customer (only if they provided an email)
    if (safeEmail) {
      const isReservation =
        typeof officeSubject === "string" &&
        officeSubject.toLowerCase().includes("reservation");

      const customerSubject = isReservation
        ? "✅ Your Moving Supplies Reservation (Hughestown Self-Storage)"
        : "Thanks for contacting Hughestown Self-Storage";

      const customerText = isReservation
        ? `Hi ${safeName},

Thanks — we received your moving supplies reservation request.

Here is a copy of your order for your records:

------------------------
${safeMessage}
------------------------

We will contact you shortly to confirm availability and pickup details.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`
        : `Hi ${safeName},

Thanks for reaching out! We received your message and will get back to you soon.

– Hughestown Self-Storage
(570) 362-6150
office@hughestownstorage.com`;

      await resend.emails.send({
        from: CONTACT_FROM,
        to: safeEmail,
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