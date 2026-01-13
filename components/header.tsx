
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [hideTopBar, setHideTopBar] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Smooth transition for hiding top bars
      if (currentScrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }

      // Show scroll to top button on desktop after 900px
      if (currentScrollY > 900 && window.innerWidth >= 768) {
        setShowScrollToTop(true);
        setIsScrolling(true);
        
        // Clear existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        // Set new timeout to hide arrow when scrolling stops
        const newTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 1500); // Hide after 1.5 seconds of no scrolling
        
        setScrollTimeout(newTimeout);
      } else {
        setShowScrollToTop(false);
        setIsScrolling(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    setIsMobileMenuOpen(false);
    setIsMoreInfoOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full bg-gradient-to-b from-gray-200 to-gray-50 shadow-sm fixed top-0 z-50">
        {/* Top info bar - Desktop only with smooth transition */}
        <div className={`py-2 text-sm hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${
          hideTopBar ? 'h-0 py-0 opacity-0' : 'h-auto opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-gray-600"></i>
                <span><strong>133 New Street</strong><br />Hughestown, PA 18640</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line text-gray-600"></i>
                <span><strong>(570) 362-6150</strong><br />Office | Sales | Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-gray-600"></i>
                <span><strong>Office Hours</strong><br />Mon-Sat: 8:30 am-5:30 pm</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-key-line text-gray-600"></i>
                <span><strong>Gate Access</strong><br />6AM-10PM Every Day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal line separator - Desktop only */}
        <div className={`hidden md:block w-full h-px bg-black transition-all duration-500 ease-in-out ${
          hideTopBar ? 'opacity-0 h-0' : 'opacity-100'
        }`}></div>

        {/* Mobile top bar - Phone number with smooth transition */}
        <div className={`text-center md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          hideTopBar ? 'h-0 py-0 opacity-0' : 'h-auto py-1 opacity-100'
        }`}>
          <a href="tel:5703626150" className="text-lg font-bold text-gray-800 hover:text-red-600">
            (570) 362-6150
          </a>
        </div>

        {/* Main navigation - Sticky logo/hamburger area */}
        <div className="py-1 md:py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            {/* Desktop Logo */}
            <Link href="/" className="hidden md:flex items-center">
              <img 
                src="https://static.readdy.ai/image/34eddc7177ae71b8c76003a700ee36ff/6b497c095bd4f16b0ce3c743068de711.png" 
                alt="Hughestown Self-Storage" 
                style={{ width: '285px', height: '71px' }}
                className="object-contain"
              />
            </Link>

            {/* Mobile Layout - Larger logo, minimal padding */}
            <div className="flex md:hidden items-center justify-between w-full py-1">
              <Link href="/" className="flex items-center" style={{ width: '80%' }}>
                <img 
                  src="https://static.readdy.ai/image/34eddc7177ae71b8c76003a700ee36ff/6b497c095bd4f16b0ce3c743068de711.png" 
                  alt="Hughestown Self-Storage" 
                  className="h-14 object-contain w-full"
                />
              </Link>
              
              <div style={{ width: '5%' }}></div>
              
              <button 
                onClick={handleMobileMenuToggle}
                className="flex items-center justify-center w-10 h-10"
                style={{ width: '15%' }}
              >
                <i className="ri-menu-line text-3xl text-gray-800"></i>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 whitespace-nowrap cursor-pointer">
                HOME
              </Link>
              <a href="https://hughestownstorage.ccstorage.com/sign-in" target="_blank" rel="noopener noreferrer" className="px-6 py-2 text-gray-700 hover:text-red-600 whitespace-nowrap cursor-pointer font-bold">
                SIGN IN
              </a>
              <a href="https://hughestownstorage.ccstorage.com/find_units" target="_blank" rel="noopener noreferrer" className="px-6 py-2 text-gray-700 hover:text-red-600 whitespace-nowrap cursor-pointer font-bold">
                RENT NOW
              </a>
              
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-none font-semibold hover:bg-blue-700 whitespace-nowrap cursor-pointer flex items-center"
                >
                  MORE INFO
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 bg-blue-600 shadow-lg rounded-b-lg z-50 min-w-[200px]">
                    <Link href="/#about" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      About Us
                    </Link>
                    <Link href="/conference-room-rental" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      Conference Room Rental
                    </Link>
                    <Link href="/document-storage" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      Document Storage
                    </Link>
                    <Link href="/faqs" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      FAQs
                    </Link>
                    <Link href="/moving-supplies" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      Moving Supplies
                    </Link>
                    <Link href="/storage-size-guide" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      Storage Size Guide
                    </Link>
                    <Link href="/tenant-protection" className="block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 cursor-pointer">
                      Tenant Protection
                    </Link>
                    <Link href="/the-vault" className="block px-4 py-3 text-white hover:bg-blue-700 cursor-pointer">
                      The Vault (Our Blog)
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="px-6 py-2 text-gray-700 hover:text-red-600 whitespace-nowrap cursor-pointer font-bold">
                CONTACT US
              </Link>
            </nav>
          </div>

          {/* Mobile Menu - Full screen overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-red-600 fixed inset-0 z-40 flex flex-col">
              <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                <Link 
                  href="/" 
                  onClick={() => handleMenuItemClick('home')}
                  className={`block px-4 py-3 rounded text-lg font-semibold cursor-pointer ${
                    activeMenuItem === 'home' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  HOME
                </Link>
                <a 
                  href="https://hughestownstorage.ccstorage.com/sign-in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handleMenuItemClick('signin')}
                  className={`block px-4 py-3 rounded text-lg font-semibold cursor-pointer ${
                    activeMenuItem === 'signin' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  SIGN IN
                </a>
                <a 
                  href="https://hughestownstorage.ccstorage.com/find_units" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handleMenuItemClick('rent')}
                  className={`block px-4 py-3 rounded text-lg font-semibold cursor-pointer ${
                    activeMenuItem === 'rent' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  RENT NOW
                </a>
                
                <div>
                  <button 
                    onClick={() => setIsMoreInfoOpen(!isMoreInfoOpen)}
                    className={`w-full text-left px-4 py-3 rounded text-lg font-semibold cursor-pointer flex items-center justify-between ${
                      activeMenuItem === 'moreinfo' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    MORE INFO
                    <i className={`ri-arrow-down-s-line text-white transform transition-transform ${isMoreInfoOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {isMoreInfoOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      <Link 
                        href="/#about" 
                        onClick={() => handleMenuItemClick('about')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'about' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        About Us
                      </Link>
                      <Link 
                        href="/conference-room-rental" 
                        onClick={() => handleMenuItemClick('conference')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'conference' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Conference Room Rental
                      </Link>
                      <Link 
                        href="/document-storage" 
                        onClick={() => handleMenuItemClick('document')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'document' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Document Storage
                      </Link>
                      <Link 
                        href="/faqs" 
                        onClick={() => handleMenuItemClick('faqs')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'faqs' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        FAQs
                      </Link>
                      <Link 
                        href="/moving-supplies" 
                        onClick={() => handleMenuItemClick('supplies')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'supplies' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Moving Supplies
                      </Link>
                      <Link 
                        href="/storage-size-guide" 
                        onClick={() => handleMenuItemClick('sizeguide')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'sizeguide' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Storage Size Guide
                      </Link>
                      <Link 
                        href="/tenant-protection" 
                        onClick={() => handleMenuItemClick('protection')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'protection' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Tenant Protection
                      </Link>
                      <Link 
                        href="/the-vault" 
                        onClick={() => handleMenuItemClick('vault')}
                        className={`block px-4 py-2 rounded text-base cursor-pointer ${
                          activeMenuItem === 'vault' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        The Vault (Our Blog)
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="/contact" 
                  onClick={() => handleMenuItemClick('contact')}
                  className={`block px-4 py-3 rounded text-lg font-semibold cursor-pointer ${
                    activeMenuItem === 'contact' ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom horizontal line separator */}
        <div className="w-full h-px bg-black"></div>
      </header>

      {/* Scroll to Top Button - Desktop only, centered with fade behavior */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-500 z-40 hidden md:block ${
            isScrolling ? 'opacity-100' : 'opacity-30'
          }`}
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>
      )}
    </>
  );
}
