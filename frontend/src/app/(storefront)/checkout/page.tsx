"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import Image from "next/image";

export default function CheckoutPage() {
  const [step, setStep] = useState<"information" | "payment" | "success">("information");
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const cartTotal = useStore((state) => state.getCartTotal());

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "information") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("success");
      clearCart();
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
                    placeholder="Email Address" 
                    className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne transition-colors"
                  />
                </section>

                <section>
                  <h2 className="text-lg font-serif text-charcoal mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="First Name" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                    <input type="text" required placeholder="Last Name" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                    <input type="text" required placeholder="Address" className="col-span-2 w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                    <input type="text" required placeholder="City" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                    <input type="text" required placeholder="Postal Code" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                  </div>
                </section>
              </>
            )}

            {step === "payment" && (
              <section>
                <h2 className="text-lg font-serif text-charcoal mb-4">Payment Details</h2>
                <div className="p-4 border border-charcoal/20 bg-white space-y-4">
                  <input type="text" required placeholder="Card Number" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="MM / YY" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
                    <input type="text" required placeholder="CVC" className="w-full border border-charcoal/20 bg-white p-3 text-sm text-charcoal focus:outline-none focus:border-champagne" />
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
            {cart.map((item) => (
              <div key={item.product.id} className="flex space-x-4">
                <div className="w-16 h-16 bg-white relative rounded overflow-hidden">
                  <Image src={item.product.images[0]} alt={item.product.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">{item.quantity}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-sm font-medium text-charcoal line-clamp-1">{item.product.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-charcoal/60">{item.product.metal}</span>
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
  );
}
