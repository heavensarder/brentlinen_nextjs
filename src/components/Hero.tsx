"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const heroImages = [
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920", // Hotel Bed
  "https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1920", // Elegant Table Setting
  "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=1920", // Industrial Laundry
  "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=1920", // Towels
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Slider with Ken Burns Effect */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Brent Linen Slide ${index + 1}`}
            fill
            className={`object-cover transform transition-transform duration-[10000ms] ease-linear ${
              index === currentImageIndex ? "scale-110" : "scale-100"
            }`}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Sophisticated Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        
        <div className="animate-fade-in-up">
           <span className="inline-block py-2 px-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-pink-200 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8 shadow-2xl">
              Est. 2010 • London's Premier Linen Hire
           </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white mb-8 leading-tight drop-shadow-2xl">
          <span className="block animate-slide-up-fade [animation-delay:200ms]">Excellence in</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 animate-slide-up-fade [animation-delay:400ms]">Every Thread</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up-fade [animation-delay:600ms]">
          Transforming hospitality with pristine linen, bespoke uniforms, and reliable laundry services for London's finest establishments.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-fade [animation-delay:800ms]">
          <Link
            href="/online-booking"
            className="group relative px-10 py-5 bg-white text-stone-900 overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)]"
          >
             <div className="absolute inset-0 w-0 bg-purple-100 transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
             <span className="relative font-bold tracking-widest uppercase text-sm z-10 group-hover:text-purple-900 transition-colors">Online Booking</span>
          </Link>
          
          <Link
            href="/#services"
            className="group relative px-10 py-5 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
          >
             <span className="font-bold tracking-widest uppercase text-sm">Our Services</span>
          </Link>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
         <span className="text-white/50 text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
         <FaChevronDown className="text-white/50 w-6 h-6 mx-auto" />
      </div>

    </section>
  );
}
