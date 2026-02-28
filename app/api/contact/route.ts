// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // Resend SDK needs Node runtime

type IncomingItem = {
  name: string;
  size?: string;
  qty: number;
  price: string; // like "$2.99"
};

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function priceToNumber(price: string) {
  const n = Number((price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function buildReservationHtml(opts: {
  logoUrl: string;
  subject: string;
  introTitle: string;
  introText: string;
  items: IncomingItem[];
  notes?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  taxRate: number; // 0.06
  footerLine1: string;
  footerLine2: string;
  footerLine3: string;
}) {
  const {
    logoUrl,
    subject,
    introTitle,
    introText,
    items,
    notes,
    customerName,
    customerPhone,
    customerEmail,
    taxRate,
    footerLine1,
    footerLine2,
    footerLine3
  } = opts;

  const subtotal = items.reduce((sum, it) => {
    return sum + it.qty * priceToNumber(it.price);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const rows = items
    .map((it) => {
      const itemName = escapeHtml(it.name);
      const itemSize = it.size ? `<div style="font-size:12px;color:#6b7280;margin-top:2px;">${escapeHtml(it.size)}</div>` : "";
      const qty = escapeHtml(String(it.qty));
      const price = escapeHtml(it.price);

      return `
        <tr>
          <td style="padding:12px;border-top:1px solid #e5e7eb;vertical-align:top;">
            <div style="font-weight:700;color:#111827;">${itemName}</div>
            ${itemSize}
          </td>
          <td style="padding:12px;border-top:1px solid #e5e7eb;text-align:center;vertical-align:top;color:#111827;font-weight:700;">
            ${qty}
          </td>
          <td style="padding:12px;border-top:1px solid #e5e7eb;text-align:right;vertical-align:top;color:#111827;font-weight:700;">
            ${price}
          </td>
        </tr>
      `;
    })
    .join("");

  const notesBlock = notes?.trim()
    ? `
      <div style="margin-top:16px;">
        <div style="font-weight:800;color:#111827;margin-bottom:6px;">Notes</div>
        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:12px;color:#111827;background:#ffffff;">
          ${escapeHtml(notes.trim())}
        </div>
      </div>
    `
    : "";

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f3f4f6;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(90deg,#111827,#1f2937);padding:18px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img 
                        src="${escapeHtml(logoUrl)}" 
                        alt="Hughestown Self-Storage" 
                        style="display:block;height:46px;width:auto;max-width:100%;background:#ffffff;padding:6px 10px;border-radius:10px;"
                      />
                    </td>
                    <td style="vertical-align:middle;text-align:right;font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:14px;font-weight:700;">
                      Hughestown Self-Storage
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:22px 20px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
                <div style="font-size:22px;font-weight:900;margin:0 0 8px 0;">${escapeHtml(introTitle)}</div>
                <div style="font-size:14px;color:#374151;line-height:1.5;margin:0 0 16px 0;">
                  ${escapeHtml(introText)}
                </div>

                <!-- Items table -->
                <div style="border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;background:#ffffff;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr style="background:#f9fafb;">
                      <th align="left" style="padding:12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;">Item</th>
                      <th align="center" style="padding:12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;">Qty</th>
                      <th align="right" style="padding:12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;">Price</th>
                    </tr>
                    ${rows}
                  </table>
                </div>

                <!-- Totals -->
                <div style="margin-top:14px;border:1px solid #e5e7eb;border-radius:14px;padding:12px;background:#ffffff;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:6px 0;color:#374151;font-size:13px;">Subtotal</td>
                      <td style="padding:6px 0;text-align:right;color:#111827;font-weight:800;">${money(subtotal)}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#374151;font-size:13px;">PA Sales Tax (6%)</td>
                      <td style="padding:6px 0;text-align:right;color:#111827;font-weight:800;">${money(tax)}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0 6px 0;color:#111827;font-size:14px;font-weight:900;border-top:1px solid #e5e7eb;">Grand Total</td>
                      <td style="padding:10px 0 6px 0;text-align:right;color:#111827;font-size:14px;font-weight:900;border-top:1px solid #e5e7eb;">${money(total)}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding-top:4px;color:#6b7280;font-size:11px;">
                        Totals shown are estimates. Final total confirmed at pickup.
                      </td>
                    </tr>
                  </table>
                </div>

                ${notesBlock}

                <!-- Customer details -->
                <div style="margin-top:16px;">
                  <div style="font-weight:900;color:#111827;margin-bottom:6px;">Customer Details</div>
                  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:12px;background:#ffffff;color:#111827;">
                    <div><span style="font-weight:800;">Name:</span> ${escapeHtml(customerName)}</div>
                    <div><span style="font-weight:800;">Phone:</span> ${escapeHtml(customerPhone)}</div>
                    <div><span style="font-weight:800;">Email:</span> <a href="mailto:${escapeHtml(customerEmail)}" style="color:#2563eb;">${escapeHtml(customerEmail)}</a></div>
                  </div>
                </div>

                <div style="margin-top:16px;color:#6b7280;font-size:12px;line-height:1.5;">
                  If anything needs to be changed, just reply to this email.
                </div>

                <div style="margin-top:16px;border-top:1px solid #e5e7eb;padding-top:12px;color:#111827;font-size:12px;line-height:1.5;">
                  <div style="font-weight:900;">Hughestown Self-Storage</div>
                  <div>${escapeHtml(footerLine1)}</div>
                  <div><a href="mailto:${escapeHtml(footerLine2)}" style="color:#2563eb;">${escapeHtml(footerLine2)}</a></div>
                  <div style="color:#6b7280;">${escapeHtml(footerLine3)}</div>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // common fields (contact + reservation)
    const name = (body?.name ?? "").toString();
    const email = (body?.email ?? "").toString();
    const phone = (body?.phone ?? "").toString();

    // reservation-specific (if provided)
    const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];
    const notes = (body?.notes ?? body?.message ?? "").toString(); // fallback

    const incomingSubject = (body?.subject ?? "").toString().trim();

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
    const toOffice = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);

    const isReservation = items.length > 0;

    // Shared defaults
    const subjectOffice =
      incomingSubject ||
      (isReservation
        ? `🔶 HSS Moving Supplies Reservation (${items.length} items) – ${name || "Website"}`
        : `New message from ${name || "Website"} (${phone || "no phone"})`);

    // ---------- OFFICE EMAIL ----------
    if (isReservation) {
      const logoUrl = "https://hughestownstorage.com/images/email/hss-logo.png";

      const htmlToOffice = buildReservationHtml({
        logoUrl,
        subject: subjectOffice,
        introTitle: "New moving supplies reservation order",
        introText: "A customer submitted a reservation order. Review items and contact them to confirm availability and pickup details.",
        items,
        notes: body?.notes ? String(body.notes) : "",
        customerName: name || "—",
        customerPhone: phone || "—",
        customerEmail: email || "—",
        taxRate: 0.06,
        footerLine1: "(570) 362-6150",
        footerLine2: "office@hughestownstorage.com",
        footerLine3: "133 New Street, Hughestown, PA 18640"
      });

      await resend.emails.send({
        from: CONTACT_FROM,
        to: toOffice,
        replyTo: email || undefined,
        subject: subjectOffice,
        html: htmlToOffice
      });

      // ---------- CUSTOMER CONFIRMATION ----------
      // (Only if customer provided email)
      if (email) {
        const htmlToCustomer = buildReservationHtml({
          logoUrl,
          subject: `Copy of your request: ${subjectOffice}`,
          introTitle: "We received your reservation order",
          introText:
            "Thanks for your request. Below is a copy of the reservation order you submitted. We'll contact you shortly to confirm availability and pickup details.",
          items,
          notes: body?.notes ? String(body.notes) : "",
          customerName: name || "—",
          customerPhone: phone || "—",
          customerEmail: email,
          taxRate: 0.06,
          footerLine1: "(570) 362-6150",
          footerLine2: "office@hughestownstorage.com",
          footerLine3: "133 New Street, Hughestown, PA 18640"
        });

        await resend.emails.send({
          from: CONTACT_FROM,
          to: email,
          // allow customer to reply back to the office:
          replyTo: toOffice?.[0] || undefined,
          subject: `Copy of your request: ${subjectOffice}`,
          html: htmlToCustomer
        });
      }

      return Response.json({ ok: true });
    }

    // ---------- NORMAL CONTACT FORM (fallback) ----------
    const message = (body?.message ?? "").toString();
    await resend.emails.send({
      from: CONTACT_FROM,
      to: toOffice,
      replyTo: email || undefined,
      subject: subjectOffice,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    });

    // Auto-reply to sender
    if (email) {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: email,
        replyTo: toOffice?.[0] || undefined,
        subject: "Thanks for contacting Hughestown Self-Storage",
        text: `Hi ${name || ""},\n\nThanks for reaching out! We received your message and will get back to you soon.\n\n– Hughestown Self-Storage\n(570) 362-6150\noffice@hughestownstorage.com`
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