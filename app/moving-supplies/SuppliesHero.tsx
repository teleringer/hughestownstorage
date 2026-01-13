'use client';

export default function SuppliesHero() {
  return (
    <section className="bg-orange-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Moving Supplies</h1>
            <p className="text-xl mb-8">
              Everything you need for a successful move. Quality packing supplies at affordable prices, available right here at our facility.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 whitespace-nowrap cursor-pointer">
                Packing Tips
              </button>
            </div>
          </div>
          <div>
            <img 
              src="https://readdy.ai/api/search-image?query=Moving%20supplies%20collection%20with%20cardboard%20boxes%2C%20packing%20tape%2C%20bubble%20wrap%2C%20moving%20blankets%2C%20packing%20materials%20organized%20display%2C%20storage%20facility%20supplies%2C%20professional%20moving%20equipment&width=600&height=400&seq=supplies1&orientation=landscape"
              alt="Moving Supplies"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}