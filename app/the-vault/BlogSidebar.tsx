'use client';

import Link from 'next/link';

const popularPosts = [
  {
    id: 1,
    title: "How to Choose the Right Storage Unit Size",
    date: "December 10, 2024",
    views: "2.4k views"
  },
  {
    id: 2,
    title: "Packing Tips for Long-Term Storage",
    date: "December 8, 2024",
    views: "1.8k views"
  },
  {
    id: 3,
    title: "Storage Security: What to Look For",
    date: "December 5, 2024",
    views: "1.5k views"
  },
  {
    id: 4,
    title: "Business Document Storage Best Practices",
    date: "December 3, 2024",
    views: "1.2k views"
  }
];

const categories = [
  { name: "Organization", count: 12 },
  { name: "Moving Tips", count: 8 },
  { name: "Storage Guide", count: 15 },
  { name: "Document Storage", count: 6 },
  { name: "Business Storage", count: 9 },
  { name: "Seasonal Storage", count: 7 },
  { name: "Security Tips", count: 5 }
];

const tags = [
  "Storage Tips", "Organization", "Moving", "Climate Control", 
  "Document Storage", "Business Storage", "Security", "Packing",
  "Inventory", "Seasonal", "Records Management", "Self Storage"
];

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Stay Updated
        </h3>
        <p className="text-gray-600 mb-4">
          Get the latest storage tips and insights delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 whitespace-nowrap cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <Link href={`/the-vault/${post.id}`}>
                <h4 className="font-semibold text-gray-900 hover:text-red-600 mb-2 cursor-pointer">
                  {post.title}
                </h4>
              </Link>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <Link href={`/the-vault/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                <span className="text-gray-700 hover:text-red-600 cursor-pointer">
                  {category.name}
                </span>
              </Link>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/the-vault/tag/${tag.toLowerCase().replace(' ', '-')}`}>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-red-100 hover:text-red-600 cursor-pointer">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-600 p-6 rounded-lg text-white">
        <h3 className="text-xl font-bold mb-4">
          Need Storage Help?
        </h3>
        <p className="mb-4">
          Our storage experts are here to help you find the perfect solution.
        </p>
        <Link href="/contact">
          <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer">
            Contact Us Today
          </button>
        </Link>
      </div>
    </div>
  );
}