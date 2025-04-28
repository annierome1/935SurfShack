import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "graph.instagram.com", pathname: "/**" },
      { protocol: "https", hostname: "scontent.cdninstagram.com", pathname: "/**" },
      { protocol: "https", hostname: "scontent.xx.fbcdn.net", pathname: "/**" },
    ],
  },

  // skip all ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
    // only lint these folders — vendor code under `src/sanity/dist` will be skipped
    dirs: ["pages", "app", "components", "lib"],
  },
};

export default nextConfig;
