"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Edit2,
  Camera,
  ChevronRight,
  Check,
  X,
  Lock,
  ArrowRight,
  Package,
  Award,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Plus,
  Trash2,
  Bell,
} from "lucide-react";

export default function AccountPage() {
  const products = useStore((s) => s.products);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);

  const { user } = useAuth();
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // The edit profile is now handled on a separate page


  // Address State
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      title: "HOME",
      isDefault: true,
      name: "Aanya Sharma",
      line1: "12, Green Avenue, South Extension",
      line2: "New Delhi - 110049, Delhi",
      country: "India",
      phone: "+91 98765 43210",
    },
  ]);



  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passForm, setPassForm] = useState({ old: "", newPass: "", confirm: "" });

  const recentOrders = [
    {
      id: "#SJ10018",
      name: "Celestial Drop Pendant",
      date: "12 May, 2025",
      price: 42000,
      itemCount: "1 Item",
      status: "Delivered",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[1]?.images[0] || "/images/products/necklaces/necklace_placeholder.jpg",
    },
    {
      id: "#SJ10017",
      name: "Eternal Bloom Studs",
      date: "08 May, 2025",
      price: 68000,
      itemCount: "1 Item",
      status: "Delivered",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[2]?.images[0] || "/images/products/earrings/earrings_placeholder.jpg",
    },
    {
      id: "#SJ10016",
      name: "Luxe Solitaire Ring",
      date: "01 May, 2025",
      price: 78999,
      itemCount: "1 Item",
      status: "Processing",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      image: products[0]?.images[0] || "/images/products/rings/ring_placeholder.jpg",
    },
    {
      id: "#SJ10015",
      name: "Diamond Tennis Bracelet",
      date: "25 Apr, 2025",
      price: 124999,
      itemCount: "1 Item",
      status: "Delivered",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[3]?.images[0] || "/images/products/bracelets/bracelet_placeholder.jpg",
    },
  ];




  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address deleted");
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <AccountLayoutWrapper>
      
      {/* ── MAIN PROFILE HEADER & INFO CARD ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-8">
        
        {/* Greeting & Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2825] font-normal">
              Welcome back, {userProfile.name.split(" ")[0]} ✨
            </h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Here's what's happening with your account today.
            </p>
          </div>
          <Link
            href="/account/settings/profile"
            className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B38E5D] hover:bg-[#997746] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-xs self-start sm:self-auto"
          >
            <Edit2 size={14} />
            <span>EDIT PROFILE</span>
          </Link>
        </div>

        {/* Profile Avatar & Contact Details */}
        <div className="hidden md:flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B38E5D] relative shadow-sm bg-[#F5EFE6] flex items-center justify-center">
              <User size={40} className="text-[#B38E5D]" />
            </div>
            <Link
              href="/account/settings/profile"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2C2825] text-white flex items-center justify-center border-2 border-white shadow-xs hover:bg-[#B38E5D] transition-colors"
            >
              <Camera size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 w-full">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C8275]">Full Name</span>
              <p className="font-serif text-lg font-medium text-[#2C2825]">{userProfile.name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C8275]">Email Address</span>
              <p className="text-sm font-sans text-[#2C2825] truncate">{userProfile.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C8275]">Phone Number</span>
              <p className="text-sm font-mono text-[#2C2825]">{userProfile.phone}</p>
            </div>
          </div>
        </div>

        {/* ── ACCOUNT STATISTICS Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <Link
            href="/account/orders"
            className="bg-[#FAF8F5] hover:bg-[#F5EFE6] p-5 rounded-2xl border border-[#EAE4D9] transition-all text-left group block"
          >
            <div className="flex items-center justify-between mb-3">
              <ShoppingBag size={22} className="text-[#B38E5D]" />
              <span className="font-serif text-2xl font-bold text-[#2C2825]">18</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">TOTAL ORDERS</h4>
            <p className="text-[11px] text-[#B38E5D] font-medium mt-1 flex items-center space-x-1 group-hover:underline">
              <span>View all orders</span> <ArrowRight size={12} />
            </p>
          </Link>

          <Link
            href="/account/orders"
            className="bg-[#FAF8F5] hover:bg-[#F5EFE6] p-5 rounded-2xl border border-[#EAE4D9] transition-all text-left group block"
          >
            <div className="flex items-center justify-between mb-3">
              <Package size={22} className="text-[#B38E5D]" />
              <span className="font-serif text-2xl font-bold text-[#2C2825]">3</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">PROCESSING</h4>
            <p className="text-[11px] text-[#B38E5D] font-medium mt-1 flex items-center space-x-1 group-hover:underline">
              <span>Track your orders</span> <ArrowRight size={12} />
            </p>
          </Link>

          <Link
            href="/account/orders"
            className="bg-[#FAF8F5] hover:bg-[#F5EFE6] p-5 rounded-2xl border border-[#EAE4D9] transition-all text-left group block"
          >
            <div className="flex items-center justify-between mb-3">
              <Check size={22} className="text-[#B38E5D]" />
              <span className="font-serif text-2xl font-bold text-[#2C2825]">12</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">DELIVERED</h4>
            <p className="text-[11px] text-[#B38E5D] font-medium mt-1 flex items-center space-x-1 group-hover:underline">
              <span>View delivered orders</span> <ArrowRight size={12} />
            </p>
          </Link>

          <Link
            href="/account/wishlist"
            className="bg-[#FAF8F5] hover:bg-[#F5EFE6] p-5 rounded-2xl border border-[#EAE4D9] transition-all text-left group block"
          >
            <div className="flex items-center justify-between mb-3">
              <Heart size={22} className="text-[#B38E5D]" />
              <span className="font-serif text-2xl font-bold text-[#2C2825]">{wishlist.length}</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">WISHLIST ITEMS</h4>
            <p className="text-[11px] text-[#B38E5D] font-medium mt-1 flex items-center space-x-1 group-hover:underline">
              <span>View wishlist</span> <ArrowRight size={12} />
            </p>
          </Link>

        </div>
      </div>

      {/* ── RECENT ORDERS + SAVED ADDRESSES GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#EAE4D9] shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
            <h3 className="font-serif text-xl text-[#2C2825]">Recent Orders</h3>
            <Link
              href="/account/orders"
              className="text-xs font-bold uppercase tracking-widest text-[#B38E5D] hover:underline"
            >
              VIEW ALL ORDERS
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#2C2825] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white border border-[#EAE4D9] flex-shrink-0">
                    <Image src={order.image} alt={order.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-medium text-[#2C2825]">{order.name}</h4>
                    <p className="text-xs text-[#8C8275]">
                      Order ID: <span className="font-mono">{order.id}</span> • {order.date}
                    </p>
                    <p className="text-xs font-semibold text-[#2C2825] mt-1">
                      {formatPrice(order.price)} <span className="text-[11px] font-normal text-[#8C8275]">({order.itemCount})</span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                  <Link
                    href={`/account/orders`}
                    className="px-4 py-1.5 border border-[#2C2825] rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#2C2825] hover:bg-[#2C2825] hover:text-white transition-colors"
                  >
                    VIEW ORDER
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Addresses + Settings Shortcut Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white rounded-2xl p-6 border border-[#EAE4D9] shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-xl text-[#2C2825]">Saved Addresses</h3>
              <Link
                href="/account/addresses"
                className="text-xs font-bold uppercase tracking-widest text-[#B38E5D] hover:underline"
              >
                MANAGE ADDRESSES
              </Link>
            </div>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-5 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5] relative space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">
                        {addr.title}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-[#B38E5D]/10 text-[#B38E5D] border border-[#B38E5D]/30 px-2 py-0.5 rounded">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-rose-500 hover:text-rose-700"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="font-serif text-base font-medium text-[#2C2825]">{addr.name}</p>
                  <p className="text-xs text-[#6B6357] leading-relaxed">
                    {addr.line1}<br />
                    {addr.line2}<br />
                    {addr.country} • {addr.phone}
                  </p>
                </div>
              ))}

              <Link
                href="/account/addresses/add"
                className="w-full py-3 border-2 border-dashed border-[#E2DDD3] hover:border-[#2C2825] rounded-xl text-xs font-bold uppercase tracking-widest text-[#6B6357] hover:text-[#2C2825] transition-colors flex items-center justify-center space-x-2 block"
              >
                <Plus size={16} />
                <span>ADD NEW ADDRESS</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EAE4D9] shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-xl text-[#2C2825]">Account Settings</h3>
              <Link
                href="/account/settings"
                className="text-xs font-bold uppercase tracking-widest text-[#B38E5D] hover:underline"
              >
                MANAGE ACCOUNT
              </Link>
            </div>

            <div className="space-y-3">
              <Link
                href="/account/settings"
                className="w-full p-4 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left block"
              >
                <div className="flex items-center space-x-3">
                  <Lock size={18} className="text-[#8C8275]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">Change Password</p>
                    <p className="text-[11px] text-[#8C8275]">Update your login credentials securely</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#8C8275]" />
              </Link>

              <Link
                href="/account/notifications"
                className="w-full p-4 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left block"
              >
                <div className="flex items-center space-x-3">
                  <Bell size={18} className="text-[#8C8275]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">
                      Email &amp; Notification Preferences
                    </p>
                    <p className="text-[11px] text-[#8C8275]">Manage newsletter and order updates</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#8C8275]" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ── WISHLIST SECTION ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
          <h3 className="font-serif text-2xl text-[#2C2825]">Wishlist</h3>
          <Link
            href="/account/wishlist"
            className="text-xs font-bold uppercase tracking-widest text-[#B38E5D] hover:underline"
          >
            VIEW WISHLIST
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#8C8275]">
            Your wishlist is empty. Explore our collection and click the heart icon to save items.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wishlist.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="group bg-[#FAF8F5] rounded-xl p-4 border border-[#D5CEC4] space-y-3 relative flex flex-col justify-between hover:border-[#B38E5D] transition-colors shadow-sm"
              >
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 z-10 text-rose-600 hover:scale-110 transition-transform"
                >
                  <Heart size={18} className="fill-rose-600" />
                </button>

                <Link href={`/product/${product.slug}`} className="block space-y-3">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-white border border-[#EAE4D9]">
                    <Image
                      src={product.images[0] || "/images/products/rings/ring_placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#2C2825] truncate">{product.name}</h4>
                    <p className="text-xs font-semibold text-[#B38E5D] mt-1">{formatPrice(product.price)}</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Added to bag!");
                  }}
                  className="w-full py-2 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  ADD TO BAG
                </button>
              </div>
            ))}
          </div>
        )}
      </div>



      {/* ── BOTTOM TRUST BADGES ── */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAE4D9] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <Award size={24} className="text-[#B38E5D]" />
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">CERTIFIED DIAMONDS</h5>
          <p className="text-[11px] text-[#8C8275]">100% Authentic IGI / GIA</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <ShieldCheck size={24} className="text-[#B38E5D]" />
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">SECURE SHIPPING</h5>
          <p className="text-[11px] text-[#8C8275]">Insured &amp; Express Delivery</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <RotateCcw size={24} className="text-[#B38E5D]" />
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">EASY RETURNS</h5>
          <p className="text-[11px] text-[#8C8275]">15-Day Exchange Guarantee</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Headphones size={24} className="text-[#B38E5D]" />
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">LIFETIME SUPPORT</h5>
          <p className="text-[11px] text-[#8C8275]">Dedicated Concierge Care</p>
        </div>
      </div>


    </AccountLayoutWrapper>
  );
}
