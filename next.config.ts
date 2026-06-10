import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/why-scout",
        destination: "/why-finder",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
