import Image from 'next/image';
import Link from 'next/link';
import { FaSpa, FaHotTub, FaLeaf, FaWater, FaHandsWash } from "react-icons/fa";
import SpaImageSlider from '@/components/SpaImageSlider';

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/spa");
  
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/spa",
    },
    robots: {
        index: data.robots?.includes("noindex") ? false : true,
        follow: data.robots?.includes("nofollow") ? false : true,
    },
    openGraph: {
        title: data.ogTitle || data.title || undefined,
        description: data.ogDescription || data.description || undefined,
        images: data.ogImage ? [{ url: data.ogImage }] : undefined,
        type: "website",
        locale: "en_GB",
        url: "https://brentlinenhire.co.uk/spa",
        siteName: "Brent Linen Hire",
    },
    twitter: {
        card: (data.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
        title: data.ogTitle || data.title || undefined,
        description: data.ogDescription || data.description || undefined,
        images: data.ogImage ? [data.ogImage] : undefined,
    }
  };
}

export default function Spa() {
  const sliderImages = [
    { src: "https://images.pexels.com/photos/6663469/pexels-photo-6663469.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Luxury Spa Towel Stack" }, // White Towels
    { src: "https://images.pexels.com/photos/3209095/pexels-photo-3209095.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Premium Waffle Bathrobe" }, // Bathrobe
    { src: "https://images.pexels.com/photos/6032205/pexels-photo-6032205.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Pool and Gym Towels" }, // Pool/Gym
    { src: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Relaxing Spa Treatment" }, // Spa Vibe
    { src: "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Soft Cotton Face Cloths" }, // Cloths
  ];

  return (
    <div className="bg-stone-50 font-sans text-stone-800">
      {/* 
        ================================================================
        HERO SECTION
        ================================================================
      */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1920" // Woman Relaxing Spa
            alt="Luxury Spa Wellness"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          {/* Sophisticated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-stone-900/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              Wellness & Serenity
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg tracking-tight">
            Pure Relaxation <br />
            <span className="italic font-light text-teal-200 text-4xl md:text-6xl lg:text-7xl block mt-2">Through Luxury Linen</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
             Elevate your guest experience with our exquisite range of spa towels, robes, and treatment linen, designed for ultimate comfort and hygiene.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/online-booking" 
              className="group relative px-8 py-4 bg-white text-stone-900 rounded-none overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 w-0 bg-teal-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative font-bold tracking-widest uppercase text-sm">Online Booking</span>
            </Link>
            <Link 
              href="#services" 
              className="group px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
               <span className="font-bold tracking-widest uppercase text-sm">View Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        INTRO & SLIDER SECTION
        ================================================================
      */}
      <div className="container mx-auto px-4 py-24">
           <div className="text-center mb-16 max-w-4xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-purple-800 mb-6 leading-tight">
                   Spa, Health Clinic, Beauty Salon, Gym, Pool, Office and Event Towel Hire in London
               </h2>
               <div className="h-1 w-32 bg-teal-300 mx-auto rounded-full mb-8"></div>
               <p className="text-lg text-stone-600 leading-relaxed font-light">
                   We specialize in providing high-quality linen hire services for the wellness industry. From plush bathrobes to absorbent gym towels, we ensure your facility is always stocked with fresh, pristine linen.
               </p>
           </div>

           {/* Custom Image Slider */}
           <div className="mb-24">
               <SpaImageSlider images={sliderImages} />
           </div>

           {/* Services Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                   { 
                       icon: FaSpa, 
                       title: "Spa Towels", 
                       desc: "Thick, fluffy towels that provide ultimate absorbency and softness for your guests' comfort." 
                   },
                   { 
                       icon: FaHotTub, 
                       title: "Bathrobes", 
                       desc: "Premium waffle and soft cotton toweling robes. Available in various sizes to suit all clients." 
                   },
                   { 
                       icon: FaLeaf, 
                       title: "Treatment Linen", 
                       desc: "Specialized sheets, covers, and face cradle covers for massage tables and treatment rooms." 
                   },
                    { 
                       icon: FaWater, 
                       title: "Pool & Gym", 
                       desc: "Durable, high-absorbency towels designed for heavy usage in pools, saunas, and fitness centers." 
                   },
                    { 
                       icon: FaHandsWash, 
                       title: "Hygiene Guaranteed", 
                       desc: "Our rigorous laundering process ensures every item is hygienically clean and stain-free." 
                   },
               ].map((item, idx) => (
                   <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-teal-50 hover:border-teal-200 transition-all group hover:-translate-y-2">
                       <item.icon className="text-5xl text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
                       <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{item.title}</h3>
                       <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                   </div>
               ))}
                {/* Contact Card */}
                <div className="bg-teal-900 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-serif font-bold mb-4">Need a Custom Package?</h3>
                    <p className="text-teal-100 mb-8">We can tailor our linen hire services to meet the specific needs of your business.</p>
                    <Link href="/contact" className="px-8 py-3 bg-white text-teal-900 font-bold rounded-full hover:bg-teal-50 transition-colors uppercase text-sm tracking-widest">
                        Contact Us
                    </Link>
                </div>
           </div>
      </div>

       {/* 
        ================================================================
        CTA SECTION
        ================================================================
      */}
      <div className="bg-stone-100 py-24 border-t border-stone-200" id="enquiry">
         <div className="container mx-auto px-4 text-center">
             <div className="max-w-3xl mx-auto">
                 <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Partner with London's Premier Linen Hire</h2>
                 <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                     Reliable, professional, and dedicated to quality. Let us handle your linen logistics so you can focus on your clients' well-being.
                 </p>
                 <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                      <a href="tel:02034881616" className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition-colors">
                          020 3488 1616
                      </a>
                      <span className="hidden md:inline text-stone-300">|</span>
                      <Link href="/online-booking" className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-full hover:bg-purple-700 transition-colors shadow-lg tracking-widest uppercase text-sm">
                          Online Booking
                      </Link>
                 </div>
             </div>
         </div>
      </div>

    </div>
  );
}
