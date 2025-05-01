import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "finchat.io",
      },
      {
        protocol: "https",
        hostname: "cdn.finchat.io",
      },
    ],
  },
};

export default nextConfig;
