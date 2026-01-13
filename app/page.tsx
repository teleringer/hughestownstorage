
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import RentStepsSection from './components/RentStepsSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-[140px]">
        <HeroSection />
        <RentStepsSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
