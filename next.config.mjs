import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    serverExternalPackages: [
      "@supabase/supabase-js",
      "@supabase/ssr",
      "zod",
      "next-intl",
      "lucide-react",
    ],
    appDir: true,
  },
  trailingSlash: false,
/*   functions: {
    mode: "advanced", // enables worker to generate smaller workers
  }, */
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
      },
    ],
    loader: "custom",
    loaderFile: "./image-loader.ts",
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256]
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

/* import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev(); */