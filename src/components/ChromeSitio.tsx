'use client';

/**
 * Decide si una ruta lleva el NavBar y el Footer del sitio.
 *
 * Casi todo el sitio los lleva, pero hay rutas que se sirven como landing
 * autonoma: se llega a ellas por un QR o un enlace directo, con una sola tarea
 * que cumplir, y el menu del sitio solo da por donde perderse antes de
 * cumplirla.
 *
 * `children` llega ya renderizado desde el layout, que es un componente de
 * servidor: envolverlo aqui no convierte las paginas en cliente.
 */

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import Footer from './Footer';

/** Prefijos de ruta que se sirven sin nav ni footer. */
const RUTAS_SIN_CHROME = ['/palma'];

export default function ChromeSitio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const sinChrome = RUTAS_SIN_CHROME.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  if (sinChrome) return <>{children}</>;

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
