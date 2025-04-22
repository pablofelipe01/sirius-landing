import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Carbono - Sirius Regenerative',
  description: 'Calcula tu huella de carbono y descubre cómo nuestros productos pueden ayudarte a compensarla con soluciones que capturan carbono a largo plazo.',
  openGraph: {
    title: 'Calculadora de Carbono - Sirius Regenerative',
    description: 'Mide tu impacto y descubre soluciones reales para compensar tu huella de carbono con biochar.',
    images: [
      {
        url: '/foto3.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Carbono Sirius Regenerative'
      }
    ],
    type: 'website',
    locale: 'es_ES',
    siteName: 'Sirius Regenerative'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Carbono - Sirius Regenerative',
    description: 'Mide y compensa tu huella de carbono con soluciones regenerativas.',
    images: ['/foto3.jpg']
  }
};