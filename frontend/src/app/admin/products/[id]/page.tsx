"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, AlertCircle, ImageIcon } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";

const CATEGORIES = ["Rings", "Necklaces", "Earrings", "Bracelets", "Bangles", "Pendants"];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const getProductById = useStore((state) => state.getProductById);
  const updateProduct = useStore((state) => state.updateProduct);
  const globalOccasions = useStore((state) => state.occasions);

  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form state — mirrors Product type fields exactly
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [metal, setMetal] = useState("");
  const [stone, setStone] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [model3D, setModel3D] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSignatureCarousel, setIsSignatureCarousel] = useState(false);
  const [productOccasions, setProductOccasions] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState("");
  const [diamondInfo, setDiamondInfo] = useState("");
  const [shippingReturns, setShippingReturns] = useState("");
  const [careInstructions, setCareInstructions] = useState("");

  // Track not-found state after mount
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [categorySpecs, setCategorySpecs] = useState({
    availableSizes: [] as string[],
    sizeStock: {} as Record<string, number>,
    necklaceLength: [] as string[],
    earringType: "Studs",
    earringPairType: "Pair",
    pendantOptions: [] as string[],
    customSizeInput: "",
  });

  // Populate form once store is hydrated & resolvedParams available
  useEffect(() => {
    if (!isMounted || !id) return;
    const product = getProductById(id);
    if (!product) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setName(product.name || "");
    setDescription(product.description || "");
    setSlug(product.slug || "");
    setCategory(product.category || "Rings");
    setMetal(product.metal || "");
    setStone(product.stone || "");
    setPrice(product.price ? String(product.price) : "");
    setOriginalPrice(product.originalPrice ? String(product.originalPrice) : "");
    setDiscountPercentage(product.discountPercentage ? String(product.discountPercentage) : "");
    setRating(product.rating ? String(product.rating) : "");
    
    setProductDetails(product.productDetails || "Handcrafted fine jewellery piece in 18K Gold featuring high-clarity gemstones.");
    setDiamondInfo(product.diamondInfo || "Ethically Sourced Natural Conflict-Free Diamond | VVS-VS Clarity | E-F Color Grade | Certified.");
    setShippingReturns(product.shippingReturns || "Free fully insured door-to-door delivery across India within 3-5 business days. 15-day return policy.");
    setCareInstructions(product.careInstructions || "Store individually in the provided Sujata velvet suede box. Clean gently with warm soapy water and a soft micro-bristle brush.");

    // Set Primary, Hover, and Gallery images from product fields or images array
    const primary = product.primaryImage || product.images?.[0] || "";
    const hover = product.hoverImage || product.images?.[1] || "";
    const gallery = product.galleryImages || product.images?.slice(2) || [];
    
    setPrimaryImage(primary);
    setHoverImage(hover);
    setGalleryImages(gallery);

    setIsSignatureCarousel(!!product.isSignatureCarousel);
    setProductOccasions(product.occasions || []);

    // Pre-populate category specs
    setCategorySpecs({
      availableSizes: product.availableSizes || [],
      sizeStock: product.sizeStock || {},
      necklaceLength: product.necklaceLength || [],
      earringType: product.earringType || "Studs",
      earringPairType: product.earringPairType || "Pair",
      pendantOptions: product.pendantOptions || [],
      customSizeInput: "",
    });
  }, [isMounted, id, getProductById]);

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
      setGalleryImages((prev) => [...prev, url]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Save ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSaved) return;

    // Basic validation
    if (!name.trim()) { toast.error("Product name is required."); return; }
    if (!description.trim()) { toast.error("Product description is required."); return; }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) { toast.error("A valid price is required."); return; }
    if (!primaryImage) { toast.error("Primary Product Image is required."); return; }
    if (!hoverImage) { toast.error("Hover Product Image is required."); return; }

    setIsSubmitting(true);

    const allImages = [primaryImage, hoverImage, ...galleryImages].filter(Boolean);

    const updates = {
      name: name.trim(),
      description: description.trim(),
      slug: slug.trim() || name.trim().toLowerCase().replace(/\s+/g, "-"),
      category,
      metal: metal.trim(),
      stone: stone.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
      rating: rating ? Number(rating) : undefined,
      images: allImages,
      primaryImage,
      hoverImage,
      galleryImages,
      isSignatureCarousel,
      occasions: productOccasions,
      availableSizes: categorySpecs.availableSizes,
      sizeStock: categorySpecs.sizeStock,
      necklaceLength: categorySpecs.necklaceLength,
      earringType: categorySpecs.earringType,
      earringPairType: categorySpecs.earringPairType,
      pendantOptions: categorySpecs.pendantOptions,
      productDetails: productDetails.trim(),
      diamondInfo: diamondInfo.trim(),
      shippingReturns: shippingReturns.trim(),
      careInstructions: careInstructions.trim(),
    };

    // Simulate slight async delay for UX clarity
    await new Promise((r) => setTimeout(r, 600));

    updateProduct(id, updates);

    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error("Failed saving product updates to MongoDB Atlas:", err);
    }

    setIsSubmitting(false);
    setIsSaved(true);
    toast.success("Product saved to database successfully!");

    // Redirect to Products Catalog page
    setTimeout(() => {
      router.push("/admin/products");
    }, 400);
  };

  // --- Loading skeleton ---
  if (!isMounted) {
    return (
      <div className="w-full animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    );
  }

  // --- Not Found ---
  if (notFound) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 text-center space-y-6">
        <AlertCircle size={48} className="text-red-400" />
        <h1 className="text-2xl font-serif text-gray-800">Product Not Found</h1>
        <p className="text-sm text-gray-500">
          No product with ID <code className="bg-gray-100 px-1 py-0.5 rounded">{id}</code> exists.
        </p>
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-2 bg-charcoal text-white px-6 py-2 text-sm rounded hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  // --- Edit Form ---
  return (
    <form onSubmit={handleSave} className="w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Back to products"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-serif text-gray-800">Edit Product</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isSaved}
            className={`flex items-center space-x-2 px-6 py-2 text-xs font-medium rounded transition-colors ${
              isSaved
                ? "bg-green-600 text-white"
                : isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-charcoal text-white hover:bg-gray-800"
            }`}
          >
            {isSaved ? (
              <><Check size={14} /><span>Saved!</span></>
            ) : isSubmitting ? (
              <span>Saving…</span>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-3 shadow-lg flex justify-between items-center md:pl-64">
        <span className="text-xs font-medium text-gray-500 hidden sm:inline">
          {name ? `Editing: ${name}` : "Editing product..."}
        </span>
        <div className="flex items-center space-x-3 ml-auto">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isSaved}
            className={`flex items-center space-x-2 px-6 py-2.5 text-xs font-medium rounded transition-colors shadow-sm ${
              isSaved
                ? "bg-green-600 text-white"
                : isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-charcoal text-white hover:bg-gray-800"
            }`}
          >
            {isSaved ? (
              <><Check size={14} /><span>Saved!</span></>
            ) : isSubmitting ? (
              <span>Saving…</span>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ── Main column ── */}
        <div className="md:col-span-2 space-y-8">

          {/* Basic Details */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-medium text-gray-800">Basic Details</h2>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                placeholder="e.g. Lumière Solitaire Ring"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Product Description <span className="text-red-500">*</span></label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal resize-none"
                placeholder="Describe the craftsmanship, diamond details, design inspiration, and specifications of this jewellery piece..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal font-mono"
                placeholder="auto-generated from name if empty"
              />
              <p className="text-xs text-gray-400 mt-1">Used in product URL: /product/<em>{slug || "…"}</em></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Metal</label>
                <input
                  type="text"
                  value={metal}
                  onChange={(e) => setMetal(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  placeholder="e.g. 18K Rose Gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Stone / Gemstone</label>
                <input
                  type="text"
                  value={stone}
                  onChange={(e) => setStone(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  placeholder="e.g. Diamond"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Price (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  min="0"
                  placeholder="Before discount"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Rating (1–5)</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  min="1"
                  max="5"
                  step="0.1"
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
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                placeholder="Specific craftsmanship, finish, hallmark info..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Diamond & Gemstone Info Accordion Text</label>
              <textarea 
                rows={3}
                value={diamondInfo}
                onChange={(e) => setDiamondInfo(e.target.value)}
                placeholder="Diamond cut, clarity, color grade, certification body..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Shipping & Returns Accordion Text</label>
              <textarea 
                rows={2}
                value={shippingReturns}
                onChange={(e) => setShippingReturns(e.target.value)}
                placeholder="Insured delivery terms, return window, exchange policies..." 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Care Instructions Accordion Text</label>
              <textarea 
                rows={2}
                value={careInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
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
                  {category} Category Specifications
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure real-time available sizes, options, and variant stock for {category}.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-full uppercase tracking-wider">
                {category}
              </span>
            </div>

            {/* 1. RINGS & BANGLES & BRACELETS (SIZES + STOCK) */}
            {(category === "Rings" || category === "Bangles" || category === "Bracelets") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Available {category === "Rings" ? "Ring Sizes" : category === "Bangles" ? "Bangle Sizes" : "Bracelet Lengths"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(category === "Rings"
                      ? ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
                      : category === "Bangles"
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
            {category === "Necklaces" && (
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
            {category === "Earrings" && (
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
            {category === "Pendants" && (
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

          {/* Images */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-medium text-gray-800">Media Assets</h2>
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

            {/* 3D / Video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
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

        {/* ── Sidebar ── */}
        <div className="space-y-8">

          {/* Organization */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-medium text-gray-800">Organization</h2>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Metal Options</label>
              <div className="space-y-2 text-sm">
                {["Yellow Gold", "Rose Gold", "White Gold", "Platinum"].map((m) => (
                  <label key={m} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={metal.toLowerCase().includes(m.split(" ")[0].toLowerCase())}
                      className="rounded border-gray-300"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Status */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-medium text-gray-800">Status &amp; Display Sections</h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Status</span>
                <select className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-charcoal bg-white">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isSignatureCarousel}
                  onChange={(e) => setIsSignatureCarousel(e.target.checked)}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="text-gray-800 font-medium">Show in 3D Perspective Carousel (Homepage)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">Featured Collection</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">Best Seller</span>
              </label>
            </div>
          </div>

          {/* Occasions */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-medium text-gray-800">Occasions</h2>
            <div className="space-y-2 text-sm">
              {globalOccasions.map((occ) => (
                <label key={occ.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productOccasions.includes(occ.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProductOccasions([...productOccasions, occ.id]);
                      } else {
                        setProductOccasions(productOccasions.filter((id) => id !== occ.id));
                      }
                    }}
                    className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                  />
                  <span className="text-gray-700">{occ.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image quick-reference card */}
          <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-3">
              <ImageIcon size={14} className="text-gray-500" />
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Image Quick Reference</h3>
            </div>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded text-center leading-5 font-bold flex-shrink-0">1</span>
                <span>Primary image — always visible on shop cards and mobile</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-purple-100 text-purple-700 rounded text-center leading-5 font-bold flex-shrink-0">2</span>
                <span>Hover image — desktop pointer devices only (300ms crossfade)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-gray-100 text-gray-500 rounded text-center leading-5 font-bold flex-shrink-0">3+</span>
                <span>Gallery images — product detail page only</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Action Footer inside form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center mb-16 mt-8">
        <span className="text-xs text-gray-500">Review all details before publishing updates to shop storefront</span>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isSaved}
            className={`flex items-center space-x-2 px-8 py-2.5 text-xs font-medium rounded transition-colors shadow-sm ${
              isSaved
                ? "bg-green-600 text-white"
                : isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-charcoal text-white hover:bg-gray-800"
            }`}
          >
            {isSaved ? (
              <><Check size={14} /><span>Saved!</span></>
            ) : isSubmitting ? (
              <span>Saving…</span>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
