/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ['@scrapdealer/tokens', '@scrapdealer/utils'],
};
export default nextConfig;
