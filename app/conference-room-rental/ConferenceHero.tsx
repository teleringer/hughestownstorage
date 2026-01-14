'use client';

export default function ConferenceHero() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Conference Room Rental</h1>
            <p className="text-xl mb-8">
              Professional meeting space available for rent by the hour or day. Perfect for business meetings, training sessions, and corporate events.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 whitespace-nowrap cursor-pointer">
                View Pricing
              </button>
            </div>
          </div>
          <div>
            <img 
              src="/images/conference/conf-hero.jpg"
              alt="Conference Room"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}