"use client";

import { useState } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/mockData";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleMetalChange = (metal: string) => {
    setSelectedMetals(prev => 
      prev.includes(metal) ? prev.filter(m => m !== metal) : [...prev, metal]
    );
  };

  // Currently we use mock data duplicated for a grid
  const allProducts = [...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS];
  
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(c => product.category.toLowerCase().includes(c.toLowerCase()) || product.name.toLowerCase().includes(c.toLowerCase()));
    const metalMatch = selectedMetals.length === 0 || selectedMetals.some(m => product.metal.toLowerCase().includes(m.toLowerCase()));
    return categoryMatch && metalMatch;
  });
  return (
    <div className="bg-ivory pt-24 pb-20 min-h-screen">
      
      {/* Page Header */}
      <div className="text-center py-12 px-4 border-b border-charcoal/5 mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">SHOP ALL</h1>
        <p className="text-sm text-charcoal/60 max-w-lg mx-auto">
          Explore our complete collection of exquisite, handcrafted fine jewellery.
        </p>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar 
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedMetals={selectedMetals}
              onMetalChange={handleMetalChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-charcoal/5">
              <span className="text-xs tracking-widest text-charcoal/50 uppercase">Showing 24 Results</span>
              <div className="flex items-center space-x-4">
                <button className="lg:hidden text-xs tracking-widest text-charcoal uppercase underline underline-offset-4">Filters</button>
                <select className="bg-transparent text-xs tracking-widest uppercase text-charcoal border-none focus:ring-0 outline-none cursor-pointer">
                  <option>Sort By: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, i) => (
                <ProductCard key={`${product.id}-${i}`} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 text-charcoal/60">
                  No products found matching your filters.
                </div>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-16 space-x-2">
              <button className="w-10 h-10 border border-charcoal bg-charcoal text-white flex items-center justify-center text-sm">1</button>
              <button className="w-10 h-10 border border-charcoal/20 hover:border-charcoal flex items-center justify-center text-sm text-charcoal transition-colors">2</button>
              <button className="w-10 h-10 border border-charcoal/20 hover:border-charcoal flex items-center justify-center text-sm text-charcoal transition-colors">3</button>
              <span className="flex items-end text-charcoal/50">...</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
