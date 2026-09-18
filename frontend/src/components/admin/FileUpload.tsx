"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileCheck, Loader2 } from "lucide-react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  placeholder?: string;
}

export function FileUpload({
  value,
  onChange,
  label,
  accept = "*/*",
  placeholder = "Or paste asset URL (https://...)",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    setUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        const dataUrl = e.target.result as string;
        onChange(dataUrl);

        try {
          const body = new FormData();
          body.append("dataUrl", dataUrl);
          const res = await fetch("/api/upload", {
            method: "POST",
            body,
          });
          const data = await res.json();
          if (data.success && data.url) {
            onChange(data.url);
          }
        } catch {
          // Fallback
        }
      }
      setUploading(false);
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
    <div className="space-y-2 select-none">
      {label && <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      {value ? (
        <div className="relative w-full p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between group transition-all">
          <div className="flex items-center space-x-3 truncate pr-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileCheck size={18} />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-emerald-900 truncate">Asset File Attached</p>
              <p className="text-[10px] text-emerald-700 truncate font-mono">{value.substring(0, 45)}...</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={triggerFileInput}
              className="p-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-xs font-medium flex items-center space-x-1"
            >
              <Upload size={14} />
              <span className="hidden sm:inline">Change</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              aria-label="Remove asset"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
            dragActive ? "border-amber-500 bg-amber-50/50" : "border-gray-200 hover:border-charcoal bg-gray-50/50"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center text-gray-500">
            {uploading ? (
              <Loader2 size={20} className="animate-spin text-amber-700 shrink-0" />
            ) : (
              <Upload size={18} className="text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {uploading ? (
                "Processing Asset File..."
              ) : (
                <>
                  Click to <span className="text-amber-800 underline">Upload File</span> or drag & drop
                </>
              )}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">Supports file format: {accept}</p>
          </div>
        </div>
      )}

      {/* URL Input Fallback */}
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-charcoal text-gray-600 bg-white"
        />
      </div>
    </div>
  );
}
