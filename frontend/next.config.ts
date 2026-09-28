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
      { source: '/best-sellers', destination: '/shop', permanent: false },
      { source: '/about', destination: '/', permanent: false },
      { source: '/journal', destination: '/', permanent: false },
      { source: '/our-story', destination: '/', permanent: false },
      { source: '/contact', destination: '/', permanent: false },
      { source: '/ai-stylist', destination: '/', permanent: false },
    ]
  }
};

export default nextConfig;
