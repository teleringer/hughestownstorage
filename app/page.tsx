// app/page.tsx
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ServicesSection from "./components/ServicesSection";
import RentStepsSection from "./components/RentStepsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    // Adjust these numbers if your header height changes
    <main className="pt-[88px] md:pt-[128px]">
      <div className="space-y-20">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <RentStepsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  );
}
