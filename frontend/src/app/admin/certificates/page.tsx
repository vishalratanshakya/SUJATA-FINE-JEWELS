"use client";

import { useState } from "react";
import { Award, Plus, Search, Eye, Trash2, X, Download, CheckCircle, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore, Certificate } from "@/store/useStore";

export default function AdminCertificatesPage() {
  const certificates = useStore((s) => s.certificates);
  const addCertificate = useStore((s) => s.addCertificate);
  const deleteCertificate = useStore((s) => s.deleteCertificate);

  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formState, setFormState] = useState({
    certificateNumber: `SGL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    productName: "Royal Solitaire Diamond Ring",
    productId: "ring-1",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    goldPurity: "18K Yellow Gold (750)",
    diamondCarat: "1.25 Carat (VVS1, E Color)",
    gemstoneDetails: "Natural Earth-Mined Diamond",
    issueDate: new Date().toISOString().split("T")[0],
    certifiedBy: "Solitaire Gemological Laboratories (SGL)"
  });

  const filteredCerts = certificates.filter(c =>
    c.certificateNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.productName.toLowerCase().includes(search.toLowerCase()) ||
    c.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.certificateNumber || !formState.productName) {
      toast.error("Please fill in required certificate details");
      return;
    }

    addCertificate(formState);
    toast.success(`Certificate ${formState.certificateNumber} issued successfully!`);
    setIsCreating(false);
  };

  const handleDelete = (id: string, num: string) => {
    deleteCertificate(id);
    toast.success(`Certificate ${num} revoked.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Jewellery Authenticity Certificates</h1>
          <p className="text-sm text-gray-500 mt-1">Generate and issue certified hallmark cards for gold purity and diamond specifications</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Issue New Certificate</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Certificate #, product or customer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Cert #</th>
                <th className="px-6 py-3.5">Product Title</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Gold Purity & Diamond</th>
                <th className="px-6 py-3.5">Issued Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No authenticity certificates found.
                  </td>
                </tr>
              ) : (
                filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-amber-800">
                      {cert.certificateNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{cert.productName}</td>
                    <td className="px-6 py-4 text-xs text-gray-600">{cert.customerName}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {cert.goldPurity} • {cert.diamondCarat}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{cert.issueDate}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium rounded transition-colors inline-flex items-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id, cert.certificateNumber)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                        title="Revoke Certificate"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Certificate Modal */}
      {isCreating && (
        <div 
          onClick={() => setIsCreating(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreate} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-serif text-gray-900">Issue Authenticity Certificate</h2>
              <button type="button" onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Certificate ID Number</label>
                <input
                  type="text"
                  required
                  value={formState.certificateNumber}
                  onChange={(e) => setFormState({ ...formState, certificateNumber: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 font-mono focus:outline-none focus:border-charcoal text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formState.productName}
                  onChange={(e) => setFormState({ ...formState, productName: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={formState.customerName}
                    onChange={(e) => setFormState({ ...formState, customerName: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={formState.customerEmail}
                    onChange={(e) => setFormState({ ...formState, customerEmail: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Gold Purity Spec</label>
                  <input
                    type="text"
                    value={formState.goldPurity}
                    onChange={(e) => setFormState({ ...formState, goldPurity: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Diamond Specification</label>
                  <input
                    type="text"
                    value={formState.diamondCarat}
                    onChange={(e) => setFormState({ ...formState, diamondCarat: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Certification Agency / Authority</label>
                <input
                  type="text"
                  value={formState.certifiedBy}
                  onChange={(e) => setFormState({ ...formState, certifiedBy: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 focus:outline-none focus:border-charcoal text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800"
              >
                Issue Certificate
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Certificate Card Preview Modal */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F0E0D] text-white rounded-xl max-w-xl w-full p-8 shadow-2xl space-y-8 border border-amber-500/30 relative cursor-default"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 text-amber-200/60 hover:text-white"
            >
              ✕
            </button>

            {/* Certificate Layout */}
            <div className="border-2 border-dashed border-amber-400/40 p-6 rounded-lg text-center space-y-6 bg-gradient-to-b from-[#1a1816] to-[#0d0c0b]">
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2 text-amber-300">
                  <ShieldCheck size={28} />
                  <span className="font-serif tracking-widest text-xl">SUJATA FINE JEWELS</span>
                </div>
                <p className="text-[10px] tracking-[0.3em] font-light text-amber-200/60 uppercase">Official Certificate of Authenticity</p>
              </div>

              <div className="py-2 border-y border-amber-500/20 text-xs font-mono text-amber-300">
                CERTIFICATE #: {selectedCert.certificateNumber}
              </div>

              <div className="text-left text-xs space-y-3 text-gray-200">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Product Title:</span>
                  <span className="font-medium text-amber-100">{selectedCert.productName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Issued To:</span>
                  <span className="font-medium text-amber-100">{selectedCert.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Gold Purity:</span>
                  <span className="font-medium text-amber-100">{selectedCert.goldPurity}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Diamond Spec:</span>
                  <span className="font-medium text-amber-100">{selectedCert.diamondCarat}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Certified By:</span>
                  <span className="font-medium text-amber-100">{selectedCert.certifiedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Issue Date:</span>
                  <span className="font-medium text-amber-100">{selectedCert.issueDate}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] text-amber-200/40 uppercase tracking-widest border-t border-amber-500/20">
                <span>100% Certified Hallmarked</span>
                <span>Authentic Diamond</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 bg-amber-400 text-charcoal font-semibold text-xs rounded hover:bg-amber-300 transition-colors flex items-center space-x-2"
              >
                <Download size={14} />
                <span>Print / Download Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
