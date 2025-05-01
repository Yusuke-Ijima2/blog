/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    ignoreBrowserErrors: true,
  },
};

module.exports = nextConfig;
