"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Award } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminAddCertificatePage() {
  const router = useRouter();

  const [editingCert, setEditingCert] = useState({
    certId: `SJ-CERT-000${Date.now().toString().slice(-3)}`,
    orderId: "",
    productId: "",
    customerId: "",
    customerName: "",
    productName: "",
    productImage: "/images/products/rings/ring_placeholder.jpg",
    jewelleryType: "",
    metalType: "",
    metalPurity: "",
    grossWeight: "",
    netWeight: "",
    gemstoneDetails: "",
    sku: "",
    purchaseDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    certificationDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Generated",
  });

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert.certId || !editingCert.orderId) return;

    // Call backend API here
    toast.success(`Certificate ${editingCert.certId} generated successfully!`);
    router.push("/admin/certificates");
  };

  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/certificates" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:bg-charcoal/5 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl text-charcoal flex items-center space-x-2">
              <Award className="text-champagne" size={28} />
              <span>Generate Certificate</span>
            </h1>
            <p className="text-xs text-charcoal/60 mt-1 uppercase tracking-wider">
              Create a new certificate of authenticity
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-4">
        <div className="bg-white rounded-xl p-8 border border-charcoal/10 shadow-xs">
          <form onSubmit={handleSaveCert} className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Certificate ID</label>
                <input
                  type="text"
                  value={editingCert.certId}
                  onChange={(e) => setEditingCert({ ...editingCert, certId: e.target.value })}
                  className="w-full border border-charcoal/20 rounded p-3 font-mono focus:outline-none focus:border-charcoal"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Order ID</label>
                <input
                  type="text"
                  value={editingCert.orderId}
                  onChange={(e) => setEditingCert({ ...editingCert, orderId: e.target.value })}
                  className="w-full border border-charcoal/20 rounded p-3 font-mono focus:outline-none focus:border-charcoal"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Customer Name</label>
                <input
                  type="text"
                  value={editingCert.customerName}
                  onChange={(e) => setEditingCert({ ...editingCert, customerName: e.target.value })}
                  className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Customer ID</label>
                <input
                  type="text"
                  value={editingCert.customerId}
                  onChange={(e) => setEditingCert({ ...editingCert, customerId: e.target.value })}
                  className="w-full border border-charcoal/20 rounded p-3 font-mono focus:outline-none focus:border-charcoal"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Product Name</label>
              <input
                type="text"
                value={editingCert.productName}
                onChange={(e) => setEditingCert({ ...editingCert, productName: e.target.value })}
                className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Metal Type &amp; Purity</label>
                <input
                  type="text"
                  value={editingCert.metalType}
                  onChange={(e) => setEditingCert({ ...editingCert, metalType: e.target.value })}
                  placeholder="e.g. 18K Yellow Gold"
                  className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Jewellery Type</label>
                <input
                  type="text"
                  value={editingCert.jewelleryType}
                  onChange={(e) => setEditingCert({ ...editingCert, jewelleryType: e.target.value })}
                  placeholder="Pendant / Ring / Earrings"
                  className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Gross Weight</label>
                <input
                  type="text"
                  value={editingCert.grossWeight}
                  onChange={(e) => setEditingCert({ ...editingCert, grossWeight: e.target.value })}
                  placeholder="e.g. 8.42 g"
                  className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Net Weight</label>
                <input
                  type="text"
                  value={editingCert.netWeight}
                  onChange={(e) => setEditingCert({ ...editingCert, netWeight: e.target.value })}
                  placeholder="e.g. 7.95 g"
                  className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Diamond / Gemstone Details</label>
              <input
                type="text"
                value={editingCert.gemstoneDetails}
                onChange={(e) => setEditingCert({ ...editingCert, gemstoneDetails: e.target.value })}
                placeholder="e.g. Natural Diamond (0.47 ct, VVS1 / E-F)"
                className="w-full border border-charcoal/20 rounded p-3 focus:outline-none focus:border-charcoal"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-2 uppercase tracking-wider text-xs">Status</label>
              <select
                value={editingCert.status}
                onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value })}
                className="w-full border border-charcoal/20 rounded p-3 bg-white font-semibold focus:outline-none focus:border-charcoal"
              >
                <option value="Pending">Pending</option>
                <option value="Generated">Generated</option>
                <option value="Issued">Issued</option>
                <option value="Revoked">Revoked</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-charcoal/10">
              <button
                type="button"
                onClick={() => router.push("/admin/certificates")}
                className="flex-1 py-4 border border-charcoal/20 rounded text-xs font-bold uppercase tracking-wider hover:bg-charcoal/5 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-charcoal hover:bg-champagne text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
              >
                GENERATE CERTIFICATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
