// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

// helpers
function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toUsd(cents: number) {
  const safe = Number.isFinite(cents) ? cents : 0;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(safe / 100);
}

type Totals = {
  subtotalCents?: number;
  taxRate?: number; // 0.06
  taxCents?: number;
  grandTotalCents?: number;
};

function buildEmailHtml(args: {
  title: string;
  intro: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  items: Array<{ qty: number; name: string; size?: string; price: string }>;
  totals?: Totals;
  logoUrl: string;
}) {
  const { title, intro, name, email, phone, notes, items, totals, logoUrl } = args;

  const rows = items
    .map((it) => {
      const size = it.size ? `<div style="font-size:12px;color:#6b7280;margin-top:2px;">${escapeHtml(it.size)}</div>` : "";
      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-weight:700;color:#111827;">${escapeHtml(it.name)}</div>
            ${size}
          </td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;font-family:Arial,Helvetica,sans-serif;color:#111827;">${it.qty}</td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;font-family:Arial,Helvetica,sans-serif;color:#111827;">${escapeHtml(it.price)}</td>
        </tr>
      `;
    })
    .join("");

  const subtotal = totals?.subtotalCents ?? null;
  const tax = totals?.taxCents ?? null;
  const grand = totals?.grandTotalCents ?? null;

  const totalsBlock =
    subtotal != null && tax != null && grand != null
      ? `
        <div style="margin-top:14px;padding:14px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;padding:4px 0;">Subtotal</td>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:14px;padding:4px 0;text-align:right;font-weight:700;">${toUsd(subtotal)}</td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;padding:4px 0;">PA Sales Tax (6%)</td>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:14px;padding:4px 0;text-align:right;font-weight:700;">${toUsd(tax)}</td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:16px;padding:10px 0 0;font-weight:800;border-top:1px solid #e5e7eb;">Grand Total</td>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:16px;padding:10px 0 0;text-align:right;font-weight:800;border-top:1px solid #e5e7eb;">${toUsd(grand)}</td>
            </tr>
          </table>
          <div style="margin-top:8px;font-size:12px;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
            Totals shown are estimates. Final total confirmed at pickup.
          </div>
        </div>
      `
      : "";

  return `
  <div style="background:#f3f4f6;padding:24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;border-collapse:collapse;">
      <tr>
        <td style="background:#0b0b0f;padding:18px 20px;border-radius:14px 14px 0 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${escapeHtml(logoUrl)}" alt="Hughestown Self-Storage" style="display:block;height:42px;width:auto;max-width:100%;" />
              </td>
              <td style="vertical-align:middle;text-align:right;font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:14px;">
                Hughestown Self-Storage
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;padding:22px 20px;">
          <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:22px;font-weight:800;margin-bottom:8px;">
            ${escapeHtml(title)}
          </div>

          <div style="font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;line-height:1.55;margin-bottom:16px;">
            ${escapeHtml(intro)}
          </div>

          <div style="margin:18px 0;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <thead>
                <tr>
                  <th align="left" style="padding:12px;background:#fff7ed;font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:13px;text-transform:uppercase;letter-spacing:.04em;">Item</th>
                  <th align="center" style="padding:12px;background:#fff7ed;font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:13px;text-transform:uppercase;letter-spacing:.04em;">Qty</th>
                  <th align="right" style="padding:12px;background:#fff7ed;font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:13px;text-transform:uppercase;letter-spacing:.04em;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>

          ${totalsBlock}

          ${
            notes
              ? `<div style="margin-top:18px;font-family:Arial,Helvetica,sans-serif;">
                  <div style="font-weight:800;color:#111827;margin-bottom:6px;">Notes</div>
                  <div style="color:#374151;font-size:14px;line-height:1.55;border-left:4px solid #fb923c;padding-left:12px;">
                    ${escapeHtml(notes)}
                  </div>
                </div>`
              : ""
          }

          <div style="margin-top:20px;padding:14px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-weight:800;color:#111827;margin-bottom:8px;">Customer Details</div>
            <div style="font-size:14px;color:#374151;line-height:1.6;">
              <div><strong>Name:</strong> ${escapeHtml(name || "")}</div>
              <div><strong>Phone:</strong> ${escapeHtml(phone || "")}</div>
              <div><strong>Email:</strong> ${escapeHtml(email || "")}</div>
            </div>
          </div>

          <div style="margin-top:18px;font-family:Arial,Helvetica,sans-serif;color:#6b7280;font-size:12px;line-height:1.5;">
            If anything needs to be changed, just reply to this email.
          </div>
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;padding:0 20px 18px;">
          <div style="height:1px;background:#e5e7eb;"></div>
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;padding:0 20px 22px;border-radius:0 0 14px 14px;">
          <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-weight:800;">Hughestown Self-Storage</div>
          <div style="font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:13px;line-height:1.6;">
            (570) 362-6150<br/>
            office@hughestownstorage.com
          </div>
        </td>
      </tr>
    </table>
  </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Supports both contact form + reservation form
    const name = body?.name ?? "";
    const email = body?.email ?? "";
    const phone = body?.phone ?? "";
    const message = body?.message ?? "";
    const subjectFromClient = body?.subject ?? "";

    const totals: Totals | undefined = body?.totals;

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

    const finalSubject =
      subjectFromClient?.trim() ||
      `New message from ${name || "Website"} (${phone || "no phone"})`;

    // Figure out logo URL for email (must be absolute)
    const defaultSite = "https://hughestownstorage.com";
    const siteUrl = (process.env.SITE_URL || req.headers.get("origin") || defaultSite).replace(/\/$/, "");
    const logoUrl = `${siteUrl}/images/email/hss-logo.png`;

    // Detect reservation-style payload (we send HTML nicely)
    const isReservation = typeof subjectFromClient === "string" && subjectFromClient.includes("Moving Supplies Reservation");

    // Build items from the text body if it’s a reservation (best-effort),
    // OR allow client to pass structured items later if you want.
    // For now we’ll parse from the message lines that start with "- ".
    const parsedItems =
      typeof message === "string"
        ? message
            .split("\n")
            .filter((l: string) => l.trim().startsWith("- "))
            .map((l: string) => {
              // "- 2 × Item Name | size @ $X.XX"
              const m = l.replace(/^- /, "").trim();
              const qtyMatch = m.match(/^(\d+)\s*×\s*/);
              const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
              const rest = m.replace(/^(\d+)\s*×\s*/, "");

              const atIdx = rest.lastIndexOf("@");
              const left = atIdx >= 0 ? rest.slice(0, atIdx).trim() : rest.trim();
              const price = atIdx >= 0 ? rest.slice(atIdx + 1).trim() : "";

              const parts = left.split("|").map((p) => p.trim());
              const itemName = parts[0] || left;
              const size = parts.length > 1 ? parts.slice(1).join(" | ") : undefined;

              return { qty, name: itemName, size, price };
            })
        : [];

    // Send to office
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((s) => s.trim()),
      replyTo: email || undefined,
      subject: finalSubject,
      ...(isReservation
        ? {
            html: buildEmailHtml({
              title: "New Moving Supplies Reservation",
              intro: "A customer submitted a moving supplies reservation order for pickup. Review the order below and follow up to confirm availability.",
              name,
              email,
              phone,
              notes: typeof message === "string"
                ? (message.match(/Notes:\s*(.*)$/m)?.[1] || "").trim() || undefined
                : undefined,
              items: parsedItems,
              totals,
              logoUrl
            })
          }
        : {
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
          })
    });

    // Customer confirmation (reservation OR contact)
    if (email) {
      if (isReservation) {
        await resend.emails.send({
          from: CONTACT_FROM,
          to: email,
          subject: `Copy of your request: ${finalSubject}`,
          replyTo: CONTACT_TO.split(",")[0]?.trim() || undefined,
          html: buildEmailHtml({
            title: "We received your reservation order",
            intro: "Thanks for your request. Below is a copy of the reservation order you submitted. We'll contact you shortly to confirm availability and pickup details.",
            name,
            email,
            phone,
            notes: typeof message === "string"
              ? (message.match(/Notes:\s*(.*)$/m)?.[1] || "").trim() || undefined
              : undefined,
            items: parsedItems,
            totals,
            logoUrl
          })
        });
      } else {
        await resend.emails.send({
          from: CONTACT_FROM,
          to: email,
          subject: "Thanks for contacting Hughestown Self-Storage",
          text: `Hi ${name || ""},\n\nThanks for reaching out! We received your message and will get back to you soon.\n\n– Hughestown Self-Storage\n(570) 362-6150\noffice@hughestownstorage.com`
        });
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