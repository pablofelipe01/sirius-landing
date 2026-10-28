"use client";

import { useId, useState } from "react";
import type { Pilar } from "@/lib/content/biofabrica";
import { LoopVideo } from "./LoopVideo";

// Pilares de la biofábrica como pestañas: la lista a la izquierda y, a la derecha, el video
// del pilar activo en un marco orgánico. Se activa con clic, con el teclado (flechas) o al pasar
// el cursor. `detailed` agrega el texto largo y el recuadro de detalle (página /biofabrica).
export function PillarTabs({ items, detailed = false }: { items: Pilar[]; detailed?: boolean }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const current = items[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const target = (i + next + items.length) % items.length;
    setActive(target);
    document.getElementById(`${base}-tab-${target}`)?.focus();
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div role="tablist" aria-orientation="vertical" aria-label="Pilares de la biofábrica" className="lg:col-span-6">
        {items.map((p, i) => {
          const selected = i === active;
          return (
            <div key={p.id} id={detailed ? p.id : undefined} className="scroll-mt-32 border-b border-line last:border-0">
              <button
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex w-full items-baseline gap-5 py-6 text-left"
              >
                <span className={`font-serif text-2xl italic transition-colors ${selected ? "text-alegria-700" : "text-muted/60"}`}>{p.code}</span>
                <span className="flex-1">
                  <span className={`heading block text-3xl transition-colors sm:text-4xl ${selected ? "text-barranca" : "text-ink/45 group-hover:text-ink/70"}`}>
                    {p.name}
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-muted">{p.tagline}</span>
                  {/* El texto del pilar se despliega bajo el nombre activo */}
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-3 block max-w-lg text-lg leading-relaxed text-ink/80">{p.text}</span>
                      {detailed && (
                        <span className="mt-4 block max-w-lg rounded-2xl bg-sutileza-50 p-4 text-ink">
                          <span className="block text-sm font-bold text-barranca">{p.detailTitle}</span>
                          <span className="mt-1 block">{p.detail}</span>
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* En celular el video va arriba de la lista: así se ve al tocar cada pilar */}
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="order-first lg:order-none lg:col-span-6">
        <div className="organic relative mx-auto aspect-[4/3] w-full max-w-md sm:aspect-[4/5] overflow-hidden bg-sutileza shadow-[0_30px_60px_-30px_rgba(1,84,172,0.45)]">
          {/* Un video por pilar, apilados: cambiar de pestaña solo cruza la opacidad */}
          {items.map((p, i) => (
            <LoopVideo
              key={p.id}
              src={p.video}
              poster={p.poster}
              paused={i !== active}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {/* Centrado abajo: en las esquinas la curva del marco orgánico lo recortaría */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-bold text-barranca backdrop-blur">
            {current.name}
          </span>
        </div>
      </div>
    </div>
  );
}
