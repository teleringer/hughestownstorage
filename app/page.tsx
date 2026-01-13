// app/page.tsx
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ServicesSection from "./components/ServicesSection";
import RentStepsSection from "./components/RentStepsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="pt-24 md:pt-48 lg:pt-56 space-y-20">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <RentStepsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
