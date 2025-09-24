/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // assetPrefix: process.env.CDN_URL ? process.env.CDN_URL.replace(/\/+$/, "") : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
