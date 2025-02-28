/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" }, // Added domain
      { hostname: "lh3.googleusercontent.com" },
    ],
    domains: ["readonlydemo.vendure.io", "plus.unsplash.com"], // Added domain
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
