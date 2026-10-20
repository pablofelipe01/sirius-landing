"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { HeroSlide } from "@/lib/content/home";
import { ArrowLeft, ArrowRight, Check } from "./icons";
import { ButtonLink, Eyebrow } from "./ui";
import { TiltCard } from "@/components/ui/3d-card";

const INTERVAL = 8000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia(REDUCED_MOTION).matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, slides.length]);

  // Entrada escalonada del texto de la diapositiva activa (html.js los deja en opacity 0 hasta aquí)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;
    const slide = root.querySelectorAll("[data-slide]")[index];
    if (!slide) return;
    const tween = gsap.fromTo(
      slide.querySelectorAll("[data-hero-item]"),
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.13, delay: 0.2, ease: "power3.out", clearProps: "transform" },
    );
    // Solo se detiene el tween: no se revierten los estilos para que la diapositiva saliente
    // conserve su texto mientras se desvanece
    return () => {
      tween.kill();
    };
  }, [index]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carrusel"
      aria-label="Destacados"
      className="relative isolate min-h-[92svh] overflow-hidden bg-night-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          data-slide
          role="group"
          aria-roledescription="diapositiva"
          aria-label={`${i + 1} de ${slides.length}`}
          aria-hidden={i !== index}
          inert={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`-z-10 object-cover transition-transform duration-[9000ms] ease-out ${i === index ? "scale-105" : "scale-100"}`}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/95 via-night-950/70 to-night-950/20" aria-hidden />
          <div className="container-page flex min-h-[92svh] items-center pt-28 pb-28">
            <div className={`grid w-full items-center gap-10 ${s.list || s.figure ? "lg:grid-cols-2" : ""}`}>
              <div className="max-w-2xl">
                <div data-hero-item>
                  <Eyebrow tone="light">{s.eyebrow}</Eyebrow>
                </div>
                <h2 data-hero-item className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl">
                  {s.title}
                </h2>
                {s.text && (
                  <p data-hero-item className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                    {s.text}
                  </p>
                )}
                {s.cta && (
                  <div data-hero-item className="mt-9">
                    <ButtonLink href={s.cta.href} external={s.cta.external}>
                      {s.cta.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
              {s.figure && (
                <div data-hero-item className="hidden lg:block">
                  <Image
                    src={s.figure.src}
                    alt={s.figure.alt}
                    width={s.figure.width}
                    height={s.figure.height}
                    className="mx-auto w-64 rotate-3 rounded-3xl drop-shadow-2xl transition-transform duration-700 hover:rotate-0 hover:scale-105 xl:w-80"
                  />
                </div>
              )}
              {s.list && (
                // Inclinación 3D; data-hero-item queda en la lista para la animación de entrada
                <TiltCard className="rounded-3xl">
                  <ul
                    data-hero-item
                    className="grid gap-x-6 gap-y-3 rounded-3xl bg-white/10 p-6 text-base ring-1 ring-white/15 backdrop-blur-md sm:p-8"
                  >
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-2.5 text-white/90">
                        <Check className="mt-1 size-4 shrink-0 text-bio-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="container-page absolute inset-x-0 bottom-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la diapositiva ${i + 1}: ${s.title}`}
              aria-current={i === index}
              className="group flex h-11 items-center"
            >
              <span className={`block h-1 rounded-full transition-all ${i === index ? "w-12 bg-bio-300" : "w-6 bg-white/40 group-hover:bg-white/70"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Diapositiva anterior"
            className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-white/30 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Diapositiva siguiente"
            className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-white/30 transition-colors hover:bg-white/10"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
