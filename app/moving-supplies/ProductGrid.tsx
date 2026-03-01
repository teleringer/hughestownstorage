'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';

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

function QtyStepper({
  value,
  onChange
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  const v = clampQty(value);

  return (
    <div
      className="inline-flex shrink-0 flex-nowrap items-stretch rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={() => onChange(clampQty(v - 1))}
        disabled={v <= 1}
        className="
          flex-none
          w-12 h-11 sm:w-10 sm:h-10
          grid place-items-center
          text-gray-900 font-bold text-lg leading-none
          hover:bg-gray-50 active:bg-gray-100
          disabled:opacity-40 disabled:cursor-not-allowed
          select-none active:scale-[0.98]
          transition
        "
        aria-label="Decrease quantity"
      >
        −
      </button>

      <div
        className="
          flex-none
          w-14 h-11 sm:w-12 sm:h-10
          grid place-items-center
          text-gray-900 font-bold text-base sm:text-sm
          border-x border-gray-200
          select-none
        "
        aria-live="polite"
        aria-label={`Quantity ${v}`}
      >
        {v}
      </div>

      <button
        type="button"
        onClick={() => onChange(clampQty(v + 1))}
        disabled={v >= 999}
        className="
          flex-none
          w-12 h-11 sm:w-10 sm:h-10
          grid place-items-center
          text-gray-900 font-bold text-lg leading-none
          hover:bg-gray-50 active:bg-gray-100
          disabled:opacity-40 disabled:cursor-not-allowed
          select-none active:scale-[0.98]
          transition
        "
        aria-label="Increase quantity"
      >
        ＋
      </button>
    </div>
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

  function openOrderModal() {
    if (cart.length === 0) return;
    setIsOpen(true);
    setStatus('idle');
    setStatusMsg('');
  }

  function closeModal() {
    setIsOpen(false);
    setSubmitting(false);
    setStatus('idle');
    setStatusMsg('');
  }

  // phone mask handler
  function handlePhoneChange(next: string) {
    const d = digitsOnly(next).slice(0, 10);
    setPhone(formatUsPhone(d));
  }

  async function submitReservationOrder(e: FormEvent) {
    e.preventDefault();

    if (cart.length === 0) {
      setStatus('error');
      setStatusMsg('Your reservation order is empty.');
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
      // NEW: totals so the email can show Subtotal/Tax/Grand Total
      totals: {
        subtotalCents,
        taxRate: TAX_RATE,
        taxCents,
        grandTotalCents
      },
      message: [
        `MOVING SUPPLIES RESERVATION ORDER`,
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
        let msg = 'Something went wrong sending your reservation. Please try again.';
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        setStatus('error');
        setStatusMsg(msg);
        setSubmitting(false);
        return;
      }

      setStatus('success');
      setStatusMsg("Thanks — we received your reservation order. We'll contact you shortly to confirm availability.");
      setSubmitting(false);

      setCart([]);
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <section className="py-16 bg-white" data-product-shop>
      {/* Toast feedback */}
      {justAdded && (
        <div className="fixed top-24 right-4 z-[60]">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
            ✅ Added to reserve order: <span className="font-semibold">{justAdded}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Moving Supplies Available</h2>
          <p className="text-lg text-gray-600">Quality packing materials at competitive prices</p>
        </div>

        {cartCount > 0 && (
          <div className="sticky top-4 z-10 mb-6 flex justify-center">
            <button
              type="button"
              onClick={openOrderModal}
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 shadow-lg"
            >
              Reserve Order ({cartCount})
            </button>
          </div>
        )}

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
                  Add to Reserve Order →
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
                Add Kit to Order →
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-orange-600">
              <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm mb-4 inline-block">Most Popular</div>
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
                Add Kit to Order →
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
                Add Kit to Order →
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
                <h3 className="text-2xl font-bold text-gray-800">Reserve Order</h3>
                <p className="text-sm text-gray-600 mt-1">Review your items, then submit to reserve for pickup.</p>
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
  <span className="text-sm text-gray-600 shrink-0">
    Qty
  </span>

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
                  {submitting ? 'Sending...' : 'Submit Reservation Order'}
                </button>
              </div>

              <p className="text-xs text-gray-500 pt-1">
                Submitting sends your reservation order to Hughestown Self-Storage for confirmation.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}