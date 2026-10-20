import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import ChromeSitio from '@/components/ChromeSitio';
import './globals.css';

// Marca <html class="js"> antes de hidratar: así los elementos con data-reveal arrancan
// invisibles y no parpadean. Sin JS o con prefers-reduced-motion todo se ve de inmediato.
const motionScript = `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")`;

// Textos. Poppins recortada a WOFF2 con los caracteres latinos (≈9 KB cada grosor, licencia en OFL.txt).
// Solo los grosores que usa el sitio: si una clase pide otro (p. ej. font-light), añadir aquí su archivo.
const poppins = localFont({
  variable: '--font-poppins',
  src: [
    { path: './fonts/poppins/Poppins-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/poppins/Poppins-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/poppins/Poppins-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/poppins/Poppins-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

// Títulos y subtítulos. Fuente variable (400–900): Next la descarga al compilar y la sirve desde el propio sitio.
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://siriusregenerative.com'),
  title: {
    default: 'Sirius Regenerative | Biochar y biológicos para agricultura regenerativa',
    template: '%s | Sirius Regenerative',
  },
  description:
    'Transformamos la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian tus cultivos: biochar, biológicos y formulaciones a la medida.',
  keywords: ['biochar', 'agricultura regenerativa', 'bioinsumos', 'biológicos', 'pirólisis', 'Biochar Blend', 'Sirius Bacter'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Sirius Regenerative',
    images: ['/img/productos/biochar-blend-banner.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${poppins.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <ChromeSitio>{children}</ChromeSitio>
      </body>
    </html>
  );
}
