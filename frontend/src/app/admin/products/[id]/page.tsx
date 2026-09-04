"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Box, Video, ArrowLeft, Check, AlertCircle, X, ImageIcon } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";

const CATEGORIES = ["Rings", "Necklaces", "Earrings", "Bracelets", "Bangles", "Pendants"];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const getProductById = useStore((state) => state.getProductById);
  const updateProduct = useStore((state) => state.updateProduct);

  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form state — mirrors Product type fields exactly
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [metal, setMetal] = useState("");
  const [stone, setStone] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSignatureCarousel, setIsSignatureCarousel] = useState(false);

  // Track not-found state after mount
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Populate form once store is hydrated
  useEffect(() => {
    if (!isMounted) return;
    const product = getProductById(id);
    if (!product) {
      setNotFound(true);
      return;
    }
    setName(product.name);
    setSlug(product.slug);
    setCategory(product.category);
    setMetal(product.metal);
    setStone(product.stone);
    setPrice(String(product.price));
    setOriginalPrice(product.originalPrice ? String(product.originalPrice) : "");
    setDiscountPercentage(product.discountPercentage ? String(product.discountPercentage) : "");
    setRating(product.rating ? String(product.rating) : "");
    setImages([...product.images]);
    setIsSignatureCarousel(!!product.isSignatureCarousel);
  }, [isMounted, id, getProductById]);

  // --- Image helpers ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

  const handleImageReplace = (index: number) => {
    setReplacingIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || replacingIndex === null) return;

    const objectUrl = URL.createObjectURL(file);
    setImages((prev) => {
      const updated = [...prev];
      updated[replacingIndex] = objectUrl;
      return updated;
    });
    setReplacingIndex(null);
    // Reset so same file can be selected again
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    setReplacingIndex(images.length);
    fileInputRef.current?.click();
  };

  // --- Save ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSaved) return;

    // Basic validation
    if (!name.trim()) { toast.error("Product name is required."); return; }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) { toast.error("A valid price is required."); return; }
    if (images.length === 0) { toast.error("At least one product image is required."); return; }

    setIsSubmitting(true);

    const updates = {
      name: name.trim(),
      slug: slug.trim() || name.trim().toLowerCase().replace(/\s+/g, "-"),
      category,
      metal: metal.trim(),
      stone: stone.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
      rating: rating ? Number(rating) : undefined,
      images,
      isSignatureCarousel,
    };

    // Simulate slight async delay for UX clarity
    await new Promise((r) => setTimeout(r, 600));

    updateProduct(id, updates);
    setIsSubmitting(false);
    setIsSaved(true);
    toast.success("Product saved successfully!");

    // Allow re-editing after 2 s
    setTimeout(() => setIsSaved(false), 2000);
  };

  // --- Loading skeleton ---
  if (!isMounted) {
    return (
      <div className="max-w-4xl animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    );
  }

  // --- Not Found ---
  if (notFound) {
    return (
      <div className="max-w-4xl flex flex-col items-center justify-center py-24 text-center space-y-6">
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
    <form onSubmit={handleSave} className="max-w-4xl">
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
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isSaved}
            className={`flex items-center space-x-2 px-6 py-2 text-sm rounded transition-colors ${
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

          {/* Images */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-medium text-gray-800">Media &amp; Assets</h2>

            {/* Image ordering legend */}
            <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs text-amber-800 space-y-1">
              <p className="font-semibold text-amber-900 mb-1">Image Order Rules (storefront behavior)</p>
              <p><strong>Image 1</strong> → Default / Primary Product Image (always shown)</p>
              <p><strong>Image 2</strong> → Desktop Hover / Secondary Product Image (shown on mouse-over)</p>
              <p><strong>Images 3+</strong> → Product Detail Gallery only</p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Existing image previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((src, index) => {
                const label =
                  index === 0
                    ? "Image 1 — Primary / Default"
                    : index === 1
                    ? "Image 2 — Desktop Hover"
                    : `Image ${index + 1} — Gallery`;

                const sublabel =
                  index === 0
                    ? "Normal state on shop cards"
                    : index === 1
                    ? "Shown when cursor enters card (desktop)"
                    : "Product detail page gallery";

                return (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Label bar */}
                    <div className={`px-3 py-2 text-xs font-semibold flex items-center justify-between ${
                      index === 0
                        ? "bg-blue-50 text-blue-800 border-b border-blue-100"
                        : index === 1
                        ? "bg-purple-50 text-purple-800 border-b border-purple-100"
                        : "bg-gray-50 text-gray-600 border-b border-gray-100"
                    }`}>
                      <span>{label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-400 hover:text-red-600 transition-colors ml-2"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {/* Preview */}
                    <div className="relative aspect-square bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={label}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageReplace(index)}
                        className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 group"
                        aria-label={`Replace image ${index + 1}`}
                      >
                        <span className="bg-white text-charcoal text-xs font-medium px-3 py-1.5 rounded shadow">
                          Replace Image
                        </span>
                      </button>
                    </div>
                    <p className="px-3 py-2 text-[11px] text-gray-400">{sublabel}</p>
                  </div>
                );
              })}

              {/* Add image slot */}
              <button
                type="button"
                onClick={handleAddImage}
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-charcoal hover:text-charcoal transition-colors aspect-square min-h-[160px] cursor-pointer"
              >
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Add Image</span>
                <span className="text-xs mt-1 text-center px-2">PNG, JPG up to 10MB</span>
              </button>
            </div>

            {/* 3D / Video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1 flex items-center space-x-2">
                  <Box size={14} /> <span>3D Model (.gltf / .glb)</span>
                </label>
                <div className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center text-gray-400 hover:border-charcoal transition-colors cursor-pointer bg-gray-50 min-h-[60px]">
                  <span className="text-sm">Upload 3D Asset</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 flex items-center space-x-2">
                  <Video size={14} /> <span>&apos;See It Worn&apos; Video (.mp4)</span>
                </label>
                <div className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center text-gray-400 hover:border-charcoal transition-colors cursor-pointer bg-gray-50 min-h-[60px]">
                  <span className="text-sm">Upload Video</span>
                </div>
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
    </form>
  );
}
