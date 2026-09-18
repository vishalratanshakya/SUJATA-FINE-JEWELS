"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Box, Video, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";

export default function NewProductPage() {
  const router = useRouter();
  const globalOccasions = useStore((state) => state.occasions);
  const addProduct = useStore((state) => state.addProduct);

  const [primaryImage, setPrimaryImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [model3D, setModel3D] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [categorySpecs, setCategorySpecs] = useState({
    availableSizes: [] as string[],
    sizeStock: {} as Record<string, number>,
    necklaceLength: [] as string[],
    earringType: "Studs",
    earringPairType: "Pair",
    pendantOptions: [] as string[],
    customSizeInput: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rings",
    metal: "18K Gold",
    stone: "Solitaire Diamond",
    price: 95000,
    originalPrice: 110000,
    sku: `SJ-${Math.floor(1000 + Math.random() * 9000)}`,
    isBestSeller: false,
    isNewArrival: true,
    isSignatureCarousel: false,
    selectedOccasions: [] as string[],
    productDetails: "Handcrafted fine jewellery piece in 18K Gold featuring high-clarity gemstones.",
    diamondInfo: "Ethically Sourced Natural Conflict-Free Diamond | VVS-VS Clarity | E-F Color Grade | Certified.",
    shippingReturns: "Free fully insured door-to-door delivery across India within 3-5 business days. 15-day return policy.",
    careInstructions: "Store individually in the provided Sujata velvet suede box. Clean gently with warm soapy water and a soft micro-bristle brush.",
  });

  const handleOccasionToggle = (id: string) => {
    setFormData(prev => {
      const exists = prev.selectedOccasions.includes(id);
      return {
        ...prev,
        selectedOccasions: exists
          ? prev.selectedOccasions.filter(o => o !== id)
          : [...prev.selectedOccasions, id]
      };
    });
  };

  const handleSizeToggle = (size: string) => {
    setCategorySpecs((prev) => {
      const exists = prev.availableSizes.includes(size);
      const newSizes = exists
        ? prev.availableSizes.filter((s) => s !== size)
        : [...prev.availableSizes, size];
      const newStock = { ...prev.sizeStock };
      if (!exists && !newStock[size]) {
        newStock[size] = 5;
      }
      return { ...prev, availableSizes: newSizes, sizeStock: newStock };
    });
  };

  const handleNecklaceLengthToggle = (len: string) => {
    setCategorySpecs((prev) => {
      const exists = prev.necklaceLength.includes(len);
      return {
        ...prev,
        necklaceLength: exists
          ? prev.necklaceLength.filter((l) => l !== len)
          : [...prev.necklaceLength, len],
      };
    });
  };

  const handlePendantOptionToggle = (opt: string) => {
    setCategorySpecs((prev) => {
      const exists = prev.pendantOptions.includes(opt);
      return {
        ...prev,
        pendantOptions: exists
          ? prev.pendantOptions.filter((o) => o !== opt)
          : [...prev.pendantOptions, opt],
      };
    });
  };

  const addCustomSize = () => {
    if (!categorySpecs.customSizeInput.trim()) return;
    const val = categorySpecs.customSizeInput.trim();
    if (!categorySpecs.availableSizes.includes(val)) {
      setCategorySpecs((prev) => ({
        ...prev,
        availableSizes: [...prev.availableSizes, val],
        sizeStock: { ...prev.sizeStock, [val]: 5 },
        customSizeInput: "",
      }));
    }
  };

  const addGalleryImage = (url: string) => {
    if (url) {
      setGalleryImages(prev => [...prev, url]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a detailed product description");
      return;
    }

    const categoryPlaceholder = formData.category.toLowerCase() === 'necklaces' 
      ? '/images/products/necklaces/necklace_placeholder.jpg'
      : formData.category.toLowerCase() === 'earrings'
      ? '/images/products/earrings/earrings_placeholder.jpg'
      : formData.category.toLowerCase() === 'bracelets'
      ? '/images/products/bracelets/bracelet_placeholder.jpg'
      : formData.category.toLowerCase() === 'bangles'
      ? '/images/products/bangles/bangle_placeholder.jpg'
      : formData.category.toLowerCase() === 'pendants'
      ? '/images/products/pendants/pendant_placeholder.jpg'
      : '/images/products/rings/ring_placeholder.jpg';

    const finalPrimaryImage = primaryImage || categoryPlaceholder;
    const finalHoverImage = hoverImage || categoryPlaceholder;

    const id = `prod-${Date.now()}`;
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const allImages = [finalPrimaryImage, finalHoverImage, ...galleryImages].filter(Boolean);

    const productPayload = {
      id,
      name: formData.name,
      description: formData.description.trim(),
      slug,
      category: formData.category,
      metal: formData.metal,
      stone: formData.stone,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      images: allImages,
      primaryImage: finalPrimaryImage,
      hoverImage: finalHoverImage,
      galleryImages,
      isBestSeller: formData.isBestSeller,
      isBestseller: formData.isBestSeller,
      isNewArrival: formData.isNewArrival,
      isSignatureCarousel: formData.isSignatureCarousel,
      occasions: formData.selectedOccasions,
      availableSizes: categorySpecs.availableSizes,
      sizeStock: categorySpecs.sizeStock,
      necklaceLength: categorySpecs.necklaceLength,
      earringType: categorySpecs.earringType,
      earringPairType: categorySpecs.earringPairType,
      pendantOptions: categorySpecs.pendantOptions,
      productDetails: formData.productDetails.trim(),
      diamondInfo: formData.diamondInfo.trim(),
      shippingReturns: formData.shippingReturns.trim(),
      careInstructions: formData.careInstructions.trim(),
    };

    addProduct(productPayload);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });
    } catch (err) {
      console.error("Error saving product to MongoDB Atlas:", err);
    }

    toast.success(`Product "${formData.name}" created & saved to database!`);
    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-gray-900">Add New Jewellery Product</h1>
            <p className="text-xs text-gray-500">Create a master product entry for the online catalog</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="bg-charcoal text-white text-xs font-medium px-6 py-2.5 rounded hover:bg-gray-800 transition-colors">
            Save Product
          </button>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-3 shadow-lg flex justify-between items-center md:pl-64">
        <span className="text-xs font-medium text-gray-500 hidden sm:inline">
          {formData.name ? `Editing: ${formData.name}` : "Creating new jewellery product..."}
        </span>
        <div className="flex items-center space-x-4 ml-auto">
          <Link href="/admin/products" className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="bg-charcoal text-white text-xs font-medium px-6 py-2.5 rounded hover:bg-gray-800 transition-colors shadow-sm">
            Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Basic Product Details</h2>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Product Title *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Royal Solitaire Diamond Ring" 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Product Description *</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the craftsmanship, diamond details, design inspiration, and specifications of this jewellery piece..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Metal Specification</label>
                <input 
                  type="text" 
                  value={formData.metal}
                  onChange={(e) => setFormData({...formData, metal: e.target.value})}
                  placeholder="e.g. 18K Yellow Gold" 
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Gemstone / Diamond Spec</label>
                <input 
                  type="text" 
                  value={formData.stone}
                  onChange={(e) => setFormData({...formData, stone: e.target.value})}
                  placeholder="e.g. VVS1 Diamond 1.25 Carat" 
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Selling Price (₹) *</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Original Price (₹)</label>
                <input 
                  type="number" 
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">SKU Code</label>
                <input 
                  type="text" 
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal font-mono" 
                />
              </div>
            </div>
          </div>

          {/* Customer Product Page Accordion Content Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-semibold text-gray-900">Product Page Accordion Content</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Customize content shown inside collapsible accordions on the customer Product Detail Page.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Product Details Accordion Text</label>
              <textarea 
                rows={3}
                value={formData.productDetails}
                onChange={(e) => setFormData({...formData, productDetails: e.target.value})}
                placeholder="Specific craftsmanship, finish, hallmark info..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Diamond & Gemstone Info Accordion Text</label>
              <textarea 
                rows={3}
                value={formData.diamondInfo}
                onChange={(e) => setFormData({...formData, diamondInfo: e.target.value})}
                placeholder="Diamond cut, clarity, color grade, certification body..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Shipping & Returns Accordion Text</label>
              <textarea 
                rows={2}
                value={formData.shippingReturns}
                onChange={(e) => setFormData({...formData, shippingReturns: e.target.value})}
                placeholder="Insured delivery terms, return window, exchange policies..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Care Instructions Accordion Text</label>
              <textarea 
                rows={2}
                value={formData.careInstructions}
                onChange={(e) => setFormData({...formData, careInstructions: e.target.value})}
                placeholder="Maintenance, storage, cleaning tips..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>
          </div>

          {/* Dynamic Category Specifications Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {formData.category} Category Specifications
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure real-time available sizes, options, and variant stock for {formData.category}.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-full uppercase tracking-wider">
                {formData.category}
              </span>
            </div>

            {/* 1. RINGS & BANGLES & BRACELETS (SIZES + STOCK) */}
            {(formData.category === "Rings" || formData.category === "Bangles" || formData.category === "Bracelets") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Available {formData.category === "Rings" ? "Ring Sizes" : formData.category === "Bangles" ? "Bangle Sizes" : "Bracelet Lengths"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(formData.category === "Rings"
                      ? ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
                      : formData.category === "Bangles"
                      ? ["2.2", "2.4", "2.6", "2.8", "2.10"]
                      : ["6.0 inch", "6.5 inch", "7.0 inch", "7.5 inch", "8.0 inch"]
                    ).map((size) => {
                      const isSelected = categorySpecs.availableSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-charcoal text-white border-charcoal shadow-xs"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {isSelected ? `✓ Size ${size}` : `+ Size ${size}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom size adder */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={categorySpecs.customSizeInput}
                    onChange={(e) => setCategorySpecs({ ...categorySpecs, customSizeInput: e.target.value })}
                    placeholder="Enter custom size (e.g. 14.5 or 2.5)..."
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-charcoal"
                  />
                  <button
                    type="button"
                    onClick={addCustomSize}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg border border-gray-200"
                  >
                    + Add Size
                  </button>
                </div>

                {/* Per-size stock inputs */}
                {categorySpecs.availableSizes.length > 0 && (
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Stock per Available Size
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {categorySpecs.availableSizes.map((size) => (
                        <div key={size} className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                          <span className="block text-[11px] font-bold text-gray-700 mb-1">Size {size} Stock</span>
                          <input
                            type="number"
                            min="0"
                            value={categorySpecs.sizeStock[size] ?? 5}
                            onChange={(e) =>
                              setCategorySpecs({
                                ...categorySpecs,
                                sizeStock: { ...categorySpecs.sizeStock, [size]: Number(e.target.value) },
                              })
                            }
                            className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-gray-900"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. NECKLACES */}
            {formData.category === "Necklaces" && (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Available Chain / Necklace Lengths
                </label>
                <div className="flex flex-wrap gap-2">
                  {["16 inch (Choker)", "18 inch (Princess)", "20 inch (Matinee)", "22 inch", "24 inch (Opera)"].map((len) => {
                    const isSelected = categorySpecs.necklaceLength.includes(len);
                    return (
                      <button
                        key={len}
                        type="button"
                        onClick={() => handleNecklaceLengthToggle(len)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-charcoal text-white border-charcoal shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {isSelected ? `✓ ${len}` : `+ ${len}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. EARRINGS */}
            {formData.category === "Earrings" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Earring Type / Style</label>
                  <select
                    value={categorySpecs.earringType}
                    onChange={(e) => setCategorySpecs({ ...categorySpecs, earringType: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:outline-none focus:border-charcoal bg-white"
                  >
                    <option value="Studs">Studs</option>
                    <option value="Drop">Drop / Dangle</option>
                    <option value="Hoop">Hoops / Huggies</option>
                    <option value="Chandelier">Chandelier</option>
                    <option value="Jhumka">Jhumkas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Quantity Specification</label>
                  <div className="flex space-x-4 pt-1">
                    {["Pair", "Single Earring"].map((type) => (
                      <label key={type} className="flex items-center space-x-2 text-xs font-semibold text-gray-800 cursor-pointer">
                        <input
                          type="radio"
                          name="earringPairType"
                          value={type}
                          checked={categorySpecs.earringPairType === type}
                          onChange={(e) => setCategorySpecs({ ...categorySpecs, earringPairType: e.target.value })}
                          className="text-charcoal focus:ring-charcoal"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. PENDANTS */}
            {formData.category === "Pendants" && (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Chain Options for Pendant
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Pendant Only", "With 16 inch Chain", "With 18 inch Chain", "With 20 inch Chain"].map((opt) => {
                    const isSelected = categorySpecs.pendantOptions.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handlePendantOptionToggle(opt)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-charcoal text-white border-charcoal shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {isSelected ? `✓ ${opt}` : `+ ${opt}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-semibold text-gray-900">Media Assets</h2>
              <p className="text-xs text-gray-500 mt-0.5">Upload primary cover image, hover image, and gallery view assets.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Image */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Primary Image <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-200">Main View</span>
                </div>
                <ImageUpload
                  value={primaryImage}
                  onChange={(url) => setPrimaryImage(url)}
                />
              </div>

              {/* Hover Image */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Hover Image <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-semibold border border-purple-200">Card Hover</span>
                </div>
                <ImageUpload
                  value={hoverImage}
                  onChange={(url) => setHoverImage(url)}
                />
              </div>
            </div>

            {/* Product Gallery / Sub Images (Unlimited) */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">Product Gallery Images</h3>
                  <p className="text-[11px] text-gray-400">Add unlimited detailed angle shots and view images for the product detail page gallery</p>
                </div>
                <span className="text-xs font-mono text-gray-500">{galleryImages.length} images added</span>
              </div>

              {/* Existing Gallery Thumbnails */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload New Gallery Image */}
              <div className="pt-2">
                <ImageUpload
                  label="Add Gallery Image (+)"
                  value=""
                  onChange={(url) => addGalleryImage(url)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <FileUpload
                  label="3D Model (.gltf / .glb)"
                  accept=".gltf,.glb,.obj,.zip"
                  placeholder="Or paste 3D model URL (https://...)"
                  value={model3D}
                  onChange={(url) => setModel3D(url)}
                />
              </div>
              <div>
                <FileUpload
                  label="'See It Worn' Video (.mp4 / .webm)"
                  accept="video/*,.mp4,.webm"
                  placeholder="Or paste video URL (https://...)"
                  value={videoUrl}
                  onChange={(url) => setVideoUrl(url)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Category & Badges</h2>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Jewellery Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal bg-white"
              >
                <option value="Rings">Rings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Bangles">Bangles</option>
                <option value="Pendants">Pendants</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" 
                />
                <span className="text-xs font-medium text-gray-800">Mark as Best Seller</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isNewArrival}
                  onChange={(e) => setFormData({...formData, isNewArrival: e.target.checked})}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" 
                />
                <span className="text-xs font-medium text-gray-800">Mark as New Arrival</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isSignatureCarousel}
                  onChange={(e) => setFormData({...formData, isSignatureCarousel: e.target.checked})}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" 
                />
                <span className="text-xs font-medium text-gray-800">Feature in Signature 3D Carousel</span>
              </label>
            </div>
          </div>

          {/* Occasions Checklist */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Assign Occasions</h2>
            <div className="space-y-2 text-xs">
              {globalOccasions.map((occ) => (
                <label key={occ.id} className="flex items-center space-x-2.5 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input 
                    type="checkbox" 
                    checked={formData.selectedOccasions.includes(occ.id)}
                    onChange={() => handleOccasionToggle(occ.id)}
                    className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" 
                  />
                  <span className="text-gray-700 font-medium">{occ.name}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Action Footer inside form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center mb-16">
        <span className="text-xs text-gray-500">Review all details before publishing product to shop storefront</span>
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="px-5 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded transition-colors">
            Cancel
          </Link>
          <button type="submit" className="bg-charcoal text-white text-xs font-medium px-8 py-2.5 rounded hover:bg-gray-800 transition-colors shadow-sm">
            Save Product
          </button>
        </div>
      </div>
    </form>
  );
}
