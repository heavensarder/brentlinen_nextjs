"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/queries";
import { getBookingStats, getBookings } from "@/app/actions/booking";
import Link from "next/link";
import { FaEnvelope, FaCalendarAlt, FaClock, FaCheck, FaArrowRight } from "react-icons/fa";

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

interface QueryStats {
  totalQueries: number;
  unreadQueries: number;
}

export default function AdminDashboard() {
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);
  const [queryStats, setQueryStats] = useState<QueryStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [qRes, bStatsRes, bListRes] = await Promise.all([
        getDashboardStats(),
        getBookingStats(),
        getBookings()
      ]);

      if (qRes.success && qRes.stats) {
        setQueryStats(qRes.stats);
      }
      
      if (bStatsRes.success && bStatsRes.stats) {
        setBookingStats(bStatsRes.stats);
      }

      if (bListRes.success && bListRes.data) {
        // Take top 5 recent bookings
        setRecentBookings(bListRes.data.slice(0, 5));
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back to your control panel. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{bookingStats?.total || 0}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <FaCalendarAlt className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{bookingStats?.pending || 0}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
            <FaClock className="w-6 h-6" />
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Confirmed</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{bookingStats?.confirmed || 0}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <FaCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Total Queries (Requested Field) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Queries</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{queryStats?.totalQueries || 0}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FaEnvelope className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/booking/list" className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 group">
            View All <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {recentBookings.length === 0 ? (
           <div className="p-8 text-center text-gray-500">
             No bookings yet.
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {booking.product?.image ? (
                                        <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                                            <img src={booking.product.image} alt="" className="object-cover w-full h-full" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">IMG</div>
                                    )}
                                    <span className="text-sm font-medium text-gray-900">{booking.product?.title || "Unknown"}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {new Date(booking.date).toLocaleDateString('en-GB')}
                                {booking.endDate && (
                                    <> - {new Date(booking.endDate).toLocaleDateString('en-GB')}</>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {booking.customerName}
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
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
