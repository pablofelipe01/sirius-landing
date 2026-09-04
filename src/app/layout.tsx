import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChromeSitio from '@/components/ChromeSitio';

// Si quieres usar la fuente Museo Slab, necesitarías agregarla como una fuente personalizada
// Aquí usamos Inter como fuente de respaldo
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sirius Regenerative - Soluciones para la agricultura regenerativa',
  description: 'Transformamos la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian tus cultivos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Puedes agregar aquí la importación de la fuente Museo Slab si tienes acceso a ella */}
        {/* <link rel="stylesheet" href="path-to-museo-slab-font" /> */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ChromeSitio>{children}</ChromeSitio>
      </body>
    </html>
  );
}