"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Star, StarOff, Sparkles, Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, Product } from "@/store/useStore";

export default function AdminProductsPage() {
  const products = useStore((s) => s.products);
  const updateProduct = useStore((s) => s.updateProduct);
  const deleteProduct = useStore((s) => s.deleteProduct);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMetal, setSelectedMetal] = useState("All");
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.metal.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesMetal = selectedMetal === "All" || p.metal.toLowerCase().includes(selectedMetal.toLowerCase());
    return matchesSearch && matchesCategory && matchesMetal;
  });

  const handleToggleBestSeller = (product: Product) => {
    const nextState = !(product.isBestSeller || product.isBestseller);
    updateProduct(product.id, { isBestSeller: nextState, isBestseller: nextState });
    toast.success(nextState ? `Marked "${product.name}" as Best Seller` : `Removed "${product.name}" from Best Sellers`);
  };

  const handleToggleNewArrival = (product: Product) => {
    const nextState = !product.isNewArrival;
    updateProduct(product.id, { isNewArrival: nextState });
    toast.success(nextState ? `Marked "${product.name}" as New Arrival` : `Removed "${product.name}" from New Arrivals`);
  };

  const handleDelete = async (product: Product) => {
    const prodId = product.id;
    setDeletingProduct(null);
    deleteProduct(prodId);
    try {
      await fetch(`/api/products/${prodId}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete product from database:", err);
    }
    toast.success(`Product "${product.name}" deleted successfully`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Products Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Manage master inventory, pricing, metal specs, and storefront badges ({products.length} Items)</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, metal, category..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <div className="flex items-center space-x-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Filters:</span>
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-charcoal"
          >
            <option value="All">All Categories</option>
            <option value="Rings">Rings</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Earrings">Earrings</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Bangles">Bangles</option>
            <option value="Pendants">Pendants</option>
          </select>

          <select 
            value={selectedMetal}
            onChange={(e) => setSelectedMetal(e.target.value)}
            className="border border-gray-200 rounded px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-charcoal"
          >
            <option value="All">All Metals</option>
            <option value="Gold">Yellow Gold</option>
            <option value="Rose Gold">Rose Gold</option>
            <option value="White Gold">White Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5 text-center">Best Seller</th>
                <th className="px-6 py-3.5 text-center">New Arrival</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No products matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isBest = Boolean(product.isBestSeller || product.isBestseller);
                  const isNew = Boolean(product.isNewArrival);

                  return (
                    <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded relative overflow-hidden flex-shrink-0 border border-gray-100">
                          <Image 
                            src={product.images?.[0] || "/images/products/rings/ring_placeholder.jpg"} 
                            alt={product.name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide">{product.metal} • {product.stone || 'Solitaire'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="ml-2 text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleToggleBestSeller(product)}
                          className={`p-2 rounded-full transition-all ${
                            isBest 
                              ? "bg-amber-100 text-amber-600 hover:bg-amber-200" 
                              : "bg-gray-100 text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                          }`}
                          title={isBest ? "Remove from Best Sellers" : "Mark as Best Seller"}
                        >
                          {isBest ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleToggleNewArrival(product)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            isNew 
                              ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                              : "bg-gray-100 text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                          }`}
                        >
                          {isNew ? "✨ New" : "+ Add New Badge"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link 
                          href={`/admin/products/${product.id}`} 
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors inline-flex rounded hover:bg-blue-50" 
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => setDeletingProduct(product)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors inline-flex rounded hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div 
          onClick={() => setDeletingProduct(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 cursor-default"
          >
            <h3 className="text-lg font-serif text-gray-900">Delete Product</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{deletingProduct.name}"</span>? This will remove it permanently from the storefront catalog and all active collections.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deletingProduct)}
                className="px-4 py-2 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
