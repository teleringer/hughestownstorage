'use client';

export default function PricingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Document Storage Pricing</h2>
          <p className="text-lg text-gray-600">Affordable rates for secure document storage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Standard Box</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">$8</div>
            <p className="text-gray-600 mb-6">Per box per month</p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>15" x 12" x 10" banker box</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Climate controlled</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Secure storage</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Basic retrieval service</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 whitespace-nowrap cursor-pointer">
              Get Started
            </button>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-lg border-2 border-green-600">
            <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm mb-4 inline-block">Most Popular</div>
            <h3 className="text-2xl font-semibold mb-4">Business Package</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">$60</div>
            <p className="text-gray-600 mb-6">Per month (10 boxes)</p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>10 banker boxes included</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Priority retrieval service</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Digital inventory tracking</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Free pickup & delivery</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 whitespace-nowrap cursor-pointer">
              Get Started
            </button>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">Custom</div>
            <p className="text-gray-600 mb-6">Contact for pricing</p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Unlimited storage boxes</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Same-day retrieval</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Dedicated account manager</li>
              <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Custom retention schedules</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 whitespace-nowrap cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Document Pickup</h4>
              <p className="text-green-600 font-bold">$25</p>
              <p className="text-sm text-gray-600">Per pickup</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Document Delivery</h4>
              <p className="text-green-600 font-bold">$15</p>
              <p className="text-sm text-gray-600">Per delivery</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Digital Scanning</h4>
              <p className="text-green-600 font-bold">$0.25</p>
              <p className="text-sm text-gray-600">Per page</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Secure Destruction</h4>
              <p className="text-green-600 font-bold">$10</p>
              <p className="text-sm text-gray-600">Per box</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}