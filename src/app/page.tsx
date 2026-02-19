import { FaHistory, FaConciergeBell, FaStar, FaAward, FaUsers, FaMicrochip, FaLeaf, FaSmile, FaHandsHelping, FaShippingFast, FaTruck, FaMedal, FaChevronDown, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import Hero from "@/components/Hero";

import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/");
  
  // Default values if no data
  const title = data?.title || "Brent Linen Hire | Hotel & Restaurant Linen Services London";
  const description = data?.description || "Premier commercial laundry and linen hire services in London. Specializing in hotels, restaurants, and chef uniforms.";
  
  return {
    title,
    description,
    keywords: data?.keywords?.split(",").map((k: string) => k.trim()) || ["linen hire", "laundry service", "london", "hotel linen", "restaurant linen"],
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data?.canonicalUrl || "https://brentlinenhire.co.uk",
    },
    robots: {
        index: data?.robots?.includes("noindex") ? false : true,
        follow: data?.robots?.includes("nofollow") ? false : true,
    },
    openGraph: {
        title: data?.ogTitle || title,
        description: data?.ogDescription || description,
        images: data?.ogImage ? [{ url: data.ogImage }] : undefined,
        type: "website",
        locale: "en_GB",
        url: "https://brentlinenhire.co.uk",
        siteName: "Brent Linen Hire",
    },
    twitter: {
        card: (data?.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
        title: data?.ogTitle || title,
        description: data?.ogDescription || description,
        images: data?.ogImage ? [data.ogImage] : undefined,
    }
  };
}

export default function Home() {
  return (
    <div className="">
      <Hero />

      {/* Introduction / About Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Content Side */}
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                 Hotel Linen Hire, Restaurant Linen Hire and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Laundry Services</span> in London
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                 <p>
                    We are an industrial laundry company specializing in <strong>hotel linen hire</strong>, <strong>restaurant linen hire</strong>, and <strong>chef uniform/workwear rental services</strong>. With over 10 years of experience, we proudly serve hotels, Airbnb hosts, serviced accommodations, restaurants, and the wider hospitality sector, offering top-quality linen hire and laundry solutions across London.
                 </p>
                 <p>
                    Our commitment to exceptional service quality, reliability, and flexibility has earned us strong, long-lasting relationships with our customers. We take pride in delivering dedicated customer service and providing quick, effective resolutions to any queries, fostering loyalty and trust among our clients.
                 </p>
                 <p>
                    Recognizing that every customer has unique requirements, we tailor our services to meet individual needs. By providing premium-quality products and ensuring prompt deliveries, we help our clients focus on their business, free from concerns about linen and workwear management.
                 </p>
                 <p className="font-medium text-gray-900 border-l-4 border-[var(--color-primary)] pl-4 italic">
                    Partner with us for dependable, customized linen and uniform hire solutions that support your success.
                 </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/online-booking"
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-200"
                >
                  Online Booking
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 w-full">
              <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
                <Image
                  src="https://i.postimg.cc/0jwyr1Sx/about-us-img.webp"
                  alt="Professional Laundry Services"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section (History, Services, Why Us) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 border-t border-purple-900/50">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-60" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* History Card */}
            <div className="group relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden flex flex-col">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500" />
               
                 <div className="relative z-10 flex-grow">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/20 shadow-lg shadow-purple-500/5">
                    <FaHistory className="w-8 h-8 text-white group-hover:text-purple-300 transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors tracking-wide">Our History</h3>
                 <div className="space-y-4 text-gray-400 text-sm leading-relaxed font-light">
                   <p>
                     Established in 2010, <strong className="text-white font-semibold">Brent Linen Hire</strong> has grown into a trusted family-run name in London's hospitality sector. We treat customer satisfaction not just as a goal, but as our greatest achievement.
                   </p>
                   <p>
                     Specializing in tailored solutions for hotels, restaurants, and healthcare, strictly adhering to hygiene standards for your peace of mind.
                   </p>
                 </div>
               </div>
            </div>

            {/* Services Card */}
            <div className="group relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden flex flex-col">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
               
                <div className="relative z-10 flex-grow">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/20 shadow-lg shadow-blue-500/5">
                   <FaConciergeBell className="w-8 h-8 text-white group-hover:text-blue-300 transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-wide">Our Services</h3>
                 <div className="space-y-4 text-gray-400 text-sm leading-relaxed font-light">
                   <p>
                     We supply and launder premium-quality <strong className="text-white font-semibold">Hotel Linen, Towels, Napkins, and Chef Workwear</strong>. 
                   </p>
                   <p>
                     Serving London and surrounding areas, our diverse product range is crafted for durability and comfort, meeting the unique needs of hotels, caterers, and events.
                   </p>
                 </div>
               </div>
            </div>

            {/* Why Us Card */}
            <div className="group relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden flex flex-col">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-all duration-500" />
               
                <div className="relative z-10 flex-grow">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/20 shadow-lg shadow-pink-500/5">
                    <FaStar className="w-8 h-8 text-white group-hover:text-pink-300 transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors tracking-wide">Why Choose Us?</h3>
                 
                 <ul className="space-y-3 mb-8">
                    {[
                      "Best service & Competitive pricing",
                      "High-quality products",
                      "Free delivery and collection",
                      "Timely and reliable delivery"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs"><FaCheckCircle /></span> 
                        {item}
                      </li>
                    ))}
                 </ul>
                 
                 <div className="pt-6 border-t border-gray-700/50 flex flex-col items-center mt-auto">
                    <p className="text-pink-400 text-xs uppercase font-bold tracking-widest mb-2">Call Us Now</p>
                    <a href="tel:02034881616" className="text-3xl font-bold text-white hover:text-pink-400 transition-colors font-mono">020 3488 1616</a>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight mb-4">
              Hotel Linen, Restaurant Linen, Chef Uniform Hire <br className="hidden md:block" />
              <span className="text-gray-900">& Laundry Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Item 1: Hotel Linen */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100">
               <div className="relative h-72 overflow-hidden">
                 <Image
                   src="https://i.postimg.cc/qvS4YMZ9/hotel-linen.webp"
                   alt="Hotel Linen Hire"
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
               </div>
               <div className="p-8 flex flex-col flex-grow">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    Hotel Linen Hire
                 </h3>
                 <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                   <Link href="/hotel" className="font-semibold text-[var(--color-primary)] hover:underline">Hotels</Link> — Comprehensive linen solutions including Airbnb linen hire, Service Accommodation (SA) packs, luxury hotel towels, and gym towel services across London.
                 </p>
                  <Link
                    href="/online-booking"
                    className="w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-200"
                  >
                    Online Booking
                  </Link>
               </div>
            </div>

            {/* Item 2: Restaurant Linen */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100">
               <div className="relative h-72 overflow-hidden">
                 <Image
                   src="https://i.postimg.cc/gkr9WbhS/restaurant-linen.jpg"
                   alt="Restaurant Linen Hire"
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
               </div>
               <div className="p-8 flex flex-col flex-grow">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    Restaurant Linen Hire
                 </h3>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   <Link href="/restaurant" className="font-semibold text-[var(--color-primary)] hover:underline">Restaurants</Link> — Premium table settings including crisp tablecloths, napkins, and full laundry services tailored for London's fine dining establishments.
                 </p>
                 <div className="mt-auto">
                    <Link href="/restaurant" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        Learn more <span className="text-xl">→</span>
                    </Link>
                 </div>
               </div>
            </div>

            {/* Item 3: Chef Uniform */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100">
               <div className="relative h-72 overflow-hidden">
                 <Image
                   src="https://i.postimg.cc/QNvLhnqj/chef-linen.webp"
                   alt="Chef Uniform Hire"
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
               </div>
               <div className="p-8 flex flex-col flex-grow">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    Chef Uniform & Workwear
                 </h3>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   <Link href="/kitchen" className="font-semibold text-[var(--color-primary)] hover:underline">Kitchens</Link> — Professional attire rental including chef jackets, trousers, aprons, and tea towels. Keep your team looking pristine.
                 </p>
                 <div className="mt-auto">
                    <Link href="/kitchen" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        View Uniforms <span className="text-xl">→</span>
                    </Link>
                 </div>
               </div>
            </div>

            {/* Item 4: Events */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100">
               <div className="relative h-72 overflow-hidden">
                 <Image
                   src="https://i.postimg.cc/sgN7N7rk/event-linen.webp"
                   alt="Event Tablecloth Hire"
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
               </div>
               <div className="p-8 flex flex-col flex-grow">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    Wedding & Event Hire
                 </h3>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   <Link href="/events" className="font-semibold text-[var(--color-primary)] hover:underline">Parties & Events</Link> — Complete linen solutions for weddings and corporate events, including tablecloths and chair covers.
                 </p>
                 <div className="mt-auto">
                    <Link href="/events" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        Event Supplies <span className="text-xl">→</span>
                    </Link>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose Section - Premium Dark Mode */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden border-b border-purple-900/50">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Why Brent Laundry?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Setting the standard for commercial laundry excellence in London.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "EXPERIENCE",
                desc: "Over 15 years of commercial laundry industry experience.",
                icon: (
                  <FaHistory className="w-8 h-8" />
                )
              },
              {
                title: "QUALITY STAFF",
                desc: "Dedicated team of trained hotel laundry experts.",
                icon: (
                  <FaUsers className="w-8 h-8" />
                )
              },
              {
                title: "CUTTING-EDGE TECHNOLOGY",
                desc: "We use the very best in cutting-edge commercial laundry equipment.",
                icon: (
                   <FaMicrochip className="w-8 h-8" />
                )
              },
              {
                title: "ENVIRONMENTAL RESPONSIBILITY",
                desc: "We ensure sustainable hotel linen hire practices.",
                icon: (
                   <FaLeaf className="w-8 h-8" />
                )
              },
              {
                title: "CUSTOMER SATISFACTION",
                desc: "Our commitment to quality and attention to detail has earned us the trust of many clients.",
                icon: (
                  <FaSmile className="w-8 h-8" />
                )
              },
              {
                title: "CUSTOMISED SOLUTIONS",
                desc: "Our services are tailored to your specific needs.",
                icon: (
                  <FaHandsHelping className="w-8 h-8" />
                )
              },
              {
                title: "QUICK TURNAROUND",
                desc: "We offer fast and efficient commercial linen hire service.",
                icon: (
                   <FaShippingFast className="w-8 h-8" />
                )
              },
              {
                title: "COLLECT & DELIVERY",
                desc: "We provide seamless linen hire collection and delivery.",
                icon: (
                  <FaTruck className="w-8 h-8" />
                )
              },
              {
                title: "QUALITY EXCELLENCE",
                desc: "Our commercial laundry services meet the highest industry standards.",
                icon: (
                   <FaMedal className="w-8 h-8" />
                )
              }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 text-gray-400 group-hover:text-purple-400 mb-6 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full opacity-30"></div>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
            {[
              {
                q: "What products do you supply and launder?",
                a: (
                  <div className="space-y-4">
                    <p>We supply and launder the following products:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong className="block text-gray-900 mb-2">For Restaurants:</strong>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Chef jackets – extra small, small, medium, large, extra-large and extra-extra large</li>
                          <li>Chef trousers – extra small, small, medium, large, extra-large and extra-extra large</li>
                          <li>Chef aprons – all major colours</li>
                          <li>Chef hats</li>
                          <li>Kitchen cloths / tea towels</li>
                          <li>Oven cloths</li>
                          <li>Tablecloths</li>
                          <li>Napkins / serviettes – all major colours</li>
                          <li>Glass cloths</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-gray-900 mb-2">For Hotels:</strong>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Bed sheets – small, medium, large, king, and super king</li>
                          <li>Duvet covers – small, medium, large, king, and super king</li>
                          <li>Pillows cases</li>
                          <li>Bath sheets & towels</li>
                          <li>Hand towels</li>
                          <li>Bath mats</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                 q: "What are the tablecloth sizes?",
                 a: (
                   <div className="space-y-4">
                     <p>Our tablecloth sizes are:</p>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                       <div>
                         <strong className="block text-gray-900 mb-2">Square:</strong>
                         <ul className="space-y-1 text-gray-600">
                           <li>36” X 36” (91cm X 91cm)</li>
                           <li>45” X 45” (114cm X 114cm)</li>
                           <li>52” X 52” (132cm X 132cm)</li>
                           <li>63” X 63” (160cm X 160cm)</li>
                           <li>70” X 70” (178cm X 178cm)</li>
                           <li>90” X 90” (229cm X 229cm)</li>
                         </ul>
                       </div>
                       <div>
                         <strong className="block text-gray-900 mb-2">Rectangle:</strong>
                         <ul className="space-y-1 text-gray-600">
                           <li>52” X 70” (132cm X 178cm)</li>
                           <li>52” X 90” (132cm X 229cm)</li>
                           <li>70” X 108” (178cm X 274cm)</li>
                           <li>70” X 144” (178cm X 366cm)</li>
                         </ul>
                       </div>
                       <div>
                         <strong className="block text-gray-900 mb-2">Round:</strong>
                         <ul className="space-y-1 text-gray-600">
                           <li>4' Round Table (4 people)</li>
                           <li>4'5" Round Table (6-8 people)</li>
                           <li>5' Round Table (8-10 people)</li>
                           <li>5'6" Round Table (10 people)</li>
                           <li>6' Round Table (10-12 people)</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 )
              },
              {
                q: "What is the suitable cloth size for my table?",
                a: "Please call Brent Linen Hire on 020 3488 1616 to discuss. We will advise you the sizes that suites your cloths."
              },
              {
                q: "How much will it cost?",
                a: "Please email your requirements to us at info@brentlinenhire.co.uk or call us on 020 3488 1616. The cost will depend on your requirements and volume. We will give you the best quote with itemised price and detailed of the cloths."
              },
              {
                q: "What area do you cover for delivery?",
                a: "We deliver the cloths anywhere of London and surrounding cities."
              },
              {
                q: "How often will you pick up /drop off?",
                a: "It depends on your requirements and ordered quantities. We will agree a suitable term with you for delivery and collection."
              },
              {
                q: "Who will be my contact personnel?",
                a: "One of representatives will be designated to you or your company to look after you and deal with any issue arises. You will always talk to the same person. Customer service is very important to us."
              },
              {
                q: "How do I place an order?",
                a: "We recommend to e-mail your order to keep a track record of the orders."
              },
              {
                 q: "How often do you invoice?",
                 a: "We invoice weekly or monthly depending on the terms and condition agreed with you."
              },
              {
                 q: "What are your payment terms?",
                 a: "This varies on your business credit history and can range from payment on delivery to 30 days."
              },
              {
                 q: "How can I pay?",
                 a: "We prefer a standing order being set up and can pay us as per the agreement. Otherwise, you can pay via BACS or Cheque."
              },
              {
                 q: "What are your opening hours?",
                 a: "Monday to Saturday – 08:00 am to 07:00 pm."
              },
               {
                 q: "Can customers contact you outside of working hours?",
                 a: "Yes, you can call your account manager outside of working hours."
              },
              {
                 q: "We are a charity organisation; can we have a discount on your products?",
                 a: "Yes, we will offer a discount for charity events."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden open:shadow-md transition-all duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-lg font-semibold text-gray-800 hover:text-[var(--color-primary)] transition-colors">
                  {faq.q}
                   <span className="transform group-open:rotate-180 transition-transform duration-300 text-[var(--color-primary)]">
                     <FaChevronDown className="w-6 h-6" />
                   </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 text-center">
             <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
               If you have any queries, please call us on <a href="tel:02034881616" className="text-[var(--color-primary)] font-bold hover:underline">020 3488 1616</a> or e-mail us at <a href="mailto:info@brentlinenhire.co.uk" className="text-[var(--color-primary)] font-bold hover:underline">info@brentlinenhire.co.uk</a> or visit our other pages. We are happy to help.
             </p>
             <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Contact Our Team
              </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}
