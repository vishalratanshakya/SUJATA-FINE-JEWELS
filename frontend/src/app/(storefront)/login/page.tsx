"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back! Successfully logged in.");
      router.push("/account");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#EBE7E0] p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl bg-[#FAF8F5] rounded-2xl border border-[#DCD4C7] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] relative">
        
        {/* Top Floating Back to Website Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 z-20 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#6B6357] hover:text-[#2C2825] hover:bg-white transition-all text-xs font-medium shadow-xs border border-[#E2DDD3]"
        >
          <ArrowLeft size={14} />
          <span>Back to Website</span>
        </Link>

        {/* ── LEFT PANEL: Luxury Brand Storytelling ── */}
        <div className="lg:col-span-5 relative flex flex-col justify-between p-8 lg:p-12 bg-[#F2EDE4] overflow-hidden pt-16 lg:pt-16 min-h-[500px]">
          {/* Background Image (Lower third composition) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/auth/login_ring.jpg"
              alt="Sujata Fine Jewels Solitaire Ring"
              fill
              priority
              className="object-cover object-bottom opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#F2EDE4]/60 to-transparent h-3/4" />
          </div>

          {/* Top Section: Brand Header + Main Title + Description */}
          <div className="relative z-10 space-y-6 text-center mt-2">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-[#1F1B18] font-semibold uppercase drop-shadow-xs">
                SUJATA
              </h2>
              <p className="text-[9px] tracking-[0.4em] text-[#9A7A4C] font-bold uppercase">
                FINE JEWELS
              </p>
              <div className="flex items-center justify-center space-x-2 pt-1">
                <div className="w-8 h-[1px] bg-[#B38E5D]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
                <div className="w-8 h-[1px] bg-[#B38E5D]" />
              </div>
            </div>

            {/* Main Title & Subheading (Upper Positioned) */}
            <div className="space-y-3 px-2">
              <h3 className="font-serif text-3xl lg:text-4xl text-[#1F1B18] font-normal leading-tight drop-shadow-xs">
                Timeless Elegance,<br />
                <span className="italic font-light text-[#9A7A4C]">Crafted for You</span>
              </h3>
              <p className="text-xs text-[#4A433A] font-medium leading-relaxed max-w-xs mx-auto font-sans">
                Sign in to explore our exquisite collections and exclusive offers.
              </p>
            </div>
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 pt-4 text-center mt-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#2C2825] font-semibold font-mono bg-white/60 backdrop-blur-xs py-1 px-3 rounded-full inline-block border border-white/80 shadow-xs">
              PURE LUXURY • HANDCRAFTED
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL: User Login Form ── */}
        <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center bg-[#FAF8F5]">
          <div className="max-w-md w-full mx-auto space-y-7">
            
            {/* Form Header */}
            <div>
              <h1 className="font-serif text-3xl text-[#2C2825] font-normal mb-1">
                Welcome Back
              </h1>
              <p className="text-xs text-[#8C8275] tracking-wider uppercase font-sans">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-2">
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
                    placeholder="Enter your email"
                    className={`w-full bg-[#FFFFFF] border pl-11 pr-4 py-3 text-sm text-[#2C2825] rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                        : "border-[#E2DDD3] focus:border-[#2C2825] focus:ring-1 focus:ring-[#2C2825]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825]">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#A38350] hover:underline hover:text-[#8C6D3B] transition-colors font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8275]">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full bg-[#FFFFFF] border pl-11 pr-11 py-3 text-sm text-[#2C2825] rounded-xl focus:outline-none transition-all ${
                      errors.password
                        ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                        : "border-[#E2DDD3] focus:border-[#2C2825] focus:ring-1 focus:ring-[#2C2825]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8275] hover:text-[#2C2825] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825] cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2.5 text-xs text-[#6B6357] font-medium cursor-pointer">
                  Remember Me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1F1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] py-3.5 rounded-xl hover:bg-[#38322E] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>SIGN IN</span>
                )}
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-[#E8E2D8] w-full" />
              <span className="bg-[#FAF8F5] px-4 text-[11px] font-semibold text-[#A39B8E] uppercase tracking-widest absolute">
                OR
              </span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => toast.error("Google sign in currently unavailable")}
                className="w-full bg-white border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-xs font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => toast.error("Apple sign in currently unavailable")}
                className="w-full bg-white border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-xs font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.71.13-9.56-1.92-14.54-6.14-3.26-2.76-7.14-7.44-11.64-14.04-7.06-10.23-12.39-21.43-15.98-33.62-3.59-12.19-5.39-23.77-5.39-34.74 0-14.59 3.65-26.49 10.96-35.69 7.31-9.2 16.34-13.88 27.09-14.04 4.58 0 9.77 1.18 15.57 3.54 5.8 2.36 9.87 3.54 12.21 3.54 2.12 0 6.16-1.18 12.12-3.54 5.96-2.36 10.88-3.48 14.75-3.35 11.05.65 19.86 4.88 26.43 12.69-9.84 5.96-14.63 14.28-14.37 24.96.26 8.35 3.44 15.53 9.54 21.54 6.1 6.01 13.43 9.4 21.99 10.17-2.35 7.18-5.55 14.31-9.6 21.39zm-31.53-114.73c0 6.64-2.42 12.87-7.25 17.69-4.83 4.83-10.74 7.62-17.73 8.37-.13-1.05-.2-1.97-.2-2.76 0-6.64 2.52-12.97 7.56-18 5.04-5.03 11.02-7.85 17.94-8.46.26.92.48 2.09.68 3.16z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Navigation to Signup */}
            <div className="pt-2 text-center">
              <p className="text-xs text-[#6B6357]">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#A38350] hover:text-[#8C6D3B] transition-colors ml-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
