"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Check, Truck, Package, ArrowLeft, Download, Headphones, Award } from "lucide-react";
import { toast } from "react-hot-toast";
import { INITIAL_CERTIFICATES } from "@/data/certificates";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId || "SJ10018";
  const products = useStore((s) => s.products);

  const sampleCertificate = INITIAL_CERTIFICATES[0];

  const product = products[1] || products[0];

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-8">
        
        {/* Top Navigation & Order Title */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-4">
          <Link
            href="/account/orders"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#8C8275] hover:text-[#2C2825] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Orders</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-[#2C2825]">Order #{orderId}</h1>
              <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
                Placed on 12 May 2026 • 1 Item
              </p>
            </div>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider rounded-full self-start sm:self-auto">
              DELIVERED
            </span>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE4D9] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">Order Delivery Timeline</h3>
          
          <div className="flex items-start space-x-6 md:justify-between overflow-x-auto no-scrollbar pt-2 pb-4 w-full">
            {[
              { step: "Order Placed", date: "12 May, 10:30 AM", active: true },
              { step: "Confirmed", date: "12 May, 11:15 AM", active: true },
              { step: "Shipped", date: "13 May, 02:00 PM", active: true },
              { step: "Out for Delivery", date: "14 May, 09:00 AM", active: true },
              { step: "Delivered", date: "14 May, 04:30 PM", active: true },
            ].map((st, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-1 flex-shrink-0 min-w-[100px]">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    st.active ? "bg-[#2C2825] text-white" : "bg-[#E2DDD3] text-[#8C8275]"
                  }`}
                >
                  <Check size={14} />
                </div>
                <span className="text-[11px] font-bold uppercase text-[#2C2825] mt-1">{st.step}</span>
                <span className="text-[10px] text-[#8C8275]">{st.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-white border border-[#EAE4D9]">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#2C2825]">{product.name}</h4>
                <p className="text-xs text-[#8C8275]">Metal: 18K Rose Gold • Gemstone: Natural Diamond</p>
                <p className="text-sm font-semibold text-[#2C2825] mt-1">{formatPrice(42000)} x 1</p>
              </div>
            </div>

            <Link
              href={`/product/${product.slug}`}
              className="px-5 py-2.5 border border-[#2C2825] rounded-xl text-xs font-bold uppercase tracking-wider text-[#2C2825] hover:bg-[#2C2825] hover:text-white transition-colors text-center"
            >
              VIEW PRODUCT
            </Link>
          </div>

          {/* Jewellery Certificate Box */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE4D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EFE6] text-[#B38E5D] flex items-center justify-center flex-shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">JEWELLERY CERTIFICATE</h5>
                <p className="text-[11px] text-[#8C8275]">Authenticity Certificate #SJ-CERT-000184 Issued</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href={`/account/certificates/${sampleCertificate.certId}`}
                className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#2C2825] text-[#2C2825] hover:text-white border border-[#E2DDD3] text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer text-center inline-block"
              >
                VIEW CERTIFICATE
              </Link>
              <button
                onClick={() => toast.success("Downloading Certificate...")}
                className="px-4 py-2 bg-[#B38E5D] hover:bg-[#997746] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer inline-block"
              >
                DOWNLOAD CERTIFICATE
              </button>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Shipping Address</h4>
            <p className="font-serif text-base font-medium text-[#2C2825]">Aanya Sharma</p>
            <p className="text-xs text-[#6B6357] leading-relaxed">
              12, Green Avenue, South Extension<br />
              New Delhi - 110049, Delhi, India<br />
              Phone: +91 98765 43210
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Payment Summary</h4>
            <div className="space-y-1.5 text-xs text-[#6B6357]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(42000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="text-emerald-700 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-[#2C2825] border-t border-[#EAE4D9] pt-2 text-sm">
                <span>Total Paid</span>
                <span className="font-serif text-base">{formatPrice(42000)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => toast.success("Downloading Tax Invoice PDF...")}
            className="inline-flex items-center space-x-2 px-5 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
          >
            <Download size={16} />
            <span>DOWNLOAD INVOICE</span>
          </button>
          
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-5 py-3 border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            <Headphones size={16} />
            <span>CONTACT SUPPORT</span>
          </Link>
        </div>


      </div>
    </AccountLayoutWrapper>
  );
}
