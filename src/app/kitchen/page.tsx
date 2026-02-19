import Image from 'next/image';
import Link from 'next/link';
import { FaTshirt, FaHardHat, FaHandsWash, FaCut, FaThermometerHalf, FaCheckCircle } from "react-icons/fa";

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/kitchen");
  
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/kitchen",
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
        url: "https://brentlinenhire.co.uk/kitchen",
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

export default function Kitchen() {
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
            src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=1920" // Chef Cooking
            alt="Professional Chef Wear"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          {/* Sophisticated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-stone-900/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              Professional Kitchen Wear
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] tracking-tight">
            Chef Uniforms <br />
            <span className="italic font-light text-orange-200 text-4xl md:text-6xl lg:text-7xl block mt-2">& Kitchen Linen</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
             Equip your brigade with premium chef jackets, aprons, and trousers.
             Designed for comfort, durability, and professional presentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/online-booking" 
              className="group relative px-8 py-4 bg-white text-stone-900 rounded-none overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 w-0 bg-orange-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative font-bold tracking-widest uppercase text-sm">Online Booking</span>
            </Link>
            <Link 
              href="#products" 
              className="group px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
               <span className="font-bold tracking-widest uppercase text-sm">View Catalog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        INTRO SECTION
        ================================================================
      */}
      <div className="relative z-20 -mt-24 container mx-auto px-4 mb-24">
        <div className="bg-white shadow-2xl shadow-stone-900/20 rounded-t-3xl md:rounded-3xl p-8 md:p-16 border-t font-serif border-orange-500/30">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-orange-800">
                <FaCut className="text-xl" />
                <span className="uppercase tracking-widest text-sm font-bold">Impeccable Standards</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                Designed for the heat of the kitchen.
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-light">
                 <p>
                    A chef's uniform is more than just clothing; it's a statement of professionalism. Our range of chef wear combines <strong className="text-stone-900 font-medium">classic style with modern functionality</strong>.
                </p>
                <p>
                    We provide high-quality jackets, aprons, trousers, and headwear that keep your team looking sharp while offering the comfort and breathability needed for long shifts.
                </p>
                 <div className="pt-4 border-l-4 border-orange-200 pl-6 my-8">
                     <p className="text-xl font-serif italic text-stone-800">
                    "Reliable laundry services ensuring your kitchen linen is always fresh, crisp, and ready for service."
                    </p>
                </div>
              </div>
            </div>
            {/* Image Grid */}
            <div className="relative h-[500px] w-full hidden md:block">
                 <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
                     <Image
                        src="https://images.pexels.com/photos/175753/pexels-photo-175753.jpeg?auto=compress&cs=tinysrgb&w=800" // Chef Plating
                        alt="Chef Plating"
                        fill
                        className="object-cover"
                     />
                 </div>
                 <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white">
                      <Image
                        src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" // Apron Detail
                        alt="Apron Detail"
                        fill
                        className="object-cover"
                     />
                 </div>
            </div>
          </div>
        </div>
      </div>

      <div id="products">

        {/* SECTION 1: Chef Jacket Hire */}
        <div className="container mx-auto px-4 pb-20">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-purple-700">Chef Jacket Hire</h2>
                <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                    { 
                        title: "Short Sleeve Chef Jacket (White)", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Breathable polycotton blend. Stud buttons. Sizes XS-4XL."
                    },
                    { 
                        title: "Short Sleeve Chef Jacket (White/Black Trim)", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Stylish contrast trim. Cool vent technology. Sizes XS-4XL."
                    },
                    { 
                        title: "Long Sleeve Chef Jacket (Black)", 
                        img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Premium black cotton. Double-breasted. Sizes XS-4XL."
                    },
                    { 
                        title: "Short Sleeve Chef Jacket (Black)", 
                        img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Modern look. Lightweight fabric. Sizes XS-4XL."
                    },
                    { 
                        title: "Premium Executive Chef Jacket", 
                        img: "https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "100% Egyptian Cotton. French cuffs. Hand-rolled buttons."
                    },
                     { 
                        title: "Kitchen Team Uniforms", 
                        img: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Outfit your entire brigade with coordinated uniforms."
                    }
                 ].map((item, idx) => (
                    <div key={idx} className="group bg-white p-6 rounded-xl border border-stone-100 hover:shadow-lg transition-all">
                        <div className="relative aspect-[2/3] w-full mb-6 rounded-lg overflow-hidden">
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* SECTION 2: Chef Apron Hire */}
        <div className="bg-white py-20">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-purple-700">Chef Apron Hire</h2>
                    <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {[
                        { title: "Butcher's Apron (Red Stripe)", img: "https://images.pexels.com/photos/5908234/pexels-photo-5908234.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Black/White Stripe)", img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Navy Stripe)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Black)", img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (White)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Blue)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Olive Green)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bib Apron (Bright Green)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Waist Apron (Black)", img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Waist Apron (White)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { title: "Bar Apron (Blue)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                     ].map((item, idx) => (
                        <div key={idx} className="group text-center">
                            <div className="relative aspect-[2/3] w-full mb-4 rounded-xl overflow-hidden shadow-md">
                                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="font-bold text-stone-800 text-sm">{item.title}</h3>
                        </div>
                    ))}
                 </div>
            </div>
        </div>

        {/* SECTION 3: Chef Trousers Hire */}
        <div className="container mx-auto px-4 py-20">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 text-purple-700">Chef Trousers Hire</h2>
                <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 {[
                    { 
                        title: "Chef Trousers - Blue/White Check", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Classic small check pattern. Elasticated waist."
                    },
                    { 
                        title: "Chef Trousers - Black/White Check", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Traditional large check. Comfortable fit."
                    },
                    { 
                        title: "Chef Trousers - Plain Black", 
                        img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Smart plain black trousers. Durable drill cotton."
                    },
                     { 
                        title: "Chef Trousers - Plain White", 
                        img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Classic white kitchen trousers."
                    },
                     { 
                        title: "Baggies - Black/White Patterns", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Relaxed fit baggy trousers in various patterns."
                    },
                     { 
                        title: "Baggies - Red/White Check", 
                        img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
                        desc: "Bold red check design."
                    },
                 ].map((item, idx) => (
                    <div key={idx} className="bg-stone-50 p-6 rounded-xl border border-stone-100 hover:shadow-lg transition-all group">
                        <div className="relative aspect-[2/3] w-full mb-6 rounded-lg overflow-hidden mix-blend-multiply">
                             {/* Note: Mix-blend-multiply used for trousers to simulate isolation if possible, or usually just clean images */}
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* SECTION 4: Headwear & Cloths */}
        <div className="bg-stone-100 py-20">
             <div className="container mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12">
                     {/* Headwear */}
                     <div>
                         <h3 className="text-2xl font-serif font-bold text-purple-700 mb-8 border-b border-stone-300 pb-2">Chef Hat & Headwear</h3>
                         <div className="grid grid-cols-2 gap-6">
                             {[
                                 { name: "Skull Cap (Black)", img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Skull Cap (White)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Skull Cap (Green)", img: "https://images.pexels.com/photos/6646115/pexels-photo-6646115.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Skull Cap (Check)", img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Zandana (Black)", img: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Zandana (White)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                 { name: "Neckerchief", img: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800" },
                             ].map((item, idx) => (
                                 <div key={idx} className="group text-center">
                                     <div className="relative aspect-[2/3] w-full mb-2 rounded-lg overflow-hidden shadow-sm bg-white">
                                         <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                     </div>
                                     <p className="text-xs font-bold text-stone-700">{item.name}</p>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Cloths */}
                     <div>
                         <h3 className="text-2xl font-serif font-bold text-purple-700 mb-8 border-b border-stone-300 pb-2">Kitchen Cloths & Oven Cloths</h3>
                         <div className="grid grid-cols-2 gap-6">
                              {[
                                  { name: "Blue Stripe Kitchen Cloth", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                  { name: "Green Stripe Kitchen Cloth", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                  { name: "Oven Cloth (Thick)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                  { name: "Kitchen Towel (White)", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                  { name: "Waiters Cloth", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                                  { name: "Tea Towel", img: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=800" },
                              ].map((item, idx) => (
                                  <div key={idx} className="group text-center">
                                      <div className="relative aspect-[2/3] w-full mb-2 rounded-lg overflow-hidden shadow-sm bg-white">
                                          <Image src={item.img} alt={item.name} fill className="object-cover" />
                                      </div>
                                      <p className="text-xs font-bold text-stone-700">{item.name}</p>
                                  </div>
                              ))}
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      </div>

       {/* 
        ================================================================
        BOTTOM SECTIONS
        ================================================================
      */}
      
      {/* Make an Enquiry Section */}
      <div className="bg-white py-24 border-t border-stone-200" id="enquiry">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Make an Enquiry</h2>
             <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                 To enquire about your kitchen item needs,<br/>
                 please call us on <a href="tel:07966435273" className="text-purple-700 font-bold hover:underline">079 6643 5273</a> or <Link href="/contact" className="text-purple-700 underline hover:text-purple-900">contact us</Link><br/>
                 Always happy to help.
             </p>
              <Link href="/online-booking" className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-sm hover:bg-purple-700 transition-colors shadow-lg tracking-widest uppercase text-sm">
                  ONLINE BOOKING
              </Link>
         </div>
      </div>

      {/* Our Kitchen Products List Section */}
      <div className="bg-stone-50 py-24 border-t border-stone-200">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-12">Our Kitchen Products</h2>
              
              <div className="max-w-4xl mx-auto space-y-4 text-stone-700 text-lg leading-relaxed">
                  <p>Chefs Jacket – All Sizes and Colours Available</p>
                  <p>Chefs Trouser – All Sizes, colours and Designs Available</p>
                  <p>Butchers Aprons – Black & White, Blue & White, Red & White</p>
                  <p>Bib Apron – Black, Blue, Red, White and all Colours</p>
                  <p>Waist Apron (Long) – Black, Blue, Red, White and all Colours</p>
                  <p>Waiter Apron (Short)– Black, Blue, Red, White and all Colours</p>
                  <p>Chef’s Cap – Black, Blue, Red, White and all Colours, Sizes: S, M & L</p>
                  <p>Kitchen Cloth – High Absorbent, Blue & White, Red & White, Green & White</p>
                  <p>Oven Cloth – Thick, Heavy & High Heat Absorbent</p>
                  <p>Boiler Suit – Blue, Black or White. Sizes: S, M & L</p>
              </div>

              <div className="mt-12 text-stone-500 font-medium">
                  S = Small, M = Medium & L = Large
              </div>

              <div className="mt-12">
                   <Link href="/online-booking" className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-sm hover:bg-purple-700 transition-colors shadow-lg tracking-widest uppercase text-sm">
                       ONLINE BOOKING
                   </Link>
              </div>
          </div>
      </div>

    </div>
  );
}
