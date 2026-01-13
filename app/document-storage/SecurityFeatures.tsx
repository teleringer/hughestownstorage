'use client';

export default function SecurityFeatures() {
  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Climate Controlled',
      description: 'Temperature and humidity controlled environment protects documents from damage.'
    },
    {
      icon: 'ri-lock-line',
      title: 'Secure Access',
      description: 'Restricted access with key card entry and surveillance monitoring.'
    },
    {
      icon: 'ri-fire-line',
      title: 'Fire Protection',
      description: 'Advanced fire suppression system and fireproof storage containers.'
    },
    {
      icon: 'ri-file-search-line',
      title: 'Easy Retrieval',
      description: 'Organized filing system with quick document retrieval services.'
    },
    {
      icon: 'ri-camera-line',
      title: '24/7 Monitoring',
      description: 'Round-the-clock security surveillance and alarm systems.'
    },
    {
      icon: 'ri-archive-line',
      title: 'Long-term Storage',
      description: 'Perfect for archival storage with retention schedule management.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Document Storage?</h2>
          <p className="text-lg text-gray-600">Professional-grade security and organization for your important documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${feature.icon} text-3xl text-green-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Ideal For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <i className="ri-building-line text-4xl text-green-600 mb-3"></i>
              <h4 className="font-semibold mb-2">Businesses</h4>
              <p className="text-sm text-gray-600">Financial records, contracts, employee files</p>
            </div>
            <div className="text-center">
              <i className="ri-scales-line text-4xl text-green-600 mb-3"></i>
              <h4 className="font-semibold mb-2">Legal Firms</h4>
              <p className="text-sm text-gray-600">Case files, court documents, client records</p>
            </div>
            <div className="text-center">
              <i className="ri-hospital-line text-4xl text-green-600 mb-3"></i>
              <h4 className="font-semibold mb-2">Healthcare</h4>
              <p className="text-sm text-gray-600">Patient records, insurance documents</p>
            </div>
            <div className="text-center">
              <i className="ri-home-line text-4xl text-green-600 mb-3"></i>
              <h4 className="font-semibold mb-2">Personal</h4>
              <p className="text-sm text-gray-600">Tax records, insurance, important papers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}