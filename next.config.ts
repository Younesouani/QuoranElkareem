import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevents Termux WASM worker errors from blocking builds
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
