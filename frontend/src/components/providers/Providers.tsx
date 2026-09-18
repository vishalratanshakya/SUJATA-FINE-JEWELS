"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "@/components/providers/AuthProvider";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "800531354256-akj14ieujb2ddl52bqmjd5ftaqicp7d1.apps.googleusercontent.com";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
