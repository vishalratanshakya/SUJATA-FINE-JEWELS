"use client";

import { useState } from "react";
import { X, Play } from "lucide-react";

export function VideoModal({ videoUrl, poster }: { videoUrl: string, poster?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 border border-charcoal/20 hover:border-charcoal px-6 py-3 transition-colors text-xs tracking-widest uppercase text-charcoal bg-white"
      >
        <Play size={14} />
        <span>See It Worn</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>
      
      <div className="w-full max-w-5xl aspect-video bg-black relative rounded overflow-hidden shadow-2xl border border-white/10">
        <video 
          src={videoUrl}
          poster={poster}
          controls
          autoPlay
          className="w-full h-full object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
