
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
              <a href="#plans" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
  View Plans
</a>
              
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
  src="/images/tenant/protection-hero.jpg"
  alt="Storage Protection Plans"
  className="w-full rounded-lg shadow-lg object-cover h-[400px]"
/>
          </div>
        </div>
      </div>
    </section>
  );
}
