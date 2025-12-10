import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error NextConfig type doesn't include 'eslint' yet
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
