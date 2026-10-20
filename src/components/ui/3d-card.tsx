"use client";

// Inclinación 3D que sigue al cursor, con muelle al soltar.
// Adaptado del "Interactive Travel Card" de 21st.dev: mismo efecto (±10,5°), pero con GSAP,
// que el sitio ya usa, en lugar de framer-motion. Solo envuelve: el contenido de la tarjeta no cambia.
// Sin efecto en pantallas táctiles ni con prefers-reduced-motion.

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

const MAX_TILT = 10.5; // grados
const MEDIA_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type TiltCardProps = { children: ReactNode; className?: string };

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.matchMedia(MEDIA_QUERY).matches) return;

    // quickTo reutiliza un único tween por eje: barato aunque pointermove dispare en cada fotograma
    const toX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const toY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;
      toX(-y * 2 * MAX_TILT);
      toY(x * 2 * MAX_TILT);
    };
    const onLeave = () => {
      toX(0);
      toY(0);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(card);
    };
  }, []);

  return (
    <div ref={cardRef} className={`transition-shadow duration-300 will-change-transform hover:shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
