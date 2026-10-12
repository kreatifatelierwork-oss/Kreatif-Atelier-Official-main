import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Every route is a folder with its own index.html, so /aurelius works on any static host.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
