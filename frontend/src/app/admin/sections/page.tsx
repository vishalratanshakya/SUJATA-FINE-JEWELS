"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import {
  Sparkles,
  Flame,
  Calendar,
  Box,
  LayoutGrid,
  Check,
  Edit2,
  Eye,
  EyeOff,
  Tag,
  Clock,
  Shirt,
  BookOpen,
  Camera,
} from "lucide-react";

export default function AdminSectionsPage() {
  const products = useStore((s) => s.products);
  const updateProduct = useStore((s) => s.updateProduct);

  // ── Deal of the Day State ──
  const dealProduct = products[0];
  const [dealPrice, setDealPrice] = useState(dealProduct ? String(dealProduct.price) : "85000");
  const [dealOriginalPrice, setDealOriginalPrice] = useState(dealProduct?.originalPrice ? String(dealProduct.originalPrice) : "125000");
  const [dealTimer, setDealTimer] = useState("05:18:42");
  const [dealActive, setDealActive] = useState(true);

  // ── 3D Jewellery Experience State ──
  const [experienceTitle, setExperienceTitle] = useState("3D JEWELLERY EXPERIENCE");
  const [defaultMetal, setDefaultMetal] = useState("gold");

  // ── Shop by Occasion State ──
  const [occasions, setOccasions] = useState([
    { id: "wedding", name: "Wedding Bliss", description: "Bridal sets, mangalsutras, and statement pieces" },
    { id: "office", name: "Office Elegance", description: "Subtle, lightweight jewelry for professional settings" },
    { id: "festive", name: "Festive Glamour", description: "Traditional and contemporary pieces to celebrate" },
    { id: "everyday", name: "Daily Radiance", description: "Comfortable, durable classics for everyday wear" },
  ]);

  // ── AI Stylist State ──
  const [aiTitle, setAiTitle] = useState("FIND YOUR PERFECT PIECE");
  const [aiDescription, setAiDescription] = useState("Let our AI stylist understand your style and preferences to recommend pieces just for you.");
  const [aiButtonText, setAiButtonText] = useState("Get Recommendations");

  const saveDeal = () => {
    if (dealProduct) {
      updateProduct(dealProduct.id, {
        price: Number(dealPrice),
        originalPrice: Number(dealOriginalPrice),
      });
    }
    toast.success("Deal of the Day updated!");
  };

  const saveExperience = () => {
    toast.success("3D Experience settings saved!");
  };

  const saveOccasions = () => {
    toast.success("Occasions updated!");
  };

  const saveAiStylist = () => {
    toast.success("AI Stylist section saved!");
  };

  return (
    <div className="max-w-5xl space-y-10">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-800">Homepage Sections Manager</h1>
          <p className="text-xs text-gray-500 mt-1">Manage Deal of the Day, 3D Experience, Shop by Occasion, and AI Stylist</p>
        </div>
      </div>

      {/* ── SECTION 1: Deal of the Day ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <Flame size={20} className="text-red-500" />
            <h2 className="text-lg font-medium text-gray-800">1. Deal of the Day</h2>
          </div>
          <button
            onClick={() => setDealActive(!dealActive)}
            className={`flex items-center space-x-1.5 px-3 py-1 text-xs rounded border transition-colors ${
              dealActive ? "border-green-200 text-green-700 bg-green-50" : "border-gray-200 text-gray-400 bg-gray-50"
            }`}
          >
            {dealActive ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>{dealActive ? "Active on Homepage" : "Hidden"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Featured Product</label>
              <select className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal bg-white">
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₹{p.price.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Special Deal Price (₹)</label>
                <input
                  type="number"
                  value={dealPrice}
                  onChange={(e) => setDealPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={dealOriginalPrice}
                  onChange={(e) => setDealOriginalPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center space-x-1">
                <Clock size={14} /> <span>Timer Reset Value (HH:MM:SS)</span>
              </label>
              <input
                type="text"
                value={dealTimer}
                onChange={(e) => setDealTimer(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-sm font-mono focus:outline-none focus:border-charcoal"
              />
            </div>

            <button
              onClick={saveDeal}
              className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
            >
              <Check size={14} />
              <span>Save Deal of the Day</span>
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded border border-gray-100 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-2">Live Preview</span>
            <h3 className="font-serif text-base text-gray-800 font-medium">{dealProduct?.name}</h3>
            <p className="text-xs text-gray-500 mt-1">₹{Number(dealPrice).toLocaleString("en-IN")}</p>
            <div className="mt-3 text-xs font-mono bg-white px-3 py-1 rounded border border-gray-200">
              Ends in: {dealTimer}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: 3D Jewellery Experience ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <Box size={20} className="text-amber-600" />
            <h2 className="text-lg font-medium text-gray-800">2. 3D Jewellery Experience</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={experienceTitle}
              onChange={(e) => setExperienceTitle(e.target.value)}
              className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Default Metal View</label>
            <select
              value={defaultMetal}
              onChange={(e) => setDefaultMetal(e.target.value)}
              className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal bg-white"
            >
              <option value="gold">Yellow Gold (18K)</option>
              <option value="rose">Rose Gold (18K)</option>
              <option value="white">White Gold / Platinum</option>
            </select>
          </div>
        </div>

        <button
          onClick={saveExperience}
          className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
        >
          <Check size={14} />
          <span>Save 3D Experience Settings</span>
        </button>
      </div>

      {/* ── SECTION 3: Shop by Occasion ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <LayoutGrid size={20} className="text-blue-600" />
            <h2 className="text-lg font-medium text-gray-800">3. Shop by Occasion</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {occasions.map((occ, idx) => (
            <div key={occ.id} className="border border-gray-200 rounded p-4 space-y-2 bg-gray-50/50">
              <span className="text-[10px] uppercase font-bold text-gray-400">Card {idx + 1}</span>
              <input
                type="text"
                value={occ.name}
                onChange={(e) => {
                  const updated = [...occasions];
                  updated[idx].name = e.target.value;
                  setOccasions(updated);
                }}
                className="w-full border border-gray-200 rounded p-2 text-sm font-medium focus:outline-none focus:border-charcoal"
              />
              <textarea
                rows={2}
                value={occ.description}
                onChange={(e) => {
                  const updated = [...occasions];
                  updated[idx].description = e.target.value;
                  setOccasions(updated);
                }}
                className="w-full border border-gray-200 rounded p-2 text-xs text-gray-600 focus:outline-none focus:border-charcoal"
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveOccasions}
          className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
        >
          <Check size={14} />
          <span>Save Occasion Cards</span>
        </button>
      </div>

      {/* ── SECTION 4: AI Stylist Section ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles size={20} className="text-purple-600" />
            <h2 className="text-lg font-medium text-gray-800">4. AI Stylist Section</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={aiTitle}
              onChange={(e) => setAiTitle(e.target.value)}
              className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
              className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={aiButtonText}
              onChange={(e) => setAiButtonText(e.target.value)}
              className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <button
            onClick={saveAiStylist}
            className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
          >
            <Check size={14} />
            <span>Save AI Stylist Settings</span>
          </button>
        </div>
      </div>

      {/* ── SECTION 5: From the Journal (Blog Articles) ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <BookOpen size={20} className="text-emerald-600" />
            <h2 className="text-lg font-medium text-gray-800">5. From the Journal (Editorial Articles)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 1, title: "The 2024 Guide to Engagement Ring Trends", date: "Oct 12, 2024" },
            { id: 2, title: "How to Care for Your Diamond Jewelry", date: "Sep 28, 2024" },
            { id: 3, title: "Understanding Gold Purity: 14K vs 18K vs 24K", date: "Sep 15, 2024" }
          ].map((art) => (
            <div key={art.id} className="border border-gray-200 rounded p-4 space-y-3 bg-gray-50/50">
              <span className="text-[10px] uppercase font-bold text-gray-400">Article {art.id}</span>
              <input
                type="text"
                defaultValue={art.title}
                className="w-full border border-gray-200 rounded p-2 text-sm font-medium focus:outline-none focus:border-charcoal"
              />
              <input
                type="text"
                defaultValue={art.date}
                className="w-full border border-gray-200 rounded p-2 text-xs font-mono text-gray-500 focus:outline-none focus:border-charcoal"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => toast.success("Journal articles updated!")}
          className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
        >
          <Check size={14} />
          <span>Save Journal Articles</span>
        </button>
      </div>

      {/* ── SECTION 6: Worn by Our Community (Social Gallery) ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <Camera size={20} className="text-pink-600" />
            <h2 className="text-lg font-medium text-gray-800">6. Worn by Our Community (Social Feed)</h2>
          </div>
          <span className="text-xs text-gray-400">Tag: @sujatafinejewels</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border border-gray-200 rounded p-2 flex flex-col items-center justify-center bg-gray-50 aspect-square text-gray-400 hover:border-charcoal transition-colors cursor-pointer">
              <Camera size={20} className="mb-1" />
              <span className="text-[10px]">Photo {item}</span>
            </div>
          ))}
        </div>

      {/* ── SECTION 7: Single Product Page Accordions ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <LayoutGrid size={20} className="text-amber-700" />
            <h2 className="text-lg font-medium text-gray-800">7. Single Product Page Accordions</h2>
          </div>
          <span className="text-xs text-gray-400">Controls product detail accordions</span>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-4 space-y-2 bg-gray-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">1. Product Details</h3>
            <textarea
              rows={2}
              defaultValue="Handcrafted in 18K rose gold. Features a brilliant cut center stone flanked by delicate pavé setting. Weight: approx 4.2g. Certificate of authenticity included."
              className="w-full border border-gray-200 rounded p-2 text-xs focus:outline-none focus:border-charcoal bg-white"
            />
          </div>

          <div className="border border-gray-200 rounded p-4 space-y-2 bg-gray-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">2. Diamond Information</h3>
            <textarea
              rows={2}
              defaultValue="Clarity: VVS1 | Color: E-F | Cut: Excellent | Certification: IGI / GIA Certified Natural Lab-Grown Diamonds. Conflict-free & ethically sourced."
              className="w-full border border-gray-200 rounded p-2 text-xs focus:outline-none focus:border-charcoal bg-white"
            />
          </div>

          <div className="border border-gray-200 rounded p-4 space-y-2 bg-gray-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">3. Shipping & Returns</h3>
            <textarea
              rows={2}
              defaultValue="Free insured express shipping across India (3-5 business days). 15-day hassle-free exchange & returns with 100% money back guarantee."
              className="w-full border border-gray-200 rounded p-2 text-xs focus:outline-none focus:border-charcoal bg-white"
            />
          </div>

          <div className="border border-gray-200 rounded p-4 space-y-2 bg-gray-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">4. Care Instructions</h3>
            <textarea
              rows={2}
              defaultValue="Clean gently with warm water, mild liquid soap, and a soft-bristled brush. Store in your complimentary Sujata plush velvet box away from direct heat and harsh chemicals."
              className="w-full border border-gray-200 rounded p-2 text-xs focus:outline-none focus:border-charcoal bg-white"
            />
          </div>
        </div>

        <button
          onClick={() => toast.success("Product page accordions updated!")}
          className="px-5 py-2 bg-charcoal text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
        >
          <Check size={14} />
          <span>Save Product Accordions</span>
        </button>
      </div>
    </div>
  );
}
