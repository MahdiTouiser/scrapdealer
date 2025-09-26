/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ['@scrapdealer/tokens', '@scrapdealer/utils'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
