"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, ShieldCheck, Award } from "lucide-react";
import { INITIAL_CERTIFICATES, CertificateData } from "@/data/certificates";

export default function AdminViewCertificatePage() {
  const params = useParams();
  const certId = params.id as string;

  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  useEffect(() => {
    // In a real app, fetch from backend. Here we use the mock data.
    const cert = INITIAL_CERTIFICATES.find((c) => c.certId === certId);
    if (cert) {
      setCertificate(cert);
    }
  }, [certId]);

  if (!certificate) return <div className="p-8 text-center text-charcoal/50">Loading certificate...</div>;

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
              <span>Certificate Details</span>
            </h1>
            <p className="text-xs text-charcoal/60 mt-1 uppercase tracking-wider">
              ID: {certificate.certId}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-charcoal text-white hover:bg-champagne text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center space-x-2"
        >
          <Download size={16} />
          <span>PRINT / DOWNLOAD PDF</span>
        </button>
      </div>

      <div className="w-full py-8">
        <div className="bg-[#FAF8F5] rounded-lg border-2 border-charcoal/10 p-8 sm:p-12 relative overflow-hidden print:border-4 print:border-charcoal print:bg-white">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/10 rounded-bl-full -z-0"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-champagne/10 rounded-tr-full -z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            
            <div className="space-y-4 border-b border-charcoal/10 pb-8 w-full">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-charcoal text-champagne flex items-center justify-center shadow-sm">
                  <Award size={32} />
                </div>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal uppercase tracking-widest">
                Sujata Fine Jewels
              </h2>
              <p className="text-sm font-serif text-charcoal/70 italic tracking-wide max-w-lg mx-auto">
                This document certifies that the jewellery described below is an authentic creation of SUJATA Fine Jewels, crafted with genuine materials as specified.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left pt-4">
              
              <div className="space-y-6">
                <div className="relative aspect-square w-full max-w-xs mx-auto rounded overflow-hidden border-4 border-white shadow-md bg-white">
                  <Image src={certificate.productImage} alt={certificate.productName} fill className="object-cover" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-2xl text-charcoal">{certificate.productName}</h3>
                  <p className="text-xs text-charcoal/60 font-mono tracking-widest">{certificate.sku}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-champagne border-b border-charcoal/10 pb-2">
                    Product Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Metal</span>
                      <p className="font-medium text-charcoal">{certificate.metalType}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Purity</span>
                      <p className="font-medium text-charcoal">{certificate.metalPurity}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Gross Wt.</span>
                      <p className="font-medium text-charcoal">{certificate.grossWeight}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Net Wt.</span>
                      <p className="font-medium text-charcoal">{certificate.netWeight}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-champagne border-b border-charcoal/10 pb-2">
                    Gemstone Details
                  </h4>
                  <p className="text-sm font-medium text-charcoal">{certificate.gemstoneDetails}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-champagne border-b border-charcoal/10 pb-2">
                    Certification &amp; Ownership
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Issued To</span>
                      <p className="font-medium text-charcoal">{certificate.customerName}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Date</span>
                      <p className="font-medium text-charcoal">{certificate.certificationDate}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="w-full pt-12 border-t border-charcoal/10 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-emerald-700">
                <ShieldCheck size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Verified Authentic</span>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl italic text-champagne opacity-80">Sujata Fine Jewels</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/60 mt-1">Authorized Signature</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
