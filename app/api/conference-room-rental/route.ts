import { Resend } from "resend";

export const runtime = "nodejs"; // Resend SDK needs Node runtime

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      phone,
      date,
      startTime,
      endTime,
      attendees,
      purpose,
      message,
    } = data ?? {};

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

    // Basic validation (keep it light—don’t break the UX)
    if (!name || !email || !phone || !date || !startTime || !endTime || !attendees || !purpose) {
      return Response.json({ ok: false, error: "MISSING_REQUIRED_FIELDS" }, { status: 400 });
    }

    const resend = new Resend(RESEND_API_KEY);

    const officeRecipients = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);

    // 1) Send to office/admin inbox
    await resend.emails.send({
      from: CONTACT_FROM, // e.g. 'Hughestown <onboarding@resend.dev>' or your verified sender
      to: officeRecipients,
      replyTo: email || undefined,
      subject: `Conference Room Booking Request – ${date}`,
      text: `Conference Room Booking Request

Name: ${name}
Email: ${email}
Phone: ${phone}

Date: ${date}
Time: ${startTime} – ${endTime}
Attendees: ${attendees}
Purpose: ${purpose}

Additional Notes:
${message || "(none)"}
`,
    });

    // 2) Auto-reply to the person who submitted (confirmation)
    await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: "We received your conference room booking request",
      text: `Hi ${name},

Thanks for your conference room booking request! We received the details below and will follow up to confirm availability.

Date: ${date}
Time: ${startTime} – ${endTime}
Attendees: ${attendees}
Purpose: ${purpose}

If you need to update anything, just reply to this email.

– Hughestown Self-Storage
(570) 362-6150
`,
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("BOOKING ERROR:", err);
    const msg = err?.message || err?.name || "Booking failed";
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}

// Optional health check endpoint
export async function GET() {
  return Response.json({ ok: true, route: "conference-room-booking", runtime });
}
