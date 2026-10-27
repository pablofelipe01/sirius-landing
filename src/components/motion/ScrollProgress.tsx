"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Línea fina en el borde superior que avanza con la lectura de la página: de Azul Cielo a Azul
// Barranca, el gradiente dentro de una misma escala que pide el manual.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3, refreshPriority: -1 } },
      // refreshPriority -1: se calcula de último, cuando las secciones fijadas ya sumaron su espacio
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={bar}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-cielo to-barranca"
    />
  );
}
