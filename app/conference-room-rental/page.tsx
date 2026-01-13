
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConferenceHero from './ConferenceHero';
import RoomDetails from './RoomDetails';
import BookingSection from './BookingSection';

export default function ConferenceRoomRental() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-40">
        <ConferenceHero />
        <RoomDetails />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
