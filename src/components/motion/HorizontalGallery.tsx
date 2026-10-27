"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoopVideo } from "../LoopVideo";

// Con `video`, la imagen es su poster (el primer fotograma) y el clip corre en bucle mientras se ve
export type GalleryItem = { image: string; alt: string; caption: string; video?: string };

// Galería que avanza de lado mientras se hace scroll hacia abajo: la sección se fija y la cinta de
// fotos se desplaza; dentro de cada marco la foto corre un poco más despacio (parallax). Los marcos
// alternan el arco del sitio con esquinas redondeadas.
// En celular (o con prefers-reduced-motion) no se fija: la cinta se desliza con el dedo.
const PINNED = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

// Alto atado a la pantalla: la sección fijada nunca debe ser más alta que el viewport
const shapes = ["arch aspect-[4/5] h-[min(60svh,28rem)]", "rounded-[2rem] aspect-[4/3] h-[min(44svh,21rem)]", "rounded-[2rem] aspect-square h-[min(50svh,24rem)]"];

export function HorizontalGallery({ items, intro }: { items: GalleryItem[]; intro: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    const list = track.current;
    if (!section || !list) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(PINNED, () => {
      // Fijada, la cinta deja de ser un carrusel nativo: la mueve el scroll de la página
      list.dataset.pinned = "";
      const distance = () => list.scrollWidth - window.innerWidth;
      const move = gsap.to(list, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      list.querySelectorAll<HTMLElement>("[data-pan]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: move, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      return () => delete list.dataset.pinned;
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="bg-imperial overflow-hidden text-white">
      <div
        ref={track}
        data-lenis-prevent-touch
        className="no-scrollbar flex min-h-svh snap-x snap-mandatory items-center gap-6 overflow-x-auto px-4 py-20 sm:px-6 md:gap-10 data-[pinned]:snap-none data-[pinned]:overflow-visible md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        <div className="w-[80vw] max-w-md shrink-0 snap-start md:w-[26rem]">{intro}</div>
        {items.map((it, i) => (
          <figure key={it.image} className={`flex shrink-0 snap-center flex-col ${i % 3 === 1 ? "md:self-end" : i % 3 === 2 ? "md:self-start" : ""}`}>
            <div className={`relative max-w-[80vw] overflow-hidden ${shapes[i % shapes.length]}`}>
              <div data-pan className="absolute inset-y-0 -inset-x-[10%]">
                {it.video ? (
                  <>
                    <LoopVideo src={it.video} poster={it.image} className="absolute inset-0 size-full object-cover" />
                    <span className="sr-only">{it.alt}</span>
                  </>
                ) : (
                  <Image src={it.image} alt={it.alt} fill quality={90} sizes="(min-width: 768px) 32rem, 80vw" className="object-cover" />
                )}
              </div>
            </div>
            <figcaption className="mt-4 flex items-center gap-2.5 text-sm font-semibold text-white/80">
              <span className="size-2 rounded-full bg-alegria" aria-hidden />
              {it.caption}
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="w-4 shrink-0 md:w-16" />
      </div>
    </section>
  );
}
