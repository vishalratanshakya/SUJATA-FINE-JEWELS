"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle, CreditCard, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CheckoutPage() {
  const [step, setStep] = useState<"information" | "payment" | "success">("information");
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const cartTotal = useStore((state) => state.getCartTotal());

  const [shippingForm, setShippingForm] = useState({
    email: "",
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "information") {
      // Validate Shipping Form
      if (!shippingForm.email) {
        toast.error("Email address is required.");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(shippingForm.name.trim())) {
        toast.error("Full Name must contain only letters.");
        return;
      }
      if (!/^\d{10}$/.test(shippingForm.phone.trim().replace(/\s+/g, '').replace(/^\+91/, ''))) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }
      if (!shippingForm.house || !shippingForm.street || !shippingForm.city || !shippingForm.state || !shippingForm.pincode) {
        toast.error("Please fill in all required address fields.");
        return;
      }
      setStep("payment");
    } else if (step === "payment") {
      // Validate Payment
      if (paymentMethod === "card") {
        if (!/^\d{16}$/.test(cardForm.cardNumber.replace(/\s+/g, ''))) {
          toast.error("Please enter a valid 16-digit card number.");
          return;
        }
        if (!cardForm.expiry || !cardForm.cvc) {
          toast.error("Please complete all card details.");
          return;
        }
      }

      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to place an order.");
          return;
        }

        const payload = {
          items: cart.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0],
            selectedSize: item.selectedSize,
            selectedLength: item.selectedLength,
            selectedVariant: item.selectedVariant
          })),
          totalAmount: cartTotal,
          paymentMethod: paymentMethod === "cod" ? "COD" : "CARD",
          shippingAddress: {
            name: shippingForm.name,
            line1: `${shippingForm.house}, ${shippingForm.street}`,
            line2: shippingForm.landmark,
            phone: shippingForm.phone,
            city: shippingForm.city,
            state: shippingForm.state,
            postalCode: shippingForm.pincode,
            country: "India"
          }
        };

        const res = await fetch(`${backendUrl}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          setStep("success");
          clearCart();
        } else {
          toast.error("Failed to place order.");
        }
      } catch (err) {
        toast.error("An error occurred during checkout.");
      }
    }
  };

  if (!mounted) return null;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <CheckCircle size={64} className="text-green-600 mb-6" strokeWidth={1} />
        <h1 className="font-serif text-4xl text-charcoal mb-4">Order Confirmed</h1>
        <p className="text-charcoal/60 mb-8 max-w-md">
          Thank you for your purchase. We have received your order and will send you a confirmation email shortly.
        </p>
        <Link href="/" className="bg-charcoal text-ivory text-xs tracking-widest uppercase py-4 px-8 hover:bg-champagne hover:text-white transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(cartTotal);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ivory pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Left: Checkout Steps */}
          <div className="w-full md:w-3/5">
            <Link href="/" className="font-serif text-2xl text-charcoal mb-8 block tracking-wider">SUJATA</Link>
            
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-charcoal/50 mb-10">
              <span className={step === "information" ? "text-charcoal font-bold" : ""}>Information & Shipping</span>
              <ChevronRight size={12} />
              <span className={step === "payment" ? "text-charcoal font-bold" : ""}>Payment</span>
            </div>

            <form className="space-y-8" onSubmit={handleContinue}>
              {step === "information" && (
                <>
                  <section>
                    <h2 className="text-lg font-serif text-charcoal mb-4">Contact</h2>
                    <input 
                      type="email" 
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                      placeholder="Email Address" 
                      className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors rounded-none"
                    />
                  </section>

                  <section>
                    <h2 className="text-lg font-serif text-charcoal mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          required 
                          placeholder="Full Name *" 
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({...shippingForm, name: e.target.value})}
                          className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                        />
                        <input 
                          type="text" 
                          required 
                          placeholder="Mobile Number *" 
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                          className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                        />
                      </div>
                      
                      <input 
                        type="text" 
                        required 
                        placeholder="House/Flat/Building Number *" 
                        value={shippingForm.house}
                        onChange={(e) => setShippingForm({...shippingForm, house: e.target.value})}
                        className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                      />
                      
                      <input 
                        type="text" 
                        required 
                        placeholder="Street/Area *" 
                        value={shippingForm.street}
                        onChange={(e) => setShippingForm({...shippingForm, street: e.target.value})}
                        className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                      />
                      
                      <input 
                        type="text" 
                        placeholder="Landmark (Optional)" 
                        value={shippingForm.landmark}
                        onChange={(e) => setShippingForm({...shippingForm, landmark: e.target.value})}
                        className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input 
                          type="text" 
                          required 
                          placeholder="City *" 
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                          className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                        />
                        <input 
                          type="text" 
                          required 
                          placeholder="State *" 
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm({...shippingForm, state: e.target.value})}
                          className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                        />
                        <input 
                          type="text" 
                          required 
                          placeholder="PIN Code *" 
                          value={shippingForm.pincode}
                          onChange={(e) => setShippingForm({...shippingForm, pincode: e.target.value})}
                          className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                        />
                      </div>
                    </div>
                  </section>
                </>
              )}

              {step === "payment" && (
                <section>
                  <h2 className="text-lg font-serif text-charcoal mb-4">Payment Options</h2>
                  
                  <div className="border border-charcoal/20 bg-white rounded-none divide-y divide-charcoal/10">
                    
                    {/* Credit Card Option */}
                    <div className="p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="card" 
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-charcoal focus:ring-charcoal accent-charcoal" 
                        />
                        <span className="flex-1 text-sm font-medium text-charcoal flex items-center space-x-2">
                          <CreditCard size={16} /> <span>Credit/Debit Card</span>
                        </span>
                      </label>
                      
                      {paymentMethod === "card" && (
                        <div className="mt-4 pt-4 border-t border-charcoal/5 space-y-4">
                          <input 
                            type="text" 
                            required 
                            placeholder="Card Number (16 digits)" 
                            value={cardForm.cardNumber}
                            onChange={(e) => setCardForm({...cardForm, cardNumber: e.target.value})}
                            className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              required 
                              placeholder="MM / YY" 
                              value={cardForm.expiry}
                              onChange={(e) => setCardForm({...cardForm, expiry: e.target.value})}
                              className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                            />
                            <input 
                              type="text" 
                              required 
                              placeholder="CVC" 
                              value={cardForm.cvc}
                              onChange={(e) => setCardForm({...cardForm, cvc: e.target.value})}
                              className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne rounded-none" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* COD Option */}
                    <div className="p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="cod" 
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-charcoal focus:ring-charcoal accent-charcoal" 
                        />
                        <span className="flex-1 text-sm font-medium text-charcoal flex items-center space-x-2">
                          <Banknote size={16} /> <span>Cash on Delivery (COD)</span>
                        </span>
                      </label>
                      
                      {paymentMethod === "cod" && (
                        <div className="mt-4 pt-4 border-t border-charcoal/5">
                          <p className="text-xs text-charcoal/70 leading-relaxed">
                            Pay with cash upon delivery. Please ensure you have the exact amount ready for the delivery executive.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </section>
              )}
              
              <button type="submit" className="w-full bg-charcoal text-ivory text-xs tracking-widest uppercase py-4 hover:bg-champagne hover:text-white transition-colors">
                {step === "information" ? "Continue to Payment" : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full md:w-2/5 bg-charcoal/5 p-8 border-l border-charcoal/10">
            <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>
            
            <div className="max-h-[40vh] overflow-y-auto mb-6 pr-2 space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex space-x-4">
                  <div className="w-16 h-16 bg-white relative rounded overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill sizes="64px" className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">{item.quantity}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-sm font-medium text-charcoal line-clamp-1">{item.product.name}</span>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest text-charcoal/60">
                      <span>{item.product.metal}</span>
                      {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      {item.selectedLength && <span>• Length: {item.selectedLength}</span>}
                      {item.selectedVariant && <span>• Style: {item.selectedVariant}</span>}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-charcoal">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-charcoal/10 pt-4 space-y-2 mb-4 text-sm text-charcoal/70">
              <div className="flex justify-between"><span>Subtotal</span><span>{formattedTotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            </div>
            
            <div className="border-t border-charcoal/10 pt-4 flex justify-between text-lg font-medium text-charcoal">
              <span>Total</span><span>{formattedTotal}</span>
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
