"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoopVideo } from "../LoopVideo";

// Ventana en arco que se abre al campo: la sección se fija en pantalla y, al hacer scroll, el arco
// (el motivo de forma del sitio) crece hasta ocupar toda la pantalla mientras las dos mitades de la
// frase se apartan. Al final aparece el texto sobre el video. El arco se dibuja con clip-path, así
// que el video nunca cambia de tamaño de caja y no hay reflujo.
// Con prefers-reduced-motion se muestra directamente el estado final.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function ExpandMedia({
  video,
  poster,
  left,
  right,
  children,
}: {
  video: string;
  poster: string;
  left: ReactNode;
  right: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia(REDUCED_MOTION).matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(section);
    const [frame] = q("[data-frame]") as HTMLElement[];
    const media = q("[data-media]");

    // Arco inicial según la pantalla; se recalcula en cada refresh (cambio de tamaño)
    const clip = (p: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const w0 = w < 640 ? w * 0.62 : Math.min(w * 0.3, 420);
      const h0 = Math.min(h * 0.66, w0 * 1.3);
      const x = ((w - w0) / 2) * (1 - p);
      const y = ((h - h0) / 2) * (1 - p);
      const top = (w0 / 2) * (1 - p);
      const bottom = 28 * (1 - p);
      return `inset(${y}px ${x}px ${y}px ${x}px round ${top}px ${top}px ${bottom}px ${bottom}px)`;
    };

    const ctx = gsap.context(() => {
      const state = { p: 0 };
      const paint = () => {
        frame.style.clipPath = clip(state.p);
      };
      paint();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
          scrub: 0.6,
          onRefresh: paint,
        },
      });
      // En celular las dos mitades van arriba y abajo del arco; en pantallas anchas, a los lados
      const stacked = window.innerWidth < 640;
      tl.to(state, { p: 1, duration: 1, ease: "power2.inOut", onUpdate: paint }, 0)
        .fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
        .to(q("[data-left]"), { [stacked ? "yPercent" : "xPercent"]: stacked ? -120 : -60, opacity: 0, duration: 0.6 }, 0)
        .to(q("[data-right]"), { [stacked ? "yPercent" : "xPercent"]: stacked ? 120 : 60, opacity: 0, duration: 0.6 }, 0)
        .fromTo(q("[data-veil]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.65)
        .fromTo(q("[data-copy]"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.08 }, 0.72);
    }, section);

    // Este pin se crea después de las entradas de ScrollReveal: se reordenan para que las de más
    // abajo cuenten el espacio que agrega el pin
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-expand className="relative h-svh overflow-hidden bg-white">
      <div data-frame className="absolute inset-0 overflow-hidden bg-imperial">
        <div data-media className="absolute inset-0">
          <LoopVideo src={video} poster={poster} className="size-full object-cover" />
        </div>
        {/* Velo para leer el texto sobre el video: Imperial desde la izquierda, como el gradiente del manual */}
        <div data-veil className="absolute inset-0 bg-[linear-gradient(100deg,rgba(26,26,51,0.88)_0%,rgba(26,26,51,0.55)_45%,rgba(26,26,51,0.05)_80%)]" />
      </div>

      {/* La separación es el tamaño del arco inicial (ver clip()) más un margen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[calc(min(66svh,80.6vw)+1.5rem)] px-4 motion-reduce:hidden sm:flex-row sm:gap-[calc(min(30vw,420px)+3rem)]"
      >
        <span data-left className="heading text-5xl whitespace-nowrap text-barranca sm:flex-1 sm:text-right sm:text-4xl lg:text-5xl xl:text-7xl">
          {left}
        </span>
        <span data-right className="heading text-5xl whitespace-nowrap text-barranca sm:flex-1 sm:text-4xl lg:text-5xl xl:text-7xl">
          {right}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container-page text-white">{children}</div>
      </div>
    </section>
  );
}
