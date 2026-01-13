
'use client';

export default function RentStepsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Rent in 3 Easy Steps</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-building-line text-white text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">1. Select a Unit</h3>
            <p className="text-gray-600">
              We have four self-storage unit sizes plus outdoor car, boat, trailer and RV size spaces
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-file-text-line text-white text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">2. Sign Lease & Pay Online</h3>
            <p className="text-gray-600">
              Use any internet connected device to access your account and make payments
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-truck-line text-white text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">3. Move your stuff in</h3>
            <p className="text-gray-600">
              Pack your items up and bring them over to conveniently store them when needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}