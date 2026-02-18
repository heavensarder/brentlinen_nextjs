"use client";

import { useState, useEffect } from "react";
import { getQueries, markQueryAsRead, deleteQuery } from "@/app/actions/queries";
import { FaEnvelope, FaTrash, FaCheckCircle, FaSpinner, FaPhone, FaRegEnvelope } from "react-icons/fa";

interface Query {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadQueries() {
    setLoading(true);
    const res = await getQueries();
    if (res.success && res.data) {
      setQueries(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadQueries();
  }, []);

  const handleMarkRead = async (id: string) => {
    await markQueryAsRead(id);
    loadQueries();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this query?")) {
      await deleteQuery(id);
      loadQueries();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Customer Queries</h1>
        <button onClick={loadQueries} className="text-sm text-purple-600 hover:underline">Refresh</button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-purple-600" />
        </div>
      ) : queries.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 p-16 text-center text-gray-500 border border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <FaRegEnvelope className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Queries Found</h3>
          <p className="max-w-md mx-auto">Messages from the contact form or quote request pages will appear here. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {queries.map((q) => (
            <div 
              key={q.id} 
              className={`bg-white rounded-2xl shadow-sm border p-8 transition-all hover:shadow-md ${
                q.status === "unread" 
                    ? "border-purple-200 shadow-purple-900/5 ring-1 ring-purple-100" 
                    : "border-gray-100 opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
                        {q.name}
                        {q.status === "unread" && (
                            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></span>
                                New
                            </span>
                        )}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500 mt-2">
                        <a href={`mailto:${q.email}`} className="flex items-center gap-2 hover:text-purple-600 transition-colors font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                            <FaEnvelope className="text-gray-400" /> {q.email}
                        </a>
                        {q.phone && (
                            <a href={`tel:${q.phone}`} className="flex items-center gap-2 hover:text-purple-600 transition-colors font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                <FaPhone className="text-gray-400" /> {q.phone}
                            </a>
                        )}
                        <span className="text-gray-400 flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            {new Date(q.createdAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(q.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    {q.status === "unread" && (
                        <button 
                            onClick={() => handleMarkRead(q.id)}
                            className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors border border-transparent hover:border-green-100"
                            title="Mark as Read"
                        >
                            <FaCheckCircle className="text-lg" />
                        </button>
                    )}
                    <button 
                        onClick={() => handleDelete(q.id)}
                        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                        title="Delete"
                    >
                        <FaTrash className="text-lg" />
                    </button>
                </div>
              </div>
              <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">
                    {q.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
