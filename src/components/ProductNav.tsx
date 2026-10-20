"use client";

// Índice fijo de secciones (productos): resalta la que está en pantalla. Va justo debajo de la
// barra flotante del sitio. Los enlaces son #anclas normales (Lenis descuenta el alto del header).

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
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (link && list) list.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[5.25rem] z-30 py-3">
      <div className="container-page">
        <ul
          ref={listRef}
          className="no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-white/90 p-1.5 shadow-[0_10px_30px_-18px_rgba(1,84,172,0.45)] backdrop-blur-xl"
        >
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  data-id={it.id}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-xl px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                    isActive ? "bg-barranca text-white" : "text-barranca hover:bg-sutileza-50"
                  }`}
                >
                  {it.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
