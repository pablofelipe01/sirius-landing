import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ofertas Especiales - Sirius Regenerative',
  description: 'Aprovecha nuestras ofertas especiales y descuentos por temporada de siembra en productos Sirius Regenerative.',
  openGraph: {
    title: 'Ofertas Especiales por Temporada de Siembra - Sirius Regenerative',
    description: 'Transforma tus cultivos con nuestros productos en oferta. Biochar Blend, Star Dust y más con descuentos especiales por tiempo limitado.',
    images: [
      {
        url: '/foto1.png',
        width: 1200,
        height: 630,
        alt: 'Productos Sirius Regenerative en oferta'
      }
    ],
    type: 'website',
    locale: 'es_ES',
    siteName: 'Sirius Regenerative'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ofertas Especiales - Sirius Regenerative',
    description: 'Aprovecha nuestros descuentos por temporada de siembra en productos para regeneración de suelos.',
    images: ['/foto1.png']
  }
};