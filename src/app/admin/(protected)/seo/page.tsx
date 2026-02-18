"use client";

import { useState, useEffect } from "react";
import { getSeoSettings, updateSeoSettings, getAllSeoPages } from "@/app/actions/seo";
import { FaSpinner, FaSave, FaExternalLinkAlt, FaCode, FaGlobe, FaTwitter, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  schemaMarkup: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
}

export default function SeoManager() {
  const [pages, setPages] = useState<{ pageRoute: string }[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("/");
  const [formData, setFormData] = useState<SeoData>({
    title: "",
    description: "",
    keywords: "",
    schemaMarkup: "",
    canonicalUrl: "",
    robots: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced" | "social" | "schema">("basic");

  useEffect(() => {
    async function loadPages() {
      const res = await getAllSeoPages();
      if (res.success && res.data) {
        setPages(res.data);
      }
    }
    loadPages();
  }, []);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      setMessage(null);
      const res = await getSeoSettings(selectedPage);
      if (res.success && res.data) {
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          keywords: res.data.keywords || "",
          schemaMarkup: res.data.schemaMarkup || "",
          canonicalUrl: res.data.canonicalUrl || "",
          robots: res.data.robots || "index, follow",
          ogTitle: res.data.ogTitle || "",
          ogDescription: res.data.ogDescription || "",
          ogImage: res.data.ogImage || "",
          twitterCard: res.data.twitterCard || "summary_large_image",
        });
      } else {
        // Reset form if no data found
        setFormData({
            title: "", description: "", keywords: "", schemaMarkup: "",
            canonicalUrl: "", robots: "index, follow", ogTitle: "", 
            ogDescription: "", ogImage: "", twitterCard: "summary_large_image"
        });
      }
      setLoading(false);
    }
    loadSettings();
  }, [selectedPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateSeoSettings(selectedPage, formData);
    if (res.success) {
      setMessage({ type: "success", text: "SEO settings saved successfully!" });
    } else {
      setMessage({ type: "error", text: "Failed to save settings." });
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Advanced SEO Manager</h1>
        <Link 
            href={selectedPage} 
            target="_blank"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
        >
            View Live Page <FaExternalLinkAlt className="text-sm" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Page Selection */}
        <div className="lg:col-span-1 bg-white shadow rounded-lg p-4 h-fit">
          <h2 className="font-semibold text-gray-700 mb-4">Select Page</h2>
          <ul className="space-y-2">
            {pages.map((p) => (
              <li key={p.pageRoute}>
                <button
                  onClick={() => setSelectedPage(p.pageRoute)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedPage === p.pageRoute
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {p.pageRoute === "/" ? "Home" : p.pageRoute}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content: Form */}
        <div className="lg:col-span-3 bg-white shadow-xl shadow-purple-900/5 rounded-2xl p-8 border border-gray-100">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-purple-600" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto pb-1">
                    {[
                        { id: "basic", label: "Basic SEO", icon: FaGlobe },
                        { id: "advanced", label: "Advanced", icon: FaCode },
                        { id: "social", label: "Social Media", icon: FaFacebook },
                        { id: "schema", label: "Schema Markup", icon: FaCode },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "border-purple-600 text-purple-600"
                                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                            }`}
                        >
                            <tab.icon /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* BASIC SEO TAB */}
                {activeTab === "basic" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Page Title</label>
                            <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                            placeholder="e.g., Brent Linen Hire | Best in London"
                            />
                            <p className="mt-2 text-xs text-gray-500 ml-1">Recommended length: 50-60 characters.</p>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Meta Description</label>
                            <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium leading-relaxed"
                            placeholder="Brief summary of the page content..."
                            />
                             <p className="mt-2 text-xs text-gray-500 ml-1">Recommended length: 150-160 characters.</p>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Keywords (Comma separated)</label>
                            <input
                            type="text"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                            placeholder="linen, hotel, restaurant, laundry"
                            />
                        </div>
                    </div>
                )}

                {/* ADVANCED SEO TAB */}
                 {activeTab === "advanced" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Canonical URL</label>
                            <input
                            type="text"
                            name="canonicalUrl"
                            value={formData.canonicalUrl}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                            placeholder="https://brentlinenhire.co.uk/example"
                            />
                            <p className="mt-2 text-xs text-gray-500 ml-1">Leave blank to use default.</p>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Robots Meta Tag</label>
                            <div className="relative">
                                <select
                                    name="robots"
                                    value={formData.robots}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium appearance-none cursor-pointer"
                                >
                                    <option value="index, follow">index, follow (Default)</option>
                                    <option value="noindex, follow">noindex, follow</option>
                                    <option value="index, nofollow">index, nofollow</option>
                                    <option value="noindex, nofollow">noindex, nofollow</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                 )}

                {/* SOCIAL MEDIA TAB */}
                {activeTab === "social" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-4"><FaFacebook /> Open Graph (Facebook / LinkedIn)</h3>
                            <div className="space-y-5">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">OG Title</label>
                                    <input
                                    type="text"
                                    name="ogTitle"
                                    value={formData.ogTitle}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                                    placeholder="Title for social sharing"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">OG Description</label>
                                    <textarea
                                    name="ogDescription"
                                    rows={2}
                                    value={formData.ogDescription}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium leading-relaxed"
                                    placeholder="Description for social sharing"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">OG Image URL</label>
                                    <div className="mt-1">
                                        <ImageUpload
                                            value={formData.ogImage}
                                            onChange={(url) => setFormData({ ...formData, ogImage: url })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100 mt-6">
                             <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-4"><FaTwitter /> Twitter Card</h3>
                             <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Card Type</label>
                                <div className="relative">
                                    <select
                                        name="twitterCard"
                                        value={formData.twitterCard}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium appearance-none cursor-pointer"
                                    >
                                        <option value="summary">Summary</option>
                                        <option value="summary_large_image">Summary Large Image</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCHEMA MARKUP TAB */}
                {activeTab === "schema" && (
                     <div className="space-y-6 animate-fadeIn">
                        <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
                             <h3 className="text-sm font-bold text-yellow-800 flex items-center gap-2 mb-2">JSON-LD Structured Data</h3>
                             <p className="text-xs text-yellow-700 mb-4">Paste your valid JSON-LD code here. This will be injected into the page <code className="bg-yellow-100 px-1 rounded">head</code>.</p>
                             
                             <div className="group">
                                <textarea
                                name="schemaMarkup"
                                rows={15}
                                value={formData.schemaMarkup}
                                onChange={handleChange}
                                className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono text-xs leading-relaxed"
                                placeholder={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brent Linen Hire",
  "url": "https://brentlinenhire.co.uk",
  "logo": "https://brentlinenhire.co.uk/logo.png"
}`}
                                />
                             </div>
                        </div>
                     </div>
                )}


              {message && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    message.type === "success" ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="font-medium">{message.text}</span>
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg shadow-purple-200 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all"
                >
                  {saving ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Saving...
                      </>
                  ) : (
                      <>
                        <FaSave className="mr-2" /> Save Changes
                      </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
