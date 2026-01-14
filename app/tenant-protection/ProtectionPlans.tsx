'use client';

export default function ProtectionPlans() {
  const plans = [
    {
      name: "$2,000",
      subtitle: "Tenant Protection Plan",
      price: "$10",
      priceCents: "40",
      coverage: "$2,000",
      popular: false,
      minimumCoverage: true
    },
    {
      name: "$3,000", 
      subtitle: "Tenant Protection Plan",
      price: "$14",
      priceCents: "56",
      coverage: "$3,000",
      popular: true,          // middle is the highlighted option
      peaceOfMind: true
    },
    {
      name: "$5,000",
      subtitle: "Tenant Protection Plan", 
      price: "$20",
      priceCents: "80",
      coverage: "$5,000",
      popular: false,
      maximumCoverage: true
    }
  ];

  const coveredItems = [
    "Burglary*",
    "Building Collapse Including Weight of Snow/Ice or Windstorm",
    "Damage to Stored Vehicle, Boat, or Trailer",
    "Fire", 
    "Water Damage Including Mold and Mildew",
    "Rodent & Vermin",
    "Vandalism"
  ];

  const notCoveredItems = [
    "Accounts, bills, currency, data, documents, records, deeds, evidences of debt, money, notes, securities, or stamps",
    "Aircraft",
    "Animals, birds, or fish", 
    "Antiques",
    "Contraband or other property held for, or in the course of, illegal transportation, sale, or trade",
    "Firearms",
    "Furs, fur garments, and garments trimmed with fur",
    "Jewelry, watches, precious or semiprecious stones, bullion, gold, goldware, gold-plated ware, silver, silverware, platinum, or other precious metals or alloys, and photographic equipment",
    "Valuable papers and records, including those which exist as electronic data and photographs"
  ];

  const exclusions = [
    "Flood",
    "Surface Water", 
    "Mysterious Disappearance"
  ];

  const storageTips = [
    "Keep an inventory of your items and take photographs",
    "Cover your property with drop cloths or plastic covers", 
    "Place boxes on pallets"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Protection Level</h2>
          <p className="text-xl text-gray-600">Three coverage options to protect your stored belongings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const badgeText = plan.minimumCoverage
              ? "MINIMUM!"
              : plan.maximumCoverage
              ? "MAXIMUM!"
              : plan.popular
              ? "MOST POPULAR"
              : null;

            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden relative ${
                  plan.popular ? 'ring-2 ring-red-600' : ''
                }`}
              >
                {badgeText && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold transform rotate-12 translate-x-2 -translate-y-1">
                    {badgeText}
                  </div>
                )}

                <div className="bg-gray-700 text-white text-center py-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm opacity-90">{plan.subtitle}</p>
                </div>
              
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <span className="text-sm">$</span>
                    <span className="text-5xl font-bold text-gray-900">{plan.price.replace('$', '')}</span>
                    <span className="text-2xl text-gray-600">{plan.priceCents}</span>
                    <div className="text-gray-600 mt-1">per month</div>
                  </div>
                
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-center">
                      <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                      <span className="text-gray-700">Reimbursed up to {plan.coverage}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                      <span className="text-gray-700">No deductible</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                      <span className="text-gray-700">
                        {plan.minimumCoverage && "Minimum coverage required"}
                        {plan.peaceOfMind && "Peace of Mind"}
                        {plan.maximumCoverage && "Maximum coverage available"}
                      </span>
                    </div>
                  </div>
                
                  <button
                    className={`w-full py-3 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">What Is Covered*</h3>
          <p className="text-xl text-gray-700 text-center mb-8">Your protection plan covers losses caused by the following:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {coveredItems.map((item, index) => (
              <div key={index} className="flex items-start">
                <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Participating protection plans cover risks associated with the negligence of the store owner and are designed to be compliant with regulatory requirements set forth by the New York Department of Financial Services. The liability of the store owner is limited to the terms, limits, and conditions of the protection plan.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              *Evidence of forced entry and police report required to file a burglary claim. Coverages are limited for Building Collapse, Damage to Stored Vehicle, Boat, or Trailer, Rodent/Vermin, and Mold and Mildew claims — please contact us for details. Water damage coverage does not extend to damage caused by flood/surface water.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Is NOT Covered*</h3>
            <div className="space-y-3">
              {notCoveredItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <i className="ri-close-line text-red-500 mr-3 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Notable Plan Exclusions</h4>
              <div className="space-y-2">
                {exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-center">
                    <i className="ri-close-line text-red-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                    <span className="text-gray-700">{exclusion}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">
              *This is a summary. Please refer to your self-storage rental agreement for a full description of terms, conditions, limits, and exclusions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips for Storing Your Property</h3>
            <div className="space-y-4 mb-8">
              {storageTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-500 mr-3 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center space-y-4">
              <img
                src="/images/tenant/storage-tips.jpg"
                alt="Storage Tips"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 whitespace-nowrap cursor-pointer">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
