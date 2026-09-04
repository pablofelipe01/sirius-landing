import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // This will tell ESLint to ignore all warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // ProductsSection usa quality={100}. Desde Next 16 cada valor de quality
    // debe estar declarado aqui; 75 es el default que usan las demas imagenes.
    qualities: [75, 100],
  },
  /* config options here */
};

export default nextConfig;
