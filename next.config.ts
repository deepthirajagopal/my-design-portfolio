import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/case-studies", permanent: true },
      { source: "/work/:slug", destination: "/case-studies/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
