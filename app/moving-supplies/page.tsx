'use client';

import SuppliesHero from './SuppliesHero';
import ProductGrid from './ProductGrid';
import PackingTips from './PackingTips';

export default function MovingSupplies() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main className="pt-20 md:pt-40">
        <SuppliesHero />

        {/* Anchor target for "Shop Now" */}
        <section id="shop" className="scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Reserve Moving Supplies for Pickup
              </h2>
              <p className="text-gray-700 mb-4">
                Add multiple items to a reserve order, submit once, and we’ll confirm availability and pickup details.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-800 mb-1">1) Build your order</div>
                  <div>Add items + quantities to your Reserve Order.</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-800 mb-1">2) Submit your request</div>
                  <div>We’ll receive your list instantly by email.</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-800 mb-1">3) We confirm pickup</div>
                  <div>We’ll contact you to confirm availability + timing.</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+15703626150"
                  className="inline-flex justify-center items-center bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700"
                >
                  Call to Reserve: (570) 362-6150
                </a>

                <a
                  href="#shop"
                  className="inline-flex justify-center items-center border border-orange-600 text-orange-700 px-6 py-3 rounded-full font-semibold hover:bg-white"
                >
                  Build a Reserve Order
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Note: Online reservations are requests. We’ll confirm availability before holding items.
              </p>
            </div>
          </div>

          <ProductGrid />
        </section>

        {/* Anchor target for "Packing Tips" */}
        <section id="tips" className="scroll-mt-28">
          <PackingTips />
        </section>
      </main>
    </div>
  );
}