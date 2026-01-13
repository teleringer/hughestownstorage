
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SuppliesHero from './SuppliesHero';
import ProductGrid from './ProductGrid';
import PackingTips from './PackingTips';

export default function MovingSupplies() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-40">
        <SuppliesHero />
        <ProductGrid />
        <PackingTips />
      </main>
      <Footer />
    </div>
  );
}
