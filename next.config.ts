import { env } from "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.BACKEND_URL.replace(/\/$/, "")}/api/auth/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
