"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) {
      errs.email = "Admin Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid admin email address";
    }
    if (!password) {
      errs.password = "Password is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate admin login
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes("admin") || email === "admin@sujatafinejewels.com" || email === "admin@example.com") {
        toast.success("Welcome back to Admin Portal!");
        router.push("/admin");
      } else {
        toast.error("You do not have permission to access the admin portal.");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0F0E0D] pt-28 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-[#1A1816] rounded-3xl border border-[#332E27] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* ── LEFT PANEL: Admin Dark Luxury Visual ── */}
        <div className="lg:col-span-5 relative flex flex-col justify-between p-8 lg:p-12 bg-[#141210] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#2C2721]">
          {/* Dark Luxury Jewelry Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/auth/admin_ring.jpg"
              alt="Sujata Admin Portal Solitaire Ring"
              fill
              priority
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/60 to-[#141210]/75" />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10 space-y-3">
            <Link href="/" className="inline-flex items-center space-x-2 text-[#8C8275] hover:text-[#C5A880] transition-colors mb-6 text-xs uppercase tracking-widest font-semibold">
              <ArrowLeft size={16} />
              <span>Back to Website</span>
            </Link>

            <div className="space-y-1">
              <h2 className="font-serif text-2xl tracking-[0.25em] text-[#FFFDF9] font-light uppercase">
                SUJATA
              </h2>
              <p className="text-[9px] tracking-[0.4em] text-[#C5A880] font-semibold uppercase">
                FINE JEWELS
              </p>
            </div>
            <div className="w-12 h-[1px] bg-[#C5A880]/50 my-4" />
          </div>

          {/* Center Title */}
          <div className="relative z-10 my-8 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#C5A880]/10 border border-[#C5A880]/30 px-3 py-1 rounded-full">
              <ShieldCheck size={14} className="text-[#C5A880]" />
              <span className="text-[10px] font-semibold tracking-widest text-[#C5A880] uppercase">
                Admin Portal
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-[#FFFDF9] font-normal leading-tight">
              Secure. Manage.<br />
              <span className="italic font-light text-[#C5A880]">Grow.</span>
            </h3>
            <p className="text-xs text-[#A89E90] leading-relaxed max-w-xs font-sans">
              Sign in to access your administrative dashboard, manage products, store orders, and inventory.
            </p>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 pt-4 border-t border-[#2C2721]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] font-mono">
              256-Bit Encrypted Admin Access
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL: Admin Login Form ── */}
        <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center bg-[#1A1816]">
          <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="font-serif text-3xl text-[#FFFDF9] font-normal mb-1">
                Admin Login
              </h1>
              <p className="text-xs text-[#8C8275] tracking-wider uppercase font-sans">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className={`w-full bg-[#24211D] border pl-11 pr-4 py-3 text-sm text-[#FFFDF9] placeholder-[#736A5E] rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? "border-rose-500 focus:border-rose-400 bg-rose-950/20"
                        : "border-[#3D3730] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.error("Please contact super admin to reset password")}
                    className="text-xs text-[#8C8275] hover:text-[#C5A880] transition-colors font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className={`w-full bg-[#24211D] border pl-11 pr-11 py-3 text-sm text-[#FFFDF9] placeholder-[#736A5E] rounded-xl focus:outline-none transition-all ${
                      errors.password
                        ? "border-rose-500 focus:border-rose-400 bg-rose-950/20"
                        : "border-[#3D3730] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8275] hover:text-[#C5A880] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C5A880] hover:bg-[#B39366] text-[#141210] text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock size={16} />
                    <span>LOGIN TO DASHBOARD</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 text-center border-t border-[#2C2721]">
              <p className="text-[11px] text-[#736A5E] tracking-wider uppercase">
                Secure access to SUJATA Fine Jewels Admin Portal
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
