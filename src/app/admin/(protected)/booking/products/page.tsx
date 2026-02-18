"use client";

import { useState, useEffect } from "react";
import { 
  getBookingProducts, 
  createBookingProduct, 
  updateBookingProduct, 
  deleteBookingProduct,
  getBookingCategories
} from "@/app/actions/booking";
import ImageUpload from "@/components/admin/ImageUpload";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaBoxOpen, FaLayerGroup } from "react-icons/fa";

interface Category {
  id: string;
  title: string;
  imageRatio: string;
}

export default function BookingProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    isActive: true,
    categoryId: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const pRes = await getBookingProducts();
    const cRes = await getBookingCategories();
    
    if (pRes.success) setProducts(pRes.data || []);
    if (cRes.success) setCategories(cRes.data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure categoryId is null if empty string
    const dataToSubmit = {
        ...formData,
        categoryId: formData.categoryId || undefined,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined
    };

    if (isEditing && currentId) {
      await updateBookingProduct(currentId, dataToSubmit);
    } else {
      await createBookingProduct(dataToSubmit);
    }
    
    resetForm();
    fetchData();
  };
  
  const handleEdit = (product: any) => {
    setFormData({
      title: product.title,
      description: product.description || "",
      price: product.price?.toString() || "",
      quantity: product.quantity?.toString() || "",
      image: product.image || "",
      isActive: product.isActive,
      categoryId: product.categoryId || ""
    });
    setCurrentId(product.id);
    setIsEditing(true);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteBookingProduct(id);
      fetchData();
    }
  };

  const resetForm = () => {
    setFormData({
        title: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
        isActive: true,
        categoryId: ""
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Helper to get helper text for image ratio
  const getRatioHelper = () => {
    if (!formData.categoryId) return "Select a category to see recommended ratio.";
    const cat = categories.find(c => c.id === formData.categoryId);
    if (!cat) return "";
    switch(cat.imageRatio) {
        case "portrait": return "Recommended Ratio: Portrait (3:4)";
        case "landscape": return "Recommended Ratio: Landscape (4:3)";
        case "square": return "Recommended Ratio: Square (1:1)";
        default: return "";
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaBoxOpen className="text-purple-600" /> Product Management
        </h1>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 flex items-center gap-3">
            {isEditing ? <FaEdit className="text-purple-600" /> : <FaPlus className="text-purple-600" />}
            {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                        placeholder="e.g. Chef Uniform Fitting"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Category</label>
                    <div className="relative">
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium appearance-none cursor-pointer"
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.title} ({cat.imageRatio})</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
                
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all h-32 resize-none font-medium leading-relaxed"
                        placeholder="Brief details about this service..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Price (Optional)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">£</span>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="w-full pl-8 pr-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Fixed Quantity (Opt)</label>
                        <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                            placeholder="e.g. 1"
                        />
                    </div>
                </div>
                
                    <div className="flex items-center gap-3 pt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <input 
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-900 cursor-pointer select-none">Available for booking</label>
                    </div>
            </div>
            
            <div className="space-y-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Product Image</label>
                <div className="text-xs text-purple-600 mb-3 font-bold bg-purple-50 inline-block px-3 py-1 rounded-full">{getRatioHelper()}</div>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-colors">
                    <ImageUpload 
                        value={formData.image} 
                        onChange={(url) => setFormData({...formData, image: url})} 
                    />
                </div>
                
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                        {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            Cancel
                        </button>
                        )}
                        <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                        {isEditing ? <FaCheck /> : <FaPlus />} 
                        {isEditing ? "Update Product" : "Create Product"}
                        </button>
                </div>
            </div>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {loading ? (
                         <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                        </tr>
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                No products found. Add one above!
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <FaBoxOpen size={24} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{product.title}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                    {product.price && (
                                        <div className="text-sm font-semibold text-purple-600 mt-1">£{product.price.toFixed(2)}/hr</div>
                                    )}
                                    {product.quantity && (
                                        <div className="text-xs text-gray-500 mt-1">Fixed Qty: {product.quantity}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {product.category ? (
                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
                                            {product.category.title}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">Uncategorized</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        product.isActive 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-gray-100 text-gray-800"
                                    }`}>
                                        {product.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-full"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-full"
                                        title="Delete"
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
