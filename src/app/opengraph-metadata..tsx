import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sirius Regenerative - Soluciones para la agricultura regenerativa',
  description: 'Transformamos la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian tus cultivos.',
  keywords: 'biochar, agricultura regenerativa, suelos, cultivos, sostenibilidad, agricultura ecológica, biochar blend, star dust',
  openGraph: {
    title: 'Sirius Regenerative - Regenera tu suelo y potencializa tus cultivos',
    description: 'Descubre nuestros bioinsumos revolucionarios que están cambiando la agricultura convencional desde la raíz. Soluciones para una agricultura más productiva y sostenible.',
    images: [
      {
        url: '/foto3.png',
        width: 1200,
        height: 630,
        alt: 'Sirius Regenerative - Agricultura regenerativa'
      }
    ],
    type: 'website',
    locale: 'es_ES',
    siteName: 'Sirius Regenerative'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sirius Regenerative - Soluciones para la agricultura regenerativa',
    description: 'Transformamos la agricultura convencional con soluciones regenerativas.',
    images: ['/foto3.png']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png'
  }
};