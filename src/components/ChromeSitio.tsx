'use client';

/**
 * Decide si una ruta lleva el marco del sitio: header, footer, scroll suave,
 * animaciones de entrada y cursor.
 *
 * Casi todo el sitio lo lleva, pero hay rutas que se sirven como landing
 * autonoma: se llega a ellas por un QR o un enlace directo, con una sola tarea
 * que cumplir, y el menu del sitio solo da por donde perderse antes de
 * cumplirla. Esas rutas traen su propio <main>.
 *
 * `children` llega ya renderizado desde el layout, que es un componente de
 * servidor: envolverlo aqui no convierte las paginas en cliente.
 */

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollProgress } from './motion/ScrollProgress';
import { ScrollReveal } from './motion/ScrollReveal';
import { SmoothScroll } from './motion/SmoothScroll';
import { SiteCursor } from './SiteCursor';

/** Prefijos de ruta que se sirven sin el marco del sitio. */
const RUTAS_SIN_CHROME = ['/palma', '/tarjeta', '/directorio', '/porteria-guaicaramo'];

export default function ChromeSitio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const sinChrome = RUTAS_SIN_CHROME.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  if (sinChrome) return <>{children}</>;

  return (
    <>
      <SiteCursor />
      <SmoothScroll />
      <ScrollReveal />
      <ScrollProgress />
      <Header />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
