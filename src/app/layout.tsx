import type { Metadata } from 'next';
import { Figtree, Instrument_Serif } from 'next/font/google';
import ChromeSitio from '@/components/ChromeSitio';
import { MOSTRAR_PRODUCTOS } from '@/lib/visibilidad';
import './globals.css';

// Marca <html class="js"> antes de hidratar: así los elementos con data-reveal arrancan
// invisibles y no parpadean. Sin JS o con prefers-reduced-motion todo se ve de inmediato.
const motionScript = `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")`;

// Tipografía primaria del manual: Utile (sans orgánica y alegre). Figtree es su equivalente libre.
// Fuente variable: Next la descarga al compilar y la sirve desde el propio sitio.
const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

// Tipografía secundaria: IvyPresto Italic, "solo para frases de marca". Instrument Serif es su equivalente libre.
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://siriusregenerative.com'),
  title: {
    default: 'Sirius Regenerative | Biochar y biológicos para agricultura regenerativa',
    template: '%s | Sirius Regenerative',
  },
  description:
    'Transformamos la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian tus cultivos: biochar, biológicos y formulaciones a la medida.',
  keywords: ['biochar', 'agricultura regenerativa', 'bioinsumos', 'biológicos', 'pirólisis', ...(MOSTRAR_PRODUCTOS ? ['Biochar Blend', 'Sirius Bacter'] : [])],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Sirius Regenerative',
    images: ['/img/productos/biochar-blend-banner.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${figtree.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <ChromeSitio>{children}</ChromeSitio>
      </body>
    </html>
  );
}
