"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CertificateData } from "@/data/certificates";
import { Award, ShieldCheck, Download, Printer, CheckCircle2, Lock } from "lucide-react";

interface CertificateModalProps {
  certificate: CertificateData;
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string; // Ownership verification e.g. USER_456
}

export function CertificateModal({
  certificate,
  isOpen,
  onClose,
  currentUserId = "USER_456",
}: CertificateModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Authorization check: Only customer who owns the order can view/download
  const isAuthorized = certificate.customerId === currentUserId;

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-[#FAF8F5] text-[#2C2825] w-full max-w-2xl rounded-2xl border border-[#EAE4D9] shadow-2xl overflow-hidden my-8 print:shadow-none print:border-none print:max-w-none print:w-full print:m-0 print:rounded-none">
        
        {/* Modal Top Bar - Hidden on print */}
        <div className="bg-[#2C2825] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Award size={18} className="text-[#B38E5D]" />
            <span className="text-xs font-bold uppercase tracking-widest">Official Certificate Viewer</span>
          </div>
          <div className="flex items-center space-x-3">
            {isAuthorized && (
              <button
                onClick={handlePrintDownload}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#B38E5D] hover:bg-[#997746] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>DOWNLOAD PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-sm px-2 py-1 font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Unauthorized Notice */}
        {!isAuthorized ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Lock size={32} />
            </div>
            <h3 className="font-serif text-2xl text-[#2C2825]">Access Restricted</h3>
            <p className="text-xs text-[#8C8275] max-w-md mx-auto">
              This Certificate of Authenticity belongs exclusively to the verified customer who purchased order #{certificate.orderId}.
            </p>
          </div>
        ) : (
          /* CERTIFICATE DOCUMENT BODY (PRINTABLE) */
          <div
            ref={printRef}
            className="p-8 sm:p-12 space-y-8 bg-[#FAF8F5] relative border-8 border-[#F5EFE6] m-2 print:m-0 print:border-4"
          >
            {/* Watermark / Brand Header */}
            <div className="text-center space-y-1 border-b-2 border-[#B38E5D]/30 pb-6">
              <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-normal text-[#2C2825]">
                SUJATA
              </h1>
              <p className="text-[10px] sm:text-[11px] tracking-[0.4em] font-light uppercase text-[#B38E5D]">
                FINE JEWELS
              </p>
              <div className="pt-4">
                <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#2C2825] uppercase font-bold border-b border-[#2C2825] pb-1 inline-block">
                  CERTIFICATE OF AUTHENTICITY
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#8C8275] uppercase pt-2">
                Certificate ID: <span className="font-bold text-[#2C2825]">{certificate.certId}</span>
              </p>
            </div>

            {/* Product Image & Details Split */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              
              {/* Product Image */}
              <div className="sm:col-span-5 flex flex-col items-center">
                <div className="w-48 h-48 sm:w-52 sm:h-52 relative rounded-2xl overflow-hidden border-2 border-[#B38E5D]/40 bg-white shadow-md">
                  <Image
                    src={certificate.productImage}
                    alt={certificate.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#8C8275] mt-2">SKU: {certificate.sku}</span>
              </div>

              {/* Technical Specifications Grid */}
              <div className="sm:col-span-7 bg-white p-5 rounded-xl border border-[#EAE4D9] space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Customer Name</span>
                  <span className="font-serif text-[#2C2825] font-semibold">{certificate.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Product Name</span>
                  <span className="font-medium text-[#2C2825]">{certificate.productName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Jewellery Type</span>
                  <span className="text-[#2C2825]">{certificate.jewelleryType}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Metal &amp; Purity</span>
                  <span className="text-[#2C2825]">{certificate.metalType} ({certificate.metalPurity} Hallmarked)</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Gross Weight</span>
                  <span className="font-mono text-[#2C2825]">{certificate.grossWeight}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Net Weight</span>
                  <span className="font-mono text-[#2C2825]">{certificate.netWeight}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Diamond / Gemstone</span>
                  <span className="text-[#B38E5D] font-semibold text-right max-w-[180px]">{certificate.gemstoneDetails}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFE6] pb-1.5">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Order ID</span>
                  <span className="font-mono text-[#2C2825]">{certificate.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#8C8275] uppercase tracking-wider text-[10px]">Purchase Date</span>
                  <span className="text-[#2C2825]">{certificate.purchaseDate}</span>
                </div>
              </div>

            </div>

            {/* Authenticity Statement */}
            <div className="text-center bg-[#F5EFE6] p-4 rounded-xl border border-[#B38E5D]/20 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#B38E5D]">
                <ShieldCheck size={16} />
                <span>OFFICIAL VERIFICATION STATEMENT</span>
              </div>
              <p className="text-[11px] text-[#6B6357] leading-relaxed italic max-w-lg mx-auto">
                This certificate confirms the authenticity, weight, purity, and gemstones of the fine jewellery piece purchased from SUJATA Fine Jewels. Guaranteed 100% natural and certified.
              </p>
            </div>

            {/* QR Code & Authorized Signature Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t-2 border-[#B38E5D]/30 pt-6">
              
              {/* QR Code Simulation */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white p-2 border border-[#EAE4D9] rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#2C2825]">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="40" y="20" width="20" height="20" />
                    <rect x="70" y="70" width="20" height="20" />
                    <rect x="40" y="60" width="20" height="20" />
                  </svg>
                </div>
                <div className="text-[10px] text-[#8C8275] space-y-0.5">
                  <p className="font-bold text-[#2C2825]">Scan to Verify</p>
                  <p>Authenticity Check</p>
                  <p className="font-mono text-[9px] text-[#B38E5D]">Date: {certificate.certificationDate}</p>
                </div>
              </div>

              {/* Authorized Signature */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic text-xl text-[#B38E5D] font-bold tracking-wider">
                  Sujata Sharma
                </div>
                <div className="h-0.5 w-36 bg-[#2C2825] mx-auto sm:ml-auto sm:mr-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2C2825]">
                  AUTHORIZED SIGNATORY
                </p>
                <p className="text-[9px] text-[#8C8275] uppercase tracking-widest">
                  SUJATA FINE JEWELS
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
