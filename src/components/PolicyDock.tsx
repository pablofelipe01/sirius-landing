"use client";

// Lista de políticas con la ampliación por cercanía del "Floating Dock" (21st.dev / Aceternity):
// la tarjeta bajo el cursor crece al máximo y sus vecinas menos cuanto más lejos están.
// En tarjetas anchas de texto la tarjeta crece poco (CARD_SCALE) y el ícono hace de "ícono del dock" (ICON_SCALE).
// Con GSAP en vez de framer-motion. Sin efecto en pantallas táctiles ni con prefers-reduced-motion.

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { Download, FileText } from "@/components/icons";

const RANGE = 140; // px desde el borde de la tarjeta: más lejos, vuelve a su tamaño
const CARD_SCALE = 1.05;
const ICON_SCALE = 1.6;
const MEDIA_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type Policy = { name: string; file: string };

// Colores del logo de Sirius. Son 3 colores en una cuadrícula de 2 columnas:
// al ser impar, cada fila se desplaza y el color nunca se repite con la vecina de al lado ni con la de abajo.
const ACCENTS = [
  "#004e9d", // azul de la palabra
  "#6eb100", // verde del punto
  "#009dff", // celeste del punto
];

export function PolicyDock({ policies }: { policies: Policy[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.matchMedia(MEDIA_QUERY).matches) return;

    // Muelle suave como el del dock. overwrite: cada movimiento reemplaza el tween anterior del mismo elemento.
    const tween = (el: HTMLElement) => (scale: number) => gsap.to(el, { scale, duration: 0.35, ease: "power3.out", overwrite: true });
    const items = [...list.querySelectorAll<HTMLElement>("[data-dock-item]")].map((card) => {
      const icon = card.querySelector<HTMLElement>("[data-dock-icon]")!;
      return { card, icon, toCard: tween(card), toIcon: tween(icon) };
    });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = list.getBoundingClientRect();
      for (const it of items) {
        // Distancia al borde (0 si el cursor está encima), no al centro: las tarjetas son anchas.
        // offsetLeft/Top no cambian con la escala, así la medida no oscila mientras la tarjeta crece.
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const { offsetLeft: left, offsetTop: top, offsetWidth: w, offsetHeight: h } = it.card;
        const dx = Math.max(left - x, 0, x - (left + w));
        const dy = Math.max(top - y, 0, y - (top + h));
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / RANGE); // 1 encima, 0 fuera del rango
        it.toCard(1 + (CARD_SCALE - 1) * t);
        it.toIcon(1 + (ICON_SCALE - 1) * t);
        it.card.style.zIndex = String(Math.round(t * 10)); // la más ampliada queda encima de sus vecinas
      }
    };
    const onLeave = () => {
      for (const it of items) {
        it.toCard(1);
        it.toIcon(1);
      }
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(items.flatMap((it) => [it.card, it.icon]));
    };
  }, []);

  return (
    <ul ref={listRef} className="relative grid gap-3 sm:grid-cols-2 lg:col-span-8">
      {policies.map((p, i) => (
        <li
          key={p.file}
          data-dock-item
          style={{ "--accent": ACCENTS[i % ACCENTS.length] } as CSSProperties}
          className="relative will-change-transform"
        >
          <a
            href={p.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-white p-5 pl-6 ring-1 ring-paper-200 transition-[box-shadow,background-color] hover:bg-(--accent)/5 hover:shadow-lg hover:ring-2 hover:ring-(--accent)"
          >
            {/* Franja de color a la izquierda: identifica cada política sin depender del hover */}
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-(--accent)" />
            <span data-dock-icon className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--accent) shadow-sm will-change-transform">
              <FileText className="size-5 text-white" />
            </span>
            <span className="flex-1 font-medium text-night-900">{p.name}</span>
            <Download className="size-5 shrink-0 text-muted transition-colors group-hover:text-(--accent)" />
            <span className="sr-only">(PDF, se abre en una pestaña nueva)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
