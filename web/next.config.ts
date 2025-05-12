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
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      { protocol: "https", hostname: "marketing.finchat.io" },
      { protocol: "https", hostname: "media.glassdoor.com" },
    ],
  },
};

export default nextConfig;
