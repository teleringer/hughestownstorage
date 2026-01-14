
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
  className="relative min-h-[600px] flex items-center"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.18)), url('/images/hero/homepage-hero.jpg?v=2')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="absolute inset-0 bg-black/5"></div>

      
      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl md:max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <p className="text-white text-lg mb-4 font-medium">SAFE AND CONVENIENT OUTDOOR STORAGE</p>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight md:leading-tight mb-1 md:mb-2" style={{
              color: '#FF0000',
              textShadow: '2px 2px 0px white, 4px 4px 8px rgba(0,0,0,0.5)',
              WebkitTextStroke: '1px white',
              lineHeight: '0.9'
            }}>EASY</h1>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight md:leading-tight mb-1 md:mb-2" style={{
              color: '#FF0000',
              textShadow: '2px 2px 0px white, 4px 4px 8px rgba(0,0,0,0.5)',
              WebkitTextStroke: '1px white',
              lineHeight: '0.9'
            }}>ONLINE</h1>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight md:leading-tight mb-6" style={{
              color: '#FF0000',
              textShadow: '2px 2px 0px white, 4px 4px 8px rgba(0,0,0,0.5)',
              WebkitTextStroke: '1px white',
              lineHeight: '0.9'
            }}>RENTALS</h1>
          </div>
          
          <div className="text-white text-xl mb-8">
            <p className="font-semibold text-2xl mb-2">Hughestown Pennsylvania</p>
            <p className="text-lg">Northeast PA</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="https://hughestownstorage.ccstorage.com/find_units" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 whitespace-nowrap cursor-pointer text-center">
              RENT NOW
            </a>
            <Link href="/storage-size-guide" className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer text-center">
              SIZE GUIDE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
