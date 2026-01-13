
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-40">
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
