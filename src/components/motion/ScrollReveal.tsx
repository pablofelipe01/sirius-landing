"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLAY_ONCE } from "@/components/motion/play-once";

// Animaciones de entrada declaradas con atributos data-* para que las páginas sigan siendo
// Server Components. Se reconfiguran en cada cambio de ruta.
//
//   data-reveal="up|fade|left|right|scale|pop|flip"   entra al llegar al viewport (una sola vez)
//   data-reveal-delay="0.2"                   retardo en segundos
//   data-reveal-stagger="up|left|right|…"     los hijos directos entran escalonados (por defecto "up")
//   data-reveal-mask                          marco que se abre como cortina mientras su <img> se aleja
//                                             (acepta data-reveal-delay)
//   data-parallax="12"                        se desplaza ±12 % mientras se hace scroll
//   data-counter="1973"                       el número sube hasta el valor al entrar
//     data-counter-from="1943"                valor inicial (por defecto 0)
//     data-counter-decimals="1"               decimales; el formato es es-CO (1.650 / 10,7)
//     data-counter-grouping="false"           sin separador de miles (años)
//   data-bar                                  barra que crece de izquierda a derecha (scaleX)
//     data-bar-delay="0.2"                    retardo en segundos
//   data-line                                 línea que se dibuja (scaleY) al entrar
//   data-split                                palabras que suben una a una (lo genera <SplitWords>)
//     data-split-delay="0.2"                  retardo en segundos
//   data-kenburns                             imagen de fondo que se aleja lentamente al cargar
//   data-draw                                 ícono SVG cuyos trazos se dibujan al entrar
//     data-draw-delay="0.3"                   retardo en segundos
//
// Antes de hidratar, html.js (ver layout) deja estos elementos invisibles para que no parpadeen.
// Con prefers-reduced-motion no se añade esa clase y aquí no se anima nada.

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const EASE = "power3.out";

const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 36, opacity: 0 },
  fade: { opacity: 0 },
  left: { x: -40, opacity: 0 },
  right: { x: 40, opacity: 0 },
  scale: { scale: 0.94, opacity: 0 },
  // Ilustraciones: entran girando levemente desde más pequeñas
  pop: { scale: 0.75, rotation: -8, opacity: 0 },
  // Tarjetas: se abaten desde arriba en perspectiva
  flip: { rotationX: -65, y: 40, opacity: 0, transformPerspective: 900, transformOrigin: "50% 0%" },
};

const TO: gsap.TweenVars = { x: 0, y: 0, scale: 1, rotation: 0, rotationX: 0, opacity: 1, ease: EASE, clearProps: "transform" };

export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, FROM[el.dataset.reveal ?? "up"] ?? FROM.up, {
          ...TO,
          duration: 1,
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        gsap.fromTo(Array.from(group.children), FROM[group.dataset.revealStagger || "up"] ?? FROM.up, {
          ...TO,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 85%", toggleActions: PLAY_ONCE },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-mask]").forEach((frame) => {
        const tl = gsap.timeline({
          delay: Number(frame.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: frame, start: "top 85%", toggleActions: PLAY_ONCE },
        });
        // El clip-path final se deja explícito: la regla html.js del CSS lo cerraría de nuevo
        tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        const img = frame.querySelector("img");
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" }, 0.15);
      });

      document.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.4, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE } },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-split-word]"),
          // y: 0 explícito: GSAP lee el translateY(110%) del CSS como "y" en píxeles y lo sumaría a yPercent
          { y: 0, yPercent: 110 },
          {
            y: 0,
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.06,
            delay: Number(el.dataset.splitDelay ?? 0),
            // Sin clearProps: la regla html.js del CSS volvería a esconder las palabras
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE },
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-kenburns]").forEach((el) => {
        gsap.fromTo(el, { scale: 1.2 }, { scale: 1, duration: 2.6, ease: "expo.out" });
      });

      document.querySelectorAll<SVGSVGElement>("svg[data-draw]").forEach((svg) => {
        const shapes = Array.from(svg.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, line, polyline, rect"));
        // +1 para que el remate redondeado no asome antes de tiempo
        const lengths = shapes.map((s) => s.getTotalLength() + 1);
        gsap.fromTo(
          shapes,
          { strokeDasharray: (i: number) => lengths[i], strokeDashoffset: (i: number) => lengths[i] },
          {
            strokeDashoffset: 0,
            duration: 1.3,
            ease: "power2.inOut",
            stagger: 0.12,
            delay: Number(svg.dataset.drawDelay ?? 0),
            clearProps: "strokeDasharray,strokeDashoffset",
            scrollTrigger: { trigger: svg, start: "top 90%", toggleActions: PLAY_ONCE },
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter);
        if (Number.isNaN(target)) return;
        const decimals = Number(el.dataset.counterDecimals ?? 0);
        // Los años no llevan separador de miles: 2018, no 2.018
        const useGrouping = el.dataset.counterGrouping !== "false";
        const format = new Intl.NumberFormat("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping });
        const n = { value: Number(el.dataset.counterFrom ?? 0) };
        gsap.to(n, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format.format(n.value);
          },
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-bar]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            delay: Number(el.dataset.barDelay ?? 0),
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE },
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax ?? 12);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
