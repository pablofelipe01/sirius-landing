'use client';

/**
 * Estela del cursor del sitio: DottedTrailCursor en modo overlay, una capa transparente fija
 * encima de toda la página. Solo dibuja los puntos de la estela que sigue al puntero; no pinta
 * fondo, así que los colores de cada sección quedan como están. Se apaga sola cuando el
 * cursor se detiene, para no quedar encima del texto mientras se lee.
 *
 * Colores del Manual de Marca Sirius 2023 (paleta primaria, p. 19). El manual pide
 * gradientes sutiles dentro de una misma escala cromática: de Azul Cielo a Azul Barranca.
 */

import DottedTrailCursor from './ui/dotted-trail-cursor';

const MANUAL = {
  azulBarranca: '#0154AC',
  azulCielo: '#00A3FF',
};

export function SiteCursor() {
  return (
    // pointer-events-none: la capa nunca se interpone en un clic. La estela escucha el
    // movimiento en window, no en este elemento. z-[60]: por encima del header (z-50).
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <DottedTrailCursor
        overlay
        colorA={MANUAL.azulCielo}
        colorB={MANUAL.azulBarranca}
        // Tamaño de cursor, no de fondo: la cabeza mide ~3 rem y la grilla es fina
        headRadius={24}
        glowRadius={70}
        dotSpacing={7}
        dotRadius={0.9}
        fillOpacity={0.1}
      />
    </div>
  );
}
