import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "blogapi.perrian.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
