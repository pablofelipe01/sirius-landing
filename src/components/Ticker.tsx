"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Cinta de palabras que corre bajo el hero, separadas por los dos puntos del logo. Responde al
// scroll: acelera con la velocidad de la rueda y cambia de sentido cuando se sube.
// Dos copias idénticas: la animación desplaza la mitad del ancho y vuelve a empezar sin salto.
// Con prefers-reduced-motion queda quieta y se ve la primera copia.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function Ticker({ words }: { words: string[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const set = [...words, ...words];

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia(REDUCED_MOTION).matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const loop = gsap.to(list, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
    // Arranca muchas vueltas adentro para poder correr hacia atrás sin toparse con el inicio
    loop.totalTime(loop.duration() * 100);

    let direction = 1;
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction;
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
        gsap.to(loop, { timeScale: direction * boost, duration: 0.25, overwrite: true });
        gsap.to(loop, { timeScale: direction, duration: 1.4, delay: 0.25, ease: "power2.out" });
      },
    });

    return () => {
      trigger.kill();
      loop.kill();
      gsap.set(list, { clearProps: "transform" });
    };
  }, []);

  return (
    <div className="overflow-hidden bg-barranca py-4 text-white">
      <ul ref={listRef} className="flex w-max items-center">
        {[...set, ...set].map((w, i) => (
          <li key={i} aria-hidden={i >= words.length} className="flex items-center">
            <span className="heading px-6 text-2xl whitespace-nowrap sm:text-3xl">{w}</span>
            <span aria-hidden className="inline-flex gap-1">
              <span className="size-2 rounded-full bg-cielo" />
              <span className="size-2 rounded-full bg-alegria" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
