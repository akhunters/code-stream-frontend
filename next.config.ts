import type { NextConfig } from "next";

const imagesRemoteHostnames = [
  "platform-lookaside.fbsbx.com",
  "lh3.googleusercontent.com",
];

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: imagesRemoteHostnames.map(hostname => ({
      hostname,
      protocol: 'https',
    }))
  },
};

export default nextConfig;
