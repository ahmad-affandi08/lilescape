import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Needed for local development when backend image URLs use 127.0.0.1.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "apps.lilescapecoffee.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "lilescapecoffee.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
