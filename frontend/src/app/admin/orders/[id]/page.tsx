"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, CheckCircle, Truck, PackageCheck, AlertOctagon,
  User, Phone, Mail, MapPin, CreditCard, RefreshCw, Tag
} from "lucide-react";
import { toast } from "react-hot-toast";

type AdminOrderDetail = {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  status: string;
  paymentMethod: string;
  trackingId?: string;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
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

const STATUS_FLOW = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackingInput, setTrackingInput] = useState("");
  const [updating, setUpdating] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const getToken = () => localStorage.getItem("token") || "";

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/orders/admin/${orderId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.data);
        setTrackingInput(data.data?.trackingId || "");
      } else {
        toast.error("Failed to load order details");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const handleStatusUpdate = async (newStatus: string, tracking?: string) => {
    if (!order) return;
    setUpdating(true);
    try {
      const res = await fetch(`${backendUrl}/api/orders/admin/${order._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          status: newStatus,
          ...(tracking ? { trackingId: tracking } : {}),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.data);
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to update status");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED": return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "SHIPPED": return "bg-blue-100 text-blue-800 border-blue-300";
      case "CONFIRMED": return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 space-x-2 text-gray-500">
        <RefreshCw size={18} className="animate-spin" />
        <span className="text-sm">Loading order details...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Link href="/admin/orders" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Orders</span>
        </Link>
        <div className="bg-white p-12 text-center rounded-lg border border-gray-100">
          <h2 className="text-xl font-serif text-gray-900">Order Not Found</h2>
          <p className="text-sm text-gray-500 mt-2">The requested order does not exist.</p>
        </div>
      </div>
    );
  }

  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/orders" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
            <ArrowLeft size={16} />
            <span>Back to Orders List</span>
          </Link>
          <h1 className="text-2xl font-serif text-gray-900">Order #{order.orderId}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
            })}
          </p>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Items + Status Update */}
        <div className="lg:col-span-2 space-y-6">

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 border-b border-gray-100 pb-3">
              Ordered Products ({order.items.length} item{order.items.length !== 1 ? "s" : ""})
            </h2>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded relative overflow-hidden flex-shrink-0 border border-gray-100">
                      {item.image ? (
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{item.productName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.selectedSize && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedLength && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
                            Length: {item.selectedLength}
                          </span>
                        )}
                        {item.selectedVariant && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
                            Style: {item.selectedVariant}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">₹{item.price.toLocaleString("en-IN")} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {(order.discountAmount || 0) > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center space-x-1">
                    <Tag size={12} />
                    <span>Coupon {order.couponCode && `(${order.couponCode})`}</span>
                  </span>
                  <span>−₹{(order.discountAmount || 0).toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Status Update Panel */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
              Update Fulfillment Status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Mark Confirmed", status: "CONFIRMED", icon: <CheckCircle size={18} className="text-indigo-600" />, activeClass: "border-indigo-500 bg-indigo-50 text-indigo-900" },
                { label: "Mark Shipped", status: "SHIPPED", icon: <Truck size={18} className="text-blue-600" />, activeClass: "border-blue-500 bg-blue-50 text-blue-900" },
                { label: "Mark Delivered", status: "DELIVERED", icon: <PackageCheck size={18} className="text-emerald-600" />, activeClass: "border-emerald-500 bg-emerald-50 text-emerald-900" },
                { label: "Cancel Order", status: "CANCELLED", icon: <AlertOctagon size={18} className="text-rose-600" />, activeClass: "border-rose-500 bg-rose-50 text-rose-900" },
              ].map(({ label, status, icon, activeClass }) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status, status === "SHIPPED" ? trackingInput : undefined)}
                  disabled={updating || order.status === status}
                  className={`p-3 rounded border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-colors disabled:opacity-60 ${
                    order.status === status ? activeClass + " font-bold" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tracking Number */}
            <div className="pt-4 border-t border-gray-100 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Enter AWB / Courier Tracking Number"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-xs focus:outline-none focus:border-charcoal"
              />
              <button
                onClick={() => handleStatusUpdate("SHIPPED", trackingInput)}
                disabled={!trackingInput || updating}
                className="px-4 py-2 bg-charcoal text-white text-xs rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save AWB & Ship"}
              </button>
            </div>
            {order.trackingId && (
              <p className="text-xs text-gray-500">
                Current Tracking ID: <span className="font-mono font-semibold text-gray-800">{order.trackingId}</span>
              </p>
            )}
          </div>
        </div>

        {/* Sidebar: Customer, Address, Payment */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Customer Info
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3 text-gray-700">
                <User size={16} className="text-gray-400" />
                <span className="font-semibold text-gray-900">{order.customerName}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail size={16} className="text-gray-400" />
                <span>{order.customerEmail}</span>
              </div>
              {order.shippingAddress?.phone && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone size={16} className="text-gray-400" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Shipping Address
            </h2>
            <div className="flex space-x-3 text-xs text-gray-600 leading-relaxed">
              <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">{order.shippingAddress?.name}</p>
                <p>{order.shippingAddress?.line1}</p>
                {order.shippingAddress?.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>
                  {[order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.postalCode]
                    .filter(Boolean).join(", ")}
                </p>
                <p>{order.shippingAddress?.country || "India"}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Payment Info
            </h2>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-3">
                <CreditCard size={16} className="text-gray-400" />
                <span className="font-medium text-gray-900">{order.paymentMethod || "COD"}</span>
              </div>
              {order.couponCode && (
                <p className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded inline-block font-semibold">
                  Coupon: {order.couponCode} (−₹{(order.discountAmount || 0).toLocaleString("en-IN")})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
