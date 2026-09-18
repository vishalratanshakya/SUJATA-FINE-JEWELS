"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setUploading(false);
        return;
      }

      const img = document.createElement("img");
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 800;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        let compressed = dataUrl;
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          compressed = canvas.toDataURL("image/jpeg", 0.85);
        }
        
        // Upload to Cloudinary via /api/upload
        let finalUrl = compressed;
        try {
          const body = new FormData();
          body.append("dataUrl", compressed);
          const res = await fetch("/api/upload", {
            method: "POST",
            body,
          });
          const data = await res.json();
          if (data.success && data.url) {
            finalUrl = data.url;
          } else {
            console.warn("Cloudinary API returned an error (using optimized image data URL):", data.error);
          }
        } catch (err) {
          console.warn("Cloudinary upload network error (using optimized image data URL):", err);
        } finally {
          onChange(finalUrl);
          setUploading(false);
        }
      };
      img.onerror = () => {
        alert("Could not process image file.");
        setUploading(false);
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      {value ? (
        <div className="relative w-full h-44 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 group">
          {value.startsWith("data:") || value.startsWith("http") || value.startsWith("/") ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Uploaded Image" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Invalid Image URL</div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={triggerFileInput}
              className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors shadow"
            >
              <Upload size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2.5 ${
            dragActive ? "border-amber-500 bg-amber-50/50" : "border-gray-200 hover:border-charcoal bg-gray-50/50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-md border border-amber-100 flex items-center justify-center text-amber-700 aspect-square">
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-amber-700 shrink-0 aspect-square" style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <ImageIcon size={22} className="text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {uploading ? "Uploading & Processing..." : <>Drag & drop image here, or <span className="text-amber-800 underline">browse file</span></>}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPG, WEBP up to 10MB</p>
          </div>
        </div>
      )}

      {/* URL Fallback */}
      <div className="pt-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL (https://...)"
          className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-charcoal text-gray-600"
        />
      </div>
    </div>
  );
}
