'use client';

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Organizing Your Storage Unit",
    excerpt: "Make the most of your storage space with these proven organization strategies that will save you time and money.",
    date: "December 15, 2024",
    category: "Organization",
    image: "https://readdy.ai/api/search-image?query=Well-organized%20storage%20unit%20with%20labeled%20boxes%2C%20shelving%20systems%2C%20and%20clear%20pathways%2C%20professional%20storage%20organization%2C%20clean%20and%20tidy%20storage%20space%20with%20proper%20lighting&width=400&height=250&seq=blog-1&orientation=landscape",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Climate-Controlled vs. Standard Storage: Which is Right for You?",
    excerpt: "Understanding the differences between climate-controlled and standard storage units to protect your valuable belongings.",
    date: "December 12, 2024",
    category: "Storage Guide",
    image: "https://readdy.ai/api/search-image?query=Modern%20climate-controlled%20storage%20facility%20interior%2C%20temperature%20control%20systems%2C%20clean%20storage%20units%20with%20proper%20ventilation%2C%20professional%20storage%20environment&width=400&height=250&seq=blog-2&orientation=landscape",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Moving Day Checklist: Your Complete Guide",
    excerpt: "A comprehensive checklist to ensure your moving day goes smoothly from start to finish.",
    date: "December 10, 2024",
    category: "Moving Tips",
    image: "https://readdy.ai/api/search-image?query=Professional%20moving%20day%20scene%20with%20boxes%2C%20moving%20supplies%2C%20checklist%20on%20clipboard%2C%20organized%20moving%20process%2C%20clean%20moving%20truck%20and%20storage%20facility&width=400&height=250&seq=blog-3&orientation=landscape",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "Protecting Your Documents: Best Practices for Document Storage",
    excerpt: "Learn how to properly store important documents to keep them safe, organized, and easily accessible.",
    date: "December 8, 2024",
    category: "Document Storage",
    image: "https://readdy.ai/api/search-image?query=Professional%20document%20storage%20with%20filing%20cabinets%2C%20organized%20paperwork%2C%20secure%20document%20boxes%2C%20clean%20office%20environment%20with%20proper%20document%20management%20systems&width=400&height=250&seq=blog-4&orientation=landscape",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Small Business Storage Solutions: Maximizing Your Space",
    excerpt: "Discover how self-storage can help small businesses manage inventory, documents, and equipment efficiently.",
    date: "December 5, 2024",
    category: "Business Storage",
    image: "https://readdy.ai/api/search-image?query=Small%20business%20storage%20solution%20with%20office%20supplies%2C%20inventory%20organization%2C%20business%20equipment%20storage%2C%20professional%20commercial%20storage%20facility&width=400&height=250&seq=blog-5&orientation=landscape",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Winter Storage Tips: Preparing Your Items for Cold Weather",
    excerpt: "Essential tips for storing your belongings during winter months to prevent damage from cold and moisture.",
    date: "December 3, 2024",
    category: "Seasonal Storage",
    image: "https://readdy.ai/api/search-image?query=Winter%20storage%20preparation%20with%20covered%20furniture%2C%20protective%20materials%2C%20clean%20storage%20unit%20in%20winter%2C%20professional%20storage%20facility%20with%20winter%20protection%20measures&width=400&height=250&seq=blog-6&orientation=landscape",
    readTime: "5 min read"
  }
];

export default function BlogPosts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-red-500">
            <option>All Categories</option>
            <option>Organization</option>
            <option>Storage Guide</option>
            <option>Moving Tips</option>
            <option>Document Storage</option>
            <option>Business Storage</option>
            <option>Seasonal Storage</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-full object-cover object-top"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{post.date}</span>
                  <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 cursor-pointer">
                  <Link href={`/the-vault/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/the-vault/${post.id}`}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 cursor-pointer"
                >
                  Read More
                  <i className="ri-arrow-right-line ml-2"></i>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 text-gray-500 hover:text-red-600 cursor-pointer">
            <i className="ri-arrow-left-line"></i>
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">1</button>
          <button className="px-4 py-2 text-gray-700 hover:text-red-600 cursor-pointer">2</button>
          <button className="px-4 py-2 text-gray-700 hover:text-red-600 cursor-pointer">3</button>
          <button className="px-3 py-2 text-gray-500 hover:text-red-600 cursor-pointer">
            <i className="ri-arrow-right-line"></i>
          </button>
        </nav>
      </div>
    </div>
  );
}