/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
    domains: ["readonlydemo.vendure.io"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
