
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FaqHero from './FaqHero';
import FaqSection from './FaqSection';

export default function Faqs() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-40">
        <FaqHero />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
