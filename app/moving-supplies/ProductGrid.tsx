'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';

type Item = {
  id: string;
  name: string;
  size?: string;
  price: string; // like "$2.99"
  description?: string;
  image?: string;
};

type CartLine = {
  item: Item;
  qty: number;
};

type SubmittedOrder = {
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  items: Array<{
    id: string;
    name: string;
    size?: string;
    price: string;
    qty: number;
    lineTotalCents: number;
  }>;
  subtotalCents: number;
  taxCents: number;
  grandTotalCents: number;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Phone helpers (US 10-digit)
function digitsOnly(s: string) {
  return (s || '').replace(/\D/g, '');
}

function formatUsPhone(digits: string) {
  const d = digitsOnly(digits).slice(0, 10);
  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 10);

  if (d.length === 0) return '';
  if (d.length < 4) return `(${a}`;
  if (d.length < 7) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
}

// Money helpers (cents)
function priceToCents(price: string) {
  // "$12.99" -> 1299
  const cleaned = (price || '').replace(/[^0-9.]/g, '');
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

function centsToUsd(cents: number) {
  const safe = Number.isFinite(cents) ? cents : 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(safe / 100);
}

function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.min(999, Math.trunc(qty)));
}

function CartIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6h14l-1.5 8.5a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.6L5.3 3.8A1.5 1.5 0 0 0 3.8 2.5H2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PrinterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8V4h10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M7 14h10v6H7v-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Draggable floating Cart button (snaps to edges) */
function FloatingCartButton({
  count,
  onClick
}: {
  count: number;
  onClick: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // position from top-left of viewport
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Track which edge we're docked to so we can place the badge inward
  const [dock, setDock] = useState<'left' | 'right'>('right');

  const dragRef = useRef<{
    active: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  }>({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false
  });

  const STORAGE_KEY = 'hss_moving_supplies_floating_btn_pos_v3';

  function getButtonSize() {
    const el = btnRef.current;
    return {
      w: el?.offsetWidth ?? 60,
      h: el?.offsetHeight ?? 60
    };
  }

  function clampToViewport(x: number, y: number) {
    const { w, h } = getButtonSize();
    const maxX = Math.max(8, window.innerWidth - w - 8);
    const maxY = Math.max(8, window.innerHeight - h - 8);
    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY)
    };
  }

  function computeDock(x: number) {
    const { w } = getButtonSize();
    const maxX = Math.max(8, window.innerWidth - w - 8);
    // If we're within 12px of maxX, treat as docked right
    return Math.abs(x - maxX) <= 12 ? 'right' : 'left';
  }

  function snapToNearestEdge(x: number, y: number) {
    const { w } = getButtonSize();
    const maxX = Math.max(8, window.innerWidth - w - 8);
    const mid = window.innerWidth / 2;

    const snappedX = x + w / 2 < mid ? 8 : maxX;
    const next = clampToViewport(snappedX, y);

    // Update dock based on final snapped position
    setDock(computeDock(next.x));

    return next;
  }

  // init position (restore from localStorage if present)
  useEffect(() => {
    const defaultPos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return {
        x: Math.max(8, Math.round(w - 90)),
        y: Math.max(8, Math.round(h - 160))
      };
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Number.isFinite(parsed?.x) && Number.isFinite(parsed?.y)) {
          const clamped = clampToViewport(parsed.x, parsed.y);
          setPos(clamped);
          setDock(computeDock(clamped.x));
          return;
        }
      }
    } catch {}

    const d = defaultPos();
    const clamped = clampToViewport(d.x, d.y);
    setPos(clamped);
    setDock(computeDock(clamped.x));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep on-screen on resize
  useEffect(() => {
    function onResize() {
      setPos((p) => snapToNearestEdge(p.x, p.y));
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
    } catch {}
  }, [pos]);

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const el = btnRef.current;
    if (!el) return;

    el.setPointerCapture(e.pointerId);

    dragRef.current.active = true;
    dragRef.current.pointerId = e.pointerId;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.originX = pos.x;
    dragRef.current.originY = pos.y;
    dragRef.current.moved = false;
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current.active) return;
    if (dragRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    if (!dragRef.current.moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      dragRef.current.moved = true;
    }

    const next = clampToViewport(dragRef.current.originX + dx, dragRef.current.originY + dy);
    setPos(next);
    // While dragging, continuously update dock so the badge stays visible near edges
    setDock(computeDock(next.x));
  }

  function endDrag(e: React.PointerEvent) {
    if (!dragRef.current.active) return;
    if (dragRef.current.pointerId !== e.pointerId) return;

    dragRef.current.active = false;
    dragRef.current.pointerId = null;

    // click (tap) if they didn't really drag
    if (!dragRef.current.moved) {
      onClick();
      return;
    }

    // snap if they dragged
    setPos((p) => snapToNearestEdge(p.x, p.y));
  }

  const badgeClass =
    dock === 'right'
      ? 'absolute -top-2 -left-2 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-[#EC1516] text-xs font-bold flex items-center justify-center shadow'
      : 'absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-[#EC1516] text-xs font-bold flex items-center justify-center shadow';

  return (
    <button
      ref={btnRef}
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="
        fixed z-[55]
        rounded-full shadow-xl
        active:scale-[0.98] transition
        select-none
        flex items-center justify-center
      "
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: 60,
        height: 60,
        backgroundColor: '#EC1516',
        color: '#fff',
        touchAction: 'none'
      }}
      aria-label={`Open cart. ${count} items.`}
      title="Drag to move • Tap to open"
    >
      {/* subtle drag handle cue */}
      <span
        aria-hidden="true"
        className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15"
        title="Drag"
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <circle cx="4" cy="4" r="1" fill="white" />
          <circle cx="10" cy="4" r="1" fill="white" />
          <circle cx="4" cy="7" r="1" fill="white" />
          <circle cx="10" cy="7" r="1" fill="white" />
          <circle cx="4" cy="10" r="1" fill="white" />
          <circle cx="10" cy="10" r="1" fill="white" />
        </svg>
      </span>

      <CartIcon className="w-7 h-7" />

      {/* count badge (always placed inward so it never clips) */}
      {count > 0 && <span className={badgeClass}>{count}</span>}
    </button>
  );
}

export default function ProductGrid() {
  const products: Item[] = [
    {
      id: 'small-moving-box',
      name: 'Small Moving Box',
      size: '16" x 12" x 12"',
      price: '$2.99',
      description: 'Perfect for books, records, and heavy items',
      image: '/images/products/box-small.jpg'
    },
    {
      id: 'medium-moving-box',
      name: 'Medium Moving Box',
      size: '18" x 14" x 12"',
      price: '$3.99',
      description: 'Ideal for clothes, linens, and medium items',
      image: '/images/products/box-medium.jpg'
    },
    {
      id: 'large-moving-box',
      name: 'Large Moving Box',
      size: '24" x 18" x 18"',
      price: '$5.99',
      description: 'Great for lightweight bulky items like pillows',
      image: '/images/products/box-large.jpg'
    },
    {
      id: 'wardrobe-box',
      name: 'Wardrobe Box',
      size: '24" x 21" x 46"',
      price: '$39.99',
      description: 'Tall box with hanging bar for clothes',
      image: '/images/products/wardrobe-box.jpg'
    },
    {
      id: 'bubble-wrap',
      name: 'Bubble Wrap',
      size: '12" x 50ft Roll',
      price: '$14.99',
      description: 'Protective wrapping for fragile items',
      image: '/images/products/bubble-wrap.jpg'
    },
    {
      id: 'packing-tape',
      name: 'Packing Tape',
      size: '1.88" x 60 yards',
      price: '$3.99',
      description: 'Heavy-duty 2.7 mil adhesive tape for sealing boxes',
      image: '/images/products/packing-tape.jpg'
    },
    {
      id: 'moving-blankets',
      name: 'Moving Blankets',
      size: '72" x 80"',
      price: '$19.99',
      description: 'Padded protection for furniture',
      image: '/images/products/moving-blanket.jpg'
    },
    {
      id: 'packing-paper',
      name: 'Packing Paper',
      size: '10 lb Bundle',
      price: '$39.99',
      description: '27" x 17" Clean newsprint 320 sheets for wrapping items',
      image: '/images/products/packing-paper.jpg'
    },
    {
      id: 'mattress-bag',
      name: 'Mattress Bag',
      size: 'Queen Size',
      price: '$25.99',
      description: 'Plastic protection for mattresses',
      image: '/images/products/mattress-bag.jpg'
    },
    {
      id: 'box-cutter',
      name: 'Box Cutter',
      size: 'Utility Knife',
      price: '$12.99',
      description: 'Westcott Heavy Duty Straight Blade Utility Cutter, Silver, 1-Count',
      image: '/images/products/box-cutter.jpg'
    },
    {
      id: 'marker-set',
      name: 'Marker Set',
      size: 'Pack of 4',
      price: '$8.99',
      description: 'Sharpie Permanent Markers, Chisel Tip, Black, 4 Count',
      image: '/images/products/markers.jpg'
    },
    {
      id: 'padlock',
      name: 'Padlock',
      size: 'Heavy Duty',
      price: '$22.99',
      description: 'Brinks Stainless Steel 60mm Keyed Discus Padlock with 5/8in Shackle',
      image: '/images/products/padlock.jpg'
    }
  ];

  const kits: Item[] = useMemo(
    () => [
      {
        id: 'studio-apartment-kit',
        name: 'Studio Apartment Kit',
        price: '$69.99',
        description:
          'Includes: 10 Small boxes, 5 Medium boxes, 2 Rolls of tape, 1 Roll bubble wrap, 1 Marker'
      },
      {
        id: '2-3-bedroom-kit',
        name: '2-3 Bedroom Kit',
        price: '$179.99',
        description:
          'Includes: 15 Small boxes, 10 Medium boxes, 5 Large boxes, 3 Rolls of tape, 2 Rolls bubble wrap, 1 Bundle packing paper, 1 Markers'
      },
      {
        id: '4plus-bedroom-kit',
        name: '4+ Bedroom Kit',
        price: '$379.99',
        description:
          'Includes: 20 Small boxes, 15 Medium boxes, 10 Large boxes, 2 Wardrobe boxes, 5 Rolls of tape, 3 Rolls bubble wrap, 2 Bundles packing paper, 4 Moving blankets, 2 Markers'
      }
    ],
    []
  );

  // Reservation cart
  const [cart, setCart] = useState<CartLine[]>([]);
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  const [isOpen, setIsOpen] = useState(false);

  // Modal view: cart vs success receipt
  const [modalView, setModalView] = useState<'cart' | 'success'>('cart');
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);

  // quick feedback toast
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Customer fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState(''); // formatted value: (570) 456-8765
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');

  // totals
  const TAX_RATE = 0.06;
  const subtotalCents = cart.reduce((sum, line) => sum + priceToCents(line.item.price) * line.qty, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const grandTotalCents = subtotalCents + taxCents;

  // auto-hide toast
  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(null), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  function openOrderModal() {
    // Allow opening even if cart empty only if they are on success view (receipt)
    if (cart.length === 0 && !submittedOrder) return;
    setModalView('cart');
    setIsOpen(true);
    setStatus('idle');
    setStatusMsg('');
  }

  function closeModal() {
    setIsOpen(false);
    setSubmitting(false);
    setStatus('idle');
    setStatusMsg('');
    // Keep submittedOrder so if they reopen quickly it’s fine; you can clear if you prefer:
    // setSubmittedOrder(null);
  }

  function addToCart(item: Item) {
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.item.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { item, qty: 1 }];
    });

    setJustAdded(item.name);
    setIsOpen(true);
    setModalView('cart');
    setStatus('idle');
    setStatusMsg('');
  }

  function removeFromCart(itemId: string) {
    setCart((prev) => prev.filter((l) => l.item.id !== itemId));
  }

  function updateQty(itemId: string, qty: number) {
    const safeQty = Number.isFinite(qty) ? Math.max(1, Math.min(999, qty)) : 1;
    setCart((prev) => prev.map((l) => (l.item.id === itemId ? { ...l, qty: safeQty } : l)));
  }

  // phone mask handler
  function handlePhoneChange(next: string) {
    const d = digitsOnly(next).slice(0, 10);
    setPhone(formatUsPhone(d));
  }

  function handlePrintReceipt(order: SubmittedOrder) {
  const logoUrl = 'https://www.hughestownstorage.com/images/brand/hss-logo.png';

  const html = `
    <html>
      <head>
        <title>HSS Moving Supplies Order</title>
        <meta charset="utf-8" />
        <style>
          @page { margin: 18mm; }
          body { font-family: Arial, sans-serif; color:#111; }
          h1 { margin: 0 0 6px; font-size: 20px; }
          .muted { color:#555; font-size:12px; }
          .box { border:1px solid #ddd; border-radius:10px; padding:14px; margin-top:14px; }
          table { width:100%; border-collapse:collapse; margin-top:12px; }
          th, td { border:1px solid #ddd; padding:8px; font-size:12px; }
          th { background:#f5f5f5; text-align:left; }
          .right { text-align:right; }
          .totals { margin-top:12px; max-width:360px; margin-left:auto; }
          .totals div { display:flex; justify-content:space-between; padding:4px 0; font-size:12px; }
          .bold { font-weight:700; }

          /* Header layout */
          .header {
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            gap:16px;
          }
          .header-right {
            text-align:right;
            min-width:260px;
          }
          .logo {
            max-width:260px;
            height:auto;
            display:block;
            margin-left:auto;
          }
          .addr {
            margin-top:8px;
            line-height:1.4;
          }
          .addr-grid {
            display:flex;
            justify-content:space-between;
            gap:24px;
            margin-top:8px;
          }
          .addr-left { line-height:1.4; }
          .addr-right { text-align:right; line-height:1.4; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-left">
            <h1>Moving Supplies Order</h1>
            <div class="muted"><span class="bold">Hughestown Self-Storage</span></div>
            <div class="muted">Submitted: ${order.submittedAt}</div>

<div class="addr-grid">
  <div class="addr-left muted">
    <span class="bold">Hughestown Self-Storage</span><br/>
    133 New Street<br/>
    Hughestown, PA 18640<br/>
    (570) 362-6150
  </div>
  <div class="addr-right muted">
    <br/>
    <br/>
    www.hughestownstorage.com<br/>
    office@hughestownstorage.com
  </div>
</div>
          </div>

          <div class="header-right">
            <img class="logo" id="hssLogo" src="${logoUrl}?v=${Date.now()}" crossorigin="anonymous" alt="Hughestown Self-Storage" />
          </div>
        </div>

        <div class="box">
          <div class="bold">Customer</div>
          <div style="margin-top:6px;">${order.name}</div>
          <div>${order.phone}</div>
          <div>${order.email}</div>
        </div>

        <div class="box">
          <div class="bold">Items</div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="right">Qty</th>
                <th class="right">Line Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (i) => `
                    <tr>
                      <td>${i.name}${i.size ? ` <span class="muted">(${i.size})</span>` : ''}</td>
                      <td class="right">${i.qty}</td>
                      <td class="right">$${(i.lineTotalCents / 100).toFixed(2)}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>

          <div class="totals">
            <div><span>Subtotal</span><span>$${(order.subtotalCents / 100).toFixed(2)}</span></div>
            <div><span>PA Sales Tax (6%)</span><span>$${(order.taxCents / 100).toFixed(2)}</span></div>
            <div class="bold" style="border-top:1px solid #ddd; margin-top:8px; padding-top:8px;">
              <span>Grand Total</span><span>$${(order.grandTotalCents / 100).toFixed(2)}</span>
            </div>
            <div class="muted" style="margin-top:8px;">
              Totals shown are estimates. Final total confirmed at pickup.
            </div>
          </div>
        </div>

        <div class="box">
          <div class="bold">Notes</div>
          <div style="margin-top:6px;">${order.notes?.trim() ? order.notes.replace(/\n/g, '<br/>') : '—'}</div>
        </div>

        <script>
          (function() {
            const img = document.getElementById('hssLogo');
            let printed = false;

            function doPrint() {
              if (printed) return;
              printed = true;
              // Slight delay helps Chrome finish layout before opening print dialog
              setTimeout(() => window.print(), 150);
            }

            // If the image loads, print.
            if (img) {
              img.addEventListener('load', doPrint);
              img.addEventListener('error', doPrint); // still print even if logo fails
            }

            // Fallback: print even if load event doesn't fire for some reason
            setTimeout(doPrint, 1200);
          })();
        </script>
      </body>
    </html>
  `;

  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return;

  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
}

  async function submitReservationOrder(e: FormEvent) {
    e.preventDefault();

    if (cart.length === 0) {
      setStatus('error');
      setStatusMsg('Your order is empty.');
      return;
    }

    const phoneDigits = digitsOnly(phone);

    if (!fullName.trim() || phoneDigits.length !== 10 || !email.trim()) {
      setStatus('error');
      setStatusMsg('Please enter your full name, a 10-digit phone number, and your email.');
      return;
    }

    setSubmitting(true);
    setStatus('idle');
    setStatusMsg('');

    const lines = cart.map((l) => {
      const sizePart = l.item.size ? ` | ${l.item.size}` : '';
      return `- ${l.qty} × ${l.item.name}${sizePart} @ ${l.item.price}`;
    });

    const payload = {
      name: fullName.trim(),
      phone: formatUsPhone(phoneDigits),
      email: email.trim(),
      subject: `📦 HSS Moving Supplies Order (${cartCount} items) – ${fullName.trim()}`,
      totals: {
        subtotalCents,
        taxRate: TAX_RATE,
        taxCents,
        grandTotalCents
      },
      message: [
        `MOVING SUPPLIES ORDER`,
        ``,
        `Items:`,
        ...lines,
        ``,
        `Subtotal: ${centsToUsd(subtotalCents)}`,
        `PA Sales Tax (6%): ${centsToUsd(taxCents)}`,
        `Grand Total: ${centsToUsd(grandTotalCents)}`,
        ``,
        notes.trim() ? `Notes: ${notes.trim()}` : null,
        `---`,
        `Customer: ${fullName.trim()}`,
        `Phone: ${formatUsPhone(phoneDigits)}`,
        `Email: ${email.trim()}`
      ]
        .filter(Boolean)
        .join('\n')
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let msg = 'Something went wrong sending your order. Please try again.';
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        setStatus('error');
        setStatusMsg(msg);
        setSubmitting(false);
        return;
      }

      // Build receipt snapshot BEFORE clearing cart
      const submittedAt = new Date().toLocaleString('en-US');
      const receipt: SubmittedOrder = {
        submittedAt,
        name: fullName.trim(),
        phone: formatUsPhone(phoneDigits),
        email: email.trim(),
        notes: notes.trim(),
        items: cart.map((l) => ({
          id: l.item.id,
          name: l.item.name,
          size: l.item.size,
          price: l.item.price,
          qty: l.qty,
          lineTotalCents: priceToCents(l.item.price) * l.qty
        })),
        subtotalCents,
        taxCents,
        grandTotalCents
      };

      setSubmittedOrder(receipt);

      setStatus('success');
      setStatusMsg("Thanks — we received your moving supplies order. We'll contact you shortly to confirm availability.");
      setSubmitting(false);

      // Show printable receipt view in the modal
      setModalView('success');

      // Clear cart so floating button disappears (receipt remains visible)
      setCart([]);
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <section className="py-16 bg-white" data-product-shop>
      {/* ✅ Floating draggable Cart icon button */}
      {cartCount > 0 && <FloatingCartButton count={cartCount} onClick={openOrderModal} />}

      {/* Toast feedback */}
      {justAdded && (
        <div className="fixed top-24 right-4 z-[60]">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
            ✅ Added to cart: <span className="font-semibold">{justAdded}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* ✅ Static centered Cart button above the title (only shows when cart has items) */}
        {cartCount > 0 && (
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={openOrderModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#EC1516] text-white px-4 py-2 shadow-md hover:opacity-95 active:scale-[0.99] transition"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <CartIcon className="w-4 h-4" />
              <span className="font-semibold">Cart</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 text-sm">{cartCount}</span>
            </button>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Moving Supplies Available</h2>
          <p className="text-lg text-gray-600">Quality packing materials at competitive prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.size}</p>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center gap-3">
                <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer"
                >
                  Add to Cart →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Moving Kits Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-4">Studio Apartment Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$69.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 10 Small boxes</li>
                <li>• 5 Medium boxes</li>
                <li>• 2 Rolls of tape</li>
                <li>• 1 Roll bubble wrap</li>
                <li>• 1 Marker</li>
              </ul>
              <button
                type="button"
                onClick={() => addToCart(kits[0])}
                className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer"
              >
                Add to Cart →
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-orange-600">
              <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm mb-4 inline-block">
                Most Popular
              </div>
              <h4 className="text-lg font-semibold mb-4">2-3 Bedroom Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$179.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 15 Small boxes</li>
                <li>• 10 Medium boxes</li>
                <li>• 5 Large boxes</li>
                <li>• 3 Rolls of tape</li>
                <li>• 2 Rolls bubble wrap</li>
                <li>• 1 Bundle packing paper</li>
                <li>• 1 Markers</li>
              </ul>
              <button
                type="button"
                onClick={() => addToCart(kits[1])}
                className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer"
              >
                Add to Cart →
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-4">4+ Bedroom Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$379.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 20 Small boxes</li>
                <li>• 15 Medium boxes</li>
                <li>• 10 Large boxes</li>
                <li>• 2 Wardrobe boxes</li>
                <li>• 5 Rolls of tape</li>
                <li>• 3 Rolls bubble wrap</li>
                <li>• 2 Bundles packing paper</li>
                <li>• 4 Moving blankets</li>
                <li>• 2 Markers</li>
              </ul>
              <button
                type="button"
                onClick={() => addToCart(kits[2])}
                className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer"
              >
                Add to Cart →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />

          {/* Make modal scrollable on mobile */}
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {modalView === 'success' ? 'Order Submitted' : 'Your Cart'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {modalView === 'success'
                    ? 'You can print this summary for your records.'
                    : 'Review your items, then submit to reserve for pickup.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 px-2 py-1 rounded"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* SUCCESS RECEIPT VIEW */}
            {modalView === 'success' && submittedOrder ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-green-50 p-4 text-green-900 flex gap-3">
                  <div className="mt-0.5 text-green-700">
                    <CheckIcon />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">
                      Thanks — we received your moving supplies order. We'll contact you shortly to confirm availability.
                    </div>
                    <div className="mt-1 opacity-80">Submitted: {submittedOrder.submittedAt}</div>
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-bold">Order Summary</div>

                      <div className="text-sm text-gray-700 font-semibold mt-1">
                        Hughestown Self-Storage Moving Supplies
                      </div>

                      <div className="text-xs text-gray-600 mt-2 space-y-0.5 leading-relaxed">
                        <div>Hughestown Self-Storage</div>
                        <div>133 New Street</div>
                        <div>Hughestown, PA 18640</div>
                        <div>(570) 362-6150</div>
                        <div>www.hughestownstorage.com</div>
                        <div>office@hughestownstorage.com</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePrintReceipt(submittedOrder)}
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      <PrinterIcon />
                      Print
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md bg-gray-50 p-3">
                      <div className="font-semibold">Customer</div>
                      <div className="mt-1">{submittedOrder.name}</div>
                      <div>{submittedOrder.phone}</div>
                      <div>{submittedOrder.email}</div>
                    </div>

                    <div className="rounded-md bg-gray-50 p-3">
                      <div className="font-semibold">Notes</div>
                      <div className="mt-1 whitespace-pre-wrap">
                        {submittedOrder.notes?.trim() ? submittedOrder.notes : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-md border">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-semibold">Item</th>
                          <th className="text-center px-3 py-2 font-semibold w-16">Qty</th>
                          <th className="text-right px-3 py-2 font-semibold w-28">Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submittedOrder.items.map((it) => (
                          <tr key={it.id} className="border-t">
                            <td className="px-3 py-2">
                              {it.name}
                              {it.size ? <span className="text-xs text-gray-500"> {' '}({it.size})</span> : null}
                            </td>
                            <td className="px-3 py-2 text-center">{it.qty}</td>
                            <td className="px-3 py-2 text-right">{centsToUsd(it.lineTotalCents)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <div className="w-full sm:w-[320px] text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">{centsToUsd(submittedOrder.subtotalCents)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PA Sales Tax (6%)</span>
                        <span className="font-semibold">{centsToUsd(submittedOrder.taxCents)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Grand Total</span>
                        <span className="font-bold">{centsToUsd(submittedOrder.grandTotalCents)}</span>
                      </div>
                      <div className="text-xs text-gray-500 pt-2">
                        Totals shown are estimates. Final total confirmed at pickup.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full bg-[#EC1516] text-white px-6 py-3 font-semibold hover:opacity-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* CART VIEW */}
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-600">Your order is empty.</p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((line) => (
                        <div key={line.item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                          <div>
                            <div className="font-semibold text-gray-800">{line.item.name}</div>
                            <div className="text-sm text-gray-600">
                              {line.item.size ? `${line.item.size} • ` : ''}
                              <span className="font-semibold text-orange-600">{line.item.price}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-nowrap">
                            {/* Qty label */}
                            <span className="text-sm text-gray-600 shrink-0">Qty</span>

                            {/* Stepper */}
                            <div className="inline-flex shrink-0 items-stretch rounded-lg border border-gray-300 bg-white overflow-hidden">
                              {/* Decrease */}
                              <button
                                type="button"
                                onClick={() => updateQty(line.item.id, clampQty(line.qty - 1))}
                                disabled={line.qty <= 1}
                                className="
                                  w-9 h-9
                                  flex items-center justify-center
                                  text-red-600 font-bold text-lg
                                  active:bg-red-50
                                  disabled:opacity-30
                                  transition
                                "
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>

                              {/* Quantity number */}
                              <div
                                className="
                                  min-w-[36px]
                                  flex items-center justify-center
                                  text-base font-semibold
                                  border-x border-gray-200
                                  px-2
                                "
                              >
                                {line.qty}
                              </div>

                              {/* Increase */}
                              <button
                                type="button"
                                onClick={() => updateQty(line.item.id, clampQty(line.qty + 1))}
                                disabled={line.qty >= 99}
                                className="
                                  w-9 h-9
                                  flex items-center justify-center
                                  text-green-600 font-bold text-lg
                                  active:bg-green-50
                                  disabled:opacity-30
                                  transition
                                "
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Trash icon */}
                            <button
                              type="button"
                              onClick={() => removeFromCart(line.item.id)}
                              className="
                                w-9 h-9
                                flex items-center justify-center
                                border border-gray-300
                                rounded-full
                                text-gray-600
                                active:bg-gray-100
                                shrink-0
                                transition
                              "
                              aria-label={`Remove ${line.item.name}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v10h-2V9Zm4 0h2v10h-2V9ZM7 9h2v10H7V9Zm-1 12h12a2 2 0 0 0 2-2V7H4v12a2 2 0 0 0 2 2Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Totals */}
                {cart.length > 0 && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">{centsToUsd(subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>PA Sales Tax (6%)</span>
                      <span className="font-semibold">{centsToUsd(taxCents)}</span>
                    </div>
                    <div className="flex justify-between text-base text-gray-900 mt-3 pt-3 border-t border-gray-200">
                      <span className="font-bold">Grand Total</span>
                      <span className="font-bold">{centsToUsd(grandTotalCents)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Totals shown are estimates. Final total confirmed at pickup.
                    </p>
                  </div>
                )}

                <form onSubmit={submitReservationOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={14}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="(570) 456-8765"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter 10 digits (US phone number).</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Pickup date/time preference, special requests, etc."
                    />
                  </div>

                  {status !== 'idle' && (
                    <div
                      className={`text-sm rounded-lg px-3 py-2 ${
                        status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {statusMsg}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-1/3 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 disabled:opacity-60"
                      disabled={submitting || cart.length === 0}
                    >
                      {submitting ? 'Sending...' : 'Submit Order'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 pt-1">
                    Submitting sends your moving supplies order to Hughestown Self-Storage for confirmation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}