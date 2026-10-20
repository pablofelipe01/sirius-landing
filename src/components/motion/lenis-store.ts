import type Lenis from "lenis";

// Instancia global de Lenis (la crea SmoothScroll). Otros componentes la usan para pausar
// el scroll suave, p. ej. mientras el menú móvil está abierto.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
