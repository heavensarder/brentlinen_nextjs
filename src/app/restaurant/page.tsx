import Image from 'next/image';
import Link from 'next/link';
import { FaUtensils, FaWineGlass, FaUserTie, FaTruck, FaLeaf, FaStar } from "react-icons/fa";

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/restaurant");
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/restaurant",
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
        url: "https://brentlinenhire.co.uk/restaurant",
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

export default function Restaurant() {
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
            src="https://i.postimg.cc/DfNzPvQn/restaurant-hero.webp" // Elegant Restaurant Setting
            alt="Restaurant Linen Hire"
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
              London's Finest
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] tracking-tight">
            Restaurant Linen Hire <br />
            <span className="italic font-light text-orange-200 text-4xl md:text-6xl lg:text-7xl block mt-2">& Laundry Services</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
             Setting the perfect table for London's most prestigious dining establishments.
             Impeccable table linen, napkins, and chef uniforms.
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
               <span className="font-bold tracking-widest uppercase text-sm">View Options</span>
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
                <FaStar className="text-xl" />
                <span className="uppercase tracking-widest text-sm font-bold">Dining Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                Enhance your ambience.
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-light">
                 <p>
                    The quality of your table linen reflects the standard of your restaurant. Our pristine, professionally laundered tablecloths and napkins ensure your tables always look <strong className="text-stone-900 font-medium">inviting and impeccable</strong>.
                </p>
                <p>
                    From casual bistros to Michelin-starred establishments, we cater to all. We provide a comprehensive range of linen, from classic white to bold colours, as well as essential kitchen uniforms and cloths.
                </p>
                <div className="pt-4 border-l-4 border-orange-200 pl-6 my-8">
                     <p className="text-xl font-serif italic text-stone-800">
                    "Call Customer Service on 020 3488 1616 For Chef Uniforms & Linen Hire"
                    </p>
                </div>
              </div>
            </div>
            {/* Image Grid */}
            <div className="relative h-[500px] w-full hidden md:block">
                 <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
                     <Image
                        src="https://i.postimg.cc/qBF86dz1/restaurant-view.webp"
                        alt="Fine Dining"
                        fill
                        className="object-cover"
                     />
                 </div>
                 <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white">
                      <Image
                        src="https://i.postimg.cc/TPhdDByB/rstartrent-sec1.webp" // Chef Plating
                        alt="Chef Service"
                        fill
                        className="object-cover"
                     />
                 </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        COLLECTIONS: Structure based on User Image Content
        ================================================================
      */}
      <div id="products" className="py-24 space-y-32 bg-stone-100">
        
        {/* SECTION 1: Table Clothes */}
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <span className="text-orange-600 uppercase tracking-widest font-bold text-sm">Classic & Colourful</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">Table Clothes - Commercial Laundry Services</h2>
                <div className="w-24 h-1 bg-orange-300 mx-auto mt-6"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { 
                        title: "Burgundy", 
                        img: "https://i.postimg.cc/5NqL7QPb/Burgundy.webp", // Placeholder for Burgundy (Red Check is close enough for placeholder)
                        desc: "All sizes - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available. High Quality." 
                    },
                    { 
                        title: "White", 
                        img: "https://i.postimg.cc/QtmZYbWT/white.jpg", 
                        desc: "All sizes - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available. High Quality." 
                    },
                    { 
                        title: "Wedding", 
                        img: "https://i.postimg.cc/bvd6f9Mt/wedding-table.webp", 
                        desc: "All sizes - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available. High Quality." 
                    },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-stone-100 hover:shadow-lg transition-all group text-center">
                        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* SECTION 2: Chef Uniform / Service Cloths */}
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-stone-900">
                    Call Customer Service on 020 3488 1616 For Chef Uniform
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-stone-700">
                      {[
                        { 
                            title: "White Napkin", 
                            img: "https://i.postimg.cc/wxDwzvWy/White-Napkin.webp",
                            desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available'
                        },
                        { 
                            title: "Elite Napkin", 
                            img: "https://i.postimg.cc/R03TDV6d/Elite-Napkin-(1).webp",
                            desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available'
                        },
                        { 
                            title: "Restaurant Ambience", 
                            img: "https://i.postimg.cc/7ZR308s2/luxurious-restaurant.webp",
                            desc: "A luxurious restaurant designed with Elite Table Clothes and Napkins"
                        }
                      ].map((item, idx) => (
                          <div key={idx} className="group bg-stone-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                               <div className="relative h-56 w-full mb-4 rounded-xl overflow-hidden shadow-md">
                                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                               </div>
                               <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                               {item.desc && <p className="text-sm text-stone-600">{item.desc}</p>}
                          </div>
                      ))}
                 </div>
            </div>
        </div>

        {/* SECTION 3: Restaurant Tablecloths & Napkins Hire - Light */}
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Restaurant Tablecloths & Napkins Hire - Light</h2>
                <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 {[
                    { 
                        title: "Cream Napkin", 
                        img: "https://i.postimg.cc/Xqnd4VJs/Cream-Napkin.webp", // Placeholder (Light)
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available'
                    },
                    { 
                        title: "Ivory Napkin", 
                        img: "https://i.postimg.cc/hGxdmJQY/Ivory-Napkin.webp", // Placeholder (Light)
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available'
                    },
                    { 
                        title: "Gold Napkin", 
                        img: "https://i.postimg.cc/5yPYJLDt/Gold-Napkin.webp", // Placeholder (Yellowish)
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester - 100% Polyester available'
                    }
                 ].map((item, idx) => (
                    <div key={idx} className="group bg-white p-6 rounded-xl border border-stone-100 hover:shadow-lg transition-all">
                        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* SECTION 4: Table Clothes & Napkins Hire - Dark */}
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Table Clothes & Napkins Hire - Dark</h2>
                <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 {[
                    { 
                        title: "Red Napkin", 
                        img: "https://i.postimg.cc/mg1zxcwJ/Red-Napkin.webp", // Reddish
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                    { 
                        title: "Burgundy Napkin", 
                        img: "https://i.postimg.cc/YqZ0xrHb/cr-w-388-h-194.webp", // Reddish
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                    { 
                        title: "Purple Napkin", 
                        img: "https://i.postimg.cc/zBzGf3CR/Purple-Napkin.webp", // Purple shade
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                    { 
                        title: "Green Napkin", 
                        img: "https://i.postimg.cc/VvTf4R3C/Green-Napkin.webp", // Greenish
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                    { 
                        title: "Moss Green Napkin", 
                        img: "https://i.postimg.cc/D0bkfKMr/Moss-Green-Napkin.webp", // Greenish
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                    { 
                        title: "Black Napkin", 
                        img: "https://i.postimg.cc/mZ0hYZRV/Black-Napkin.webp", // Dark
                        desc: 'Sizes: 20"x20" or 22"x22 - 100% Cotton - 50% Cotton & 50% Polyester -100% Polyester available'
                    },
                 ].map((item, idx) => (
                    <div key={idx} className="group bg-white p-6 rounded-xl border border-stone-100 hover:shadow-lg transition-all">
                        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* SECTION 5: Other Napkins (Bistro) */}
        <div className="bg-white py-16">
             <div className="container mx-auto px-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-stone-900 mb-12">Other Napkins - Linen Hire and Laundry Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Charcoal Napkin", img: "https://i.postimg.cc/GmbLKHf6/Charcoal-Napkin.webp", desc: 'Sizes: 20"X20" or 22"X22 - 100% Cotton available' },
                             { title: "Red Napkin", img: "https://i.postimg.cc/yxqBZd93/Red-c-Napkin.webp", desc: 'Sizes: 20"X20" or 22"X22 - 100% Cotton available' },
                              { title: "Grey Napkin", img: "https://i.postimg.cc/zDWq1CZ4/Grey-Napkin.webp", desc: 'Sizes: 20"X20" or 22"X22 - 100% Cotton available' }
                        ].map((item, idx) => (
                             <div key={idx} className="bg-stone-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow group">
                                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-md">
                                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-stone-500 text-sm">{item.desc}</p>
                             </div>
                        ))}
                  </div>
             </div>
        </div>

        {/* SECTION 6: Other Products / Uniforms */}
        <div className="container mx-auto px-4 pb-20">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">Other Products - Restaurant Laundry Services</h2>
                <div className="h-1 w-24 bg-stone-800 mx-auto mt-6"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Row 1: Aprons (Vertical) */}
                  {[
                      { 
                          name: "Waiter's Apron - Black - Short", 
                          img: "https://i.postimg.cc/13zx462X/Waiter-s-Apron-Black.webp", // Black Apron
                          desc: "100% Cotton or 100% Polyester and colours available",
                          ratio: "aspect-[3/4]"
                      },
                      { 
                          name: "Waiter's Apron - White - Short", 
                          img: "https://i.postimg.cc/Y9KyNmn9/Waiter-s-Apron-whiet.jpg", // White Apron
                          desc: "100% Cotton or 100% Polyester and colours available",
                          ratio: "aspect-[3/4]"
                      },
                      { 
                          name: "Waiter's Apron - Black - Short", 
                          img: "https://i.postimg.cc/Vs7WmCq0/apron-polester.jpg", // Black Apron (Duplicate in ref image?)
                          desc: "100% Cotton or 100% Polyester and colours available",
                          ratio: "aspect-[3/4]"
                      },
                  ].map((item, idx) => (
                       <div key={idx} className="group relative rounded-xl border border-stone-100 bg-white p-4 hover:shadow-xl transition-all">
                            <div className={`relative w-full ${item.ratio} mb-4 rounded-lg overflow-hidden`}>
                                <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="text-stone-900 font-bold text-lg mb-2">{item.name}</h3>
                            <p className="text-stone-600 text-sm">{item.desc}</p>
                       </div>
                  ))}
                  
                  {/* Row 2: T-Shirts (Vertical) */}
                  {[
                       { 
                          name: "Waiter's T-Shirt Polo Shirt - Black", 
                          img: "https://i.postimg.cc/qB8gGVRp/waiter-tshirt.jpg", // Black T-Shirt
                          desc: "Short Sleeve 100% Cotton or Polycotton and colours available",
                          ratio: "aspect-[3/4]"
                      },
                       { 
                          name: "Waiter's T-Shirt Polo Shirt - White", 
                          img: "https://i.postimg.cc/25cnrpvf/waiter-tshirt-white.jpg", // White T-Shirt
                          desc: "Short Sleeve 100% Cotton or Polycotton and colours available",
                          ratio: "aspect-[3/4]"
                      },
                       { 
                          name: "Waiter's T-Shirt Polo Shirt - Blue", 
                          img: "https://i.postimg.cc/wB7751tV/waiter-tshirt-blue.jpg", // Blue T-Shirt
                          desc: "Short Sleeve 100% Cotton or Polycotton and colours available",
                          ratio: "aspect-[3/4]"
                      },
                  ].map((item, idx) => (
                       <div key={idx} className="group relative rounded-xl border border-stone-100 bg-white p-4 hover:shadow-xl transition-all">
                            <div className={`relative w-full ${item.ratio} mb-4 rounded-lg overflow-hidden`}>
                                <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="text-stone-900 font-bold text-lg mb-2">{item.name}</h3>
                            <p className="text-stone-600 text-sm">{item.desc}</p>
                       </div>
                  ))}

                  {/* Row 3: Cloths & Napkins (Landscape) */}
                   {[
                      { 
                          name: "Glass Cloth / Bar Cloth / Plate Cloth", 
                          img: "https://i.postimg.cc/BntqkdqJ/glass-napkin.jpg", // Cloths
                          desc: "White - 100% Cotton available laundry service dry cleaners nearby chef uniform in London",
                          ratio: "aspect-[4/3]"
                      },
                      { 
                          name: "Glass Cloth / Bar Cloth / Plate Cloth", 
                          img: "https://i.postimg.cc/sxwr0Jqt/glass-napkin2.jpg", // Cloths (Duplicate in ref?)
                          desc: "White - 100% Cotton available",
                          ratio: "aspect-[4/3]"
                      },
                      { 
                          name: "Coloured Napkins", 
                          img: "https://i.postimg.cc/43BQy7Dq/colored-napkin.jpg", // Coloured Napkins
                          desc: "The satin band - 100% Cotton or 100% Polyester available",
                          ratio: "aspect-[4/3]"
                      },
                  ].map((item, idx) => (
                       <div key={idx} className="group relative rounded-xl border border-stone-100 bg-white p-4 hover:shadow-xl transition-all">
                            <div className={`relative w-full ${item.ratio} mb-4 rounded-lg overflow-hidden`}>
                                <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <h3 className="text-stone-900 font-bold text-lg mb-2">{item.name}</h3>
                            <p className="text-stone-600 text-sm">{item.desc}</p>
                       </div>
                  ))}
             </div>
        </div>
      </div>
      
       {/* 
        ================================================================
        CTA SECTION
        ================================================================
      */}
      <div className="bg-orange-50 py-24" id="enquiry">
         <div className="container mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Need a quote for your restaurant?</h2>
             <p className="text-lg text-orange-800 mb-8 max-w-2xl mx-auto">
                 We provide reliable, high-quality linen hire services for restaurants across London. Contact us today.
             </p>
             <a href="tel:02034881616" className="inline-block bg-orange-600 text-white font-bold py-4 px-10 rounded-full hover:bg-orange-700 transition-colors shadow-lg">
                 Call 020 3488 1616
             </a>
         </div>
      </div>

    </div>
  );
}
