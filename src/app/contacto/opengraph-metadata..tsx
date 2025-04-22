import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Sirius Regenerative',
  description: 'Ponte en contacto con Sirius Regenerative. Estamos aquí para ayudarte a regenerar tus suelos y potenciar tus cultivos.',
  openGraph: {
    title: 'Contacta con Sirius Regenerative',
    description: '¿Quieres saber más sobre nuestros productos para regeneración de suelos? Contáctanos y descubre cómo podemos ayudarte.',
    images: [
      {
        url: '/foto4.png',
        width: 1200,
        height: 630,
        alt: 'Contacto Sirius Regenerative'
      }
    ],
    type: 'website',
    locale: 'es_ES',
    siteName: 'Sirius Regenerative'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Sirius Regenerative',
    description: 'Ponte en contacto con nuestro equipo de expertos en agricultura regenerativa.',
    images: ['/foto4.png']
  }
};