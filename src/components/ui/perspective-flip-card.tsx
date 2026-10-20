"use client";

import { useState, type ReactNode } from "react";

// Tarjeta que gira en 3D (adaptada de "Card 14 – Perspective Flip Card" de 21st.dev).
// Los hijos pueden usar [transform:translateZ(…)] para flotar a distinta profundidad.
// Gira con hover en escritorio (.flip-card en globals.css), con un toque en pantallas táctiles
// y con el foco del teclado al llegar al enlace de la cara trasera.
export function PerspectiveFlipCard({
  front,
  back,
  className = "",
  frontClassName = "",
  backClassName = "",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-card [perspective:2000px] ${className}`}
      data-flipped={flipped}
      onClick={(e) => {
        // Un toque gira la tarjeta; los enlaces de la cara trasera siguen navegando
        if ((e.target as HTMLElement).closest("a")) return;
        setFlipped((v) => !v);
      }}
    >
      {/* Las dos caras comparten la misma celda: la tarjeta toma la altura de la más alta
          y en móvil el texto largo de la cara trasera no se sale por debajo */}
      <div className="flip-card-inner relative grid size-full min-h-[inherit] grid-cols-1 [transform-style:preserve-3d]">
        <div className={`flip-card-face relative [grid-area:1/1] rounded-3xl [transform-style:preserve-3d] ${frontClassName}`}>{front}</div>
        <div className={`flip-card-face flip-card-back relative [grid-area:1/1] rounded-3xl [transform-style:preserve-3d] ${backClassName}`}>{back}</div>
      </div>
    </div>
  );
}
