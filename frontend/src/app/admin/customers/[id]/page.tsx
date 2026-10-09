"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Heart, MapPin, Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const customerId = resolvedParams.id;

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setCustomer(data.user);
        } else {
          toast.error(data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  if (loading) {
    return <div className="p-12 text-center text-gray-500">Loading customer profile...</div>;
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Link href="/admin/customers" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Customers</span>
        </Link>
        <div className="bg-white p-12 text-center rounded-lg border border-gray-100">
          <h2 className="text-xl font-serif text-gray-900">Customer Profile Not Found</h2>
          <p className="text-sm text-gray-500 mt-2">The requested customer record does not exist.</p>
        </div>
      </div>
    );
  }

  const customerOrders = customer.orders || [];
  const defaultAddress = customer.addresses?.find((a: any) => a.isDefault) || customer.addresses?.[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/customers" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
            <ArrowLeft size={16} />
            <span>Back to Customers List</span>
          </Link>
          <h1 className="text-2xl font-serif text-gray-900">{customer.name}</h1>
          <p className="text-xs text-gray-500 mt-1">Customer Profile & Purchase History</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {customer.totalOrders > 5 ? 'VIP Client' : 'Standard'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Info Card (1 col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
              <div className="w-14 h-14 bg-charcoal text-champagne rounded-full flex items-center justify-center font-serif text-xl font-bold uppercase">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-base">{customer.name}</h2>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400">Total Spent</span>
                <span className="font-bold text-gray-900 text-sm">₹{(customer.totalSpent || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400">Total Orders</span>
                <span className="font-bold text-gray-900">{customer.totalOrders}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400">Member Since</span>
                <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 border-b border-gray-100 pb-2">Contact Info</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-gray-400" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-gray-400" />
                <span>{customer.phone || 'No phone provided'}</span>
              </div>
            </div>
          </div>

          {/* Default Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 border-b border-gray-100 pb-2">Primary Shipping Address</h3>
            <div className="flex space-x-2.5 text-xs text-gray-600 leading-relaxed">
              <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                {defaultAddress ? (
                  <>
                    <p className="font-semibold text-gray-900">{defaultAddress.fullName}</p>
                    <p>{defaultAddress.addressLine1}</p>
                    {defaultAddress.addressLine2 && <p>{defaultAddress.addressLine2}</p>}
                    <p>{defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}</p>
                    <p>{defaultAddress.country}</p>
                  </>
                ) : (
                  <p className="text-gray-400">No address saved yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Purchase History & Wishlist (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
              <ShoppingCart size={16} />
              <span>Customer Order History ({customerOrders.length})</span>
            </h2>

            {customerOrders.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                No orders recorded for this customer yet.
              </div>
            ) : (
              <div className="space-y-3">
                {customerOrders.map((order: any) => (
                  <div key={order._id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-900 text-sm">#{order.orderId}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{order.items.length} Items • Placed {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center space-x-4 justify-between sm:justify-end">
                      <span className="font-bold text-gray-900 text-sm">₹{(order.totalAmount || 0).toLocaleString('en-IN')}</span>
                      <Link 
                        href={`/admin/orders/${order._id}`} 
                        className="px-3 py-1.5 bg-charcoal text-white rounded text-xs hover:bg-gray-800 transition-colors"
                      >
                        View Order
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
