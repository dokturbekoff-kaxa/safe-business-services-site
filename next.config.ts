import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/examples/plumbing",
        destination: "/examples/plumbing/index.html",
      },
      {
        source: "/examples/clinic",
        destination: "/examples/clinic/index.html",
      },
      {
        source: "/examples/accessories-store",
        destination: "/examples/accessories-store/index.html",
      },
      {
        source: "/examples/plumbing/:path*",
        destination: "/examples/plumbing/:path*.html",
      },
      {
        source: "/examples/clinic/:path*",
        destination: "/examples/clinic/:path*.html",
      },
      {
        source: "/examples/accessories-store/:path*",
        destination: "/examples/accessories-store/:path*.html",
      },
    ];
  },
};

export default nextConfig;
