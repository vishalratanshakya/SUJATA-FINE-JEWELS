"use client";

import { useState } from "react";
import { useStore, Product } from "@/store/useStore";
import { FileUpload } from "@/components/admin/FileUpload";
import { toast } from "react-hot-toast";
import { Video, Save, Trash2, Search } from "lucide-react";
import Image from "next/image";

export default function ProductVideosPage() {
  const products = useStore((state) => state.products);
  const updateProduct = useStore((state) => state.updateProduct);

  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find((p) => p.id === productId);
    setVideoUrl(prod?.videoUrl || "");
  };

  const handleSave = async () => {
    if (!selectedProductId) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/products/${selectedProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to save video");
      }

      updateProduct(selectedProductId, { videoUrl });
      toast.success("Product video updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product video.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveVideo = async () => {
    setVideoUrl("");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-gray-900 flex items-center">
          <Video className="mr-2 text-charcoal" size={24} />
          Product Videos
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload and manage video assets for your jewellery products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Product Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">1. Select Product</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, or category..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div className="max-h-96 overflow-y-auto border border-gray-100 rounded-md divide-y divide-gray-50 hide-scrollbar">
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">No products found.</div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className={`flex items-center space-x-4 p-3 cursor-pointer transition-colors ${
                    selectedProductId === product.id ? "bg-amber-50 border-l-2 border-amber-500" : "hover:bg-gray-50 border-l-2 border-transparent"
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                    <Image
                      src={(() => {
                        const img = product.primaryImage || product.images?.[0];
                        if (img && (img.startsWith("http") || img.startsWith("/") || img.startsWith("data:"))) return img;
                        return "/images/products/rings/ring_placeholder.jpg";
                      })()}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.category} {product.sku ? `• ${product.sku}` : ""}
                    </p>
                  </div>
                  {product.videoUrl && (
                    <span title="Has video">
                      <Video size={14} className="text-emerald-500 flex-shrink-0" />
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Video Upload & Preview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">2. Manage Video</h2>
          
          {!selectedProduct ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              <Video size={32} className="mb-2 opacity-50" />
              <p className="text-sm">Please select a product first.</p>
            </div>
          ) : (
            <>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-gray-900">Editing: {selectedProduct.name}</p>
              </div>

              <FileUpload
                label="Product Video (MP4)"
                accept="video/mp4,video/webm,video/quicktime"
                value={videoUrl}
                onChange={setVideoUrl}
                placeholder="Upload or paste video URL..."
              />

              {videoUrl && (
                <div className="space-y-2 mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Video Preview</label>
                  <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-sm">
                    <video
                      src={videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleRemoveVideo}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear Video
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving || videoUrl === (selectedProduct.videoUrl || "")}
                  className="bg-charcoal text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
