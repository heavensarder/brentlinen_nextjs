"use client";

import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans">
      {/* Top Bar - Hidden on Mobile, Visible on Desktop */}
      <div className={`hidden md:block bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'}`}>
        <div className="container mx-auto px-4 h-full flex justify-between items-center text-xs font-medium tracking-wide">
             <div className="flex items-center gap-6">
                <a href="tel:02034881616" className="flex items-center gap-2 hover:text-purple-200 transition-colors"><FaPhoneAlt /> 020 3488 1616</a>
                <a href="mailto:info@brentlinenhire.co.uk" className="hidden sm:flex items-center gap-2 hover:text-purple-200 transition-colors"><FaEnvelope /> info@brentlinenhire.co.uk</a>
                <span className="hidden lg:flex items-center gap-2 opacity-80"><FaMapMarkerAlt /> London, UK</span>
             </div>
             <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/BrentLinenHire/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md bg-white/20 shadow-sm hover:bg-white/30 hover:shadow-md hover:scale-110 transition-all backdrop-blur-sm hover:text-white"><FaFacebookF /></a>
                <a href="https://www.instagram.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md bg-white/20 shadow-sm hover:bg-white/30 hover:shadow-md hover:scale-110 transition-all backdrop-blur-sm hover:text-white"><FaInstagram /></a>
                <a href="https://x.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md bg-white/20 shadow-sm hover:bg-white/30 hover:shadow-md hover:scale-110 transition-all backdrop-blur-sm hover:text-white"><FaTwitter /></a>
                <a href="https://www.linkedin.com/in/brentlinenhire/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md bg-white/20 shadow-sm hover:bg-white/30 hover:shadow-md hover:scale-110 transition-all backdrop-blur-sm hover:text-white"><FaLinkedinIn /></a>
                <a href="https://www.pinterest.com/brentlinen/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md bg-white/20 shadow-sm hover:bg-white/30 hover:shadow-md hover:scale-110 transition-all backdrop-blur-sm hover:text-white"><FaPinterestP /></a>
             </div>
        </div>
      </div>

      <nav
        className={`bg-white shadow-md transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? "py-1" : "py-1 md:py-2"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://i.postimg.cc/XYxqHyR2/logo-brentlinen.webp"
                alt="Brent Linen"
                width={180}
                height={60}
                className={`transition-all duration-300 object-contain ${
                  isScrolled ? "h-10" : "h-10 md:h-18"
                } w-auto`}
                priority
              />
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4 text-xs font-bold tracking-widest">
            {[
              { name: "Home", href: "/" },
              { name: "Hotel", href: "/hotel" },
              { name: "Restaurant", href: "/restaurant" },
              { name: "Kitchen", href: "/kitchen" },
              { name: "Spa", href: "/spa" },
              { name: "Events", href: "/events" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 transition-colors uppercase whitespace-nowrap ${
                  pathname === link.href
                    ? "text-[var(--color-primary)]"
                    : "text-gray-600 hover:text-[var(--color-primary)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
                href="/online-booking"
                className="ml-2 bg-[var(--color-primary)] text-white px-5 py-3 rounded-full hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all uppercase whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600"
            >
                Online Booking
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-4 space-y-4 h-[calc(100vh-4rem)] overflow-y-auto">
             {[
              { name: "Home", href: "/" },
              { name: "Hotel", href: "/hotel" },
              { name: "Restaurant", href: "/restaurant" },
              { name: "Kitchen", href: "/kitchen" },
              { name: "Spa", href: "/spa" },
              { name: "Events", href: "/events" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-center py-2 uppercase font-bold tracking-widest ${
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-purple-50 rounded-lg"
                    : "text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
                href="/online-booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-3 uppercase font-bold tracking-widest text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md"
            >
                Online Booking
            </Link>

            {/* Mobile Contact Info & Socials */}
            <div className="border-t border-gray-100 pt-4 mt-2 space-y-4">
                <div className="flex flex-col items-center gap-3 text-sm text-gray-600">
                    <a href="tel:02034881616" className="flex items-center gap-2 hover:text-[var(--color-primary)]"><FaPhoneAlt /> 020 3488 1616</a>
                    <a href="mailto:info@brentlinenhire.co.uk" className="flex items-center gap-2 hover:text-[var(--color-primary)]"><FaEnvelope /> info@brentlinenhire.co.uk</a>
                    <span className="flex items-center gap-2"><FaMapMarkerAlt /> London, UK</span>
                </div>
                <div className="flex justify-center gap-4 pt-2">
                    <a href="https://www.facebook.com/BrentLinenHire/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><FaFacebookF size={20} /></a>
                    <a href="https://www.instagram.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><FaInstagram size={20}/></a>
                    <a href="https://x.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><FaTwitter size={20}/></a>
                    <a href="https://www.linkedin.com/in/brentlinenhire/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><FaLinkedinIn size={20}/></a>
                    <a href="https://www.pinterest.com/brentlinen/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"><FaPinterestP size={20}/></a>
                </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
