'use client';

export default function RoomDetails() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Room Features & Amenities</h2>
          <p className="text-lg text-gray-600">Everything you need for a successful meeting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-group-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Seats 12 People</h3>
            <p className="text-gray-600">Comfortable seating for up to 12 participants</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-projector-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Projection System</h3>
            <p className="text-gray-600">HD projector and screen for presentations</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-wifi-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">High-Speed WiFi</h3>
            <p className="text-gray-600">Reliable internet connection included</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-phone-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Conference Phone</h3>
            <p className="text-gray-600">Professional audio system for calls</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-air-conditioning-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Climate Control</h3>
            <p className="text-gray-600">Comfortable temperature year-round</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-car-line text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Parking</h3>
            <p className="text-gray-600">Convenient parking for all attendees</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-2">Hourly Rate</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">$25</div>
              <p className="text-gray-600">Per hour (2 hour minimum)</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-600">
              <h4 className="text-lg font-semibold mb-2">Half Day</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">$90</div>
              <p className="text-gray-600">4 hours (Most Popular)</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-2">Full Day</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">$150</div>
              <p className="text-gray-600">8+ hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}