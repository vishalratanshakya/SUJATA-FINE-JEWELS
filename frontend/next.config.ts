import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/new-arrivals', destination: '/shop', permanent: false },
      { source: '/collections', destination: '/shop', permanent: false },
      { source: '/journal', destination: '/', permanent: false },
      { source: '/ai-stylist', destination: '/', permanent: false },
    ]
  }
};

export default nextConfig;
