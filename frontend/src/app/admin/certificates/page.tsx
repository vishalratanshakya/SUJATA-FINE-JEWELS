"use client";

import { useState } from "react";
import { INITIAL_CERTIFICATES, CertificateData } from "@/data/certificates";
import { CertificateModal } from "@/components/account/CertificateModal";
import {
  Award,
  Plus,
  Search,
  Edit,
  Eye,
  RefreshCw,
  Slash,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateData[]>(INITIAL_CERTIFICATES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeCert, setActiveCert] = useState<CertificateData | null>(null);

  // Edit / Create Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Partial<CertificateData>>({});

  const filteredCerts = certs.filter((c) => {
    const matchesSearch =
      c.certId.toLowerCase().includes(search.toLowerCase()) ||
      c.orderId.toLowerCase().includes(search.toLowerCase()) ||
      c.productName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingCert({
      certId: `SJ-CERT-000${Date.now().toString().slice(-3)}`,
      orderId: "SJ10019",
      productId: "prod-4",
      customerId: "USER_456",
      customerName: "Aanya Sharma",
      productName: "Diamond Tennis Bracelet",
      productImage: "/images/products/bracelets/bracelet_placeholder.jpg",
      jewelleryType: "Bracelet",
      metalType: "18K White Gold",
      metalPurity: "750",
      grossWeight: "12.50 g",
      netWeight: "11.80 g",
      gemstoneDetails: "Natural Diamonds (1.20 ct, VVS1 / E-F)",
      sku: "SKU-SJ-99120",
      purchaseDate: "25 Apr 2026",
      certificationDate: "26 Apr 2026",
      status: "Generated",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (cert: CertificateData) => {
    setEditingCert({ ...cert });
    setIsEditModalOpen(true);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert.certId || !editingCert.orderId) return;

    setCerts((prev) => {
      const exists = prev.find((c) => c.certId === editingCert.certId);
      if (exists) {
        return prev.map((c) => (c.certId === editingCert.certId ? (editingCert as CertificateData) : c));
      } else {
        return [editingCert as CertificateData, ...prev];
      }
    });

    toast.success(`Certificate ${editingCert.certId} saved successfully!`);
    setIsEditModalOpen(false);
  };

  const handleToggleStatus = (certId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "Pending"
        ? "Generated"
        : currentStatus === "Generated"
        ? "Issued"
        : currentStatus === "Issued"
        ? "Revoked"
        : "Issued";

    setCerts((prev) =>
      prev.map((c) => (c.certId === certId ? { ...c, status: nextStatus as any } : c))
    );
    toast.success(`Updated ${certId} status to ${nextStatus}`);
  };

  return (
    <div className="p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal flex items-center space-x-2">
            <Award className="text-champagne" size={28} />
            <span>Certificate Management</span>
          </h1>
          <p className="text-xs text-charcoal/60 mt-1">
            Generate, issue, edit, and revoke official Jewellery Certificates of Authenticity.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white hover:bg-champagne px-5 py-3 rounded text-xs tracking-widest uppercase font-medium flex items-center space-x-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>GENERATE CERTIFICATE</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {["ALL", "Pending", "Generated", "Issued", "Revoked"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? "bg-charcoal text-champagne font-bold"
                  : "bg-white text-charcoal/70 border border-charcoal/10 hover:bg-charcoal/5"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID, Cert ID or Customer..."
            className="w-full bg-white border border-charcoal/15 pl-10 pr-4 py-2.5 text-xs rounded focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg border border-charcoal/10 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-charcoal/10 text-[11px] uppercase tracking-wider text-charcoal/60">
              <th className="p-4">Certificate ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product Details</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5 text-xs">
            {filteredCerts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-charcoal/50">
                  No certificates found matching criteria.
                </td>
              </tr>
            ) : (
              filteredCerts.map((cert) => (
                <tr key={cert.certId} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-charcoal">{cert.certId}</td>
                  <td className="p-4 font-mono text-charcoal/70">{cert.orderId}</td>
                  <td className="p-4">
                    <p className="font-semibold text-charcoal">{cert.customerName}</p>
                    <p className="text-[10px] text-charcoal/50">ID: {cert.customerId}</p>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-serif text-sm text-charcoal truncate">{cert.productName}</p>
                    <p className="text-[10px] text-charcoal/60">
                      {cert.metalType} • {cert.gemstoneDetails}
                    </p>
                  </td>
                  <td className="p-4 text-charcoal/70">{cert.certificationDate}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        cert.status === "Issued"
                          ? "bg-emerald-100 text-emerald-800"
                          : cert.status === "Generated"
                          ? "bg-blue-100 text-blue-800"
                          : cert.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setActiveCert(cert)}
                        className="p-1.5 hover:bg-charcoal/5 rounded text-charcoal/70 hover:text-charcoal"
                        title="View Certificate"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(cert)}
                        className="p-1.5 hover:bg-charcoal/5 rounded text-charcoal/70 hover:text-charcoal"
                        title="Edit Details"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(cert.certId, cert.status)}
                        className="p-1.5 hover:bg-charcoal/5 rounded text-charcoal/70 hover:text-charcoal"
                        title="Update Status"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW CERTIFICATE MODAL */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          isOpen={!!activeCert}
          onClose={() => setActiveCert(null)}
          currentUserId={activeCert.customerId}
        />
      )}

      {/* EDIT / GENERATE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-xl p-6 border border-charcoal/10 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-charcoal/10 pb-4">
              <h3 className="font-serif text-xl text-charcoal">
                {editingCert.certId ? `Manage Certificate ${editingCert.certId}` : "Generate New Certificate"}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-charcoal/50 hover:text-charcoal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Certificate ID</label>
                  <input
                    type="text"
                    value={editingCert.certId || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, certId: e.target.value })}
                    className="w-full border border-charcoal/20 rounded p-2.5 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Order ID</label>
                  <input
                    type="text"
                    value={editingCert.orderId || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, orderId: e.target.value })}
                    className="w-full border border-charcoal/20 rounded p-2.5 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Customer Name</label>
                  <input
                    type="text"
                    value={editingCert.customerName || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, customerName: e.target.value })}
                    className="w-full border border-charcoal/20 rounded p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Customer ID</label>
                  <input
                    type="text"
                    value={editingCert.customerId || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, customerId: e.target.value })}
                    className="w-full border border-charcoal/20 rounded p-2.5 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  value={editingCert.productName || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, productName: e.target.value })}
                  className="w-full border border-charcoal/20 rounded p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Metal Type &amp; Purity</label>
                  <input
                    type="text"
                    value={editingCert.metalType || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, metalType: e.target.value })}
                    placeholder="e.g. 18K Yellow Gold"
                    className="w-full border border-charcoal/20 rounded p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Jewellery Type</label>
                  <input
                    type="text"
                    value={editingCert.jewelleryType || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, jewelleryType: e.target.value })}
                    placeholder="Pendant / Ring / Earrings"
                    className="w-full border border-charcoal/20 rounded p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Gross Weight</label>
                  <input
                    type="text"
                    value={editingCert.grossWeight || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, grossWeight: e.target.value })}
                    placeholder="e.g. 8.42 g"
                    className="w-full border border-charcoal/20 rounded p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Net Weight</label>
                  <input
                    type="text"
                    value={editingCert.netWeight || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, netWeight: e.target.value })}
                    placeholder="e.g. 7.95 g"
                    className="w-full border border-charcoal/20 rounded p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Diamond / Gemstone Details</label>
                <input
                  type="text"
                  value={editingCert.gemstoneDetails || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, gemstoneDetails: e.target.value })}
                  placeholder="e.g. Natural Diamond (0.47 ct, VVS1 / E-F)"
                  className="w-full border border-charcoal/20 rounded p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1 uppercase tracking-wider">Status</label>
                <select
                  value={editingCert.status || "Generated"}
                  onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                  className="w-full border border-charcoal/20 rounded p-2.5 bg-white font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Generated">Generated</option>
                  <option value="Issued">Issued</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 border border-charcoal/20 rounded text-xs font-bold uppercase tracking-wider hover:bg-charcoal/5"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-charcoal hover:bg-champagne text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  SAVE CERTIFICATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
