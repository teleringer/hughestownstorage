
'use client';

import Link from 'next/link';

export default function ServicesSection() {
  const storageUnits = [
    {
      size: "10x10",
      sqft: "100 sq ft",
      description: "Half of a one-car garage - Drive up access",
      items: ["One bedroom apartment", "Large appliances", "Office furniture", "Business inventory"],
      image: "https://static.readdy.ai/image/34eddc7177ae71b8c76003a700ee36ff/c5b65974fb6f8a41572177b56b9b39fe.png",
      cashPrice: "$120",
      cardPrice: "$124.79",
      link: "https://hughestownstorage.ccstorage.com/rentals/new?location_id=loc_b4455999eed8b6afbdd82c48680ffb0c&storage_unit_type_id=sut_7c53b8362be063a587c2a87ee9a10a0b"
    },
    {
      size: "10x15",
      sqft: "150 sq ft",
      description: "Three-quarters of a one-car garage - Drive up access",
      items: ["Two bedroom apartment", "Multiple large items", "Business stock", "Vehicle storage"],
      image: "https://readdy.ai/api/search-image?query=Storage%20unit%20interior%20exactly%20like%2010x10%20unit%20but%2050%25%20deeper%20extended%20length%20same%20wood%20walls%20concrete%20floor%20metal%20door%20same%20lighting%20and%20appearance%20professional%20self%20storage%20facility&width=300&height=200&seq=real10x15&orientation=landscape",
      cashPrice: "$175",
      cardPrice: "$181.98",
      link: "https://hughestownstorage.ccstorage.com/rentals/new?location_id=loc_b4455999eed8b6afbdd82c48680ffb0c&storage_unit_type_id=sut_a24d77975f022740e0774ebc8e550242"
    },
    {
      size: "10x20",
      sqft: "200 sq ft",
      description: "Size of a one-car garage - Drive up access",
      items: ["Three bedroom house", "Car or boat", "Commercial inventory", "Large equipment"],
      image: "https://readdy.ai/api/search-image?query=Storage%20unit%20interior%20exactly%20like%2010x10%20unit%20but%20twice%20as%20deep%20extended%20length%20same%20wood%20walls%20concrete%20floor%20metal%20door%20same%20lighting%20and%20appearance%20professional%20self%20storage%20facility%20full%20garage%20depth&width=300&height=200&seq=real10x20&orientation=landscape",
      cashPrice: "$205",
      cardPrice: "$213.18",
      link: "https://hughestownstorage.ccstorage.com/rentals/new?location_id=loc_b4455999eed8b6afbdd82c48680ffb0c&storage_unit_type_id=sut_c805866207bbfc3fb57fb96324bef33e"
    },
    {
      size: "10x30",
      sqft: "300 sq ft",
      description: "Size of a one and a half car garage - Drive up access",
      items: ["Four bedroom house", "Multiple vehicles", "Business warehouse", "Large collections"],
      image: "/units/000-10x30.jpg",
      cashPrice: "$299",
      cardPrice: "$310.93",
      link: "https://hughestownstorage.ccstorage.com/rentals/new?location_id=loc_b4455999eed8b6afbdd82c48680ffb0c&storage_unit_type_id=sut_4a60c73712b8b1b8b294231d7d07a48d"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Storage Units</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our four drive-up accessible storage unit sizes. All units are 10 feet wide and 10 feet high.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {storageUnits.map((unit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={unit.image}
                alt={`${unit.size} storage unit`}
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-red-600">{unit.size}</h3>
                  <span className="text-lg font-semibold text-gray-700">{unit.sqft}</span>
                </div>
                <p className="text-gray-600 mb-4 font-medium">{unit.description}</p>
                <div className="mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Monthly Rental</div>
                    <div className="text-lg font-bold text-gray-900">Cash: {unit.cashPrice}</div>
                    <div className="text-sm text-gray-600">Card: {unit.cardPrice}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect for:</h4>
                  <ul className="space-y-1">
                    {unit.items.slice(0, 2).map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 flex items-center text-sm">
                        <i className="ri-check-line text-red-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href={unit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 whitespace-nowrap cursor-pointer block text-center"
                >
                  Rent Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
