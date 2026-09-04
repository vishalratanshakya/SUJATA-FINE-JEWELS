"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Award, FileText, Sparkles, ShieldCheck, Download, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { CertificateModal } from "@/components/account/CertificateModal";
import { INITIAL_CERTIFICATES, CertificateData } from "@/data/certificates";

export default function MyJewelleryPage() {
  const products = useStore((s) => s.products);
  const [activeCert, setActiveCert] = useState<CertificateData | null>(null);

  const purchasedJewellery = [
    {
      id: "j-1",
      name: "Celestial Drop Pendant",
      purchaseDate: "12 May, 2026",
      orderId: "#SJ10018",
      metal: "18K Rose Gold",
      stone: "Natural Lab-Grown Diamond (VVS1 / E-F)",
      certificate: INITIAL_CERTIFICATES[0],
      image: products[1]?.images[0] || "/images/products/necklaces/necklace_placeholder.jpg",
      slug: products[1]?.slug || "celestial-drop-pendant",
    },
    {
      id: "j-2",
      name: "Luxe Solitaire Ring",
      purchaseDate: "01 May, 2026",
      orderId: "#SJ10016",
      metal: "18K Yellow Gold",
      stone: "Solitaire Diamond (VS1 / F)",
      certificate: INITIAL_CERTIFICATES[1],
      image: products[0]?.images[0] || "/images/products/rings/ring_placeholder.jpg",
      slug: products[0]?.slug || "lumiere-solitaire-ring",
    },
  ];

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-1">
          <h1 className="font-serif text-3xl text-[#2C2825]">My Jewellery</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            Your personal handcrafted collection from SUJATA Fine Jewels.
          </p>
        </div>

        {/* Purchased Jewellery List */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">Purchased Fine Jewellery</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchasedJewellery.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-white border border-[#EAE4D9] flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-[#2C2825]">{item.name}</h4>
                      <p className="text-xs text-[#8C8275]">Purchased on {item.purchaseDate}</p>
                      <p className="text-xs text-[#8C8275]">Order: <span className="font-mono">{item.orderId}</span></p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#6B6357] bg-white p-4 rounded-xl border border-[#EAE4D9]">
                    <p><span className="font-bold text-[#2C2825]">Metal:</span> {item.metal}</p>
                    <p><span className="font-bold text-[#2C2825]">Gemstone:</span> {item.stone}</p>
                    <p className="flex items-center space-x-1.5 text-emerald-700 font-semibold pt-1">
                      <Award size={14} />
                      <span>{item.certificate.certId} Verified</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex-1 min-w-[120px] py-2.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors text-center"
                  >
                    VIEW PRODUCT
                  </Link>
                  <button
                    onClick={() => setActiveCert(item.certificate)}
                    className="px-4 py-2.5 border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>CERTIFICATE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care Guide Banner */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#B38E5D] flex items-center justify-center flex-shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-serif text-base font-medium text-[#2C2825]">Jewellery Lifetime Care Guide</h4>
              <p className="text-xs text-[#8C8275]">Learn how to clean, store, and preserve your 18K gold and diamond pieces.</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-[#B38E5D] hover:bg-[#997746] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap flex items-center space-x-1.5 cursor-pointer"
          >
            <Download size={14} />
            <span>CARE GUIDE PDF</span>
          </button>
        </div>

        {/* Certificate Modal */}
        {activeCert && (
          <CertificateModal
            certificate={activeCert}
            isOpen={!!activeCert}
            onClose={() => setActiveCert(null)}
          />
        )}

      </div>
    </AccountLayoutWrapper>
  );
}

