"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { submitQuery } from "@/app/actions/queries";

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 mb-16 uppercase tracking-wide">
          Quote Enquiry
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Left Column: Form */}
          <div className="bg-white">
            <form action={async (formData) => {
                const res = await submitQuery(formData);
                if (res.success) {
                  alert("Thank you! Your message has been sent.");
                  // Optional: Reset form here if needed, but standard action will clear mostly
                } else {
                  alert("Something went wrong. Please try again.");
                }
              }} className="space-y-6">
              <div>
                <label className="sr-only">Name*</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name*"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="sr-only">Email*</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="sr-only">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="sr-only">Message*</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Message*"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* ReCAPTCHA Placeholder */}
              <div className="flex justify-end">
                 <div className="bg-gray-50 border border-gray-200 px-3 py-1 rounded text-xs text-gray-500 flex items-center gap-1 shadow-sm">
                    <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-white font-bold text-[10px]">G</div>
                    <span>reCAPTCHA</span>
                 </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-4 rounded-sm hover:bg-purple-700 transition-colors uppercase tracking-wider shadow-md"
              >
                Send Message
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
            </form>
          </div>

          {/* Right Column: Info */}
          <div className="space-y-10 text-stone-600">
            <p className="text-lg leading-relaxed">
              Please leave your phone number in case we need to contact you for more information to prepare the best quote for you.
            </p>

            {/* WhatsApp Button */}
            <div>
                 <a 
                    href="https://wa.me/447966435273" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#4F6F6F] hover:bg-[#3d5757] text-white font-bold py-3 px-6 rounded-sm transition-colors shadow-sm"
                 >
                    <FaWhatsapp className="text-2xl" />
                    <span>Call or Message us on WhatsApp</span>
                 </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
                 <span className="text-xl text-stone-600">Tel:</span>
                 <a href="tel:02034881616" className="text-2xl md:text-3xl text-purple-600 font-medium hover:underline">020 3488 1616</a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
                 <span className="text-xl text-stone-600">Email:</span>
                 <a href="mailto:info@brentlinenhire.co.uk" className="text-xl md:text-2xl text-purple-600 font-medium hover:underline">info@brentlinenhire.co.uk</a>
            </div>

            {/* Hours */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-stone-800">Hours:</h3>
                
                <p className="text-lg text-purple-700 font-medium">
                    Open today 08:00 am – 07:00 pm
                </p>

                <div className="text-lg text-stone-600 space-y-1">
                    <p>Monday - Saturday: 8am - 7pm</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
