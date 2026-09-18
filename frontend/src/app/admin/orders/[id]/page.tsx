"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Truck, PackageCheck, AlertOctagon, User, Phone, Mail, MapPin, CreditCard } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore, OrderStatus } from "@/store/useStore";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const orders = useStore((s) => s.orders);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);
  
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  const [trackingIdInput, setTrackingIdInput] = useState(order?.trackingId || "");

  if (!order) {
    return (
      <div className="space-y-6">
        <Link href="/admin/orders" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Orders</span>
        </Link>
        <div className="bg-white p-12 text-center rounded-lg border border-gray-100">
          <h2 className="text-xl font-serif text-gray-900">Order Not Found</h2>
          <p className="text-sm text-gray-500 mt-2">The requested order ID "{orderId}" does not exist in the database.</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: OrderStatus, trackingId?: string) => {
    updateOrderStatus(order.id, newStatus, trackingId);
    toast.success(`Order status updated to ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="space-y-8">
      {/* Header with Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/orders" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
            <ArrowLeft size={16} />
            <span>Back to Orders List</span>
          </Link>
          <h1 className="text-2xl font-serif text-gray-900">Order #{order.orderNumber}</h1>
          <p className="text-xs text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
            order.status === "shipped" ? "bg-blue-100 text-blue-800" :
            order.status === "processing" ? "bg-amber-100 text-amber-800" :
            order.status === "cancelled" ? "bg-rose-100 text-rose-800" : "bg-gray-100 text-gray-800"
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 border-b border-gray-100 pb-3">Ordered Products</h2>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded relative overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image 
                        src={item.product?.images?.[0] || "/images/products/rings/ring_placeholder.jpg"} 
                        alt={item.product?.name || "Jewellery"} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{item.product?.name || "Jewellery Piece"}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.product?.metal || "Gold"} • Qty: {item.quantity}</p>
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
                    <span className="font-semibold text-gray-900 text-sm">₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Insured Shipping & Express Delivery</span>
                <span className="text-emerald-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-champagne-dark">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Status Workflow */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Update Fulfillment Status</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                onClick={() => handleStatusChange("processing")}
                className={`p-3 rounded border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-colors ${
                  order.status === "processing" ? "border-amber-500 bg-amber-50 text-amber-900 font-bold" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <CheckCircle size={18} className="text-amber-600" />
                <span>Mark Processing</span>
              </button>
              
              <button 
                onClick={() => handleStatusChange("shipped", trackingIdInput || `AWB-${Math.floor(100000 + Math.random() * 900000)}`)}
                className={`p-3 rounded border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-colors ${
                  order.status === "shipped" ? "border-blue-500 bg-blue-50 text-blue-900 font-bold" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Truck size={18} className="text-blue-600" />
                <span>Mark Shipped</span>
              </button>

              <button 
                onClick={() => handleStatusChange("delivered")}
                className={`p-3 rounded border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-colors ${
                  order.status === "delivered" ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <PackageCheck size={18} className="text-emerald-600" />
                <span>Mark Delivered</span>
              </button>

              <button 
                onClick={() => handleStatusChange("cancelled")}
                className={`p-3 rounded border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-colors ${
                  order.status === "cancelled" ? "border-rose-500 bg-rose-50 text-rose-900 font-bold" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <AlertOctagon size={18} className="text-rose-600" />
                <span>Cancel Order</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center space-x-3">
              <input 
                type="text"
                placeholder="Enter Shipping AWB / Courier Tracking Number"
                value={trackingIdInput}
                onChange={(e) => setTrackingIdInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-xs focus:outline-none focus:border-charcoal"
              />
              <button 
                onClick={() => handleStatusChange("shipped", trackingIdInput)}
                className="px-4 py-2 bg-charcoal text-white text-xs rounded hover:bg-gray-800 transition-colors"
              >
                Save AWB
              </button>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">Customer Info</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3 text-gray-700">
                <User size={16} className="text-gray-400" />
                <span className="font-semibold text-gray-900">{order.customerName}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail size={16} className="text-gray-400" />
                <span>{order.customerEmail}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone size={16} className="text-gray-400" />
                <span>{order.customerPhone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">Shipping Address</h2>
            <div className="flex space-x-3 text-xs text-gray-600 leading-relaxed">
              <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">{order.customerName}</p>
                <p>{typeof order.shippingAddress === 'string' ? order.shippingAddress : '123 Luxury Villa, Jubilee Hills, Hyderabad, Telangana 500033'}</p>
              </div>
            </div>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">Payment Info</h2>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-3">
                <CreditCard size={16} className="text-gray-400" />
                <span className="font-medium text-gray-900">{order.paymentMethod || 'Online (Razorpay / UPI)'}</span>
              </div>
              <p className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block font-semibold">Payment Status: Paid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
