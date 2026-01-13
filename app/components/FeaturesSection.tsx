
'use client';

export default function FeaturesSection() {
  const features = [
    {
      icon: "ri-shield-check-line",
      title: "Secure & Safe",
      description: "Your belongings are safe and secure in a well-lit, gated area with security cameras and private gate access codes."
    },
    {
      icon: "ri-car-line",
      title: "Vehicle Storage",
      description: "Car, boat, RV, and trailer storage spaces available alongside our four different size storage units."
    },
    {
      icon: "ri-user-settings-line",
      title: "On-Site Manager",
      description: "Professional on-site management provides excellent customer service and maintains facility security."
    },
    {
      icon: "ri-building-line",
      title: "Ground Level Units",
      description: "All units are ground level with drive-up access - no elevators or stairs needed for convenient loading."
    },
    {
      icon: "ri-time-line",
      title: "Extended Gate Access",
      description: "Gate access 6am-10pm every day with your private access code for ultimate convenience."
    },
    {
      icon: "ri-droplet-line",
      title: "Dry & Clean Facilities",
      description: "Well-maintained, dry and clean storage units with 10' ceilings for maximum cubic footage storage."
    },
    {
      icon: "ri-lightbulb-line",
      title: "Fenced & Lighted",
      description: "Fully fenced and well-lighted facility with paved and graded surfaces for proper drainage."
    },
    {
      icon: "ri-file-text-line",
      title: "Business Records",
      description: "Professional business record storage solutions with secure access and climate-controlled options."
    },
    {
      icon: "ri-group-line",
      title: "Conference Room",
      description: "Conference room rental available for business meetings and professional gatherings."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Hughestown Self-Storage you get these great amenities and more. Your belongings are safe and secure in a well-lit, gated area. Choose from four different size storage units and trailer/boat/RV/car spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${feature.icon} text-2xl text-red-600 w-8 h-8 flex items-center justify-center`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
