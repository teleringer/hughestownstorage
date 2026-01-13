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
              src="https://readdy.ai/api/search-image?query=Professional%20conference%20room%20with%20modern%20furniture%2C%20large%20meeting%20table%2C%20comfortable%20chairs%2C%20presentation%20screen%2C%20natural%20lighting%2C%20business%20meeting%20space%2C%20corporate%20environment%2C%20clean%20and%20organized&width=600&height=400&seq=conf1&orientation=landscape"
              alt="Conference Room"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}