import type { MetadataRoute } from 'next';

const BASE = 'https://siriusregenerative.com';

// Solo las páginas del sitio; las landings de QR (/tarjeta, /directorio, /palma) se llegan por enlace directo
const ROUTES = ['', '/somos-sirius', '/productos', '/biofabrica', '/calculadora', '/contacto', '/privacypolicy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${BASE}${route}`, changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }));
}
