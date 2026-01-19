
'use client';

import SizeGuideHero from './SizeGuideHero';
import SizeComparison from './SizeComparison';
import SizeCalculator from './SizeCalculator';

export default function Page() {
  return (
    <main className="pt-20 md:pt-40 scroll-smooth">
      <SizeGuideHero />
      <section id="calculator">
        <SizeCalculator />
      </section>
      <section id="pricing">
        <SizeComparison />
      </section>
    </main>
  );
}

