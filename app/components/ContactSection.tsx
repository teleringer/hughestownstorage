
'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join hundreds of satisfied customers who trust Hughestown Self-Storage for their storage needs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://hughestownstorage.ccstorage.com/find_units" target="_blank" rel="noopener noreferrer" className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap cursor-pointer text-center">
                RENT NOW
              </a>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 whitespace-nowrap cursor-pointer text-center">
                CONTACT US
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-xl"></i>
                <div>
                  <p className="font-semibold">Address</p>
                  <p>133 New Street, Hughestown, PA 18640</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-xl"></i>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>(570) 362-6150</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-time-line text-xl"></i>
                <div>
                  <p className="font-semibold">Office Hours</p>
                  <p>Monday - Saturday: 8:30 AM - 5:30 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-key-line text-xl"></i>
                <div>
                  <p className="font-semibold">Gate Access</p>
                  <p>6:00 AM - 10:00 PM Every Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}