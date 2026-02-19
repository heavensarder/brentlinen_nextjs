import Image from 'next/image';
import Link from 'next/link';
import { FaGlassCheers, FaChair, FaCalendarAlt, FaStar, FaGem } from "react-icons/fa";
import SpaImageSlider from '@/components/SpaImageSlider';

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/events");
  
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/events",
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
        url: "https://brentlinenhire.co.uk/events",
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

export default function Events() {
    const sliderImages = [
        { src: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Wedding Table Setting" }, // Wedding Table
        { src: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Pink Table Runner and Flowers" }, // Pink Runner/Flowers (Generic Wedding)
        { src: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Banquet Hall Setup" }, // Banquet
        { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Elegant Chair Covers" }, // Chairs
    ];

  return (
    <div className="bg-stone-50 font-sans text-stone-800">
      {/* 
        ================================================================
        HERO SECTION (Matched to Hotel Page)
        ================================================================
      */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.postimg.cc/L5b8865b/hero_slider4.webp" // Wedding Detail
            alt="Event Linen Hire"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          {/* Sophisticated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-stone-900/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              Event Linen Specialists
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] tracking-tight">
            Unforgettable <br />
            <span className="italic font-light text-pink-200 text-4xl md:text-6xl lg:text-7xl block mt-2">Celebrations</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
             Transform your venue with our stunning tablecloths and chair covers. Perfect for weddings, corporate events, and parties in London.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/online-booking" 
              className="group relative px-8 py-4 bg-white text-stone-900 rounded-none overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 w-0 bg-pink-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative font-bold tracking-widest uppercase text-sm">Online Booking</span>
            </Link>
            <Link 
              href="#details" 
              className="group px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
               <span className="font-bold tracking-widest uppercase text-sm">View Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        SLIDER SECTION & HEADER
        ================================================================
      */}
      <div className="container mx-auto px-4 py-24" id="details">
           <div className="text-center mb-16 max-w-4xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-purple-600 mb-6 leading-tight">
                   Wedding table linen hire, chair cover hire event table cloths London London
               </h2>
           </div>

           {/* Reuse Spa Slider */}
           <div className="mb-24">
               <SpaImageSlider images={sliderImages} />
           </div>

           {/* 
            ================================================================
            SIZES TABLE
            ================================================================
           */}
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 mb-16 max-w-4xl mx-auto">
               <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Our Tablecloth Sizes</h3>
               <div className="overflow-x-auto">
                   <table className="w-full text-center text-stone-600">
                       <thead>
                           <tr className="border-b border-stone-200 text-sm font-bold text-stone-800 uppercase tracking-wider">
                               <th className="py-4 px-4">Width (inch)</th>
                               <th className="py-4 px-4">Length (inch)</th>
                               <th className="py-4 px-4 bg-stone-50">Width (CM)</th>
                               <th className="py-4 px-4 bg-stone-50">Length (CM)</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-stone-100 text-sm">
                           {[
                               { wi: '36', li: '36', wc: '91', lc: '91' },
                               { wi: '45', li: '45', wc: '114', lc: '114' },
                               { wi: '52', li: '52', wc: '132', lc: '132' },
                               { wi: '52', li: '70', wc: '132', lc: '178' },
                               { wi: '70', li: '70', wc: '178', lc: '178' },
                               { wi: '70', li: '108', wc: '178', lc: '274' },
                               { wi: '70', li: '144', wc: '178', lc: '366' },
                               { wi: '90', li: '90', wc: '229', lc: '229' },
                               { wi: '90', li: 'Round', wc: '229', lc: 'Round' },
                               { wi: '120', li: 'Round', wc: '304', lc: 'Round' },
                               { wi: '130', li: 'Round', wc: '330', lc: 'Round' },
                           ].map((row, idx) => (
                               <tr key={idx} className="hover:bg-purple-50 transition-colors">
                                   <td className="py-3 px-4">{row.wi}</td>
                                   <td className="py-3 px-4">{row.li}</td>
                                   <td className="py-3 px-4 bg-stone-50 font-medium">{row.wc}</td>
                                   <td className="py-3 px-4 bg-stone-50 font-medium">{row.lc}</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
               <div className="text-center mt-12">
                    <Link href="/online-booking" className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-sm hover:bg-purple-700 transition-colors shadow-lg tracking-widest uppercase text-sm">
                        Online Booking
                    </Link>
               </div>
           </div>

           {/* 
            ================================================================
            PRICE LIST
            ================================================================
           */}
           <div className="bg-stone-50 p-8 md:p-12 rounded-3xl border border-stone-200 max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Price List</h3>
                    <p className="text-stone-500 text-sm uppercase tracking-widest">Price List</p>
                </div>

                <div className="space-y-10">
                    {/* Table Cloths */}
                    <div>
                        <h4 className="font-bold text-center mb-4 text-purple-700">Table Cloth</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm border-b border-stone-200 pb-2 font-bold text-stone-500 mb-2">
                            <div className="text-left">Size</div>
                            <div className="text-right">White (£)</div>
                            <div className="text-right">Colour (£)</div>
                        </div>
                        <div className="space-y-2 text-sm text-stone-700">
                             {[
                                { size: '36" x 36"', w: '2.00', c: '3.75' },
                                { size: '45" x 45"', w: '2.50', c: '5.00' },
                                { size: '52" x 52"', w: '4.00', c: '6.50' },
                                { size: '52" x 70"', w: '4.50', c: '7.50' },
                                { size: '70" x 70"', w: '5.50', c: '8.95' },
                                { size: '90" x 90"', w: '6.50', c: '9.95' },
                                { size: '70" x 108"', w: '8.00', c: '**' },
                                { size: '70" x 144"', w: '8.50', c: '**' },
                                { size: '88" Round', w: '7.50', c: '9.95' },
                                { size: '108" Round', w: '8.00', c: '12.95' },
                                { size: '120" Round', w: '8.50', c: '14.95' },
                             ].map((row, idx) => (
                                 <div key={idx} className="grid grid-cols-3 gap-4 border-b border-stone-100 last:border-0 py-2 hover:bg-white px-2 rounded-lg transition-colors">
                                     <div className="text-left font-medium">{row.size}</div>
                                     <div className="text-right">{row.w}</div>
                                     <div className="text-right">{row.c}</div>
                                 </div>
                             ))}
                        </div>
                    </div>

                     {/* Other Items */}
                     <div className="grid md:grid-cols-2 gap-10">
                         {/* Napkin & Chair Cover */}
                         <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-center mb-2 text-purple-700 text-sm">Napkin</h4>
                                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium">22" x 22"</span>
                                    <div className="text-right text-sm">
                                        <span className="block text-stone-500 text-xs">White</span> £0.50
                                    </div>
                                    <div className="text-right text-sm">
                                        <span className="block text-stone-500 text-xs">Colour</span> £0.80
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-center mb-2 text-purple-700 text-sm">Chair Cover</h4>
                                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium">Acrylic</span>
                                    <div>
                                         <span className="block text-stone-500 text-xs">White</span> £2.00
                                    </div>
                                    <div>
                                        <span className="block text-stone-500 text-xs">Colour</span> £3.50**
                                    </div>
                                </div>
                            </div>
                         </div>

                         {/* Table Runner & Others */}
                         <div className="space-y-6">
                             <div>
                                <h4 className="font-bold text-center mb-2 text-purple-700 text-sm">Table Runner</h4>
                                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium">Satin</span>
                                    <div>
                                        <span className="block text-stone-500 text-xs">from</span> £3.95
                                    </div>
                                    <div>
                                         <span className="block text-stone-500 text-xs">from</span> £3.95
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-center mb-2 text-purple-700 text-sm">Chair Ribbon / Sash</h4>
                                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium">Long</span>
                                    <div>£0.50</div>
                                    <div>£0.50</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-center mb-2 text-purple-700 text-sm">Hand Towel</h4>
                                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium">Cotton</span>
                                    <div>£0.40</div>
                                    <div>**</div>
                                </div>
                            </div>
                         </div>
                     </div>
                     
                     <div className="text-center text-xs text-stone-500 mt-4 italic">
                         ** To order
                     </div>
                     <div className="text-center mt-8">
                        <Link href="/online-booking" className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-sm hover:bg-purple-700 transition-colors shadow-lg tracking-widest uppercase text-sm">
                            Online Booking
                        </Link>
                     </div>
                </div>
           </div>

      </div>

      {/* 
        ================================================================
        CTA SECTION
        ================================================================
      */}
      <div className="bg-stone-900 py-24 text-white" id="enquiry">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-serif font-bold mb-6">Start Planning Your Dream Event</h2>
             <p className="text-lg text-stone-400 mb-8 max-w-2xl mx-auto">
                 From intimacy to grandeur, we have the perfect linen for you. Contact our event specialists today.
             </p>
             <a href="tel:02034881616" className="inline-block bg-white text-stone-900 font-bold py-4 px-10 rounded-full hover:bg-stone-200 transition-colors shadow-lg">
                 Call 020 3488 1616
             </a>
         </div>
      </div>

    </div>
  );
}
