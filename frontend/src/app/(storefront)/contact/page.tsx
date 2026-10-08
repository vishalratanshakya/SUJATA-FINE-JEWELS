"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "Bespoke Bridal Customization", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    fetch("/api/contact-info")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setContactInfo(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `[Inquiry: ${form.inquiryType}]\n\n${form.message}`
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        toast.success("Thank you! Your enquiry has been sent to our concierge.");
        setForm({ name: "", email: "", phone: "", inquiryType: "Bespoke Bridal Customization", message: "" });
      } else {
        setStatus("error");
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1c29] font-bold">We are Here to Assist You</h1>
          <p className="text-[#5B5E6E] leading-relaxed">
            Schedule a private boutique viewing, enquire about bespoke bridal commissions, or connect with our master gemologists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <h3 className="font-serif text-2xl text-[#1a1c29] font-bold mb-8">Direct Atelier Access</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-[#1a1c29] text-sm mb-1">Phone & WhatsApp VIP</p>
                    <p className="text-[#5B5E6E] text-sm">{contactInfo?.phone || "+91 98765 43210 (24/7 Available)"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-[#1a1c29] text-sm mb-1">Email Concierge</p>
                    <p className="text-[#5B5E6E] text-sm">{contactInfo?.email || "concierge@sujatafinejewels.com"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-[#1a1c29] text-sm mb-1">Flagship Vault</p>
                    <p className="text-[#5B5E6E] text-sm leading-relaxed whitespace-pre-wrap">
                      {contactInfo?.address || "42, Heritage Enclave, Outer Circle, Connaught Place, New Delhi - 110001"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-[#1a1c29] text-sm mb-1">Boutique Visiting Hours</p>
                    <p className="text-[#5B5E6E] text-sm leading-relaxed whitespace-pre-wrap">
                      {contactInfo?.hours || "Mon - Sat: 11:00 AM - 8:30 PM\nSunday: By Private VIP Appointment"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Banner */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1c29] text-sm">Chat with Jewelry Advisor</p>
                  <p className="text-emerald-600 text-xs">Instant response on WhatsApp</p>
                </div>
              </div>
              <Link 
                href={contactInfo?.whatsappLink || "https://wa.me/919876543210"}
                target="_blank"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                CHAT NOW
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-fit">
            <div className="mb-8">
              <h3 className="font-serif text-2xl text-[#1a1c29] font-bold mb-2">Send a Bespoke Enquiry</h3>
              <p className="text-[#5B5E6E] text-sm">Fill in the details below and our senior patron manager will get back to you within 2 business hours.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1a1c29] mb-2">Your Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rohit Sengar"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all bg-gray-50/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1a1c29] mb-2">Contact Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1c29] mb-2">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all bg-gray-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1c29] mb-2">Inquiry Type</label>
                <select
                  value={form.inquiryType}
                  onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all bg-gray-50/50 appearance-none"
                  required
                >
                  <option value="Bespoke Bridal Customization">Bespoke Bridal Customization</option>
                  <option value="Product Enquiry">Product Enquiry</option>
                  <option value="Book a Viewing Appointment">Book a Viewing Appointment</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1c29] mb-2">Message or Special Requests</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please tell us about your requirements..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all bg-gray-50/50 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={`group flex justify-center items-center space-x-2 w-full bg-[#1a1c29] text-white px-8 py-4 rounded-xl hover:bg-black transition-colors ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                {status !== "success" && <Send size={16} className="text-yellow-500" />}
                <span className="text-sm font-bold tracking-wide uppercase">
                  {status === "loading" ? "SENDING..." : status === "success" ? "MESSAGE SENT" : "SEND MESSAGE TO CONCIERGE"}
                </span>
              </button>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
