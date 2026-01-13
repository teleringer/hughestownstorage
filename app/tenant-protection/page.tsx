
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProtectionHero from './ProtectionHero';
import ProtectionPlans from './ProtectionPlans';
import ClaimsProcess from './ClaimsProcess';

export default function TenantProtection() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-40">
        <ProtectionHero />
        <ProtectionPlans />
        <ClaimsProcess />
      </main>
      <Footer />
    </div>
  );
}
