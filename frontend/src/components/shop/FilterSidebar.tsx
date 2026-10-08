"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FilterSidebar({
  selectedCategories = [],
  onCategoryChange = (c: string) => {},
  selectedMetals = [],
  onMetalChange = (m: string) => {},
  selectedPriceRange = "",
  onPriceRangeChange = (p: string) => {},
  selectedCollection = "",
  onCollectionChange = (col: string) => {},
  availableCategories = [],
  availableMetals = [],
  availableCollections = [],
}: {
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedMetals?: string[];
  onMetalChange?: (metal: string) => void;
  selectedPriceRange?: string;
  onPriceRangeChange?: (price: string) => void;
  selectedCollection?: string;
  onCollectionChange?: (collection: string) => void;
  availableCategories?: { name: string; count: number }[];
  availableMetals?: { name: string; count: number }[];
  availableCollections?: { name: string; count: number }[];
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    metal: true,
    price: true,
    collection: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = availableCategories.length > 0 ? availableCategories : [
    { name: "Rings", count: 32 },
    { name: "Necklaces", count: 28 },
    { name: "Earrings", count: 24 },
    { name: "Bracelets", count: 18 },
    { name: "Bangles", count: 12 },
    { name: "Pendants", count: 16 },
  ];

  const metals = availableMetals.length > 0 ? availableMetals : [
    { name: "Yellow Gold", count: 42 },
    { name: "Rose Gold", count: 28 },
    { name: "White Gold", count: 36 },
    { name: "Platinum", count: 8 },
  ];

  const priceRanges = [
    { label: "Under ₹25,000", id: "under_25k", count: 14 },
    { label: "₹25,000 - ₹50,000", id: "25k_50k", count: 22 },
    { label: "₹50,000 - ₹1,00,000", id: "50k_100k", count: 18 },
    { label: "₹1,00,000 - ₹2,00,000", id: "100k_200k", count: 12 },
    { label: "Above ₹2,00,000", id: "above_200k", count: 6 },
  ];

  const collections = availableCollections.length > 0 ? availableCollections : [
    { name: "Celestial", count: 15 },
    { name: "Heritage", count: 20 },
    { name: "Timeless", count: 18 },
    { name: "Modern Muse", count: 12 },
  ];

  return (
    <div className="w-full lg:w-64 flex-shrink-0 flex flex-col space-y-6 text-[#2C2825]">
      
      {/* Category Filter */}
      <div className="border-b border-[#EAE4D9] pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#2C2825]">CATEGORY</span>
          {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.category && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => onCategoryChange("")}
              className={`flex items-center space-x-2 p-2 rounded-xl border transition-all ${
                selectedCategories.length === 0
                  ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm"
                  : "border-[#EAE4D9] bg-white text-[#6B6357] hover:border-indigo-200 hover:bg-indigo-50/50"
              }`}
            >
              <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${selectedCategories.length === 0 ? "text-indigo-600" : "text-gray-400"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
              </div>
              <span className={`text-xs font-medium ${selectedCategories.length === 0 ? "text-indigo-700" : "text-gray-600"}`}>All</span>
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.name);
              
              // Map category to placeholder image
              let imgSrc = "/images/products/rings/ring_placeholder.jpg";
              const cName = cat.name.toLowerCase();
              if (cName.includes("necklace")) imgSrc = "/images/products/necklaces/necklace_placeholder.jpg";
              else if (cName.includes("earring")) imgSrc = "/images/products/earrings/earrings_placeholder.jpg";
              else if (cName.includes("bracelet")) imgSrc = "/images/products/bracelets/bracelet_placeholder.jpg";
              else if (cName.includes("bangle")) imgSrc = "/images/products/bangles/bangle_placeholder.jpg";
              else if (cName.includes("pendant")) imgSrc = "/images/products/pendants/pendant_placeholder.jpg";
              else if (cName.includes("nose")) imgSrc = "https://images.unsplash.com/photo-1599643478514-4a0013f9f43c?w=100&q=80"; // fallback

              return (
                <button
                  key={cat.name}
                  onClick={() => onCategoryChange(cat.name)}
                  className={`flex items-center space-x-2 p-2 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-charcoal bg-gray-50 shadow-sm"
                      : "border-[#EAE4D9] bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shrink-0 shadow-xs border border-white">
                    <img src={imgSrc} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-xs font-medium truncate ${isSelected ? "text-charcoal" : "text-gray-600"}`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-[#EAE4D9] pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#2C2825]">PRICE RANGE</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.price && (
          <div className="mt-4 space-y-2.5">
            {priceRanges.map((pr) => (
              <label key={pr.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedPriceRange === pr.id}
                    onChange={() => onPriceRangeChange(selectedPriceRange === pr.id ? "" : pr.id)}
                    className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                  />
                  <span className="text-xs font-medium text-[#6B6357] group-hover:text-[#2C2825] transition-colors">
                    {pr.label}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono">({pr.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Collection Filter */}
      <div className="border-b border-[#EAE4D9] pb-6">
        <button
          onClick={() => toggleSection("collection")}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#2C2825]">COLLECTION</span>
          {openSections.collection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.collection && (
          <div className="mt-4 space-y-2.5">
            {collections.map((col) => (
              <label key={col.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCollection === col.name}
                    onChange={() => onCollectionChange(selectedCollection === col.name ? "" : col.name)}
                    className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                  />
                  <span className="text-xs font-medium text-[#6B6357] group-hover:text-[#2C2825] transition-colors">
                    {col.name}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono">({col.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

