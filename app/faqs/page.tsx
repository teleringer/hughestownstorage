'use client';

import Script from "next/script";
import Link from "next/link";

export default function FAQsPage() {
  const faqs = [
    {
      q: "Where are you located?",
      a: (
        <>
          We’re at <strong>133 New Street, Hughestown, PA 18640</strong>. Get
          directions on{" "}
          <a
            href="https://maps.app.goo.gl/MN215YU6qtMzG3FJ7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Maps
          </a>{" "}
          or{" "}
          <a
            href="https://maps.apple.com/?daddr=41.332021,-75.776151&q=Hughestown%20Self-Storage&dirflg=d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Apple Maps
          </a>
          .
        </>
      ),
    },
    {
      q: "What are your hours?",
      a: (
        <>
          <div className="space-y-1">
            <p>
              <strong>Office:</strong> Mon–Sat 8:30 AM – 5:30 PM; Sunday Closed
            </p>
            <p>
              <strong>Gate Access:</strong> 6:00 AM – 10:00 PM daily
            </p>
          </div>
        </>
      ),
    },
    {
      q: "What unit sizes do you offer?",
      a: (
        <>
          Popular sizes include <strong>10x10</strong>, <strong>10x15</strong>,{" "}
          <strong>10x20</strong>, and <strong>10x30</strong>. See photos and
          what fits in each on our{" "}
          <Link href="/storage-size-guide" className="text-blue-600 underline">
            Storage Size Guide
          </Link>
          .
        </>
      ),
    },
    {
      q: "How do I rent a unit?",
      a: (
        <>
          Click{" "}
          <Link href="/rent-now" className="text-blue-600 underline">
            Rent Now
          </Link>{" "}
          to start online, or call us at{" "}
          <a href="tel:+15703626150" className="text-blue-600 underline">
            (570) 362-6150
          </a>
          . We’ll confirm availability and get you set up fast.
        </>
      ),
    },
    {
      q: "Do you offer month-to-month leases?",
      a: <>Yes—storage is month-to-month. No long-term commitment required.</>,
    },
    {
      q: "Is the property secure?",
      a: (
        <>
          Yes. We feature gated keypad access, camera surveillance, and a clean,
          well-lit facility. See details on{" "}
          <Link href="/document-storage" className="text-blue-600 underline">
            Security &amp; Document Storage
          </Link>
          .
        </>
      ),
    },
    {
      q: "Do I need tenant protection?",
      a: (
        <>
          Yes. Review options and claims info on our{" "}
          <Link href="/tenant-protection" className="text-blue-600 underline">
            Tenant Protection
          </Link>{" "}
          page.
        </>
      ),
    },
    {
      q: "What can’t I store?",
      a: (
        <>
          No hazardous/flammable materials, perishables, live animals, illegal
          items, or anything that smells strongly. You cannot use it as shelter for a human being. When in doubt, call{" "}
          <a href="tel:+15703626150" className="text-blue-600 underline">
            (570) 362-6150
          </a>
          .
        </>
      ),
    },
    {
      q: "How do I pay?",
      a: (
        <>
          We accept major cards and offer online bill-pay. Autopay is available
          so you never miss a due date. Owner accepts cash and checks as well. There will be a $45 fee for checks that bounce.
        </>
      ),
    },
    {
      q: "Do you sell locks or moving supplies?",
      a: (
        <>
          Yes—see{" "}
          <Link href="/moving-supplies" className="text-blue-600 underline">
            Moving Supplies
          </Link>{" "}
          for popular items and availability.
        </>
      ),
    },
    {
      q: "Do you have climate-controlled units?",
      a: (
        <>
          No. All of our units are outdoor ground level. Give us a quick call at{" "}
          <a href="tel:+15703626150" className="text-blue-600 underline">
            (570) 362-6150
          </a>{" "}
          and we’ll confirm what’s open.
        </>
      ),
    },
    {
      q: "Can I drive up to my unit?",
      a: (
        <>Yes. All units are ground-level and allow easy drive-up access for loading and unloading.</>
      ),
    },
    {
      q: "How do I cancel?",
      a: (
        <>
          Storage is month-to-month. Just{" "}
          <a
            href="mailto:office@hughestownstorage.com"
            className="text-blue-600 underline"
          >
            email the office
          </a>{" "}
          or call at least 3 business days before your next billing date.
        </>
      ),
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof f.a === "string"
            ? f.a
            : "See the answer on our website.",
      },
    })),
  };

  return (
    <section id="faqs" className="py-12 lg:py-16">
      <Script id="faq-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mb-10">
          Quick answers to common questions about renting at Hughestown Self-Storage.
        </p>

        <div className="divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group p-6 open:bg-gray-50 open:rounded-2xl"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {item.q}
                </h2>
                <span className="text-gray-400 group-open:rotate-45 transition-transform select-none">＋</span>
              </summary>
              <div className="mt-3 text-gray-700 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>

        {/* Help / CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+15703626150"
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-white font-medium hover:bg-orange-700"
          >
            Call (570) 362-6150
          </a>
          <a
            href="mailto:office@hughestownstorage.com"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-gray-800 font-medium hover:bg-gray-50"
          >
            Email the Office
          </a>
          <Link
  href="https://hughestownstorage.ccstorage.com/find_units"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-gray-800 font-medium hover:bg-gray-50"
>
  Rent Now
</Link>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          * Holiday exceptions apply. See footer for details.
        </p>
      </div>
    </section>
  );
}
