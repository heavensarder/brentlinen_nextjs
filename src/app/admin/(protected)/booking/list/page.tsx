"use client";

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus } from "@/app/actions/booking";
import { FaCalendarAlt, FaSpinner } from "react-icons/fa";

export default function BookingList() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const bRes = await getBookings();
    if (bRes.success) setBookings(bRes.data || []);
    setLoading(false);
  };
  
  const handleStatusUpdate = async (id: string, status: string) => {
    await updateBookingStatus(id, status);
    fetchData();
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

    const calculateDuration = (booking: any) => {
        // Ensure we handle both Date objects and strings
        const dateStr = new Date(booking.date).toISOString().split('T')[0];
        const start = new Date(`${dateStr}T${booking.time}`);
        
        let end;
        if (booking.endDate && booking.endTime) {
            const endDateStr = new Date(booking.endDate).toISOString().split('T')[0];
            end = new Date(`${endDateStr}T${booking.endTime}`);
        } else {
             // Default to 1 hour if no end time
            end = new Date(start.getTime() + 60 * 60 * 1000); 
        }
        
        const diffMs = end.getTime() - start.getTime();
        const diffHrs = diffMs / (1000 * 60 * 60);
        return diffHrs > 0 ? diffHrs.toFixed(1) : "0";
    };

    return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaCalendarAlt className="text-purple-600" /> Bookings List
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {loading ? (
                         <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                <FaSpinner className="inline-block animate-spin text-2xl text-purple-600 mb-2" />
                            </td>
                        </tr>
                    ) : bookings.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                No bookings received yet.
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {booking.product?.image ? (
                                            <img src={booking.product.image} alt={booking.product.title} className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                        )}
                                        <div className="text-sm font-bold text-gray-900">{booking.product?.title || "Unknown Product"}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Start</div>
                                        <div className="text-sm text-gray-900">
                                            {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} <span className="font-bold">{formatTime(booking.time)}</span>
                                        </div>
                                        
                                        {(booking.endDate || booking.endTime) && (
                                            <>
                                                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mt-1">End</div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} <span className="font-bold">{formatTime(booking.endTime || "")}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                        {calculateDuration(booking)} Hrs
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{booking.customerName}</div>
                                    <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                                    <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold">Qty:</span> {booking.quantity || 1}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{booking.city}, {booking.zip}</div>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                        booking.status === 'confirmed' ? "bg-green-100 text-green-800" :
                                        booking.status === 'cancelled' ? "bg-red-100 text-red-800" :
                                        "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {booking.status === 'pending' && (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    {booking.status !== 'pending' && (
                                        <div className="text-xs text-gray-400 italic">
                                            {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
