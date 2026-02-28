// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

type ParsedItem = {
  qty: number;
  name: string;
  size?: string;
  priceEach: number;
};

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function parsePriceToNumber(price: string) {
  const cleaned = (price || "").replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Parses reservation message lines like:
 * - 2 × Small Moving Box | 16" x 12" x 12" @ $2.99
 * Notes: ...
 */
function parseReservationMessage(message: string) {
  const lines = (message || "").split("\n").map((l) => l.trim());
  const items: ParsedItem[] = [];
  let notes: string | undefined;

  for (const line of lines) {
    if (/^Notes:\s*/i.test(line)) {
      notes = line.replace(/^Notes:\s*/i, "").trim();
      continue;
    }

    const m = line.match(/^-?\s*(\d+)\s*×\s*(.+?)\s*@\s*([$\d.,]+)/);
    if (m) {
      const qty = parseInt(m[1], 10) || 1;
      const nameAndMaybeSize = m[2].trim();
      const [namePart, sizePart] = nameAndMaybeSize.split("|").map((x) => x.trim());
      const priceEach = parsePriceToNumber(m[3]);

      items.push({
        qty,
        name: namePart,
        size: sizePart || undefined,
        priceEach,
      });
    }
  }

  return { items, notes };
}

function buildReservationEmailHTML(opts: {
  title: string;
  intro: string;
  subjectLine: string;
  name: string;
  phone: string;
  email: string;
  items: ParsedItem[];
  notes?: string;
  logoUrl: string;
  siteUrl: string;
  taxRate: number; // 0.06
}) {
  const { items, taxRate } = opts;

  const subtotal = items.reduce((sum, it) => sum + it.qty * it.priceEach, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const rowsHtml =
    items.length === 0
      ? `<tr><td colspan="3" style="padding:14px; color:#555;">No items found.</td></tr>`
      : items
          .map((it) => {
            const lineTotal = it.qty * it.priceEach;
            const sizeLine = it.size
              ? `<div style="font-size:12px; color:#666; margin-top:2px;">${escapeHtml(it.size)}</div>`
              : "";

            return `
<tr>
  <td style="padding:12px 10px; border-bottom:1px solid #eee;">
    <div style="font-weight:600; color:#111;">${escapeHtml(it.name)}</div>
    ${sizeLine}
  </td>
  <td align="center" style="padding:12px 10px; border-bottom:1px solid #eee; color:#111;">${it.qty}</td>
  <td align="right" style="padding:12px 10px; border-bottom:1px solid #eee; color:#111;">
    <div style="font-weight:600;">${money(it.priceEach)}</div>
    <div style="font-size:12px; color:#666; margin-top:2px;">Line: ${money(lineTotal)}</div>
  </td>
</tr>`;
          })
          .join("");

  const notesBlock =
    opts.notes && opts.notes.trim()
      ? `
<div style="margin-top:14px; padding:12px; background:#fff; border:1px solid #eee; border-radius:10px;">
  <div style="font-weight:800; margin-bottom:6px; color:#111;">Notes</div>
  <div style="color:#111; white-space:pre-wrap;">${escapeHtml(opts.notes)}</div>
</div>`
      : "";

  const currentYear = new Date().getFullYear();

  // ✅ ORDER: Header → Customer Details → Notes → Items+Totals → Footer
  return `
<div style="background:#f6f7f9; padding:24px 12px; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e9e9e9;">
    <!-- Header -->
    <div style="background:#ffffff; border-bottom:1px solid #eee; padding:16px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="${escapeHtml(opts.logoUrl)}" alt="Hughestown Self-Storage" style="display:block; height:36px; width:auto;" />
      </div>
      <!-- show phone number instead of company name -->
      <div style="font-size:12px; color:#444; font-weight:800;">570-362-6150</div>
    </div>

    <!-- Body -->
    <div style="padding:18px;">
      <h1 style="margin:0 0 10px 0; font-size:20px; color:#111;">${escapeHtml(opts.title)}</h1>
      <div style="color:#444; font-size:14px; line-height:1.45; margin-bottom:12px;">
        ${escapeHtml(opts.intro)}
      </div>

      <!-- Customer details -->
      <div style="margin-top:12px; padding:12px; background:#fff; border:1px solid #eee; border-radius:10px;">
        <div style="font-weight:800; margin-bottom:6px; color:#111;">Customer Details</div>
        <div style="font-size:13px; color:#111; line-height:1.55;">
          <div><b>Name:</b> ${escapeHtml(opts.name)}</div>
          <div><b>Phone:</b> ${escapeHtml(opts.phone)}</div>
          <div><b>Email:</b> <a href="mailto:${escapeHtml(opts.email)}" style="color:#0b57d0;">${escapeHtml(opts.email)}</a></div>
        </div>
      </div>

      <!-- Notes -->
      ${notesBlock}

      <!-- Items table -->
      <div style="margin-top:14px; border:1px solid #eee; border-radius:12px; overflow:hidden;">
        <div style="background:#f2f3f5; padding:10px 12px; font-size:12px; font-weight:900; color:#111; display:flex; justify-content:space-between;">
          <div>ITEM</div>
          <div style="display:flex; gap:24px;">
            <div style="min-width:40px; text-align:center;">QTY</div>
            <div style="min-width:130px; text-align:right;">PRICE</div>
          </div>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div style="margin-top:12px; border:1px solid #eee; border-radius:12px; padding:12px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:6px 0; color:#444;">Subtotal</td>
            <td align="right" style="padding:6px 0; color:#111; font-weight:800;">${money(subtotal)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; color:#444;">PA Sales Tax (6%)</td>
            <td align="right" style="padding:6px 0; color:#111; font-weight:800;">${money(tax)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0 0 0; color:#111; font-weight:900; font-size:16px;">Grand Total</td>
            <td align="right" style="padding:10px 0 0 0; color:#111; font-weight:900; font-size:16px;">${money(total)}</td>
          </tr>
        </table>
        <div style="margin-top:6px; font-size:11px; color:#666;">
          Totals shown are estimates. Final total confirmed at pickup.
        </div>
      </div>

      <div style="margin-top:14px; font-size:12px; color:#555;">
        If anything needs to be changed, just reply to this email.
      </div>

      <!-- Footer -->
      <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />

      <!-- Footer buttons -->
      <div style="text-align:center; margin:6px 0 14px 0;">
        <a href="https://hughestownstorage.com"
           style="display:inline-block; margin:5px; padding:10px 16px; background:#111; color:#fff; text-decoration:none; border-radius:8px; font-size:13px; font-weight:800;">
          Home
        </a>
        <a href="https://hughestownstorage.ccstorage.com/find_units"
           style="display:inline-block; margin:5px; padding:10px 16px; background:#EC1516; color:#fff; text-decoration:none; border-radius:8px; font-size:13px; font-weight:800;">
          Rent Now
        </a>
        <a href="https://hughestownstorage.ccstorage.com/session/new"
           style="display:inline-block; margin:5px; padding:10px 16px; background:#444; color:#fff; text-decoration:none; border-radius:8px; font-size:13px; font-weight:800;">
          Sign In
        </a>
      </div>

      <div style="font-size:12px; color:#111;">
        <div style="font-weight:900;">Hughestown Self-Storage</div>

        <!-- ADDED: address (left aligned, same style as phone line) -->
        <div>133 New Street</div>
        <div>Hughestown, PA 18640</div>

        <div>(570) 362-6150</div>
        <div><a href="mailto:office@hughestownstorage.com" style="color:#0b57d0;">office@hughestownstorage.com</a></div>
        <div><a href="${escapeHtml(opts.siteUrl)}" style="color:#0b57d0;">${escapeHtml(opts.siteUrl.replace(/^https?:\/\//, ""))}</a></div>
      </div>

      <div style="font-size:11px; color:#888; margin-top:12px;">
        Subject: ${escapeHtml(opts.subjectLine)}
      </div>

      <!-- copyright line -->
      <div style="text-align:center; font-size:11px; color:#777; margin-top:14px;">
        Copyright ©${currentYear}. Owned &amp; Operated by S3 Storage Group, LLC. All rights Reserved.
      </div>
    </div>
  </div>
</div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name || "").toString();
    const email = (body?.email || "").toString();
    const phone = (body?.phone || "").toString();
    const message = (body?.message || "").toString();
    const inboundSubject = (body?.subject || "").toString();

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

    const isReservation =
      inboundSubject.startsWith("🔶 HSS Moving Supplies Reservation") ||
      /MOVING SUPPLIES RESERVATION ORDER/i.test(message);

    const fallbackSubject = `New message from ${name || "Website"} (${phone || "no phone"})`;
    const subject = inboundSubject || fallbackSubject;

    const siteUrl = "https://hughestownstorage.com";
    const logoUrl = `${siteUrl}/images/email/hss-logo.png`;

    if (isReservation) {
      const { items, notes } = parseReservationMessage(message);

      const officeHtml = buildReservationEmailHTML({
        title: "New moving supplies reservation",
        intro: "A customer submitted a moving supplies reservation order. Details are below.",
        subjectLine: subject,
        name: name || "Customer",
        phone: phone || "—",
        email: email || "—",
        items,
        notes,
        logoUrl,
        siteUrl,
        taxRate: 0.06,
      });

      const customerHtml = buildReservationEmailHTML({
        title: "We received your reservation order",
        intro:
          "Thanks for your request. Below is a copy of the reservation order you submitted. We'll contact you shortly to confirm availability and pickup details.",
        subjectLine: subject,
        name: name || "Customer",
        phone: phone || "—",
        email: email || "—",
        items,
        notes,
        logoUrl,
        siteUrl,
        taxRate: 0.06,
      });

      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO.split(",").map((s) => s.trim()),
        replyTo: email || undefined,
        subject,
        html: officeHtml,
        text: message || "(no message)",
      });

      if (email) {
        await resend.emails.send({
          from: CONTACT_FROM,
          to: email,
          replyTo: "office@hughestownstorage.com",
          subject: `Copy of your request: ${subject}`,
          html: customerHtml,
          text: `Hi ${name || ""},\n\nHere is a copy of what you submitted to Hughestown Self-Storage:\n\n${message}`,
        });
      }

      return Response.json({ ok: true });
    }

    // Normal contact flow
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((s) => s.trim()),
      replyTo: email || undefined,
      subject,
      text:
`Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    });

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
    console.error("CONTACT API ERROR:", err);
    const msg = err?.message || err?.name || "Unknown error";
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, route: "contact", runtime });
}