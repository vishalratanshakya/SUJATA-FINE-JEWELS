"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Check, ArrowLeft, Download, Headphones, RefreshCw, Tag, MapPin, CreditCard, Package } from "lucide-react";
import { toast } from "react-hot-toast";

type OrderDetail = {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  createdAt: string;
  paymentMethod: string;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  trackingId?: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image?: string;
    selectedSize?: string;
    selectedLength?: string;
    selectedVariant?: string;
  }>;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    phone: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
};

const STATUS_STEPS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];

const STATUS_COLOR: Record<string, string> = {
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
  CONFIRMED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.data);
      } else {
        toast.error("Could not load order details");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const handleDownloadInvoice = async () => {
    if (!order) return;
    setDownloading(true);
    try {
      // Build invoice HTML content with real order info
      const itemRows = order.items.map(item => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.productName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">₹${item.price.toLocaleString("en-IN")}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>
      `).join("");

      const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
      const discount = order.discountAmount || 0;
      const addr = order.shippingAddress;
      const addressStr = [addr.line1, addr.line2, addr.city, addr.state, addr.postalCode, addr.country]
        .filter(Boolean).join(", ");

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice — ${order.orderId}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 750px; margin: 0 auto; padding: 40px; color: #2C2825; }
    .brand { text-align: center; border-bottom: 2px solid #B38E5D; padding-bottom: 20px; margin-bottom: 30px; }
    .brand h1 { font-size: 28px; letter-spacing: 0.3em; color: #2C2825; margin: 0; }
    .brand p { font-size: 11px; letter-spacing: 0.2em; color: #B38E5D; margin: 4px 0 0; text-transform: uppercase; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .meta-block h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8C8275; margin: 0 0 4px; }
    .meta-block p { font-size: 13px; margin: 0; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    thead { background: #2C2825; color: white; }
    thead th { padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; text-align: left; }
    thead th:last-child, thead th:nth-last-child(2) { text-align: right; }
    .totals { margin-left: auto; width: 280px; }
    .totals tr td { padding: 6px 12px; font-size: 13px; }
    .totals .total-row { font-weight: bold; font-size: 16px; border-top: 2px solid #2C2825; }
    .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #8C8275; border-top: 1px solid #eee; padding-top: 20px; }
    .status-badge { display:inline-block; padding: 3px 12px; border-radius: 20px; font-size:11px; font-weight:bold; background:#d1fae5; color:#065f46; text-transform:uppercase; }
  </style>
</head>
<body>
  <div class="brand">
    <h1>SUJATA</h1>
    <p>Fine Jewels — Tax Invoice</p>
  </div>

  <div class="meta">
    <div class="meta-block">
      <h4>Invoice / Order ID</h4>
      <p><strong>${order.orderId}</strong></p>
      <p>Date: ${new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
      <p>Status: <span class="status-badge">${order.status}</span></p>
      ${order.trackingId ? `<p>Tracking: <strong>${order.trackingId}</strong></p>` : ""}
    </div>
    <div class="meta-block" style="text-align:right;">
      <h4>Bill To</h4>
      <p><strong>${addr.name}</strong></p>
      <p>${addressStr}</p>
      <p>Phone: ${addr.phone}</p>
      <p>Email: ${order.customerEmail}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th style="text-align:center;">Qty</th>
        <th style="text-align:right;">Unit Price</th>
        <th style="text-align:right;">Amount</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <table class="totals">
    <tr><td>Subtotal</td><td style="text-align:right;">₹${subtotal.toLocaleString("en-IN")}</td></tr>
    ${discount > 0 ? `<tr><td>Coupon Discount${order.couponCode ? ` (${order.couponCode})` : ""}</td><td style="text-align:right;color:#059669;">−₹${discount.toLocaleString("en-IN")}</td></tr>` : ""}
    <tr><td>Shipping</td><td style="text-align:right;color:#059669;">FREE</td></tr>
    <tr class="total-row"><td>Total Paid</td><td style="text-align:right;">₹${order.totalAmount.toLocaleString("en-IN")}</td></tr>
    <tr><td>Payment Method</td><td style="text-align:right;">${order.paymentMethod || "COD"}</td></tr>
  </table>

  <div class="footer">
    <p>Thank you for shopping with SUJATA Fine Jewels — concierge@sujatafinejewels.com</p>
    <p>This is a computer-generated invoice and does not require a physical signature.</p>
  </div>
</body>
</html>`;

      // Open print dialog for PDF
      const win = window.open("", "_blank", "width=800,height=900");
      if (win) {
        win.document.write(html);
        win.document.close();
        win.onload = () => {
          win.print();
          setDownloading(false);
        };
      } else {
        toast.error("Popup blocked — please allow popups to download invoice");
        setDownloading(false);
      }
    } catch {
      toast.error("Failed to generate invoice");
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <AccountLayoutWrapper>
        <div className="bg-white rounded-2xl p-12 border border-[#EAE4D9] flex items-center justify-center space-x-2 text-[#8C8275]">
          <RefreshCw size={18} className="animate-spin" />
          <span className="text-sm">Loading order details...</span>
        </div>
      </AccountLayoutWrapper>
    );
  }

  if (!order) {
    return (
      <AccountLayoutWrapper>
        <div className="bg-white rounded-2xl p-12 border border-[#EAE4D9] text-center space-y-4">
          <Package size={40} className="mx-auto text-[#B38E5D] opacity-50" />
          <h2 className="font-serif text-2xl text-[#2C2825]">Order Not Found</h2>
          <Link href="/account/orders" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B38E5D] hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Orders</span>
          </Link>
        </div>
      </AccountLayoutWrapper>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status?.toUpperCase());
  const isCancelled = order.status?.toUpperCase() === "CANCELLED";
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-8">

        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-4">
          <Link href="/account/orders" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#8C8275] hover:text-[#2C2825] transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Orders</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-[#2C2825]">Order #{order.orderId}</h1>
              <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit", month: "long", year: "numeric"
                })} • {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border self-start sm:self-auto ${STATUS_COLOR[order.status?.toUpperCase()] || STATUS_COLOR.PENDING}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Order Timeline */}
        {!isCancelled && (
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE4D9] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">Order Delivery Timeline</h3>
            <div className="flex items-start space-x-4 md:justify-between overflow-x-auto no-scrollbar pt-2 pb-4 w-full">
              {STATUS_STEPS.map((step, i) => {
                const isActive = i <= currentStepIndex;
                return (
                  <div key={step} className="flex flex-col items-center text-center space-y-1 flex-shrink-0 min-w-[90px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? "bg-[#2C2825] text-white" : "bg-[#E2DDD3] text-[#8C8275]"}`}>
                      <Check size={14} />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-[#2C2825] mt-1">{step}</span>
                  </div>
                );
              })}
            </div>
            {order.trackingId && (
              <p className="text-xs text-[#8C8275]">
                Tracking ID: <span className="font-mono font-semibold text-[#2C2825]">{order.trackingId}</span>
              </p>
            )}
          </div>
        )}

        {/* Order Items */}
        <div className="p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-3">Items Ordered</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE4D9] last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-white border border-[#EAE4D9] flex-shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8C8275] text-[10px]">No Image</div>
                  )}
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#2C2825]">{item.productName}</h4>
                  <p className="text-xs text-[#8C8275] mt-0.5">Qty: {item.quantity}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.selectedSize && <span className="text-[10px] bg-white border border-[#E2DDD3] text-[#6B6357] px-2 py-0.5 rounded">Size: {item.selectedSize}</span>}
                    {item.selectedLength && <span className="text-[10px] bg-white border border-[#E2DDD3] text-[#6B6357] px-2 py-0.5 rounded">Length: {item.selectedLength}</span>}
                    {item.selectedVariant && <span className="text-[10px] bg-white border border-[#E2DDD3] text-[#6B6357] px-2 py-0.5 rounded">Style: {item.selectedVariant}</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#2C2825] shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Shipping & Payment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-3 flex items-center space-x-2">
              <MapPin size={14} className="text-[#B38E5D]" />
              <span>Shipping Address</span>
            </h4>
            <p className="font-serif text-base font-medium text-[#2C2825]">{order.shippingAddress?.name}</p>
            <p className="text-xs text-[#6B6357] leading-relaxed">
              {order.shippingAddress?.line1}<br />
              {order.shippingAddress?.line2 && <>{order.shippingAddress.line2}<br /></>}
              {[order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.postalCode].filter(Boolean).join(", ")}<br />
              {order.shippingAddress?.country || "India"} • {order.shippingAddress?.phone}
            </p>
          </div>

          {/* Payment Summary */}
          <div className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2 flex items-center space-x-2">
              <CreditCard size={14} className="text-[#B38E5D]" />
              <span>Payment Summary</span>
            </h4>
            <div className="space-y-1.5 text-xs text-[#6B6357]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {(order.discountAmount || 0) > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center space-x-1">
                    <Tag size={10} />
                    <span>Coupon {order.couponCode && `(${order.couponCode})`}</span>
                  </span>
                  <span>−{formatPrice(order.discountAmount || 0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="text-emerald-700 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-[#2C2825] border-t border-[#EAE4D9] pt-2 text-sm">
                <span>Total Paid</span>
                <span className="font-serif text-base">{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[11px] mt-1">
                <span>Payment Method</span>
                <span className="font-medium text-[#2C2825]">{order.paymentMethod || "COD"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          {/* Only show Download Invoice if order is NOT pending (i.e., it's confirmed/placed) */}
          {order.status?.toUpperCase() !== "CANCELLED" && (
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="inline-flex items-center space-x-2 px-5 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs disabled:opacity-60"
            >
              <Download size={16} />
              <span>{downloading ? "Generating..." : "DOWNLOAD INVOICE"}</span>
            </button>
          )}
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
