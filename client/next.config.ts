import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Move it here, to the top level */
  allowedDevOrigins: ['wishandsurprise.com'],
  
  // Keep your other experimental flags here if you have any
  experimental: {
    // turbopack: { ... }
  },
};

export default nextConfig;
