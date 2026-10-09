"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle, CreditCard, Banknote, Navigation, Loader2, MapPin, Minus, Plus, Tag, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CheckoutPage() {
  const [step, setStep] = useState<"information" | "payment" | "success">("information");
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cartTotal = useStore((state) => state.getCartTotal());

  const [shippingForm, setShippingForm] = useState({
    email: "", name: "", phone: "", house: "", street: "", landmark: "", city: "", state: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [cardForm, setCardForm] = useState({ cardNumber: "", expiry: "", cvc: "" });
  const [mounted, setMounted] = useState(false);

  // Saved addresses
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Live location
  const [isLocating, setIsLocating] = useState(false);

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [showCoupons, setShowCoupons] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Fetch saved addresses & available coupons
  useEffect(() => {
    const fetchData = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(`${backendUrl}/api/addresses`, { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const data = await res.json();
            const addresses = data.data || [];
            setSavedAddresses(addresses);
            const def = addresses.find((a: any) => a.isDefault);
            if (def) applyAddress(def);
          }
        } catch (err) { console.error(err); }
      }

      try {
        const res = await fetch(`${backendUrl}/api/coupons`);
        if (res.ok) {
          const data = await res.json();
          setAvailableCoupons(data.data || []);
        } else {
          console.error("Coupons fetch failed:", res.status, await res.text());
        }
      } catch (err) {
        console.error("Coupons fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const applyAddress = (addr: any) => {
    const parts = addr.addressLine1 ? addr.addressLine1.split(", ") : [];
    setShippingForm(prev => ({
      ...prev,
      name: addr.fullName || prev.name,
      phone: addr.phone || prev.phone,
      house: parts[0] || "",
      street: parts.slice(1).join(", ") || "",
      landmark: addr.addressLine2 || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.postalCode || "",
    }));
    setSelectedAddressId(addr._id);
  };

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          if (data?.address) {
            setShippingForm(prev => ({
              ...prev,
              house: data.address.house_number || data.address.building || prev.house,
              street: data.address.road || data.address.suburb || data.address.neighbourhood || prev.street,
              city: data.address.city || data.address.town || data.address.state_district || prev.city,
              state: data.address.state || prev.state,
              pincode: data.address.postcode || prev.pincode,
            }));
            setSelectedAddressId(null);
            toast.success("Location fetched!");
          }
        } catch { toast.error("Failed to fetch address"); }
        finally { setIsLocating(false); }
      },
      () => { toast.error("Location access denied"); setIsLocating(false); }
    );
  };

  const applyCoupon = async (code?: string) => {
    const couponCode = (code || couponInput).trim().toUpperCase();
    if (!couponCode) { toast.error("Enter a coupon code"); return; }
    setCouponLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, orderAmount: cartTotal }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon(data.data);
        setCouponInput(couponCode);
        setShowCoupons(false);
        toast.success(`Coupon applied! You save ₹${data.data.discountAmount.toLocaleString()}`);
      } else {
        toast.error(data.message || "Invalid coupon");
      }
    } catch { toast.error("Failed to validate coupon"); }
    finally { setCouponLoading(false); }
  };

  const removeCoupon = () => { setAppliedCoupon(null); setCouponInput(""); };

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const formatPrice = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "information") {
      if (!shippingForm.email) { toast.error("Email is required."); return; }
      if (!/^[a-zA-Z\s]+$/.test(shippingForm.name.trim())) { toast.error("Full Name must contain only letters."); return; }
      if (!/^\d{10}$/.test(shippingForm.phone.trim().replace(/\s+/g, "").replace(/^\+91/, ""))) { toast.error("Enter a valid 10-digit mobile number."); return; }
      if (!shippingForm.house || !shippingForm.street || !shippingForm.city || !shippingForm.state || !shippingForm.pincode) {
        toast.error("Please fill in all required address fields."); return;
      }
      setStep("payment");
    } else if (step === "payment") {
      if (paymentMethod === "card") {
        if (!/^\d{16}$/.test(cardForm.cardNumber.replace(/\s+/g, ""))) { toast.error("Enter a valid 16-digit card number."); return; }
        if (!cardForm.expiry || !cardForm.cvc) { toast.error("Complete all card details."); return; }
      }
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        if (!token) { toast.error("Please login to place an order."); return; }
        const payload = {
          items: cart.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0] || (item.product as any).primaryImage || "",
            selectedSize: item.selectedSize,
            selectedLength: item.selectedLength,
            selectedVariant: item.selectedVariant,
          })),
          totalAmount: cartTotal,
          discountAmount,
          couponCode: appliedCoupon?.code || null,
          paymentMethod: paymentMethod === "cod" ? "COD" : "CARD",
          shippingAddress: {
            name: shippingForm.name,
            line1: `${shippingForm.house}, ${shippingForm.street}`,
            line2: shippingForm.landmark,
            phone: shippingForm.phone,
            city: shippingForm.city,
            state: shippingForm.state,
            postalCode: shippingForm.pincode,
            country: "India",
          },
        };
        const res = await fetch(`${backendUrl}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (res.ok) { setStep("success"); clearCart(); }
        else {
          const errData = await res.json();
          toast.error(errData.message || "Failed to place order.");
        }
      } catch { toast.error("An error occurred during checkout."); }
    }
  };

  if (!mounted) return null;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <CheckCircle size={64} className="text-green-600 mb-6" strokeWidth={1} />
        <h1 className="font-serif text-4xl text-charcoal mb-4">Order Confirmed</h1>
        <p className="text-charcoal/60 mb-8 max-w-md">Thank you for your purchase. We have received your order and will send you a confirmation email shortly.</p>
        <Link href="/" className="bg-charcoal text-ivory text-xs tracking-widest uppercase py-4 px-8 hover:bg-champagne hover:text-white transition-colors">Return to Home</Link>
      </div>
    );
  }

  const inputCls = "w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors rounded-none";

  return (
    <ProtectedRoute>
      <>
      <div className="min-h-screen bg-ivory pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">

          {/* LEFT — form (order-1 on mobile & desktop) */}
          <div className="w-full md:w-3/5 order-1">
            <Link href="/" className="font-serif text-2xl text-charcoal mb-8 block tracking-wider">SUJATA</Link>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-charcoal/50 mb-10">
              <span className={step === "information" ? "text-charcoal font-bold" : ""}>Information & Shipping</span>
              <ChevronRight size={12} />
              <span className={step === "payment" ? "text-charcoal font-bold" : ""}>Payment</span>
            </div>

            <form id="checkout-form" className="space-y-8" onSubmit={handleContinue}>
              {step === "information" && (
                <>
                  <section>
                    <h2 className="text-lg font-serif text-charcoal mb-4">Contact</h2>
                    <input type="email" required value={shippingForm.email}
                      onChange={e => setShippingForm({...shippingForm, email: e.target.value})}
                      placeholder="Email Address" className={inputCls} />
                  </section>

                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-serif text-charcoal">Shipping Address</h2>
                      <button type="button" onClick={fetchLiveLocation} disabled={isLocating}
                        className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50">
                        {isLocating ? <Loader2 size={13} className="animate-spin" /> : <Navigation size={13} />}
                        <span>{isLocating ? "Locating..." : "Use Live Location"}</span>
                      </button>
                    </div>

                    {savedAddresses.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-3 font-semibold">Your Saved Addresses</p>
                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                          {savedAddresses.map(addr => (
                            <button key={addr._id} type="button" onClick={() => applyAddress(addr)}
                              className={`w-full text-left p-3 border flex items-start space-x-3 transition-all ${selectedAddressId === addr._id ? "border-charcoal bg-charcoal/5" : "border-charcoal/15 bg-white hover:border-charcoal/40"}`}>
                              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAddressId === addr._id ? "border-charcoal" : "border-charcoal/30"}`}>
                                {selectedAddressId === addr._id && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-0.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">{addr.label || "HOME"}</span>
                                  {addr.isDefault && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase">Default</span>}
                                </div>
                                <p className="text-xs text-charcoal font-medium">{addr.fullName} · {addr.phone}</p>
                                <p className="text-[11px] text-charcoal/60 truncate">{addr.addressLine1}, {addr.city}, {addr.state} — {addr.postalCode}</p>
                              </div>
                              <MapPin size={14} className="text-charcoal/30 flex-shrink-0 mt-1" />
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 my-4">
                          <div className="flex-1 h-px bg-charcoal/10" />
                          <span className="text-[10px] uppercase tracking-widest text-charcoal/40">or fill manually</span>
                          <div className="flex-1 h-px bg-charcoal/10" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" required placeholder="Full Name *" value={shippingForm.name}
                          onChange={e => setShippingForm({...shippingForm, name: e.target.value})} className={inputCls} />
                        <input type="text" required placeholder="Mobile Number *" value={shippingForm.phone}
                          onChange={e => setShippingForm({...shippingForm, phone: e.target.value})} className={inputCls} />
                      </div>
                      <input type="text" required placeholder="House/Flat/Building Number *" value={shippingForm.house}
                        onChange={e => setShippingForm({...shippingForm, house: e.target.value})} className={inputCls} />
                      <input type="text" required placeholder="Street/Area *" value={shippingForm.street}
                        onChange={e => setShippingForm({...shippingForm, street: e.target.value})} className={inputCls} />
                      <input type="text" placeholder="Landmark (Optional)" value={shippingForm.landmark}
                        onChange={e => setShippingForm({...shippingForm, landmark: e.target.value})} className={inputCls} />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input type="text" required placeholder="City *" value={shippingForm.city}
                          onChange={e => setShippingForm({...shippingForm, city: e.target.value})} className={inputCls} />
                        <input type="text" required placeholder="State *" value={shippingForm.state}
                          onChange={e => setShippingForm({...shippingForm, state: e.target.value})} className={inputCls} />
                        <input type="text" required placeholder="PIN Code *" value={shippingForm.pincode}
                          onChange={e => setShippingForm({...shippingForm, pincode: e.target.value})} className={inputCls} />
                      </div>
                    </div>
                  </section>
                </>
              )}

              {step === "payment" && (
                <section>
                  <h2 className="text-lg font-serif text-charcoal mb-4">Payment</h2>
                  <div className="border border-charcoal/10 divide-y divide-charcoal/10">
                    <div className="p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="w-4 h-4 accent-charcoal" />
                        <span className="flex-1 text-sm font-medium text-charcoal flex items-center space-x-2"><CreditCard size={16} /> <span>Credit / Debit Card</span></span>
                      </label>
                      {paymentMethod === "card" && (
                        <div className="mt-4 space-y-3 pt-4 border-t border-charcoal/5">
                          <input type="text" required placeholder="Card Number" value={cardForm.cardNumber}
                            onChange={e => setCardForm({...cardForm, cardNumber: e.target.value})} className={inputCls} />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" required placeholder="MM / YY" value={cardForm.expiry}
                              onChange={e => setCardForm({...cardForm, expiry: e.target.value})} className={inputCls} />
                            <input type="text" required placeholder="CVC" value={cardForm.cvc}
                              onChange={e => setCardForm({...cardForm, cvc: e.target.value})} className={inputCls} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-4 h-4 accent-charcoal" />
                        <span className="flex-1 text-sm font-medium text-charcoal flex items-center space-x-2"><Banknote size={16} /> <span>Cash on Delivery (COD)</span></span>
                      </label>
                      {paymentMethod === "cod" && (
                        <div className="mt-4 pt-4 border-t border-charcoal/5">
                          <p className="text-xs text-charcoal/70 leading-relaxed">Pay with cash upon delivery. Please ensure you have the exact amount ready.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* No button here — Complete Order is in the right column under the Total */}
                </section>
              )}

            </form>
          </div>

          {/* RIGHT: Order Summary — order-2 on mobile & desktop */}
          <div className="w-full md:w-2/5 bg-charcoal/5 p-8 border-l border-charcoal/10 self-start md:sticky md:top-24 order-2">
            <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>

            {/* Cart Items with quantity + remove controls */}
            <div className="md:max-h-[40vh] max-h-none md:overflow-y-auto mb-6 pr-1 space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex space-x-3">
                  <div className="w-18 h-18 min-w-[72px] min-h-[72px] bg-white relative rounded-lg overflow-hidden border border-charcoal/10 shadow-sm">
                    <Image src={item.product.images?.[0] || (item.product as any).primaryImage || "/placeholder.jpg"}
                      alt={item.product.name} fill sizes="72px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <p className="text-xs font-semibold text-charcoal line-clamp-2 leading-snug flex-1">{item.product.name}</p>
                      {/* Remove button — clears stale/unwanted cart items */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-charcoal/10 hover:bg-red-100 hover:text-red-600 text-charcoal/40 transition-colors ml-1"
                        title="Remove item"
                      >
                        <X size={10} />
                      </button>
                    </div>
                    {item.product.metal && (
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50 bg-white px-1.5 py-0.5 rounded border border-charcoal/10 inline-block mb-2">
                        {item.product.metal}
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/20 rounded">
                        <button type="button"
                          onClick={() => item.quantity <= 1 ? removeFromCart(item.product.id) : updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-charcoal/5 transition-colors text-charcoal">
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-charcoal">{item.quantity}</span>
                        <button type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-charcoal/5 transition-colors text-charcoal">
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-charcoal">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="border-t border-charcoal/10 pt-4 mb-4">
              {!appliedCoupon ? (
                <div className="space-y-3">
                  {/* Coupon input row */}
                  <div className="flex space-x-2">
                    <input
                      type="text" value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                      placeholder="Enter coupon code"
                      className="flex-1 border border-charcoal/20 bg-white p-2.5 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-sm uppercase placeholder:normal-case placeholder:text-charcoal/40"
                    />
                    <button type="button" onClick={() => applyCoupon()} disabled={couponLoading}
                      className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm hover:bg-champagne transition-colors disabled:opacity-50 flex-shrink-0 flex items-center space-x-1.5">
                      {couponLoading ? <Loader2 size={13} className="animate-spin" /> : <span>Apply</span>}
                    </button>
                  </div>

                  {/* View All Coupons Button */}
                  <button type="button" onClick={() => setShowCoupons(true)}
                    className="w-full flex items-center justify-between border border-dashed border-[#B38E5D]/50 bg-amber-50/50 hover:bg-amber-50 text-[#B38E5D] hover:text-charcoal px-3 py-2.5 rounded-sm transition-all group">
                    <div className="flex items-center space-x-2">
                      <Tag size={14} className="text-[#B38E5D]" />
                      <span className="text-xs font-bold uppercase tracking-wider">View All Offers & Coupons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {availableCoupons.length > 0 && (
                        <span className="bg-[#B38E5D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{availableCoupons.length}</span>
                      )}
                      <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>

              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-sm px-3 py-2.5">
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700">{appliedCoupon.code}</span>
                    <span className="text-xs text-green-600">— You save {formatPrice(discountAmount)}</span>
                  </div>
                  <button type="button" onClick={removeCoupon} className="text-green-600 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t border-charcoal/10 pt-4 space-y-2 text-sm text-charcoal/70">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon Discount</span><span>−{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
            </div>
            <div className="border-t border-charcoal/10 pt-4 mt-2 flex justify-between text-lg font-semibold text-charcoal">
              <span>Total</span><span>{formatPrice(finalTotal)}</span>
            </div>

            {/* Action button — always under the Total on ALL screen sizes */}
            {step === "information" && (
              <button
                form="checkout-form"
                type="submit"
                className="w-full mt-5 bg-charcoal text-ivory text-xs tracking-widest uppercase py-4 hover:bg-champagne hover:text-white transition-colors"
              >
                Continue to Payment
              </button>
            )}
            {step === "payment" && (
              <button
                form="checkout-form"
                type="submit"
                className="w-full mt-5 bg-charcoal text-ivory text-xs tracking-widest uppercase py-4 hover:bg-champagne hover:text-white transition-colors"
              >
                Complete Order
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Coupon Modal */}
      {showCoupons && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowCoupons(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-serif text-lg text-charcoal">Available Offers</h3>
                <p className="text-xs text-charcoal/50 mt-0.5">{availableCoupons.length} coupon{availableCoupons.length !== 1 ? "s" : ""} available</p>
              </div>
              <button onClick={() => setShowCoupons(false)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-charcoal/60 hover:text-charcoal">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {availableCoupons.length === 0 ? (
                <div className="text-center py-10 text-charcoal/40">
                  <Tag size={36} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No coupons available right now</p>
                </div>
              ) : (
                availableCoupons.map(c => {
                  const savingsText = c.discountType === "percentage"
                    ? `${c.discountValue}% off${c.maxDiscount ? ` (up to ₹${c.maxDiscount.toLocaleString()})` : ""}`
                    : `Flat ₹${c.discountValue.toLocaleString()} off`;
                  const isEligible = cartTotal >= (c.minOrderAmount || 0);
                  return (
                    <div key={c._id} className={`border rounded-xl p-4 transition-all ${isEligible ? "border-charcoal/15 bg-white hover:border-[#B38E5D]/50" : "border-gray-100 bg-gray-50 opacity-60"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1.5">
                            <span className="font-mono font-bold text-sm text-charcoal border border-dashed border-charcoal/20 px-2.5 py-0.5 rounded tracking-wider">{c.code}</span>
                            {!isEligible && <span className="text-[10px] text-red-400 font-semibold">Min ₹{c.minOrderAmount?.toLocaleString()} needed</span>}
                          </div>
                          <p className="text-sm font-bold text-[#B38E5D]">{savingsText}</p>
                          {c.description && <p className="text-xs text-charcoal/60 mt-0.5">{c.description}</p>}
                          <div className="flex flex-wrap gap-x-3 mt-2 text-[10px] text-charcoal/40 uppercase tracking-wider">
                            {c.minOrderAmount > 0 && <span>Min. ₹{c.minOrderAmount.toLocaleString()}</span>}
                            {c.expiresAt && <span>Expires {new Date(c.expiresAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short" })}</span>}
                            {c.usageLimit && <span>{c.usedCount}/{c.usageLimit} used</span>}
                          </div>
                        </div>
                        <button type="button" onClick={() => applyCoupon(c.code)} disabled={!isEligible || couponLoading}
                          className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isEligible ? "bg-charcoal hover:bg-[#B38E5D] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                          Apply
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex space-x-2">
                <input type="text" value={couponInput} onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Or enter code manually"
                  className="flex-1 border border-charcoal/20 bg-gray-50 px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-lg uppercase placeholder:normal-case placeholder:text-charcoal/40" />
                <button type="button" onClick={() => applyCoupon()} disabled={couponLoading}
                  className="bg-charcoal text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg hover:bg-champagne transition-colors disabled:opacity-50 flex-shrink-0">
                  {couponLoading ? <Loader2 size={13} className="animate-spin" /> : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    </ProtectedRoute>
  );
}
