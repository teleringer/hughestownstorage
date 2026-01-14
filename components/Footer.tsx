'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Logo and Certifications */}
          <div className="mb-6 flex justify-center md:justify-start">
  <a href="/" aria-label="Hughestown Self-Storage — Home" className="inline-block">
    <img
      src="https://static.readdy.ai/image/34eddc7177ae71b8c76003a700ee36ff/fcac0f32a53a13b7de48353d8bb78261.png"
      alt="Hughestown Self-Storage"
      className="h-16 object-contain cursor-pointer"
    />
  </a>
</div>

            {/* Certification Logos - Vertically aligned with proper spacing */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <a
                href="https://www.paselfstorage.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-2 rounded cursor-pointer"
                aria-label="PA Self Storage Association (opens in new tab)"
              >
                <img
                  src="/affiliations/pssa.png"
                  alt="PA Self Storage Association"
                  width={240}
                  height={90}
                  className="h-16 md:h-10 w-auto object-contain"
                />
              </a>

              <a
                href="https://www.selfstorage.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-2 rounded cursor-pointer"
                aria-label="Self Storage Association (opens in new tab)"
              >
                <img
                  src="/affiliations/ssa.png"
                  alt="Self Storage Association"
                  width={240}
                  height={90}
                  className="h-16 md:h-10 w-auto object-contain"
                />
              </a>

              <a
                href="https://www.insideselfstorage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-2 rounded cursor-pointer"
                aria-label="Inside Self-Storage (opens in new tab)"
              >
                <img
                  src="/affiliations/iss.png"
                  alt="Inside Self-Storage"
                  width={240}
                  height={90}
                  className="h-16 md:h-10 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Address and Follow Us */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">Address</h3>
            <div className="text-white mb-6">
              <p className="font-semibold">Hughestown Self-Storage</p>
              <p>133 New Street</p>
              <p>Hughestown, PA 18640</p>
            </div>

            <div>
              <h3 className="text-orange-500 text-lg font-semibold mb-4">Follow Us</h3>
              <a
                href="https://x.com/HughestownSS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-orange-400 cursor-pointer"
              >
                <i className="ri-twitter-x-line mr-2 w-5 h-5 flex items-center justify-center"></i>
                @HughestownSS
              </a>

              {/* Map Links - 75% width and left justified on desktop, centered on mobile */}
              <div className="mt-6 space-y-2 flex flex-col items-center md:items-start">
                <a
                  href="https://maps.app.goo.gl/MN215YU6qtMzG3FJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 cursor-pointer flex items-center justify-center w-3/4"
                >
                  <i className="ri-map-pin-line mr-2"></i>
                  Directions (Google Maps)
                </a>
                <a
                  href="https://maps.apple.com/?daddr=41.332021,-75.776151&q=Hughestown%20Self-Storage&dirflg=d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 cursor-pointer flex items-center justify-center w-3/4"
                >
                  <i className="ri-map-pin-line mr-2"></i>
                  Directions (Apple Maps)
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">Operating Hours</h3>
            <div className="text-white space-y-2">
              <div>
                <p className="text-orange-400">Office Hours*</p>
                <p>Mon-Sat: 8:30 AM - 5:30 PM</p>
                <p>Sundays: Closed</p>
              </div>
              <div className="mt-4">
                <p className="text-orange-400">Gate Access Hours</p>
                <p>6:00 AM - 10:00 PM</p>
              </div>

              <div className="mt-4 text-sm">
                <p>* Closed Early Sunday</p>
                <p>New Year's Day</p>
                <p>Memorial Day</p>
                <p>Independence Day</p>
                <p>Labor Day</p>
                <p>Christmas Eve (open 8:30AM-12:00PM)</p>
                <p>Christmas Day</p>
                <p>New Year's Eve Day</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-white">
              <li><Link href="/" className="hover:text-orange-400 cursor-pointer">Home</Link></li>
              <li><Link href="https://hughestownstorage.ccstorage.com/sign-in" target="_blank" className="hover:text-orange-400 cursor-pointer">Sign In</Link></li>
              <li><Link href="https://hughestownstorage.ccstorage.com/find_units" target="blank" className="hover:text-orange-400 cursor-pointer">Rent Now</Link></li>
              <li><Link href="/#about" className="hover:text-orange-400 cursor-pointer">About Us</Link></li>
              <li><Link href="/conference-room-rental" className="hover:text-orange-400 cursor-pointer">Conference Room Rental</Link></li>
              <li><Link href="/document-storage" className="hover:text-orange-400 cursor-pointer">Document Storage</Link></li>
              <li><Link href="/faqs" className="hover:text-orange-400 cursor-pointer">FAQs</Link></li>
              <li><Link href="/moving-supplies" className="hover:text-orange-400 cursor-pointer">Moving Supplies</Link></li>
              <li><Link href="/storage-size-guide" className="hover:text-orange-400 cursor-pointer">Storage Size Guide</Link></li>
              <li><Link href="/tenant-protection" className="hover:text-orange-400 cursor-pointer">Tenant Protection</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 cursor-pointer">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Phone and Email */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-orange-500 font-semibold mb-2">Phone</h4>
              <p className="text-white">(570) 362-6150</p>
            </div>
            <div>
              <h4 className="text-orange-500 font-semibold mb-2">Email</h4>
              <p className="text-white">office@hughestownstorage.com</p>
            </div>
            <div>
              <h4 className="text-orange-500 font-semibold mb-2">The Vault</h4>
              <Link href="/the-vault" className="text-red-500 hover:text-red-400 cursor-pointer">
                Hughestown Self-Storage Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-sm">Copyright ©2025. Owned & Operated by S3 Storage Group, LLC. All rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
            <Link href="/privacy-policy" className="hover:text-white cursor-pointer">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white cursor-pointer">Terms</Link>
            <span>|</span>
            <a href="https://teleringer.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">
              Website Design by Teleringer.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
