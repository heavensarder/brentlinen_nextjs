
import { getActiveBookingProducts, getBookingCategories } from "@/app/actions/booking";
import { getSeoSettings } from "@/app/actions/seo";
import BookingFlow from "@/components/home/BookingFlow";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Online Booking | Brent Linen Hire",
  description: "Book your hotel linen, restaurant linen, and chef uniform hire services online. Simple, fast, and reliable booking system.",
};

export default async function OnlineBookingPage() {
  const { data: products } = await getActiveBookingProducts();
  const { data: categories } = await getBookingCategories();

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Online Booking</h1>
            <p className="text-lg text-gray-600">
                Select your required services below and book instantly. For custom requirements, please contact us directly.
            </p>
        </div>
        
        <BookingFlow 
            products={(products as any) || []} 
            categories={categories || []}
        />
      </div>
    </div>
  );
}
