
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DocumentHero from './DocumentHero';
import SecurityFeatures from './SecurityFeatures';
import PricingSection from './PricingSection';

export default function DocumentStorage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-40">
        <DocumentHero />
        <SecurityFeatures />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
