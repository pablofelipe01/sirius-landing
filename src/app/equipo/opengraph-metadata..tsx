import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestro Equipo - Sirius Regenerative',
  description: 'Conoce al equipo de Sirius Regenerative, un grupo de expertos comprometidos con la regeneración de suelos y la agricultura sostenible.',
  openGraph: {
    title: 'El Equipo de Sirius Regenerative',
    description: 'Conoce a las personas detrás de Sirius Regenerative, unidas por la pasión de revolucionar la agricultura a través de soluciones regenerativas.',
    images: [
      {
        url: '/foto7.png',
        width: 1200,
        height: 630,
        alt: 'Equipo Sirius Regenerative'
      }
    ],
    type: 'website',
    locale: 'es_ES',
    siteName: 'Sirius Regenerative'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestro Equipo - Sirius Regenerative',
    description: 'Un equipo de expertos comprometidos con la revolución de la agricultura sostenible.',
    images: ['/foto7.png']
  }
};