import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../../public/fonts/cormorant-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/cormorant-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/cormorant-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/cormorant-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/cormorant-700.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../../public/fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});


export const metadata: Metadata = {
  title: "Sujata Fine Jewels | Timeless Brilliance, Crafted for You",
  description: "Exquisite jewellery, handcrafted with passion, designed to celebrate life's most precious moments.",
};

import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal" suppressHydrationWarning>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
