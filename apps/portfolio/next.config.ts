import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@repo/tailwind', '@repo/ui-shadcn', '@repo/ui-mantine', '@repo/i18n'],
};

export default nextConfig;
