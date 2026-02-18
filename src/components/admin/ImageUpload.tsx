"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaLink, FaTrash } from "react-icons/fa";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Dynamic import to avoid server-action issues in client component if not handled correctly
      const { uploadImage } = await import("@/app/actions/upload");
      const res = await uploadImage(formData);
      
      if (res.success && res.url) {
        onChange(res.url);
        setPreview(res.url);
      } else {
        alert("Upload failed: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreview(url);
  };

  const handleRemove = () => {
    onChange("");
    setPreview("");
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`pb-2 text-sm font-medium transition-colors ${
            activeTab === "upload"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`pb-2 text-sm font-medium transition-colors ${
            activeTab === "url"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Image URL
        </button>
      </div>

      {/* Inputs */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        {activeTab === "upload" ? (
          <div className="space-y-2">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange} 
                accept="image/*"
                disabled={disabled || isUploading}
              />
            </label>
            {isUploading && <p className="text-sm text-purple-600 text-center animate-pulse">Uploading...</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaLink className="text-gray-400" />
            <input
              type="text"
              value={value}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-transparent border-none focus:ring-0 text-sm"
              disabled={disabled}
            />
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-40 h-40 border rounded-lg overflow-hidden group">
            <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
            />
            <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <FaTrash size={12} />
            </button>
        </div>
      )}
    </div>
  );
}
