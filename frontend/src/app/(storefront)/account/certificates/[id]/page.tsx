"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, Download, ShieldCheck, Award, Maximize2 } from "lucide-react";
import { INITIAL_CERTIFICATES, CertificateData } from "@/data/certificates";

export default function ViewCertificatePage() {
  const params = useParams();
  const certId = params.id as string;
  const router = useRouter();

  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/certificates/my-jewellery`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const target = data.data.find((item: any) => item.certificate.certId === certId);
          if (target) {
            setCertificate(target.certificate);
          }
        }
      } catch (error) {
        console.error("Failed to fetch certificate", error);
      }
    };
    fetchCertificate();
  }, [certId]);

  if (!certificate) return <div className="p-8 text-center text-[#8C8275]">Loading certificate...</div>;

  return (
    <AccountLayoutWrapper>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            border: none !important;
          }
          @page {
            margin: 0;
          }
        }
      `}} />
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6 print:border-none print:shadow-none print:p-0">
        <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-6 print:hidden">
          <div className="flex items-center space-x-4">
            <Link href="/account/my-jewellery" className="w-10 h-10 rounded-full border border-[#EAE4D9] flex items-center justify-center text-[#8C8275] hover:bg-[#FAF8F5] transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-3xl text-[#2C2825]">Certificate of Authenticity</h1>
              <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
                ID: {certificate.certId}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-[#B38E5D] hover:bg-[#997746] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2"
          >
            <Download size={16} />
            <span>DOWNLOAD PDF</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto py-8 print:py-0">
          <div id="printable-certificate" className="bg-[#FAF8F5] rounded-2xl border-2 border-[#EAE4D9] p-8 sm:p-12 relative overflow-hidden print:border-none print:bg-white">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B38E5D]/5 rounded-bl-full -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B38E5D]/5 rounded-tr-full -z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8 print:space-y-4">
              
              <div className="space-y-4 print:space-y-2 border-b border-[#EAE4D9] pb-8 print:pb-4 w-full">
                <div className="flex justify-center">
                  <div className="w-16 h-16 print:w-12 print:h-12 rounded-full bg-[#2C2825] text-[#B38E5D] flex items-center justify-center shadow-sm">
                    <Award size={24} className="print:w-6 print:h-6" />
                  </div>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl print:text-2xl text-[#2C2825] uppercase tracking-widest">
                  Sujata Fine Jewels
                </h2>
                <p className="text-sm print:text-xs font-serif text-[#8C8275] italic tracking-wide max-w-lg mx-auto">
                  This document certifies that the jewellery described below is an authentic creation of SUJATA Fine Jewels, crafted with genuine materials as specified.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-12 print:gap-8 w-full text-left pt-4 print:pt-2">
                
                <div className="space-y-6 print:space-y-3">
                  <div className="relative aspect-square w-full max-w-xs mx-auto rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
                    <Image src={certificate.productImage} alt={certificate.productName} fill className="object-cover" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-2xl print:text-lg text-[#2C2825]">{certificate.productName}</h3>
                    <p className="text-xs print:text-[10px] text-[#8C8275] font-mono tracking-widest">{certificate.sku}</p>
                  </div>
                </div>

                <div className="space-y-8 print:space-y-4">
                  <div className="space-y-4 print:space-y-2">
                    <h4 className="text-xs print:text-[10px] font-bold uppercase tracking-widest text-[#B38E5D] border-b border-[#EAE4D9] pb-2">
                      Product Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 print:gap-y-2 gap-x-8 text-sm print:text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Metal</span>
                        <p className="font-medium text-[#2C2825]">{certificate.metalType}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Purity</span>
                        <p className="font-medium text-[#2C2825]">{certificate.metalPurity}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Gross Wt.</span>
                        <p className="font-medium text-[#2C2825]">{certificate.grossWeight}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Net Wt.</span>
                        <p className="font-medium text-[#2C2825]">{certificate.netWeight}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 print:space-y-2">
                    <h4 className="text-xs print:text-[10px] font-bold uppercase tracking-widest text-[#B38E5D] border-b border-[#EAE4D9] pb-2">
                      Gemstone Details
                    </h4>
                    <p className="text-sm print:text-xs font-medium text-[#2C2825]">{certificate.gemstoneDetails}</p>
                  </div>

                  <div className="space-y-4 print:space-y-2">
                    <h4 className="text-xs print:text-[10px] font-bold uppercase tracking-widest text-[#B38E5D] border-b border-[#EAE4D9] pb-2">
                      Certification &amp; Ownership
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 print:gap-y-2 gap-x-8 text-sm print:text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Issued To</span>
                        <p className="font-medium text-[#2C2825]">{certificate.customerName}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8275]">Date</span>
                        <p className="font-medium text-[#2C2825]">{certificate.certificationDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="w-full pt-12 border-t border-[#EAE4D9] flex items-center justify-between">
                <div className="flex items-center space-x-3 text-emerald-700">
                  <ShieldCheck size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Verified Authentic</span>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl italic text-[#B38E5D] opacity-80">Sujata Fine Jewels</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8C8275] mt-1">Authorized Signature</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}
