'use client';

export default function ProductGrid() {
  const products = [
    {
      name: 'Small Moving Box',
      size: '16" x 12" x 12"',
      price: '$2.99',
      description: 'Perfect for books, records, and heavy items',
      image: 'https://readdy.ai/api/search-image?query=Small%20cardboard%20moving%20box%20brown%20corrugated%20packaging%20box%20for%20books%20and%20heavy%20items%20clean%20white%20background%20product%20photo&width=300&height=300&seq=box1&orientation=squarish'
    },
    {
      name: 'Medium Moving Box',
      size: '18" x 14" x 12"',
      price: '$3.49',
      description: 'Ideal for clothes, linens, and medium items',
      image: 'https://readdy.ai/api/search-image?query=Medium%20cardboard%20moving%20box%20brown%20corrugated%20packaging%20box%20for%20clothes%20and%20linens%20clean%20white%20background%20product%20photo&width=300&height=300&seq=box2&orientation=squarish'
    },
    {
      name: 'Large Moving Box',
      size: '24" x 18" x 18"',
      price: '$4.99',
      description: 'Great for lightweight bulky items like pillows',
      image: 'https://readdy.ai/api/search-image?query=Large%20cardboard%20moving%20box%20brown%20corrugated%20packaging%20box%20for%20bulky%20lightweight%20items%20clean%20white%20background%20product%20photo&width=300&height=300&seq=box3&orientation=squarish'
    },
    {
      name: 'Wardrobe Box',
      size: '24" x 21" x 46"',
      price: '$12.99',
      description: 'Tall box with hanging bar for clothes',
      image: 'https://readdy.ai/api/search-image?query=Tall%20wardrobe%20moving%20box%20with%20hanging%20bar%20for%20clothes%20brown%20cardboard%20box%20clean%20white%20background%20product%20photo&width=300&height=300&seq=wardrobe1&orientation=squarish'
    },
    {
      name: 'Bubble Wrap',
      size: '12" x 50ft Roll',
      price: '$8.99',
      description: 'Protective wrapping for fragile items',
      image: 'https://readdy.ai/api/search-image?query=Bubble%20wrap%20roll%20clear%20plastic%20protective%20packaging%20material%20for%20fragile%20items%20clean%20white%20background%20product%20photo&width=300&height=300&seq=bubble1&orientation=squarish'
    },
    {
      name: 'Packing Tape',
      size: '2" x 55 yards',
      price: '$3.99',
      description: 'Heavy-duty adhesive tape for sealing boxes',
      image: 'https://readdy.ai/api/search-image?query=Clear%20packing%20tape%20roll%20heavy%20duty%20adhesive%20tape%20for%20sealing%20moving%20boxes%20clean%20white%20background%20product%20photo&width=300&height=300&seq=tape1&orientation=squarish'
    },
    {
      name: 'Moving Blankets',
      size: '72" x 80"',
      price: '$19.99',
      description: 'Padded protection for furniture',
      image: 'https://readdy.ai/api/search-image?query=Moving%20blanket%20padded%20furniture%20protection%20blanket%20blue%20or%20gray%20thick%20protective%20covering%20clean%20white%20background%20product%20photo&width=300&height=300&seq=blanket1&orientation=squarish'
    },
    {
      name: 'Packing Paper',
      size: '25 lb Bundle',
      price: '$12.99',
      description: 'Clean newsprint for wrapping items',
      image: 'https://readdy.ai/api/search-image?query=Stack%20of%20packing%20paper%20newsprint%20white%20paper%20bundle%20for%20wrapping%20items%20during%20moving%20clean%20white%20background%20product%20photo&width=300&height=300&seq=paper1&orientation=squarish'
    },
    {
      name: 'Mattress Bag',
      size: 'Queen Size',
      price: '$7.99',
      description: 'Plastic protection for mattresses',
      image: 'https://readdy.ai/api/search-image?query=Clear%20plastic%20mattress%20bag%20protective%20cover%20for%20queen%20size%20mattress%20moving%20and%20storage%20clean%20white%20background%20product%20photo&width=300&height=300&seq=mattress1&orientation=squarish'
    },
    {
      name: 'Box Cutter',
      size: 'Utility Knife',
      price: '$4.99',
      description: 'Sharp blade for cutting tape and boxes',
      image: 'https://readdy.ai/api/search-image?query=Utility%20box%20cutter%20knife%20yellow%20handle%20sharp%20blade%20cutting%20tool%20for%20moving%20supplies%20clean%20white%20background%20product%20photo&width=300&height=300&seq=cutter1&orientation=squarish'
    },
    {
      name: 'Marker Set',
      size: 'Pack of 4',
      price: '$5.99',
      description: 'Permanent markers for labeling boxes',
      image: 'https://readdy.ai/api/search-image?query=Set%20of%20permanent%20markers%20black%20markers%20for%20labeling%20moving%20boxes%20office%20supplies%20clean%20white%20background%20product%20photo&width=300&height=300&seq=markers1&orientation=squarish'
    },
    {
      name: 'Padlock',
      size: 'Heavy Duty',
      price: '$12.99',
      description: 'Secure lock for storage unit',
      image: 'https://readdy.ai/api/search-image?query=Heavy%20duty%20padlock%20security%20lock%20for%20storage%20unit%20metal%20lock%20with%20keys%20clean%20white%20background%20product%20photo&width=300&height=300&seq=lock1&orientation=squarish'
    }
  ];

  return (
    <section className="py-16 bg-white" data-product-shop>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Moving Supplies Available</h2>
          <p className="text-lg text-gray-600">Quality packing materials at competitive prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.size}</p>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Moving Kits Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-4">Studio Apartment Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$49.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 10 Small boxes</li>
                <li>• 5 Medium boxes</li>
                <li>• 2 Rolls of tape</li>
                <li>• 1 Roll bubble wrap</li>
                <li>• 1 Marker</li>
              </ul>
              <button className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer">
                Buy Kit
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-orange-600">
              <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm mb-4 inline-block">Most Popular</div>
              <h4 className="text-lg font-semibold mb-4">2-3 Bedroom Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$89.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 15 Small boxes</li>
                <li>• 10 Medium boxes</li>
                <li>• 5 Large boxes</li>
                <li>• 3 Rolls of tape</li>
                <li>• 2 Rolls bubble wrap</li>
                <li>• 1 Bundle packing paper</li>
                <li>• 2 Markers</li>
              </ul>
              <button className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer">
                Buy Kit
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold mb-4">4+ Bedroom Kit</h4>
              <div className="text-3xl font-bold text-orange-600 mb-4">$149.99</div>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• 20 Small boxes</li>
                <li>• 15 Medium boxes</li>
                <li>• 10 Large boxes</li>
                <li>• 2 Wardrobe boxes</li>
                <li>• 5 Rolls of tape</li>
                <li>• 3 Rolls bubble wrap</li>
                <li>• 2 Bundles packing paper</li>
                <li>• 4 Moving blankets</li>
                <li>• 3 Markers</li>
              </ul>
              <button className="w-full mt-4 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 whitespace-nowrap cursor-pointer">
                Buy Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}