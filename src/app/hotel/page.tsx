import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaTruck, FaLeaf, FaStar, FaQuoteRight } from "react-icons/fa";

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/hotel");
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/hotel",
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
        url: "https://brentlinenhire.co.uk/hotel",
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

export default function Hotel() {
  return (
    <div className="bg-stone-50 font-sans text-stone-800">
      {/* 
        ================================================================
        HERO SECTION: Immersive, full-height, luxury typography 
        ================================================================
      */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1920" // Luxury Hotel Room
            alt="Hotel Linen Hire"
            fill
            className="object-cover scale-105 animate-slow-zoom" // Hypothetical animation class, or just static scale
            priority
          />
          {/* Sophisticated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-stone-900/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              PREMIUM HOSPITALITY SOLUTIONS
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] tracking-tight">
            Hotel Linen Hire and <br />
            <span className="italic font-light text-purple-200 text-4xl md:text-6xl lg:text-7xl block mt-2">Laundry Services London</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Providing superior quality linen and laundry services to hotels in London and surrounding areas.
            We deliver clean, high quality, perfectly pressed linen and table cloths.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/online-booking" 
              className="group relative px-8 py-4 bg-white text-stone-900 rounded-none overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 w-0 bg-purple-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative font-bold tracking-widest uppercase text-sm">Online Booking</span>
            </Link>
            <Link 
              href="#products" 
              className="group px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
               <span className="font-bold tracking-widest uppercase text-sm">View Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        INTRO SECTION: Floating Card / Overlap Effect
        ================================================================
      */}
      <div className="relative z-20 -mt-24 container mx-auto px-4 mb-24">
        <div className="bg-white shadow-2xl shadow-stone-900/20 rounded-t-3xl md:rounded-3xl p-8 md:p-16 border-t font-serif border-purple-500/30">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-purple-800">
                <FaStar className="text-xl" />
                <span className="uppercase tracking-widest text-sm font-bold">The Guest Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                Linen is the touchpoint of luxury.
              </h2>
              <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-light">
                 <p>
                    We understand that linen is one of the most <strong className="text-stone-900 font-medium">visible and important features</strong> of your guest's experience. That's why we are committed to providing superior quality linen and laundry services to hotels in London and surrounding areas.
                </p>
                <p>
                    We supply only the best quality hotel linen and offering 100% services to give you a cost effective solution to being the best experience for your guests while they are at your establishment. In all our hotel laundering procedures, all items go through a quality control check to ensure new stock is in circulation. That keeps our standards constantly checking to ensure standards are maintained at an outstanding level.
                </p>
                <div className="pt-4 border-l-4 border-purple-200 pl-6 my-8">
                     <p className="text-xl font-serif italic text-stone-800">
                    "If you're looking for new laundry to hire, hotel linen laundry services or bed linen hire please give us a call on 020 3488 1616 or email us info@brentlinenhire.co.uk to get a quote today."
                    </p>
                     <p className="mt-4 font-bold text-sm uppercase tracking-wider text-purple-900">
                        Call 020 3488 1616
                    </p>
                </div>
              </div>
            </div>
            {/* Image Grid / Collage */}
            <div className="relative h-[600px] w-full hidden md:block">
                 <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
                     <Image
                        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Hotel Bedroom"
                        fill
                        className="object-cover"
                     />
                 </div>
                 <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white">
                      <Image
                        src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800" // Relaxing
                        alt="Relaxing Guest"
                        fill
                        className="object-cover"
                     />
                 </div>
                 <div className="absolute bottom-10 right-10 z-30 bg-purple-900 text-white p-6 rounded-xl shadow-xl max-w-xs">
                    <p className="font-serif italic text-lg text-center">"Reliability & Quality"</p>
                 </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        COLLECTIONS: High-end masonry or alternating layout
        ================================================================
      */}
      <div id="products" className="py-24 space-y-32 bg-stone-100">
        
        {/* COLLECTION 1: HOTEL LINEN HIRE (Plain & Satin) */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-purple-600 uppercase tracking-widest font-bold text-sm">The Bedroom Collection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">Hotel Linen Hire</h2>
            <div className="w-24 h-1 bg-purple-300 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Plain Linen Column */}
            <div className="space-y-8">
               <h3 className="text-3xl font-serif font-bold text-stone-800 text-center mb-4">Plain</h3>
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-purple-200 transition-colors">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs text-stone-400">01</span>
                    Plain Linen - Elite
                  </h3>
                   <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 group">
                        <Image src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Plain Linen Elite" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  <p className="text-stone-600 leading-relaxed border-t pt-4 border-stone-100">
                    <strong className="block text-stone-900 mb-1">100% Egyptian Cotton</strong>
                    White single, double, king & super king. All come with Duvet Cover, Sheets and Pillowcase.
                  </p>
               </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-purple-200 transition-colors">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs text-stone-400">02</span>
                    Plain Linen - Premium
                  </h3>
                   <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 group">
                         <Image src="https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Plain Linen Premium" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  <p className="text-stone-600 leading-relaxed border-t pt-4 border-stone-100">
                    <strong className="block text-stone-900 mb-1">High Quality Percale</strong>
                    White single, double, king & super king. All come with Duvet Cover, Sheets and Pillowcase.
                  </p>
               </div>
               
               <div className="bg-white p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow flex flex-col justify-center items-center text-center">
                    <div className="w-32 h-32 relative mb-4">
                         <Image src="https://i.postimg.cc/9MMvSmy5/logo.webp" alt="Brent Linen Hire" fill className="object-contain" />
                    </div>
                    <p className="text-sm text-purple-600 font-semibold">Quality you can trust.<br/>Brent Linen Hire.</p>
                </div>
            </div>

            {/* Satin Stripe Column */}
             <div className="space-y-8 lg:mt-16"> {/* Staggered effect */}
               <h3 className="text-3xl font-serif font-bold text-stone-800 text-center mb-4">Satin Stripe</h3>
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-purple-200 transition-colors relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs text-stone-400">03</span>
                    Satin Stripe - Elite
                  </h3>
                   <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 group">
                        <Image src="https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Satin Stripe Elite" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  <p className="text-stone-600 leading-relaxed border-t pt-4 border-stone-100">
                    <strong className="block text-stone-900 mb-1">Luxury Satin Finish</strong>
                    White single, double, king & super king. All come with Duvet Cover, Sheets and Pillowcase.
                  </p>
               </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-purple-200 transition-colors">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs text-stone-400">04</span>
                    Satin Stripe - Premium
                  </h3>
                   <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 group">
                        <Image src="https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Satin Stripe Premium" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                   <p className="text-stone-600 leading-relaxed border-t pt-4 border-stone-100">
                    <strong className="block text-stone-900 mb-1">High Quality Stripe</strong>
                     White Single, Double, King & Super King. All come with Duvet Cover, Sheets and Pillowcase.
                  </p>
               </div>
               
               {/* Delivery Badge */}
               <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-full">
                        <FaTruck className="text-3xl text-yellow-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Delivery on time every time</h4>
                        <p className="text-stone-400 text-sm">Free Pickup and Delivery. We ensure your linen arrives when you need it.</p>
                    </div>
               </div>

            </div>
          </div>
        </div>


        {/* COLLECTION 2: BATH & SPA - Slider/Grid Hybrid */}
        <div className="bg-white py-24 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                 <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
                 <div className="absolute top-40 right-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
             </div>

             <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                     <div>
                        <span className="text-purple-600 uppercase tracking-widest font-bold text-sm">Wellness & Comfort</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">Hotel Towel Hire, Gym Towel Hire, Bathrobe Hire</h2>
                     </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {/* Product Cards */}
                     {[
                        { title: "Bath Towels - Elite 600GSM", mobile: "600 GSM", img: "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Bath sheet, bath towel, hand towel, face cloth. 600 gsm high quality heavy pile." },
                        { title: "Bath Towels - Premium", mobile: "Turkish Cotton", img: "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Bath sheet, bath towel, hand towel, face cloth. 500 gsm Turkish Cotton." },
                        { title: "Leisure Towels", mobile: "Gym & Spa", img: "https://images.pexels.com/photos/6032205/pexels-photo-6032205.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Ideal for Gyms and Spas. Blue/White stripe or plain." },
                        { title: "Beach Towels", mobile: "Large & Soft", img: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Large beach towels. White or striped." },
                        { title: "Towels of different colour", mobile: "Varied Palette", img: "https://images.pexels.com/photos/1652395/pexels-photo-1652395.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Towels available in various colours. Dark blue, cream, brown, black etc." },
                        { title: "Bath Robe", mobile: "Waffle & Velour", img: "https://images.pexels.com/photos/3209095/pexels-photo-3209095.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Bath robe / wellness towel / waffle kimono / velour." }
                     ].map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative h-80 w-full overflow-hidden rounded-xl mb-4">
                                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 text-white transform translate-y-0 group-hover:-translate-y-2 transition-transform">
                                    <h3 className="text-xl font-serif">{item.title}</h3>
                                </div>
                            </div>
                            <p className="text-stone-600 text-sm pl-2 border-l-2 border-transparent group-hover:border-purple-400 transition-colors">
                                {item.desc}
                            </p>
                        </div>
                     ))}
                </div>
             </div>
        </div>

      </div>
      
      {/* 
        ================================================================
        FEATURE SHOWCASE: "Our Products" - Full Width
        ================================================================
      */}
        <div className="relative h-[60vh] min-h-[500px] w-full bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1920")' }}>
            <div className="absolute inset-0 bg-stone-900/80"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
                 <FaLeaf className="text-4xl text-green-400 mb-6" />
                 <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Our Products for Hotels</h2>
                 <p className="text-xl md:text-2xl text-stone-300 max-w-3xl leading-relaxed">
                     "We supply only the best quality hotel linen and offer 100% services... being the best experience for your guests."
                 </p>
            </div>
        </div>


      {/* 
        ================================================================
        CTA SECTION: Elegant & Direct
        ================================================================
      */}
      <div className="bg-white py-24" id="enquiry">
        <div className="container mx-auto px-4">
             <div className="bg-purple-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                 {/* Decorative Circles */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full -ml-40 -mb-40 blur-3xl"></div>

                 <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Make an Enquiry</h2>
                    <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
                        To enquire about your kitchen linen needs please call us on 020 3488 1616 or email info@brentlinenhire.co.uk. We are always happy to help.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                         <Link href="/online-booking" className="inline-flex items-center justify-center px-10 py-5 bg-white text-purple-900 font-bold rounded-full hover:bg-stone-100 transition-transform hover:scale-105 shadow-xl">
                            ONLINE BOOKING
                         </Link>
                    </div>
                 </div>
             </div>
        </div>
      </div>

    </div>
  );
}
