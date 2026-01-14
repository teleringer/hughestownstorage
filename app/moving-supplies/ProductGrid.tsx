'use client';

export default function ProductGrid() {
  const products = [
    {
      name: 'Small Moving Box',
      size: '16" x 12" x 12"',
      price: '$2.99',
      description: 'Perfect for books, records, and heavy items',
      image: '/images/products/small-box.jpg'
    },
    {
      name: 'Medium Moving Box',
      size: '18" x 14" x 12"',
      price: '$3.49',
      description: 'Ideal for clothes, linens, and medium items',
      image: '/images/products/medium-box.jpg'
    },
    {
      name: 'Large Moving Box',
      size: '24" x 18" x 18"',
      price: '$4.99',
      description: 'Great for lightweight bulky items like pillows',
      image: '/images/products/large-box.jpg'
    },
    {
      name: 'Wardrobe Box',
      size: '24" x 21" x 46"',
      price: '$12.99',
      description: 'Tall box with hanging bar for clothes',
      image: '/images/products/wardrobe-box.jpg'
    },
    {
      name: 'Bubble Wrap',
      size: '12" x 50ft Roll',
      price: '$8.99',
      description: 'Protective wrapping for fragile items',
      image: '/images/products/bubble-wrap.jpg'
    },
    {
      name: 'Packing Tape',
      size: '2" x 55 yards',
      price: '$3.99',
      description: 'Heavy-duty adhesive tape for sealing boxes',
      image: '/images/products/packing-tape.jpg'
    },
    {
      name: 'Moving Blankets',
      size: '72" x 80"',
      price: '$19.99',
      description: 'Padded protection for furniture',
      image: '/images/products/moving-blanket.jpg'
    },
    {
      name: 'Packing Paper',
      size: '25 lb Bundle',
      price: '$12.99',
      description: 'Clean newsprint for wrapping items',
      image: '/images/products/packing-paper.jpg'
    },
    {
      name: 'Mattress Bag',
      size: 'Queen Size',
      price: '$7.99',
      description: 'Plastic protection for mattresses',
      image: '/images/products/mattress-bag.jpg'
    },
    {
      name: 'Box Cutter',
      size: 'Utility Knife',
      price: '$4.99',
      description: 'Sharp blade for cutting tape and boxes',
      image: '/images/products/box-cutter.jpg'
    },
    {
      name: 'Marker Set',
      size: 'Pack of 4',
      price: '$5.99',
      description: 'Permanent markers for labeling boxes',
      image: '/images/products/markers.jpg'
    },
    {
      name: 'Padlock',
      size: 'Heavy Duty',
      price: '$12.99',
      description: 'Secure lock for storage unit',
      image: '/images/products/padlock.jpg'
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