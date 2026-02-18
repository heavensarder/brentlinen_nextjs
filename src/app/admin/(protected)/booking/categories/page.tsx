"use client";

import { useState, useEffect } from "react";
import { createBookingCategory, deleteBookingCategory, getBookingCategories } from "@/app/actions/booking";
import { FaPlus, FaTrash, FaSpinner, FaLayerGroup } from "react-icons/fa";

interface Category {
  id: string;
  title: string;
  imageRatio: string;
}

export default function BookingCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ title: "", imageRatio: "square" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const res = await getBookingCategories();
    if (res.success && res.data) {
      setCategories(res.data);
    }
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    if (e) e.preventDefault();
    if (!newCategory.title) return;

    setIsSubmitting(true);
    const res = await createBookingCategory(newCategory);
    if (res.success) {
      setNewCategory({ title: "", imageRatio: "square" });
      loadCategories();
    } else {
      alert("Failed to create category");
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure? This might affect products linked to this category.")) return;
    
    const res = await deleteBookingCategory(id);
    if (res.success) {
      loadCategories();
    } else {
      alert("Failed to delete category");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaLayerGroup className="text-purple-600" /> Category Management
        </h1>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white text-sm">
                    <FaPlus />
                </div>
                Create New Category
            </h2>
            <p className="text-gray-500 mt-2 ml-10">Define a new product category and its visual presentation style.</p>
        </div>
        
        <div className="p-8">
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-6 group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Category Title</label>
                <div className="relative">
                    <input
                    type="text"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    placeholder="e.g. Table Linen"
                    required
                    />
                </div>
            </div>

            <div className="md:col-span-3 group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Aspect Ratio</label>
                <div className="relative">
                    <select
                        value={newCategory.imageRatio}
                        onChange={(e) => setNewCategory({ ...newCategory, imageRatio: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none appearance-none cursor-pointer"
                    >
                        <option value="square">Square (1:1)</option>
                        <option value="portrait">Portrait (3:4)</option>
                        <option value="landscape">Landscape (4:3)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
            </div>

            <div className="md:col-span-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[58px] bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPlus />} 
                    <span>Add Category</span>
                </button>
            </div>
            </form>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Image Ratio</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-8 py-12 text-center text-gray-500">
                    <FaSpinner className="inline-block animate-spin text-2xl text-purple-600 mb-3" />
                    <p className="font-medium">Loading categories...</p>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    No categories found. Create one above!
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${category.imageRatio === 'portrait' ? 'bg-blue-100 text-blue-800' : 
                          category.imageRatio === 'landscape' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {category.imageRatio}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900 transition-colors p-2 hover:bg-red-50 rounded-full"
                        title="Delete Category"
                      >
                        <FaTrash />
                      </button>
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
