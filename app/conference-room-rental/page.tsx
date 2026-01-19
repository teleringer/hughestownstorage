'use client';

import ConferenceHero from './ConferenceHero';
import RoomDetails from './RoomDetails';
import BookingSection from './BookingSection';

export default function ConferenceRoomRental() {
  return (
    <div className="min-h-screen">
      <main className="pt-20 md:pt-40">
        <ConferenceHero />

        {/* Anchor target for "View Pricing" */}
        <section id="pricing">
          <RoomDetails />
        </section>

        {/* Anchor target for "Book Now" */}
        <section id="book">
          <BookingSection />
        </section>
      </main>
    </div>
  );
}
