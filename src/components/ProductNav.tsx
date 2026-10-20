"use client";

// Índice fijo de secciones (productos, pilares): resalta el producto que está en pantalla y una barra muestra cuánto se ha recorrido.
// Los enlaces son #anclas normales (Lenis los desplaza con el alto del navbar descontado).

import { useEffect, useRef, useState } from "react";

type Item = { id: string; name: string };

export function ProductNav({ items, label = "Productos" }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Activo = la sección que cruza la franja central de la pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  // En móvil la lista se desplaza en horizontal: mantiene visible la pestaña activa
  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (link && list) list.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const index = Math.max(0, items.findIndex((it) => it.id === active));

  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-paper-200 bg-paper-50/85 backdrop-blur-md lg:top-[4.5rem]">
      <div className="container-page">
        <ul ref={listRef} className="-mx-4 flex gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {items.map((it, i) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  data-id={it.id}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "bg-night-900 text-white" : "text-night-900 hover:bg-paper-200"
                  }`}
                >
                  <span className={`font-display tabular-nums transition-colors ${isActive ? "text-bio-300" : "text-muted"}`}>0{i + 1}</span>
                  {it.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Avance por los productos */}
      <div aria-hidden className="h-0.5 bg-paper-200">
        <div
          className="h-full origin-left bg-linear-to-r from-bio-500 via-cielo-500 to-brand-600 transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${(index + 1) / items.length})` }}
        />
      </div>
    </nav>
  );
}
