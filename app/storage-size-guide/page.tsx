
'use client';

import SizeGuideHero from './SizeGuideHero';
import SizeComparison from './SizeComparison';
import SizeCalculator from './SizeCalculator';

export default function StorageSizeGuide() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main className="pt-20 md:pt-40">
        <SizeGuideHero />
        <SizeComparison />
        <SizeCalculator />
      </main>
    </div>
  );
}
