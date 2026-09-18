"use client";

import Link from "next/link";
import { 
  Plus, ArrowUpRight, ArrowRight, Package, ShoppingCart, Users, DollarSign,
  ChevronRight, Calendar, Sparkles, Image as ImageIcon, Heart, Eye, Award, Tag,
  FolderKanban, BookOpen
} from "lucide-react";

import Image from "next/image";
import { useStore } from "@/store/useStore";

export default function AdminDashboardPage() {
  const products = useStore((s) => s.products);
  const orders = useStore((s) => s.orders);
  const customers = useStore((s) => s.customers);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);

  // Top Selling Products mock calculation
  const topProducts = products.slice(0, 5).map((p, i) => ({
    id: p.id,
    name: p.name,
    image: p.images[0] || "/images/products/rings/ring_placeholder.jpg",
    sold: 24 - i * 3,
    revenue: p.price * (24 - i * 3),
  }));

  // Order Status distribution counts
  const pendingCount = orders.filter(o => o.status === 'pending').length || 12;
  const processingCount = orders.filter(o => o.status === 'processing').length || 18;
  const shippedCount = orders.filter(o => o.status === 'shipped').length || 24;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length || 28;
  const cancelledCount = orders.filter(o => o.status === 'cancelled').length || 4;
  const totalOrderCount = orders.length || 86;

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>Dashboard</span>
            <span className="text-xl">👋🏼</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-600 text-xs px-3.5 py-2 rounded-lg font-medium shadow-sm flex items-center space-x-2">
            <Calendar size={14} className="text-gray-400" />
            <span>Apr 21, 2025 - May 21, 2025</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Products */}
        <div className="bg-[#FFFBF2] p-5 rounded-2xl border border-[#F6ECC9] shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">Total Products</p>
            <p className="text-2xl font-bold font-serif text-gray-900">{products.length || 124}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center pt-1">
              <ArrowUpRight size={12} className="mr-0.5" /> +12% from last month
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-11 h-11 rounded-2xl bg-[#F8E2AF] text-[#8C6219] flex items-center justify-center font-semibold">
              <Package size={20} />
            </div>
            <Link href="/admin/products" className="w-6 h-6 rounded-full bg-[#EBD399] text-[#5A3F0F] flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-[#F8F5FF] p-5 rounded-2xl border border-[#EADBFF] shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold font-serif text-gray-900">{orders.length || 86}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center pt-1">
              <ArrowUpRight size={12} className="mr-0.5" /> +18% from last month
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-11 h-11 rounded-2xl bg-[#DFCAFF] text-[#5B21B6] flex items-center justify-center font-semibold">
              <ShoppingCart size={20} />
            </div>
            <Link href="/admin/orders" className="w-6 h-6 rounded-full bg-[#CBB1FF] text-[#4C1D95] flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Customers */}
        <div className="bg-[#F2FBF6] p-5 rounded-2xl border border-[#D1F3E0] shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold font-serif text-gray-900">{customers.length ? customers.length.toLocaleString() : '1,248'}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center pt-1">
              <ArrowUpRight size={12} className="mr-0.5" /> +24% from last month
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-11 h-11 rounded-2xl bg-[#BAF2D2] text-[#065F46] flex items-center justify-center font-semibold">
              <Users size={20} />
            </div>
            <Link href="/admin/customers" className="w-6 h-6 rounded-full bg-[#99E6BA] text-[#044E38] flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-[#FFF2F4] p-5 rounded-2xl border border-[#FCD6DC] shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold font-serif text-gray-900">₹{totalRevenue ? totalRevenue.toLocaleString('en-IN') : '3,42,680'}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center pt-1">
              <ArrowUpRight size={12} className="mr-0.5" /> +32% from last month
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-11 h-11 rounded-2xl bg-[#FBC3CB] text-[#9F1239] flex items-center justify-center font-semibold text-xl">
              ₹
            </div>
            <Link href="/admin/orders" className="w-6 h-6 rounded-full bg-[#F8A4B1] text-[#881337] flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Row 1: Sales Line Chart (Left) + Order Status Doughnut (Center) + Quick Actions Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Overview SVG Line Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-base text-gray-900">Sales Overview</h2>
              <p className="text-[11px] text-gray-400">Total sales for the last 7 days</p>
            </div>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-600 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* SVG Smooth Curve Line Chart */}
          <div className="h-44 w-full relative pt-4">
            <svg className="w-full h-32 overflow-visible" viewBox="0 0 350 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill */}
              <path d="M 0,80 Q 50,40 100,55 T 200,30 T 300,50 T 350,20 L 350,100 L 0,100 Z" fill="url(#salesGrad)" />
              {/* Line */}
              <path d="M 0,80 Q 50,40 100,55 T 200,30 T 300,50 T 350,20" fill="none" stroke="#D97706" strokeWidth="2.5" />
              {/* Dots */}
              {[[0,80], [58,52], [116,55], [174,40], [232,30], [290,50], [348,20]].map(([x,y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex justify-between text-[10px] text-gray-400 font-medium pt-2 border-t border-gray-100">
              <span>May 15</span>
              <span>May 16</span>
              <span>May 17</span>
              <span>May 18</span>
              <span>May 19</span>
              <span>May 20</span>
              <span>May 21</span>
            </div>
          </div>
        </div>

        {/* Order Status Doughnut Chart (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h2 className="font-serif font-bold text-base text-gray-900">Order Status</h2>
            <p className="text-[11px] text-gray-400">Order distribution by status</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Doughnut SVG */}
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#FBBF24" strokeWidth="4.5" fill="none" strokeDasharray="14 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#60A5FA" strokeWidth="4.5" fill="none" strokeDasharray="21 100" strokeDashoffset="-14" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#818CF8" strokeWidth="4.5" fill="none" strokeDasharray="28 100" strokeDashoffset="-35" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#34D399" strokeWidth="4.5" fill="none" strokeDasharray="33 100" strokeDashoffset="-63" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#F87171" strokeWidth="4.5" fill="none" strokeDasharray="4 100" strokeDashoffset="-96" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-base font-bold font-serif text-gray-900 leading-none">{totalOrderCount}</span>
                <span className="text-[9px] text-gray-400 font-medium mt-0.5">Total Orders</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 flex-1 text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>Pending</span>
                <span className="font-semibold text-gray-800">{pendingCount} (14%)</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>Processing</span>
                <span className="font-semibold text-gray-800">{processingCount} (21%)</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>Shipped</span>
                <span className="font-semibold text-gray-800">{shippedCount} (28%)</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>Delivered</span>
                <span className="font-semibold text-gray-800">{deliveredCount} (33%)</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>Cancelled</span>
                <span className="font-semibold text-gray-800">{cancelledCount} (4%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Dark Card & Action Items (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#12100E] text-white p-5 rounded-2xl shadow-md border border-amber-900/30 relative overflow-hidden flex flex-col justify-between h-40">
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] text-amber-200/70 uppercase tracking-widest font-semibold">Manage Your Store</p>
              <h3 className="text-base font-serif font-bold text-white">Quick Actions</h3>
            </div>

            {/* Diamond Ring Decor */}
            <div className="absolute right-2 top-2 w-24 h-24 opacity-80 pointer-events-none">
              <Image src="/images/products/rings/ring_placeholder.jpg" alt="Diamond Ring" width={96} height={96} className="object-cover rounded-full mix-blend-screen" />
            </div>

            <Link href="/admin/products/new" className="bg-[#2A231A] hover:bg-amber-700 text-amber-200 hover:text-white border border-amber-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-flex items-center justify-center space-x-1.5 relative z-10">
              <Plus size={14} />
              <span>Add New Product</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm space-y-1">
            <Link href="/admin/products" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg"><Package size={14} /></div>
                <span>View All Products</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>

            <Link href="/admin/orders" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-purple-50 text-purple-700 rounded-lg"><ShoppingCart size={14} /></div>
                <span>View All Orders</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>

            <Link href="/admin/collections" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg"><FolderKanban size={14} /></div>
                <span>Manage Collections</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>

            <Link href="/admin/banners" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg"><ImageIcon size={14} /></div>
                <span>Upload Banner</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>
          </div>
        </div>

      </div>

      {/* Main Row 2: Top Selling Products (4 Cols) + Recent Orders (4 Cols) + Recent Customers (2 Cols) + Recent Activity (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Top Selling Products (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="font-serif font-bold text-base text-gray-900">Top Selling Products</h2>
              <p className="text-[11px] text-gray-400">Best performing products by sales</p>
            </div>
            <Link href="/admin/products" className="text-xs text-amber-700 font-semibold hover:underline">View All</Link>
          </div>

          <table className="w-full text-left text-xs text-gray-600">
            <thead className="text-[10px] uppercase text-gray-400 border-b border-gray-100">
              <tr>
                <th className="pb-2">#</th>
                <th className="pb-2">Product</th>
                <th className="pb-2 text-center">Sold</th>
                <th className="pb-2 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProducts.map((p, idx) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-2.5 font-bold text-gray-400 text-[11px]">{idx + 1}</td>
                  <td className="py-2.5 flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded relative overflow-hidden bg-gray-100 flex-shrink-0 border">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <span className="font-semibold text-gray-900 truncate max-w-[110px]">{p.name}</span>
                  </td>
                  <td className="py-2.5 text-center font-semibold text-gray-700">{p.sold}</td>
                  <td className="py-2.5 text-right font-bold text-gray-900">₹{p.revenue.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="font-serif font-bold text-base text-gray-900">Recent Orders</h2>
              <p className="text-[11px] text-gray-400">Latest customer orders</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-amber-700 font-semibold hover:underline">View All</Link>
          </div>

          <table className="w-full text-left text-xs text-gray-600">
            <thead className="text-[10px] uppercase text-gray-400 border-b border-gray-100">
              <tr>
                <th className="pb-2">Order #</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2 text-right">Amount</th>
                <th className="pb-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="py-2.5 font-mono font-bold text-amber-800 text-[11px]">
                    <Link href={`/admin/orders/${order.id}`}>{order.orderNumber}</Link>
                  </td>
                  <td className="py-2.5 font-medium text-gray-900 truncate max-w-[90px]">{order.customerName}</td>
                  <td className="py-2.5 text-right font-semibold text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Customers (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-serif font-bold text-base text-gray-900">Recent Customers</h2>
            <Link href="/admin/customers" className="text-xs text-amber-700 font-semibold hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {customers.slice(0, 5).map((cust) => (
              <div key={cust.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[11px]">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <Link href={`/admin/customers/${cust.id}`} className="font-bold text-gray-900 hover:text-amber-800 truncate block max-w-[80px]">
                      {cust.name}
                    </Link>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500">{cust.totalOrders} Orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-serif font-bold text-base text-gray-900">Recent Activity</h2>
            <button className="text-xs text-amber-700 font-semibold hover:underline">View All</button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 bg-amber-50 text-amber-700 rounded-full flex-shrink-0 mt-0.5"><ShoppingCart size={12} /></div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">New order received</p>
                <p className="text-[10px] text-gray-400">#SJF-10086 - ₹14,700 • 2h ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 bg-blue-50 text-blue-700 rounded-full flex-shrink-0 mt-0.5"><Package size={12} /></div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">Product stock updated</p>
                <p className="text-[10px] text-gray-400">Lumière Solitaire Ring • 4h ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-full flex-shrink-0 mt-0.5"><Users size={12} /></div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">New customer registered</p>
                <p className="text-[10px] text-gray-400">Priya Sharma • 5h ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 bg-purple-50 text-purple-700 rounded-full flex-shrink-0 mt-0.5"><BookOpen size={12} /></div>
              <div>
                <p className="font-semibold text-gray-900 leading-tight">Article published</p>
                <p className="text-[10px] text-gray-400">Jewellery Care Guide • 6h ago</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-200/60 pt-4 mt-8">
        <div>
          <span className="font-serif font-bold text-gray-600 uppercase tracking-widest">SUJATA FINE JEWELS</span>
          <span className="ml-2 text-gray-400">| Admin Panel</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Online</span>
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
}


