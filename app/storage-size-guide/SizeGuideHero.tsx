'use client';

export default function SizeGuideHero() {
  return (
    <section className="bg-teal-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Storage Size Guide</h1>
            <p className="text-xl mb-8">
              Find the perfect storage unit size for your needs. Our comprehensive guide helps you choose the right space and save money.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
                Size Calculator
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 whitespace-nowrap cursor-pointer">
                View Pricing
              </button>
            </div>
          </div>
          <div>
            <img
  src="/images/storage/sizes-hero.jpg"
  alt="Storage Unit Size Comparison"
  className="w-full rounded-lg shadow-lg object-cover h-[400px]"
/>
          </div>
        </div>
      </div>
    </section>
  );
}