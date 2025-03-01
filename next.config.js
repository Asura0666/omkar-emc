/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "lh3.googleusercontent.com",
      "thinkml.ai",
      "jbhifi.com.au",
      "vasanthandco.in",
      "www.indiamart.com",
      "store.storeimages.cdn-apple.com",
      "static.wixstatic.com",
      "media-ik.croma.com",
      "www.whirlpool.com",
      "www.jbhifi.com.au",
      "m.media-amazon.com",
      "rukminim2.flixcart.com",
      "encrypted-tbn0.gstatic.com",
      "i5.walmartimages.com", // ✅ Added Walmart images
      "tse4.mm.bing.net", // ✅ Added Bing images
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
