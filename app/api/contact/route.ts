// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

type OrderItem = {
  name: string;
  size?: string;
  price: string;
  qty: number;
};

type ReservationOrder = {
  type: "moving-supplies-reservation";
  items: OrderItem[];
  subtotalCents: number;
  subtotalFormatted: string;
  itemCount: number;
};

function escapeHtml(input: string) {
  return (input || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");
}

function buildEmailShell(opts: {
  title: string;
  preheader: string;
  bodyHtml: string;
}) {
  const { title, preheader, bodyHtml } = opts;

  // Simple, consistent, “professional” system email template
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f6f7fb;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <div style="padding:24px;">
      <div style="max-width:720px;margin:0 auto;">
        <div style="background:#ffffff;border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,0.08);overflow:hidden;">
          <div style="background:#f97316;color:#fff;padding:18px 22px;">
            <div style="font-size:14px;letter-spacing:0.3px;opacity:0.95;">Hughestown Self-Storage</div>
            <div style="font-size:20px;font-weight:800;margin-top:4px;">${escapeHtml(title)}</div>
          </div>

          <div style="padding:22px;">
            ${bodyHtml}
            <div style="margin-top:22px;border-top:1px solid #e7e7ee;padding-top:14px;color:#6b7280;font-size:12px;line-height:1.4;">
              Hughestown Self-Storage • (570) 362-6150 • office@hughestownstorage.com
            </div>
          </div>
        </div>

        <div style="text-align:center;color:#9ca3af;font-size:12px;margin-top:14px;">
          If you did not submit this request, you can ignore this email.
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function renderReservationTable(order: ReservationOrder) {
  const rows = order.items
    .map((it) => {
      const name = escapeHtml(it.name);
      const size = it.size ? `<div style="color:#6b7280;font-size:12px;margin-top:2px;">${escapeHtml(it.size)}</div>` : "";
      const price = escapeHtml(it.price);
      const qty = String(it.qty);

      return `<tr>
        <td style="padding:10px 8px;border-bottom:1px solid #f0f0f5;">
          <div style="font-weight:700;color:#111827;">${name}</div>
          ${size}
        </td>
        <td style="padding:10px 8px;text-align:center;border-bottom:1px solid #f0f0f5;color:#111827;">${qty}</td>
        <td style="padding:10px 8px;text-align:right;border-bottom:1px solid #f0f0f5;color:#111827;">${price}</td>
      </tr>`;
    })
    .join("");

  return `
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th align="left" style="padding:10px 8px;border-bottom:2px solid #e7e7ee;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:.04em;">Item</th>
          <th align="center" style="padding:10px 8px;border-bottom:2px solid #e7e7ee;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:.04em;">Qty</th>
          <th align="right" style="padding:10px 8px;border-bottom:2px solid #e7e7ee;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:.04em;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr>
          <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:700;color:#111827;">Subtotal</td>
          <td style="padding:12px 8px;text-align:right;font-weight:900;color:#111827;">${escapeHtml(order.subtotalFormatted)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name ?? "").toString();
    const email = (body?.email ?? "").toString();
    const phone = (body?.phone ?? "").toString();
    const message = (body?.message ?? "").toString();
    const subjectFromClient = body?.subject ? String(body.subject) : "";
    const notes = body?.notes ? String(body.notes) : "";
    const order: ReservationOrder | undefined = body?.order;

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

    // If caller passed a custom subject, use it; otherwise default
    const subject =
      subjectFromClient?.trim() ||
      `New message from ${name || "Website"} (${phone || "no phone"})`;

    const isReservation = order?.type === "moving-supplies-reservation";

    // OFFICE EMAIL (HTML)
    const officeBodyHtml = isReservation
      ? `
        <p style="margin:0 0 10px;color:#111827;font-size:14px;line-height:1.5;">
          A customer submitted a <b>Moving Supplies Reservation</b>.
        </p>

        <div style="background:#f9fafb;border:1px solid #eef0f5;border-radius:12px;padding:14px;margin:12px 0;">
          <div style="font-size:13px;color:#374151;"><b>Customer:</b> ${escapeHtml(name || "—")}</div>
          <div style="font-size:13px;color:#374151;"><b>Phone:</b> ${escapeHtml(phone || "—")}</div>
          <div style="font-size:13px;color:#374151;"><b>Email:</b> ${escapeHtml(email || "—")}</div>
          ${notes ? `<div style="font-size:13px;color:#374151;margin-top:8px;"><b>Notes:</b> ${escapeHtml(notes)}</div>` : ""}
        </div>

        <div style="margin-top:14px;">
          ${renderReservationTable(order)}
        </div>
      `
      : `
        <p style="margin:0 0 10px;color:#111827;font-size:14px;line-height:1.5;">
          You received a new message from your website contact form.
        </p>

        <div style="background:#f9fafb;border:1px solid #eef0f5;border-radius:12px;padding:14px;margin:12px 0;">
          <div style="font-size:13px;color:#374151;"><b>Name:</b> ${escapeHtml(name || "—")}</div>
          <div style="font-size:13px;color:#374151;"><b>Email:</b> ${escapeHtml(email || "—")}</div>
          <div style="font-size:13px;color:#374151;"><b>Phone:</b> ${escapeHtml(phone || "—")}</div>
        </div>

        <div style="margin-top:12px;">
          <div style="font-size:13px;color:#6b7280;margin-bottom:6px;"><b>Message</b></div>
          <div style="white-space:pre-wrap;background:#ffffff;border:1px solid #eef0f5;border-radius:12px;padding:14px;color:#111827;font-size:13px;line-height:1.5;">
            ${escapeHtml(message || "")}
          </div>
        </div>
      `;

    const officeHtml = buildEmailShell({
      title: isReservation ? "New Reservation Order" : "New Website Message",
      preheader: isReservation
        ? `New moving supplies reservation from ${name || "a customer"}`
        : `New message from ${name || "Website"}`,
      bodyHtml: officeBodyHtml
    });

    // Send to the office
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((s) => s.trim()),
      replyTo: isEmail(email) ? email : undefined,
      subject,
      text:
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: officeHtml
    });

    // CUSTOMER EMAIL (HTML)
    // Only send if they provided a valid email
    if (isEmail(email)) {
      const customerTitle = isReservation ? "We received your reservation request" : "We received your message";

      const customerBodyHtml = isReservation
        ? `
          <p style="margin:0 0 10px;color:#111827;font-size:14px;line-height:1.5;">
            Hi ${escapeHtml(name || "")},
          </p>
          <p style="margin:0 0 14px;color:#111827;font-size:14px;line-height:1.5;">
            Thanks — we received your <b>Moving Supplies Reservation</b>. We’ll contact you shortly to confirm availability and pickup details.
          </p>

          <div style="background:#f9fafb;border:1px solid #eef0f5;border-radius:12px;padding:14px;margin:12px 0;">
            <div style="font-size:13px;color:#374151;"><b>Name:</b> ${escapeHtml(name || "—")}</div>
            <div style="font-size:13px;color:#374151;"><b>Phone:</b> ${escapeHtml(phone || "—")}</div>
            <div style="font-size:13px;color:#374151;"><b>Email:</b> ${escapeHtml(email || "—")}</div>
            ${notes ? `<div style="font-size:13px;color:#374151;margin-top:8px;"><b>Notes:</b> ${escapeHtml(notes)}</div>` : ""}
          </div>

          <div style="margin-top:14px;">
            ${renderReservationTable(order)}
          </div>

          <p style="margin:14px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">
            If anything needs to be changed, just reply to this email.
          </p>
        `
        : `
          <p style="margin:0 0 10px;color:#111827;font-size:14px;line-height:1.5;">
            Hi ${escapeHtml(name || "")},
          </p>
          <p style="margin:0 0 14px;color:#111827;font-size:14px;line-height:1.5;">
            Thanks for reaching out! We received your message and will get back to you soon.
          </p>
          <div style="margin-top:12px;">
            <div style="font-size:13px;color:#6b7280;margin-bottom:6px;"><b>Your message</b></div>
            <div style="white-space:pre-wrap;background:#ffffff;border:1px solid #eef0f5;border-radius:12px;padding:14px;color:#111827;font-size:13px;line-height:1.5;">
              ${escapeHtml(message || "")}
            </div>
          </div>
        `;

      const customerHtml = buildEmailShell({
        title: customerTitle,
        preheader: isReservation
          ? `We received your moving supplies reservation.`
          : `We received your message.`,
        bodyHtml: customerBodyHtml
      });

      // IMPORTANT:
      // Use CONTACT_FROM as the "from" address (verified domain). That's why onboarding@resend.dev caused 403.
      // Also set replyTo to the office so customer replies go to you.
      await resend.emails.send({
        from: CONTACT_FROM,
        to: email,
        replyTo: "office@hughestownstorage.com",
        subject: isReservation
          ? `Copy of your request: ${subject}`
          : "Thanks for contacting Hughestown Self-Storage",
        text:
          isReservation
            ? `Hi ${name || ""},\n\nHere is a copy of your reservation request:\n\n${message}\n\nIf anything needs to be changed, just reply to this email.\n\n– Hughestown Self-Storage\n(570) 362-6150\noffice@hughestownstorage.com`
            : `Hi ${name || ""},\n\nThanks for reaching out! We received your message and will get back to you soon.\n\n– Hughestown Self-Storage\n(570) 362-6150\noffice@hughestownstorage.com`,
        html: customerHtml
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