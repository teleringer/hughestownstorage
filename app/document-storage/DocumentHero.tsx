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
              src="https://readdy.ai/api/search-image?query=Professional%20document%20storage%20facility%20with%20organized%20filing%20systems%2C%20banker%20boxes%2C%20clean%20shelving%20units%2C%20secure%20storage%20room%2C%20business%20documents%2C%20climate%20controlled%20environment%2C%20professional%20archival%20storage&width=600&height=400&seq=doc1&orientation=landscape"
              alt="Document Storage"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}