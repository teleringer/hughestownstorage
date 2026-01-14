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
