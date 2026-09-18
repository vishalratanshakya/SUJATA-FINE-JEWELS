"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/mockData";
import { SlidersHorizontal, X } from "lucide-react";

interface ProductListingTemplateProps {
  title: string;
  eyebrow?: string;
  description: string;
  bannerImage?: string;
  filterType?: "all" | "new_arrivals" | "best_sellers";
  emptyTitle?: string;
  emptyDescription?: string;
}

import { useStore } from "@/store/useStore";

export function ProductListingTemplate({
  title,
  eyebrow = "THE FINEST. FOR FOREVER.",
  description,
  bannerImage = "/images/products/rings/ring_placeholder.jpg",
  filterType = "all",
  emptyTitle = "No Jewellery Found",
  emptyDescription = "Try adjusting your filters to discover more SUJATA creations.",
}: ProductListingTemplateProps) {
  const storeProducts = useStore((s) => s.products);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleMetalChange = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setSelectedPriceRange("");
    setSelectedCollection("");
  };

  const [productsList, setProductsList] = useState<any[]>(storeProducts);

  // Sync with store products & try backend API
  useEffect(() => {
    if (storeProducts && storeProducts.length > 0) {
      setProductsList(storeProducts);
    }
  }, [storeProducts]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const storeIds = new Set(storeProducts.map((p) => p.id));
          const apiOnlyProducts = data.products.filter((p: any) => !storeIds.has(p.id));
          setProductsList([...storeProducts, ...apiOnlyProducts]);
        }
      } catch (err) {
        console.error("Failed to fetch products from API:", err);
      }
    }
    fetchProducts();
  }, [storeProducts]);

  const allProducts = useMemo(() => {
    return productsList;
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      // 1. Page view filtering
      if (filterType === "new_arrivals" && !product.isNewArrival) {
        return false;
      }
      if (filterType === "best_sellers" && !("isBestseller" in product ? product.isBestseller : (product as any).isBestSeller)) {
        return false;
      }

      // 2. Sidebar filters
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((c) =>
          product.category.toLowerCase().includes(c.toLowerCase())
        );

      const metalMatch =
        selectedMetals.length === 0 ||
        selectedMetals.some((m) =>
          product.metal.toLowerCase().includes(m.toLowerCase())
        );

      let priceMatch = true;
      if (selectedPriceRange === "under_25k") priceMatch = product.price < 25000;
      else if (selectedPriceRange === "25k_50k") priceMatch = product.price >= 25000 && product.price <= 50000;
      else if (selectedPriceRange === "50k_100k") priceMatch = product.price >= 50000 && product.price <= 100000;
      else if (selectedPriceRange === "100k_200k") priceMatch = product.price >= 100000 && product.price <= 200000;
      else if (selectedPriceRange === "above_200k") priceMatch = product.price > 200000;

      return categoryMatch && metalMatch && priceMatch;
    });

    // 3. Sorting
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [allProducts, filterType, selectedCategories, selectedMetals, selectedPriceRange, sortBy]);

  return (
    <div className="bg-[#FAF8F5] pt-[72px] md:pt-[82px] pb-24 min-h-screen">
      
      {/* ── HERO BANNER (REUSABLE ACROSS CATALOGUE VIEWS) ── */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EAE4D9]/60 overflow-hidden relative">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">
          
          {/* Banner Left Content */}
          <div className="lg:col-span-5 space-y-4 max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#B38E5D] uppercase">
              {eyebrow}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2825] font-normal tracking-wide leading-tight">
              {title}
            </h1>
            <div className="w-20 h-[1.5px] bg-[#B38E5D]/50 my-3" />
            <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed max-w-lg">
              {description}
            </p>
            <div className="pt-3">
              <button
                onClick={() => {
                  const el = document.getElementById("shop-grid-start");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 bg-[#B38E5D] hover:bg-[#997746] text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-xs cursor-pointer"
              >
                DISCOVER COLLECTION
              </button>
            </div>
          </div>

          {/* Banner Right Image */}
          <div className="lg:col-span-7 relative h-[260px] sm:h-[340px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-sm border border-[#EAE4D9]/40 bg-[#FAF8F5]">
            <Image
              src={bannerImage}
              alt={`${title} Banner`}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent w-1/3 hidden lg:block pointer-events-none" />
          </div>

        </div>
      </div>

      {/* ── CATALOGUE CONTENT AREA ── */}
      <div id="shop-grid-start" className="max-w-[1920px] mx-auto px-4 sm:px-8 pt-10">
        
        {/* Mobile Filter Toggle & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAE4D9]">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className={`lg:hidden flex items-center space-x-2 px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                isMobileFilterOpen ? "bg-[#2C2825] text-white border-[#2C2825]" : "bg-white text-[#2C2825] border-[#EAE4D9]"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span>{isMobileFilterOpen ? "HIDE FILTERS" : "FILTER"}</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C8275]">
              SHOWING {filteredProducts.length} RESULTS
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C8275] hidden sm:inline">
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#EAE4D9] text-[#2C2825] text-xs font-semibold uppercase tracking-wider rounded-lg px-3 py-2 focus:outline-none focus:border-[#B38E5D] cursor-pointer"
            >
              <option value="featured">FEATURED</option>
              <option value="newest">NEWEST ARRIVALS</option>
              <option value="price_asc">PRICE: LOW TO HIGH</option>
              <option value="price_desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        {/* Inline Mobile Filters (Expands below toolbar) */}
        {isMobileFilterOpen && (
          <div className="lg:hidden mb-8 p-4 bg-white border border-[#EAE4D9] rounded-xl shadow-sm">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedMetals={selectedMetals}
              selectedPriceRange={selectedPriceRange}
              selectedCollection={selectedCollection}
              onCategoryChange={handleCategoryChange}
              onMetalChange={handleMetalChange}
              onPriceRangeChange={setSelectedPriceRange}
              onCollectionChange={setSelectedCollection}
            />
            <div className="mt-4 pt-4 border-t border-[#EAE4D9] flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-[#EAE4D9] text-xs font-bold uppercase tracking-widest text-[#2C2825] rounded-lg"
              >
                CLEAR
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                APPLY
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Content Layout (Desktop) */}
        <div className="flex gap-8 items-start">
          
          {/* Permanent Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0 sticky top-28">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedMetals={selectedMetals}
              selectedPriceRange={selectedPriceRange}
              selectedCollection={selectedCollection}
              onCategoryChange={handleCategoryChange}
              onMetalChange={handleMetalChange}
              onPriceRangeChange={setSelectedPriceRange}
              onCollectionChange={setSelectedCollection}
            />
          </div>

          {/* Main Product Catalogue Grid */}
          <div className="flex-1 w-full space-y-12">
            
            {/* PRODUCT GRID (DESKTOP: EXACTLY 4 PER ROW | MOBILE: EXACTLY 2 PER ROW) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center space-y-4 border border-[#EAE4D9]">
                <h3 className="font-serif text-2xl text-[#2C2825]">{emptyTitle}</h3>
                <p className="text-xs text-[#8C8275] max-w-sm mx-auto">
                  {emptyDescription}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                >
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>


    </div>
  );
}
