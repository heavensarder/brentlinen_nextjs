import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-[var(--color-primary-foreground)] py-8 mt-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="inline-block bg-white p-2 rounded-lg shadow-md">
            <Image
              src="https://i.postimg.cc/9MMvSmy5/logo.webp"
              alt="Brent Linen Hire"
              width={160}
              height={60}
              className="object-contain h-12 w-auto"
            />
          </Link>
          <p className="text-white/80 leading-relaxed text-sm">
            Professional linen hire services for hotels, restaurants, and events across London. Quality you can trust.
          </p>
          <div className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/BrentLinenHire/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white hover:text-[var(--color-primary)] w-8 h-8 flex items-center justify-center rounded-full transition-all"><FaFacebookF size={14} /></a>
                <a href="https://www.instagram.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white hover:text-[var(--color-primary)] w-8 h-8 flex items-center justify-center rounded-full transition-all"><FaInstagram size={14} /></a>
                <a href="https://x.com/brentlinenhire" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white hover:text-[var(--color-primary)] w-8 h-8 flex items-center justify-center rounded-full transition-all"><FaTwitter size={14} /></a>
                <a href="https://www.linkedin.com/in/brentlinenhire/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white hover:text-[var(--color-primary)] w-8 h-8 flex items-center justify-center rounded-full transition-all"><FaLinkedinIn size={14} /></a>
                <a href="https://www.pinterest.com/brentlinen/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white hover:text-[var(--color-primary)] w-8 h-8 flex items-center justify-center rounded-full transition-all"><FaPinterestP size={14} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-purple-200 transition-colors">Home</Link></li>
            <li><Link href="/hotel" className="hover:text-purple-200 transition-colors">Hotel Services</Link></li>
            <li><Link href="/restaurant" className="hover:text-purple-200 transition-colors">Restaurant Linen</Link></li>
            <li><Link href="/kitchen" className="hover:text-purple-200 transition-colors">Chef Uniforms</Link></li>
            <li><Link href="/contact" className="hover:text-purple-200 transition-colors">Contact</Link></li>
            <li><Link href="/online-booking" className="hover:text-purple-200 transition-colors">Online Booking</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="space-y-3 text-sm">
                <p className="font-bold opacity-100">Address:</p>
                <p className="opacity-80">Brent Linen Hire,<br/>London, United Kingdom</p>
             </div>
             <div className="space-y-3 text-sm">
                <p className="font-bold opacity-100">Get in Touch:</p>
                <p className="opacity-80">
                   Phone: <a href="tel:02034881616" className="hover:text-white hover:underline">020 3488 1616</a><br/>
                   Email: <a href="mailto:info@brentlinenhire.co.uk" className="hover:text-white hover:underline">info@brentlinenhire.co.uk</a>
                </p>
             </div>
          </div>
        </div>

      </div>
      <div className="border-t border-white/10 mt-8 pt-4 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} Brent Linen Hire. All rights reserved.
      </div>
    </footer>
  );
}
