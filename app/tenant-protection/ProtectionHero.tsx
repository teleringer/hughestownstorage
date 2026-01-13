
'use client';

export default function ProtectionHero() {
  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Tenant Protection Plans</h1>
            <p className="text-xl mb-8">
              Protect your stored belongings with comprehensive coverage options. Choose from three affordable protection plans with no deductible and complete peace of mind.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer text-center">
                View Plans
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 whitespace-nowrap cursor-pointer text-center">
                Download Brochure
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$5K</div>
                <div className="text-blue-200">Maximum Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">No</div>
                <div className="text-blue-200">Deductible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Full</div>
                <div className="text-blue-200">Protection</div>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20insurance%20protection%20concept%20with%20shield%20security%20icon%20protecting%20valuable%20items%20storage%20facility%20background%20modern%20clean%20design%20trust%20and%20security%20theme%20blue%20color%20scheme&width=600&height=400&seq=protection1&orientation=landscape"
              alt="Tenant Protection"
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
