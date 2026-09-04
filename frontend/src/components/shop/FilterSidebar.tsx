"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FilterSidebar({
  selectedCategories = [],
  onCategoryChange = (c: string) => {},
  selectedMetals = [],
  onMetalChange = (m: string) => {},
}: {
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedMetals?: string[];
  onMetalChange?: (metal: string) => void;
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    metal: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full lg:w-64 flex-shrink-0 flex flex-col space-y-6">
      
      {/* Category Filter */}
      <div className="border-b border-charcoal/10 pb-6">
        <button 
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-charcoal">Category</span>
          {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.category && (
          <div className="mt-4 space-y-3">
            {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants'].map((item) => (
              <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(item)}
                  onChange={() => onCategoryChange(item)}
                  className="form-checkbox text-champagne border-charcoal/20 focus:ring-champagne rounded-sm" 
                />
                <span className="text-sm text-charcoal/70 group-hover:text-champagne transition-colors">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Metal Filter */}
      <div className="border-b border-charcoal/10 pb-6">
        <button 
          onClick={() => toggleSection('metal')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-charcoal">Metal</span>
          {openSections.metal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.metal && (
          <div className="mt-4 space-y-3">
            {['Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum'].map((item) => (
              <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedMetals.includes(item)}
                  onChange={() => onMetalChange(item)}
                  className="form-checkbox text-champagne border-charcoal/20 focus:ring-champagne rounded-sm" 
                />
                <span className="text-sm text-charcoal/70 group-hover:text-champagne transition-colors">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-charcoal/10 pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-charcoal">Price</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.price && (
          <div className="mt-4 space-y-3">
            {['Under ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000', 'Over ₹2,00,000'].map((item) => (
              <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox text-champagne border-charcoal/20 focus:ring-champagne rounded-sm" />
                <span className="text-sm text-charcoal/70 group-hover:text-champagne transition-colors">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
