"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Form Side */}
          <div className="flex flex-col space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/60 mb-2">
                Get In Touch
              </h2>
              <h3 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight">
                Contact <span className="italic font-light">Us</span>
              </h3>
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed mt-4">
                Whether you are looking for a bespoke creation, wish to inquire about a piece in our collection, or need assistance with your order, our dedicated team is here to help.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-charcoal/70 mb-2 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-charcoal/20 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-charcoal/70 mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b border-charcoal/20 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-charcoal/70 mb-2 uppercase tracking-wider">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-charcoal/70 mb-2 uppercase tracking-wider">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 focus:outline-none focus:border-charcoal transition-colors resize-none"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={`group flex items-center space-x-2 bg-charcoal text-white px-8 py-3 rounded-full hover:bg-black transition-colors ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                <span className="text-sm tracking-widest uppercase font-medium">
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent" : "Send Message"}
                </span>
                {status !== "success" && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
              
              {status === "error" && (
                <p className="text-red-500 text-sm">There was an error sending your message. Please try again.</p>
              )}
            </form>
          </div>
          
          {/* Info Side */}
          <div className="order-1 lg:order-2 bg-pearl p-8 md:p-12 rounded-2xl flex flex-col justify-center space-y-12">
            <div>
              <h4 className="font-serif text-2xl text-charcoal mb-6">Our Boutique</h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="text-charcoal/50 mt-1 shrink-0" />
                  <div>
                    <p className="text-charcoal font-medium">Sujata Fine Jewels Flagship</p>
                    <p className="text-charcoal/70 text-sm mt-1">123 Luxury Avenue, Designer District<br/>New Delhi, 110001, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-charcoal/50 mt-1 shrink-0" />
                  <div>
                    <p className="text-charcoal font-medium">Phone</p>
                    <p className="text-charcoal/70 text-sm mt-1">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-charcoal/50 mt-1 shrink-0" />
                  <div>
                    <p className="text-charcoal font-medium">Email</p>
                    <p className="text-charcoal/70 text-sm mt-1">contact@sujatafinejewels.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-charcoal/10">
              <h4 className="font-serif text-2xl text-charcoal mb-4">Opening Hours</h4>
              <div className="space-y-2 text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>10:30 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
