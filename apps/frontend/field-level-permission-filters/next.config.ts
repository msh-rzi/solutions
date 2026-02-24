import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui-mantine", "@repo/i18n"],
};

export default nextConfig;
