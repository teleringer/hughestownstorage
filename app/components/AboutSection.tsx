
'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Hughestown Self-Storage</h2>
            <p className="text-lg text-gray-600 mb-6">
              Hughestown Self-Storage was created in 2021 by three brothers who grew up in the area. Several years ago, the brothers sold a self-storage facility they built from the ground up, but knew one day, they would find the perfect location and build another, larger self-storage facility. Now Hughestown Self-Storage, near Pittston, in Luzerne County, Pennsylvania, was built from the ground up.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We offer the highest quality storage units in Northeast Pennsylvania at competitive prices. We value customer satisfaction and strive to provide professional service to every person who rents a unit online or visits our office. Our self-storage units are perfect for individuals or businesses looking to store items short, or long, term, with rental units offered conveniently on a month-to-month basis.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Located in the heart of Hughestown, Pennsylvania, we provide safe, secure, and convenient outdoor storage solutions for residents and businesses throughout Northeast PA. Come visit us and see how we can help you lessen your stuff at home or in the office, and know it is safe and secure at our facility.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">400+</div>
                <div className="text-lg font-bold text-gray-800">Storage Units</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-lg font-bold text-gray-800">Security</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">6AM-10PM</div>
                <div className="text-lg font-bold text-gray-800">Gate Access</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">2025</div>
                <div className="text-lg font-bold text-gray-800">Est. Year</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20outdoor%20storage%20facility%20entrance%20with%20modern%20security%20gate%2C%20well-maintained%20grounds%2C%20clear%20signage%2C%20professional%20lighting%2C%20clean%20and%20organized%20appearance%2C%20commercial%20storage%20business&width=600&height=500&seq=about1&orientation=landscape"
              alt="Hughestown Self-Storage Facility"
              className="w-full rounded-lg shadow-lg object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
