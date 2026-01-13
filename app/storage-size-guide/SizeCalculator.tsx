'use client';

import { useState } from 'react';

export default function SizeCalculator() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recommendedSize, setRecommendedSize] = useState('');

  const itemCategories = [
    {
      category: "Furniture",
      items: [
        { name: "Sofa/Couch", space: 15 },
        { name: "Dining Table", space: 12 },
        { name: "Queen Bed", space: 10 },
        { name: "King Bed", space: 15 },
        { name: "Dresser", space: 8 },
        { name: "Bookshelf", space: 6 },
        { name: "Office Desk", space: 8 },
        { name: "Armchair", space: 6 }
      ]
    },
    {
      category: "Appliances",
      items: [
        { name: "Refrigerator", space: 12 },
        { name: "Washer", space: 8 },
        { name: "Dryer", space: 8 },
        { name: "Dishwasher", space: 6 },
        { name: "Microwave", space: 2 },
        { name: "TV (Large)", space: 4 }
      ]
    },
    {
      category: "Boxes & Storage",
      items: [
        { name: "Small Box", space: 1 },
        { name: "Medium Box", space: 2 },
        { name: "Large Box", space: 3 },
        { name: "Wardrobe Box", space: 4 },
        { name: "File Cabinet", space: 4 }
      ]
    },
    {
      category: "Vehicles & Large Items",
      items: [
        { name: "Motorcycle", space: 25 },
        { name: "Small Car", space: 100 },
        { name: "Large Car/SUV", space: 150 },
        { name: "Boat (Small)", space: 80 },
        { name: "Piano", space: 20 }
      ]
    }
  ];

  const allItems = itemCategories.flatMap(category => 
    category.items.map(item => ({ ...item, category: category.category }))
  );

  const handleItemToggle = (itemName: string) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const calculateRecommendedSize = () => {
    const totalSpace = selectedItems.reduce((total, itemName) => {
      const item = allItems.find(i => i.name === itemName);
      return total + (item?.space || 0);
    }, 0);

    let recommendation = '';
    if (totalSpace <= 25) recommendation = "5x5 (25 sq ft)";
    else if (totalSpace <= 50) recommendation = "5x10 (50 sq ft)";
    else if (totalSpace <= 100) recommendation = "10x10 (100 sq ft)";
    else if (totalSpace <= 150) recommendation = "10x15 (150 sq ft)";
    else if (totalSpace <= 200) recommendation = "10x20 (200 sq ft)";
    else recommendation = "10x30 (300 sq ft)";

    setRecommendedSize(recommendation);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Storage Size Calculator</h2>
          <p className="text-xl text-gray-600">Select the items you need to store and we'll recommend the perfect unit size</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {itemCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-grid-line text-teal-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {category.items.map((item, itemIndex) => (
                    <label 
                      key={itemIndex}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedItems.includes(item.name)
                          ? 'border-teal-600 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.name)}
                        onChange={() => handleItemToggle(item.name)}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedItems.includes(item.name)
                          ? 'border-teal-600 bg-teal-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedItems.includes(item.name) && (
                          <i className="ri-check-line text-white w-3 h-3 flex items-center justify-center"></i>
                        )}
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-teal-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Selection</h3>
              
              {selectedItems.length === 0 ? (
                <p className="text-gray-600 mb-6">Select items from the list to get started</p>
              ) : (
                <div className="mb-6">
                  <p className="text-gray-700 mb-3">{selectedItems.length} items selected:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="text-sm">{item}</span>
                        <button
                          onClick={() => handleItemToggle(item)}
                          className="text-red-500 hover:text-red-700 w-5 h-5 flex items-center justify-center cursor-pointer"
                        >
                          <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={calculateRecommendedSize}
                disabled={selectedItems.length === 0}
                className={`w-full py-3 rounded-lg font-semibold whitespace-nowrap cursor-pointer ${
                  selectedItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Calculate Size
              </button>

              {recommendedSize && (
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-teal-600">
                  <h4 className="font-bold text-teal-600 mb-2">Recommended Size:</h4>
                  <p className="text-2xl font-bold text-gray-900 mb-3">{recommendedSize}</p>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 whitespace-nowrap cursor-pointer">
                    Check Availability
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}