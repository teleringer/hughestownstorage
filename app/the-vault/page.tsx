
'use client';

import BlogHero from './BlogHero';
import BlogPosts from './BlogPosts';
import BlogSidebar from './BlogSidebar';

export default function TheVault() {
  return (
    <div className="min-h-screen">
      <main className="pt-20 md:pt-40">
        <BlogHero />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BlogPosts />
            </div>
            <div>
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
