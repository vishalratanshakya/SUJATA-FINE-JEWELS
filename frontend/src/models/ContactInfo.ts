import mongoose from 'mongoose';

const ContactInfoSchema = new mongoose.Schema({
  phone: { type: String, default: "+91 98765 43210 (24/7 Available)" },
  email: { type: String, default: "concierge@sujatafinejewels.com" },
  address: { type: String, default: "42, Heritage Enclave, Outer Circle, Connaught Place, New Delhi - 110001" },
  hours: { type: String, default: "Mon - Sat: 11:00 AM - 8:30 PM\nSunday: By Private VIP Appointment" },
  whatsappLink: { type: String, default: "https://wa.me/919876543210" },
  updatedAt: { type: Date, default: Date.now }
});

export const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', ContactInfoSchema);
