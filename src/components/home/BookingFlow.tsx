"use client";

import { useState, useMemo } from "react";
import { FaPoundSign } from "react-icons/fa";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaCheck, FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaUser, FaFilter, FaChevronLeft, FaChevronRight, FaBoxOpen } from "react-icons/fa";
import { createBooking } from "@/app/actions/booking";

// Custom Calendar Component
function Calendar({ selectedDate, onSelect, minDate, color = "purple" }: { selectedDate: string; onSelect: (date: string) => void; minDate: string; color?: "purple" | "indigo" }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  // Adjust for Monday start if needed, but Sunday start is standard for simple calendars
  // standard: 0 = Sunday, 1 = Monday, ...
  const startingEmptyDays = firstDay; 

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isSelected = (d: number) => {
    const iso = new Date(year, month, d + 1).toISOString().split('T')[0]; // +1 because Date constructor is 0-indexed month but day is 1-indexed? No. new Date(y, m, d) is correct.
    // Actually, local time issues. safer to manually construct ISO string
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const isDisabled = (d: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return dateStr < minDate;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                <FaChevronLeft size={12} />
            </button>
            <span className="font-bold text-gray-800">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                <FaChevronRight size={12} />
            </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-bold text-gray-400 uppercase">{day}</div>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingEmptyDays }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const selected = selectedDate === dateStr;
                const disabled = dateStr < minDate;
                
                const activeColor = color === "purple" ? "bg-purple-600 border-purple-600" : "bg-indigo-600 border-indigo-600";
                
                return (
                    <button
                        key={day}
                        disabled={disabled}
                        onClick={() => onSelect(dateStr)}
                        className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                            ${selected 
                                ? `${activeColor} text-white shadow-md transform scale-105` 
                                : disabled
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                            }
                        `}
                    >
                        {day}
                    </button>
                );
            })}
        </div>
    </div>
  );
}

interface Category {
  id: string;
  title: string;
  imageRatio: string;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  quantity: number | null; // Replaces duration
  image: string | null;
  categoryId: string | null;
}

interface BookingFlowProps {
  products: Product[];
  categories: Category[];
}

export default function BookingFlow({ products, categories }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Removed isMultiDay state
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState(""); // Moved up
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    address2: "",
    city: "",
    zip: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(p => p.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const currentProducts = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset page when category changes
  useMemo(() => {
      setCurrentPage(1);
  }, [selectedCategory]);

  const getAspectRatioClass = (product: Product) => {
    if (!product.categoryId) return "aspect-square"; // Default Square
    const cat = categories.find(c => c.id === product.categoryId);
    switch (cat?.imageRatio) {
        case "portrait": return "aspect-[3/4]";
        case "landscape": return "aspect-[4/3]";
        case "square": default: return "aspect-square";
    }
  };

  // Time slots generation (mock for now, could be dynamic)
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM"
  ];
  
  // Create next 14 days for date picker
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start from tomorrow
    return {
        iso: d.toISOString().split('T')[0],
        display: d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }), // DD/MM/YYYY
        dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
        dayNum: d.getDate()
    };
  });

  // Calculate total hours and price (including quantity)
  const { totalHours, totalPrice } = useMemo(() => {
    if (!date || !time || !endDate || !endTime) return { totalHours: 0, totalPrice: 0 };
    const start = new Date(date + 'T' + time);
    const end = new Date(endDate + 'T' + endTime);
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.max(0, diffMs / (1000 * 60 * 60));
    const price = selectedProduct?.price ? hours * selectedProduct.price * quantity : 0;
    return { totalHours: Math.round(hours * 10) / 10, totalPrice: Math.round(price * 100) / 100 };
  }, [date, time, endDate, endTime, selectedProduct, quantity]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    // If product has fixed quantity, use it. Otherwise default to 1.
    setQuantity(product.quantity || 1);
    setStep(2);
    // Auto scroll to top on step change
    const element = document.getElementById('booking-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDetailsProceed = () => {
    if (!date || !time) {
        alert("Please select a start date and time.");
        return;
    }
    if (!endDate || !endTime) {
        alert("Please select an end date and time.");
        return;
    }
    
    // Simple validation: End must be after Start
    // Input type="time" returns values in "HH:mm" 24-hour format, so we can directly compare or append to date.
    const start = new Date(date + 'T' + time);
    const end = new Date(endDate + 'T' + endTime);
    
    if (end <= start) {
        alert("End time must be after start time.");
        return;
    }
    
    setStep(3);
    const element = document.getElementById('booking-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setIsSubmitting(true);
    
    const res = await createBooking({
        ...userDetails,
        name: userDetails.customerName,
        email: userDetails.customerEmail,
        phone: userDetails.customerPhone,
        productId: selectedProduct.id,
        date: date,
        endDate: endDate,
        time: time,
        endTime: endTime,
        quantity: quantity,
        totalHours: totalHours || undefined,
        totalPrice: totalPrice || undefined,
    });

    if (res.success) {
        setSuccess(true);
        setStep(4);
    } else {
        alert("Booking failed: " + res.error);
    }
    
    setIsSubmitting(false);
  };

  if (success) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck size={40} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600 text-lg mb-8">
                Thank you, <strong>{userDetails.customerName}</strong>. Your Booking for <strong>{quantity}x {selectedProduct?.title}</strong> on <strong>{dates.find(d => d.iso === date)?.display} at {time}</strong> 
                {endDate && (
                    <span> to <strong>{dates.find(d => d.iso === endDate)?.display || new Date(endDate).toLocaleDateString('en-GB')} at {endTime || time}</strong></span>
                )}
                {' '}has been scheduled.
            </p>
            <p className="text-gray-500 mb-8">
                We will send a confirmation email to {userDetails.customerEmail}.
            </p>
            <button 
                onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    setSelectedProduct(null);
                    setDate("");
                    setEndDate("");
                    setTime("");
                    setEndTime("");
                    // isMultiDay removed
                    setQuantity(1);
                }}
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
            >
                Book Another Service
            </button>
        </div>
    );
  }

  // Calculate Progress
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div id="booking-section" className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaCalendarAlt /> Online Booking
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                <span>Step {step} of 3</span>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
            <div 
                className="h-full bg-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        <div className="p-4 md:p-8 flex-1">
            {/* Step 1: Select Service (Products) */}
            {step === 1 && (
                <div className="animate-fadeIn">
                    <div className="flex flex-col mb-8 gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Service</h3>
                            <p className="text-gray-500">Choose the type of appointment or product you need.</p>
                        </div>
                        
                        {/* Category Tabs */}
                        {categories.length > 0 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                <button 
                                    onClick={() => setSelectedCategory("all")}
                                    className={`flex-shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                                        selectedCategory === "all" 
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
                                    }`}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button 
                                        key={cat.id} 
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`flex-shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                                            selectedCategory === cat.id 
                                            ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                                            : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
                                        }`}
                                    >
                                        {cat.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                   
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            {products.length === 0 
                                ? "No services available for booking at the moment. Please call us directly." 
                                : "No services found in this category."}
                        </div>
                    ) : (
                        <>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {currentProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="break-inside-avoid"
                                >
                                <button
                                    onClick={() => handleProductSelect(product)}
                                    className="w-full group text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col transform hover:-translate-y-1"
                                >
                                    <div className={`relative w-full bg-gray-100 ${getAspectRatioClass(product)}`}>
                                        {product.image ? (
                                            <Image 
                                                src={product.image} 
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-300">
                                                <FaCalendarAlt size={40} />
                                            </div>
                                        )}
                                        {product.quantity && (
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700 shadow-sm flex items-center gap-1">
                                                <FaBoxOpen /> {product.quantity} Fixed
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col w-full">
                                        <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                                            {product.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                                            {product.description}
                                        </p>
                                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 w-full">
                                            {product.price && !product.quantity ? (
                                                <span className="font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">£{product.price.toFixed(2)}/hr <span className="text-xs font-medium text-purple-500">per piece</span></span>
                                            ) : product.price && product.quantity ? (
                                                <span className="font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">£{product.price.toFixed(2)}/hr</span>
                                            ) : (
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Free Consultation</span>
                                            )}
                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                Book Now
                                            </span>
                                        </div>
                                    </div>
                                </button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                >
                                    <FaChevronLeft />
                                </button>
                                
                                <span className="text-sm font-bold text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                        </>
                    )}
                </div>
            )}

            {/* Step 2: Start & End Date/Time */}
            {step === 2 && selectedProduct && (
                 <div className="animate-fadeIn max-w-6xl mx-auto">
                    <button 
                        onClick={() => setStep(1)} 
                        className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-6 transition-colors font-medium text-sm"
                    >
                        <FaArrowLeft /> Back to Services
                    </button>
                    
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                         {selectedProduct.image ? (
                             <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-white">
                                 <Image src={selectedProduct.image} alt={selectedProduct.title} fill className="object-cover" />
                             </div>
                         ) : (
                             <div className="w-24 h-24 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FaCalendarAlt className="text-purple-300 text-3xl"/>
                             </div>
                         )}
                         <div>
                            <h3 className="font-bold text-xl text-gray-900">{selectedProduct.title}</h3>
                            <p className="text-gray-600 mt-1">Please select the Start and End time for your appointment.</p>
                            {selectedProduct.quantity && (
                                <div className="flex items-center gap-2 mt-2 text-sm text-purple-700 font-medium bg-white/80 py-1 px-3 rounded-full w-fit">
                                     <FaBoxOpen /> Fixed Quantity: {selectedProduct.quantity}
                                </div>
                            )}
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                        {/* LEFT: Start Date & Time */}
                        <div className="bg-white rounded-xl ">
                             <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                                <span className="text-purple-600">Start</span> Date & Time
                             </h4>
                             
                             {/* Calendar Picker */}
                             <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Date</label>
                                <Calendar 
                                    selectedDate={date} 
                                    onSelect={(d) => {
                                        setDate(d);
                                        // Auto-set End Date if empty or before new start date
                                        if (!endDate || d > endDate) setEndDate(d);
                                    }} 
                                    minDate={new Date().toISOString().split('T')[0]}
                                />
                             </div>

                             {/* Time Picker */}
                             <div className={`transition-opacity duration-300 ${date ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Time</label>
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="relative col-span-4">
                                         <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                         <input
                                            type="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-bold text-gray-700"
                                         />
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* RIGHT: End Date & Time */}
                        <div className="bg-white rounded-xl lg:border-l lg:border-gray-100 lg:pl-8">
                                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                                    <span className="text-indigo-600">End</span> Date & Time
                                </h4>

                                {/* Calendar Picker */}
                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Date</label>
                                    <Calendar 
                                        selectedDate={endDate} 
                                        onSelect={setEndDate} 
                                        minDate={date || new Date().toISOString().split('T')[0]}
                                        color="indigo"
                                    />
                                </div>

                                {/* Time Picker */}
                                <div className={`transition-opacity duration-300 ${endDate ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Time</label>
                                    <div className="grid grid-cols-4 gap-2">
                                    <div className="relative col-span-4">
                                         <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                         <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-gray-700"
                                         />
                                    </div>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    {selectedProduct.price && totalHours > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                                <FaPoundSign className="text-purple-600" />
                                <h4 className="font-bold text-gray-800">Price Estimate</h4>
                            </div>
                            <div className={`grid ${quantity > 1 ? 'grid-cols-4' : 'grid-cols-3'} gap-3 text-center`}>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <div className="text-2xl font-bold text-purple-700">{totalHours}</div>
                                    <div className="text-xs text-gray-500 font-medium">Hours</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <div className="text-2xl font-bold text-gray-700">×</div>
                                    <div className="text-xs text-gray-500 font-medium">£{selectedProduct.price.toFixed(2)}/hr</div>
                                </div>
                                {quantity > 1 && (
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-gray-700">× {quantity}</div>
                                        <div className="text-xs text-gray-500 font-medium">Qty</div>
                                    </div>
                                )}
                                <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-purple-300">
                                    <div className="text-2xl font-bold text-green-600">£{totalPrice.toFixed(2)}</div>
                                    <div className="text-xs text-gray-500 font-medium">Total</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex justify-end">
                        <button
                            onClick={handleDetailsProceed}
                            disabled={!date || !time || !endDate || !endTime}
                            className={`px-10 py-4 rounded-full font-bold flex items-center gap-3 text-lg transition-all ${
                                date && time && endDate && endTime
                                ? "bg-purple-600 text-white hover:bg-purple-700 shadow-xl hover:shadow-purple-200 transform hover:-translate-y-1"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Continue to Details <FaArrowRight />
                        </button>
                    </div>

                </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && selectedProduct && (
                <div className="animate-fadeIn max-w-2xl mx-auto">
                    <button 
                         onClick={() => setStep(2)} 
                         className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-6 transition-colors font-medium text-sm"
                     >
                         <FaArrowLeft /> Back to Dates & Time
                     </button>
                     
                     <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-8 flex items-start gap-4">
                        {/* Summary Box Content */}
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            {selectedProduct.image ? (
                                <Image src={selectedProduct.image} alt="" width={60} height={60} className="object-cover rounded-md" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center"><FaCalendarAlt className="text-gray-300"/></div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{selectedProduct.title}</h3>
                             <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-500" /> 
                                {dates.find(d => d.iso === date)?.display} {endDate && ` - ${new Date(endDate).toLocaleDateString('en-GB')}`}
                            </p>
                             <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                <FaClock className="text-purple-500" /> 
                                {time} — {endTime}
                            </p>
                             <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                <strong>Quantity:</strong> {quantity}
                            </p>
                             {selectedProduct.price && totalHours > 0 && (
                                <div className="mt-2 pt-2 border-t border-purple-200">
                                    <p className="text-sm font-bold text-green-700 flex items-center gap-2">
                                        <FaPoundSign className="text-green-600" />
                                        {totalHours} hrs × £{selectedProduct.price.toFixed(2)}/hr{quantity > 1 ? ` × ${quantity} qty` : ''} = <span className="text-lg">£{totalPrice.toFixed(2)}</span>
                                    </p>
                                </div>
                             )}
                        </div>
                     </div>
                     <form onSubmit={handleSubmit} className="space-y-6">

                         
                        {/* Quantity Input - CONDITIONAL RENDER */}
                        {!selectedProduct.quantity ? (
                            <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                                 <div className="flex items-center gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                                    >-</button>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        className="w-20 text-center px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                        value={quantity}
                                        onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                                    >+</button>
                                 </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 text-sm text-gray-600">
                                <FaBoxOpen className="text-purple-600" />
                                <span>This service has a fixed quantity of <strong>{quantity}</strong>.</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                    value={userDetails.customerName}
                                    onChange={e => setUserDetails({...userDetails, customerName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={userDetails.customerEmail}
                                    onChange={e => setUserDetails({...userDetails, customerEmail: e.target.value})}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                placeholder="07123 456789"
                                value={userDetails.customerPhone}
                                onChange={e => setUserDetails({...userDetails, customerPhone: e.target.value})}
                            />
                        </div>

                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-purple-600" /> Location Details
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="House number and street name"
                                        value={userDetails.address}
                                        onChange={e => setUserDetails({...userDetails, address: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Apartment, suite, unit etc."
                                        value={userDetails.address2}
                                        onChange={e => setUserDetails({...userDetails, address2: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                            placeholder="London"
                                            value={userDetails.city}
                                            onChange={e => setUserDetails({...userDetails, city: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Postcode / ZIP *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                            placeholder="SW1A 1AA"
                                            value={userDetails.zip}
                                            onChange={e => setUserDetails({...userDetails, zip: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-300 flex items-center justify-center gap-2 transform active:scale-95"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    <>Confirm Booking <FaCheck /></>
                                )}
                            </button>
                        </div>
                     </form>
                </div>
            )}
        </div>
    </div>
  );
}
