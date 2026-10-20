import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/porteria-guaicaramo'] },
    sitemap: 'https://siriusregenerative.com/sitemap.xml',
  };
}
