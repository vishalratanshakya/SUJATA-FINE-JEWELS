"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent to SUJATA Concierge.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal">CONTACT OUR CONCIERGE</h1>
        <p className="text-xs text-charcoal/60 uppercase tracking-widest">
          We are here to assist with bespoke designs, order inquiries, and care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-charcoal/10 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl text-charcoal">Sujata Fine Jewels Flagship</h3>
            
            <div className="space-y-4 text-xs text-charcoal/70">
              <div className="flex items-start space-x-4">
                <MapPin size={20} className="text-champagne flex-shrink-0 mt-0.5" />
                <p>12, South Extension Part II, Ring Road, New Delhi - 110049, India</p>
              </div>

              <div className="flex items-center space-x-4">
                <Phone size={20} className="text-champagne flex-shrink-0" />
                <p className="font-mono">+91 98765 43210 / +91 11 4100 8899</p>
              </div>

              <div className="flex items-center space-x-4">
                <Mail size={20} className="text-champagne flex-shrink-0" />
                <p>concierge@sujatafinejewels.com</p>
              </div>
            </div>

            <div className="border-t border-charcoal/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">BOUTIQUE HOURS</p>
              <p className="text-xs text-charcoal/60">Monday – Sunday: 11:00 AM – 8:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-charcoal/10 shadow-xs space-y-6">
          <h3 className="font-serif text-2xl text-charcoal">Send Us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Aanya Sharma"
                  className="w-full border border-charcoal/20 rounded-xl p-3.5 focus:outline-none focus:border-charcoal bg-ivory/50"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full border border-charcoal/20 rounded-xl p-3.5 focus:outline-none focus:border-charcoal bg-ivory/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-charcoal mb-1.5">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full border border-charcoal/20 rounded-xl p-3.5 focus:outline-none focus:border-charcoal bg-ivory/50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-charcoal mb-1.5">Message *</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we assist you with our jewellery collections?"
                className="w-full border border-charcoal/20 rounded-xl p-3.5 focus:outline-none focus:border-charcoal bg-ivory/50"
                required
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-charcoal hover:bg-champagne text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Send size={15} />
              <span>SEND MESSAGE</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
