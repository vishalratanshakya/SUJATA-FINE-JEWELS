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
}: {
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedMetals?: string[];
  onMetalChange?: (metal: string) => void;
  selectedPriceRange?: string;
  onPriceRangeChange?: (price: string) => void;
  selectedCollection?: string;
  onCollectionChange?: (collection: string) => void;
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

  const categories = [
    { name: "Rings", count: 32 },
    { name: "Necklaces", count: 28 },
    { name: "Earrings", count: 24 },
    { name: "Bracelets", count: 18 },
    { name: "Bangles", count: 12 },
    { name: "Pendants", count: 16 },
  ];

  const metals = [
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

  const collections = [
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
          <div className="mt-4 space-y-2.5">
            {categories.map((cat) => (
              <label key={cat.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => onCategoryChange(cat.name)}
                    className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                  />
                  <span className="text-xs font-medium text-[#6B6357] group-hover:text-[#2C2825] transition-colors">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Metal Filter */}
      <div className="border-b border-[#EAE4D9] pb-6">
        <button
          onClick={() => toggleSection("metal")}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#2C2825]">METAL</span>
          {openSections.metal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.metal && (
          <div className="mt-4 space-y-2.5">
            {metals.map((m) => (
              <label key={m.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedMetals.includes(m.name)}
                    onChange={() => onMetalChange(m.name)}
                    className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                  />
                  <span className="text-xs font-medium text-[#6B6357] group-hover:text-[#2C2825] transition-colors">
                    {m.name}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono">({m.count})</span>
              </label>
            ))}
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

