import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // This will tell ESLint to ignore all warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  // Rutas del sitio anterior que cambiaron de nombre con el rediseño: los enlaces viejos siguen llegando
  redirects: async () => [
    { source: "/inovacion", destination: "/biofabrica", permanent: true },
    { source: "/ventas", destination: "/productos", permanent: true },
  ],
};

export default nextConfig;
