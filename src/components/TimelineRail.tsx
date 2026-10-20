"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Milestone } from "@/lib/content/somos";
import { ArrowLeft, ArrowRight } from "./icons";

// Historia como un camino horizontal: tarjetas que se deslizan de lado (con el dedo, el
// trackpad o los botones), cada una con su año en grande y una línea que las une.
// data-lenis-prevent: el scroll suave vertical no debe capturar el desplazamiento horizontal.
export function TimelineRail({ items }: { items: Milestone[] }) {
  const railRef = useRef<HTMLOListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="container-page flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Hito anterior"
          className="inline-flex size-12 items-center justify-center rounded-2xl border-2 border-barranca text-barranca transition-colors hover:bg-barranca hover:text-white"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Hito siguiente"
          className="inline-flex size-12 items-center justify-center rounded-2xl border-2 border-barranca text-barranca transition-colors hover:bg-barranca hover:text-white"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <ol
        ref={railRef}
        data-lenis-prevent
        tabIndex={0}
        aria-label="Hitos de la historia de Sirius"
        // Margen lateral = el del contenedor de la página, para que la primera tarjeta se alinee con el titular
        className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-[max(1rem,calc((100vw_-_80rem)/2_+_2rem))] gap-6 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw_-_80rem)/2_+_2rem))] pb-6 focus-visible:outline-offset-4"
      >
        {items.map((m, i) => (
          <li key={`${m.year}-${m.title}`} className="relative w-[78vw] max-w-[22rem] shrink-0 snap-start">
            {/* Línea del camino: une el punto de cada hito con el siguiente */}
            <div className="flex items-center gap-3">
              <span className={`size-4 shrink-0 rounded-full ring-4 ring-white ${i % 2 === 0 ? "bg-cielo" : "bg-alegria"}`} aria-hidden />
              <span className="h-0.5 flex-1 bg-line" aria-hidden />
            </div>
            <p className="heading mt-5 text-6xl text-barranca">{m.year}</p>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sutileza">
              <Image src={m.image} alt={m.alt} fill sizes="22rem" className="object-cover" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink">{m.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
