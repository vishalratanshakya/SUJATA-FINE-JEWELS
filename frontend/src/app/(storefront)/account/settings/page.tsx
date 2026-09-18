"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AccountSettingsPage() {


  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-1">
          <h1 className="font-serif text-3xl text-[#2C2825]">Account Settings</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            Manage your account preferences and security.
          </p>
        </div>

        {/* Setting Rows */}
        <div className="space-y-4 pt-2">
          
          {/* Row 1: Personal Info */}
          <Link
            href="/account/settings/profile"
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left block"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">Personal Information</h3>
                <p className="text-xs text-[#8C8275]">Change your name, email, and phone number</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </Link>

          {/* Row 2: Change Password */}
          <Link
            href="/account/settings/password"
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left block"
          >
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">Change Password</h3>
                <p className="text-xs text-[#8C8275]">Update your account password securely</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </Link>

          {/* Row 3: Preferences */}
          <Link
            href="/account/settings/preferences"
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left block"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">
                  Email &amp; Notification Preferences
                </h3>
                <p className="text-xs text-[#8C8275]">Manage communication and alert preferences</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </Link>

          {/* Row 4: Delete Account */}
          <Link
            href="/account/settings/delete"
            className="w-full p-5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors flex items-center justify-between text-left block"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700">Delete Account</h3>
                <p className="text-xs text-rose-500">Permanently remove your account and personal data</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-rose-400" />
          </Link>

        </div>

      </div>




    </AccountLayoutWrapper>
  );
}
