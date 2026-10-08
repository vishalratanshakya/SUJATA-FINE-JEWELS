"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Mail, Phone, Calendar, Search } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      } else {
        toast.error("Failed to load messages");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while loading messages");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer Messages & Enquiries</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
          <p className="text-gray-500">You haven't received any enquiries yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-start border-b border-gray-50 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {msg.email}</span>
                    {msg.phone && <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {msg.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(msg.createdAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
              
              <div className="pt-2 text-gray-700 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
