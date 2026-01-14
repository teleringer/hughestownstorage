'use client';

export default function DocumentHero() {
  return (
    <section className="bg-green-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Document Storage</h1>
            <p className="text-xl mb-8">
              Secure, climate-controlled storage for your important business and personal documents. Keep your files safe and easily accessible.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
                Get Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 whitespace-nowrap cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
          <div>
            <img 
              src="/images/document-storage/doc-hero.jpg"
              alt="Document Storage"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}