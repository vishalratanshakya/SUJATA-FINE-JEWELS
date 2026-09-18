"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

import { ProductCard } from "@/components/product/ProductCard";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Award,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const products = useStore((s) => s.products);
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);

  // Find product dynamically
  const product = products.find((p) => p.slug === slug) || products[0];

  const isWishlisted = product ? wishlist.some((p) => p.id === product.id) : false;

  // Selected State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [metalColor, setMetalColor] = useState<"gold" | "rose" | "white">("rose");
  const [selectedSize, setSelectedSize] = useState<string>("12");
  const [selectedLength, setSelectedLength] = useState<string>("");


  // Delivery Pincode State
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  // Accordion Expand States
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
    diamond: false,
    shipping: false,
    care: false,
  });

  // Fullscreen Lightbox Gallery State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Add to Bag Button State
  const [isAdded, setIsAdded] = useState(false);
  const [notification, setNotification] = useState<boolean>(false);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrevLightboxImage();
      if (e.key === "ArrowRight") handleNextLightboxImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Image Gallery Handlers (Primary + Hover + Gallery Images)
  const currentImages = Array.from(
    new Set(
      [
        product.primaryImage,
        product.hoverImage,
        ...(product.galleryImages || []),
        ...product.images,
      ].filter((img): img is string => Boolean(img && img.trim()))
    )
  );

  const displayImages = currentImages.length > 0 ? currentImages : ["/images/products/rings/ring_placeholder.jpg"];

  const handleNextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  // Accordion Toggle
  const toggleAccordion = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Check Pincode
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeStatus({ type: "error", message: "Please enter a valid 6-digit pincode." });
      return;
    }

    setPincodeStatus({ type: "loading", message: "Checking availability..." });
    setTimeout(() => {
      setPincodeStatus({
        type: "success",
        message: "✓ Delivery available in 3-5 business days (Insured Express Shipping)",
      });
    }, 600);
  };

  // Add to Bag Handler
  const handleAddToBag = () => {
    addToCart(product, 1, {
      selectedSize,
      selectedVariant: `${metalColor} Gold`,
      selectedLength: selectedLength || undefined,
    });
    setIsAdded(true);
    setNotification(true);

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-[#1F1B18] text-[#FFFDF9] shadow-2xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 border border-[#C5A880]/30`}
        >
          <div className="flex-1 w-0 flex items-center">
            <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-white/10 border border-white/20 mr-4">
              <Image src={displayImages[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-[#C5A880] tracking-widest flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Added to Bag
              </p>
              <p className="font-serif text-sm font-medium text-white truncate mt-0.5">{product.name}</p>
              <p className="text-xs text-white/70 font-mono mt-0.5">{formatPrice(product.price)} {selectedSize ? `• Size ${selectedSize}` : ''}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pl-3 border-l border-white/10">
            <Link
              href="/cart"
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-2 bg-[#C5A880] hover:bg-[#A38350] text-[#1F1B18] font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              View Bag
            </Link>
          </div>
        </div>
      ),
      { duration: 4000 }
    );

    setTimeout(() => setIsAdded(false), 2000);
  };

  // Buy It Now Handler
  const handleBuyItNow = () => {
    addToCart(product, 1, {
      selectedSize,
      selectedVariant: `${metalColor} Gold`,
      selectedLength: selectedLength || undefined,
    });
    router.push("/checkout");
  };

  // Related products (4 items for 4-column layout)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAF8F5] pt-28 pb-24 min-h-screen">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── MAIN PRODUCT SECTION (2-Column Desktop Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 items-start">
          
          {/* LEFT: GALLERY (55-60% width → 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:gap-6 sticky top-28 items-start self-start">
            
            {/* Vertical Thumbnails (Scrollbar Hidden) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[400px] md:max-h-[460px] lg:max-h-[480px] md:w-20 flex-shrink-0">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`aspect-square relative w-16 md:w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                    activeImageIndex === idx
                      ? "border-[#2C2825] shadow-md scale-[1.02]"
                      : "border-[#E2DDD3] opacity-70 hover:opacity-100 hover:border-[#8C8275]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Primary Image Viewer (Compact Fixed Height) */}
            <div className="flex-1 relative w-full h-[400px] md:h-[460px] lg:h-[480px] bg-[#F7F5F0] rounded-2xl border border-[#EAE4D9] overflow-hidden shadow-sm group flex-shrink-0 self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeImageIndex}
                src={displayImages[activeImageIndex] || displayImages[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105"
              />

              {/* Expand Fullscreen Button */}
              <button
                onClick={() => {
                  setLightboxIndex(activeImageIndex);
                  setIsLightboxOpen(true);
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#D5C9B8] text-[#2C2825] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#2C2825] hover:text-white shadow-sm"
                aria-label="Expand Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE CONTROLS (40-45% width → 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category / Metadata */}
            <div className="mb-2">
              <span className="text-xs tracking-[0.25em] font-medium text-[#8C8275] uppercase">
                {product.metal || "18K Gold"} • {product.stone || "Natural Diamond"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2C2825] font-medium tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="flex items-center space-x-6 mb-6 border-b border-[#EAE4D9] pb-6">
              <span className="font-serif text-2xl md:text-3xl text-[#1F1B18] font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#8C8275] line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="flex items-center space-x-2 pl-4 border-l border-[#EAE4D9]">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-[#787168] font-medium">(24 Reviews)</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#5C554E] leading-relaxed mb-8 font-light">
              {product.description || `Exquisite and timeless, the ${product.name} is meticulously handcrafted to celebrate your most precious moments. Features exceptional brilliance, clarity, and certified craftsmanship.`}
            </p>

            {/* Metal Color Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs tracking-widest uppercase font-semibold text-[#2C2825]">Metal Color</span>
                <span className="text-xs text-[#8C8275] capitalize">{metalColor} Gold</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setMetalColor("gold")}
                  aria-label="Yellow Gold"
                  className={`w-9 h-9 rounded-full bg-[#FFD700] border border-black/10 ring-2 ring-offset-2 transition-all ${
                    metalColor === "gold" ? "ring-[#2C2825] scale-110" : "ring-transparent opacity-70"
                  }`}
                />
                <button
                  onClick={() => setMetalColor("rose")}
                  aria-label="Rose Gold"
                  className={`w-9 h-9 rounded-full bg-[#B76E79] border border-black/10 ring-2 ring-offset-2 transition-all ${
                    metalColor === "rose" ? "ring-[#2C2825] scale-110" : "ring-transparent opacity-70"
                  }`}
                />
                <button
                  onClick={() => setMetalColor("white")}
                  aria-label="White Gold"
                  className={`w-9 h-9 rounded-full bg-[#E5E4E2] border border-black/10 ring-2 ring-offset-2 transition-all ${
                    metalColor === "white" ? "ring-[#2C2825] scale-110" : "ring-transparent opacity-70"
                  }`}
                />
              </div>
            </div>

            {/* Dynamic Category Specifications Selector */}
            {/* 1. RINGS & BANGLES & BRACELETS (SIZES) */}
            {(product.category === "Rings" || product.category === "Bangles" || product.category === "Bracelets") && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-semibold text-[#2C2825]">
                    Select {product.category === "Rings" ? "Ring Size" : product.category === "Bangles" ? "Bangle Size" : "Bracelet Length"}
                  </span>
                  <Link
                    href="/size-guide"
                    className="text-xs text-[#8C8275] underline underline-offset-4 hover:text-[#2C2825] transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    product.availableSizes && product.availableSizes.length > 0
                      ? product.availableSizes
                      : product.category === "Rings"
                      ? ["11", "12", "13", "14", "15", "16"]
                      : product.category === "Bangles"
                      ? ["2.2", "2.4", "2.6", "2.8"]
                      : ["6.0 inch", "6.5 inch", "7.0 inch", "7.5 inch"]
                  ).map((sz) => {
                    const isSelected = (selectedSize || (product.availableSizes?.[0] || "12")) === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2.5 text-xs font-semibold tracking-wider border rounded-lg transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#2C2825] bg-[#2C2825] text-white shadow-sm"
                            : "border-[#E2DDD3] bg-white text-[#2C2825] hover:border-[#2C2825]"
                        }`}
                      >
                        Size {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. NECKLACES (LENGTHS) */}
            {product.category === "Necklaces" && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-semibold text-[#2C2825]">
                    Chain Length Option
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    product.necklaceLength && product.necklaceLength.length > 0
                      ? product.necklaceLength
                      : ["16 inch (Choker)", "18 inch (Princess)", "20 inch (Matinee)"]
                  ).map((len) => {
                    const isSelected = (selectedLength || (product.necklaceLength?.[0] || "18 inch (Princess)")) === len;
                    return (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSelectedLength(len)}
                        className={`px-4 py-2.5 text-xs font-semibold tracking-wider border rounded-lg transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#2C2825] bg-[#2C2825] text-white shadow-sm"
                            : "border-[#E2DDD3] bg-white text-[#2C2825] hover:border-[#2C2825]"
                        }`}
                      >
                        {len}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. EARRINGS (TYPE & PAIR) */}
            {product.category === "Earrings" && (
              <div className="mb-8 p-4 bg-[#FAF8F5] border border-[#EAE4D9] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs tracking-widest uppercase font-bold text-[#2C2825] block mb-1">
                    Earring Style & Specification
                  </span>
                  <p className="text-xs text-[#8C8275]">
                    Style: <span className="font-semibold text-[#2C2825]">{product.earringType || "Studs"}</span> • Sold As: <span className="font-semibold text-[#2C2825]">{product.earringPairType || "Pair"}</span>
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#2C2825] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {product.earringPairType || "Pair"}
                </span>
              </div>
            )}

            {/* 4. PENDANTS (CHAIN OPTIONS) */}
            {product.category === "Pendants" && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-widest uppercase font-semibold text-[#2C2825]">
                    Pendant Chain Option
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    product.pendantOptions && product.pendantOptions.length > 0
                      ? product.pendantOptions
                      : ["Pendant Only", "With 16 inch Chain", "With 18 inch Chain"]
                  ).map((opt) => {
                    const isSelected = (selectedLength || (product.pendantOptions?.[0] || "Pendant Only")) === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedLength(opt)}
                        className={`px-4 py-2.5 text-xs font-semibold tracking-wider border rounded-lg transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#2C2825] bg-[#2C2825] text-white shadow-sm"
                            : "border-[#E2DDD3] bg-white text-[#2C2825] hover:border-[#2C2825]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery Pincode Checker */}
            <div className="mb-8 bg-white p-5 rounded-xl border border-[#EAE4D9] shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin size={16} className="text-[#8C8275]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2C2825]">
                  Delivery Options
                </span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="flex-1 bg-[#FAF8F5] border border-[#E2DDD3] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#2C2825]"
                />
                <button
                  type="submit"
                  className="bg-[#2C2825] text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-[#3D3732] transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus.message && (
                <p
                  className={`mt-3 text-xs ${
                    pincodeStatus.type === "success"
                      ? "text-emerald-700 font-medium"
                      : pincodeStatus.type === "error"
                      ? "text-rose-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {pincodeStatus.message}
                </p>
              )}
            </div>

            {/* Purchase Action Buttons */}
            <div className="flex flex-col space-y-3 mb-10">
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-lg transition-all duration-300 shadow-md ${
                    isAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-[#26221F] hover:bg-[#3D3732] text-[#FFFDF9]"
                  }`}
                >
                  {isAdded ? "✓ Added To Bag" : "Add To Bag"}
                </button>

                <button
                  onClick={() => {
                    toggleWishlist(product);
                    if (!isWishlisted) {
                      toast.success(`${product.name} added to wishlist!`);
                    } else {
                      toast.error(`${product.name} removed from wishlist.`);
                    }
                  }}
                  aria-label="Toggle Wishlist"
                  className={`w-14 border rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isWishlisted
                      ? "border-[#E11D48] text-[#E11D48] bg-[#FFF1F2] shadow-sm scale-[1.05]"
                      : "border-[#E2DDD3] text-[#787168] hover:border-[#2C2825] hover:text-[#2C2825] bg-white"
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? "fill-[#E11D48] text-[#E11D48]" : ""} fill={isWishlisted ? "#E11D48" : "none"} />
                </button>
              </div>

              <button
                onClick={handleBuyItNow}
                className="w-full py-4 bg-[#B38E5D] hover:bg-[#9A7A4C] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg transition-colors shadow-sm text-center"
              >
                Buy It Now
              </button>
            </div>

            {/* Compact Trust Features Grid */}
            <div className="grid grid-cols-4 gap-3 py-6 border-y border-[#EAE4D9] text-center mb-10">
              <div className="flex flex-col items-center">
                <Award size={20} className="text-[#A38350] mb-1.5" />
                <h4 className="text-[11px] font-semibold text-[#2C2825] uppercase tracking-wider">CERTIFIED</h4>
                <p className="text-[10px] text-[#8C8275]">100% Authentic</p>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={20} className="text-[#A38350] mb-1.5" />
                <h4 className="text-[11px] font-semibold text-[#2C2825] uppercase tracking-wider">SECURE</h4>
                <p className="text-[10px] text-[#8C8275]">Insured Shipping</p>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw size={20} className="text-[#A38350] mb-1.5" />
                <h4 className="text-[11px] font-semibold text-[#2C2825] uppercase tracking-wider">RETURNS</h4>
                <p className="text-[10px] text-[#8C8275]">15-Day Exchange</p>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles size={20} className="text-[#A38350] mb-1.5" />
                <h4 className="text-[11px] font-semibold text-[#2C2825] uppercase tracking-wider">SUPPORT</h4>
                <p className="text-[10px] text-[#8C8275]">Lifetime Care</p>
              </div>
            </div>

            {/* Product Details Accordions */}
            <div className="border-t border-[#EAE4D9] divide-y divide-[#EAE4D9]">
              {/* Product Details */}
              <div>
                <button
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex items-center justify-between py-4 text-xs font-semibold uppercase tracking-widest text-[#2C2825]"
                >
                  <span>Product Details</span>
                  {expandedSections.details ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSections.details && (
                  <div className="pb-4 text-xs text-[#5C554E] leading-relaxed space-y-2">
                    <p>{product.productDetails || product.description || `Handcrafted fine jewellery piece in ${product.metal || '18K Gold'}. Features a brilliant cut center stone flanked by delicate pavé setting.`}</p>
                    {product.description && product.productDetails && (
                      <p className="text-[#8C8275] border-t border-[#F5F2ED] pt-2">{product.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Diamond Information */}
              <div>
                <button
                  onClick={() => toggleAccordion("diamond")}
                  className="w-full flex items-center justify-between py-4 text-xs font-semibold uppercase tracking-widest text-[#2C2825]"
                >
                  <span>Gemstone & Diamond Specification</span>
                  {expandedSections.diamond ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSections.diamond && (
                  <div className="pb-4 text-xs text-[#5C554E] leading-relaxed space-y-2">
                    <p>{product.diamondInfo || `Stone / Diamond: ${product.stone || "Ethically Sourced Natural Conflict-Free Diamond"} | Metal: ${product.metal || "18K Gold"} | Category: ${product.category}.`}</p>
                    <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-medium text-[#2C2825]">
                      <span className="bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EAE4D9]">Metal: {product.metal}</span>
                      <span className="bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EAE4D9]">Gemstone: {product.stone}</span>
                      <span className="bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EAE4D9]">Category: {product.category}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between py-4 text-xs font-semibold uppercase tracking-widest text-[#2C2825]"
                >
                  <span>Shipping &amp; Returns</span>
                  {expandedSections.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSections.shipping && (
                  <div className="pb-4 text-xs text-[#5C554E] leading-relaxed">
                    {product.shippingReturns || "Free fully insured door-to-door delivery across India within 3-5 business days. 15-day return policy with zero deduction fees."}
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex items-center justify-between py-4 text-xs font-semibold uppercase tracking-widest text-[#2C2825]"
                >
                  <span>Care Instructions</span>
                  {expandedSections.care ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSections.care && (
                  <div className="pb-4 text-xs text-[#5C554E] leading-relaxed">
                    {product.careInstructions || "Store individually in the provided Sujata velvet suede box. Clean gently with warm soapy water and a soft micro-bristle brush."}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── PRODUCT STORY SECTION (Editorial Luxury Banner) ── */}
        <div className="my-24 bg-white rounded-2xl border border-[#EAE4D9] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#8C8275] uppercase block">
              THE STORY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2C2825] leading-tight">
              Crafted with Grace &amp; Intention
            </h2>
            <p className="text-sm text-[#5C554E] leading-relaxed font-light">
              Every curve of the {product.name} is shaped by master artisans with decades of heritage crafting experience. Designed to reflect light from every angle, this piece embodies timeless sophistication for life’s unforgettable moments.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative h-[320px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src={currentImages[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ── FULL-WIDTH "YOU MAY ALSO LIKE" SECTION ── */}
        <div className="mt-20 pt-16 border-t border-[#EAE4D9]">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-2xl md:text-4xl text-[#2C2825] font-medium tracking-tight">
              YOU MAY ALSO LIKE
            </h2>
            <Link
              href="/shop"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2C2825] hover:text-[#B38E5D] transition-colors border-b border-[#2C2825] pb-1"
            >
              VIEW ALL —
            </Link>
          </div>

          {/* Desktop: Exactly 4 products layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrevLightboxImage}
            aria-label="Previous Image"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextLightboxImage}
            aria-label="Next Image"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-4xl h-[75vh]">
            <Image
              src={currentImages[lightboxIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
