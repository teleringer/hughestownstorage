
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SizeGuideHero from './SizeGuideHero';
import SizeComparison from './SizeComparison';
import SizeCalculator from './SizeCalculator';

export default function StorageSizeGuide() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-40">
        <SizeGuideHero />
        <SizeComparison />
        <SizeCalculator />
      </main>
      <Footer />
    </div>
  );
}
