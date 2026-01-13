'use client';

export default function PackingTips() {
  const tips = [
    {
      icon: 'ri-box-3-line',
      title: 'Pack Heavy Items in Small Boxes',
      description: 'Books, dishes, and other heavy items should go in small boxes to make them easier to carry.'
    },
    {
      icon: 'ri-bubble-chart-line',
      title: 'Use Bubble Wrap for Fragiles',
      description: 'Wrap delicate items individually and fill empty spaces to prevent movement during transport.'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Label Everything Clearly',
      description: 'Mark boxes with contents and destination room. Use different colored markers for each room.'
    },
    {
      icon: 'ri-stack-line',
      title: 'Fill Empty Spaces',
      description: 'Use packing paper, towels, or clothes to fill gaps and prevent items from shifting.'
    },
    {
      icon: 'ri-shield-line',
      title: 'Protect Furniture',
      description: 'Use moving blankets and plastic wrap to protect furniture from scratches and dust.'
    },
    {
      icon: 'ri-file-list-line',
      title: 'Create an Inventory',
      description: 'Keep a detailed list of what is in each box for easy unpacking and insurance purposes.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Packing Tips & Tricks</h2>
          <p className="text-lg text-gray-600">Expert advice to make your move easier and protect your belongings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className={`${tip.icon} text-2xl text-orange-600`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Room-by-Room Packing Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-orange-600 mb-4">Kitchen</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Pack dishes vertically like records</li>
                <li>• Wrap glasses in packing paper</li>
                <li>• Use dish pack boxes for fragile items</li>
                <li>• Pack small appliances in original boxes if available</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-600 mb-4">Bedroom</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Use wardrobe boxes for hanging clothes</li>
                <li>• Pack shoes in small boxes</li>
                <li>• Use mattress bags for protection</li>
                <li>• Keep drawers intact when possible</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-600 mb-4">Living Room</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Wrap furniture in moving blankets</li>
                <li>• Pack books in small boxes</li>
                <li>• Protect TV screens with blankets</li>
                <li>• Take photos of electronic setups</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-600 mb-4">Bathroom</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Put liquids in sealed plastic bags</li>
                <li>• Pack toiletries separately</li>
                <li>• Use towels as padding material</li>
                <li>• Pack a first-day essentials box</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}