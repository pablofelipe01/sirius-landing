"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLAY_ONCE } from "@/components/motion/play-once";
import { SectionHeading } from "@/components/ui";

// Bloque "Quiénes somos": la foto se revela como una cortina con un leve zoom-out y parallax,
// aparece la insignia de los 50 años y el texto se "lee" palabra a palabra al hacer scroll,
// con las frases clave resaltadas. Con prefers-reduced-motion todo queda estático y legible.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Token = { text: string; highlight: boolean };

// Parte el párrafo en grupos de palabras, marcando los que forman una frase resaltada
function tokenize(paragraph: string, highlights: string[]): Token[][] {
  const pattern = highlights.length
    ? new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`)
    : null;
  const parts = pattern ? paragraph.split(pattern) : [paragraph];
  return parts
    .filter(Boolean)
    .map((part) => part.split(/\s+/).filter(Boolean).map((text) => ({ text, highlight: highlights.includes(part) })));
}

export function AboutIntro({
  eyebrow,
  title,
  image,
  imageAlt,
  years,
  paragraphs,
  highlights,
}: {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  years: number;
  paragraphs: string[];
  highlights: string[];
}) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const frame = root.querySelector<HTMLElement>("[data-about-frame]");
      const photo = root.querySelector<HTMLElement>("[data-about-photo]");
      const badge = root.querySelector<HTMLElement>("[data-about-badge]");
      const counter = root.querySelector<HTMLElement>("[data-about-count]");
      const count = { value: 0 };

      // Cortina de abajo hacia arriba + zoom-out de la foto, luego la insignia
      const intro = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 80%", toggleActions: PLAY_ONCE } });
      intro
        .fromTo(frame, { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.4, ease: "expo.inOut" })
        .fromTo(photo, { scale: 1.35 }, { scale: 1.12, duration: 1.8, ease: "expo.out" }, 0.2)
        .fromTo(badge, { opacity: 0, y: 24, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
        .to(
          count,
          {
            value: years,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(count.value));
            },
          },
          "<",
        );

      // Parallax suave de la foto dentro del marco
      gsap.fromTo(
        photo,
        { yPercent: -5 },
        { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
      );

      // Lectura progresiva: las palabras pasan de tenues a sólidas siguiendo el scroll
      root.querySelectorAll<HTMLElement>("[data-about-paragraph]").forEach((p) => {
        gsap.fromTo(
          p.querySelectorAll("[data-word]"),
          { opacity: 0.18 },
          { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 55%", scrub: 0.6 } },
        );
        // Subrayado de las frases clave, una vez el párrafo está a la vista
        gsap.fromTo(
          p.querySelectorAll("[data-mark]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut", stagger: 0.15, scrollTrigger: { trigger: p, start: "top 60%", toggleActions: PLAY_ONCE } },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [years]);

  return (
    <section ref={rootRef} id="quienes-somos" className="container-page grid scroll-mt-24 gap-12 py-20 sm:py-28 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="relative mt-10">
          <div data-about-frame className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <div data-about-photo className="absolute inset-0 scale-110">
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div
            data-about-badge
            className="absolute -bottom-6 left-6 flex items-baseline gap-2 rounded-2xl bg-night-900 px-5 py-3 text-white shadow-xl shadow-night-950/20"
          >
            <span data-about-count className="font-display text-4xl font-semibold text-bio-300">
              {years}
            </span>
            <span className="text-sm font-medium tracking-wide">años regenerando</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-lg leading-relaxed text-ink lg:col-span-6 lg:col-start-7 lg:pt-16">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 20)} data-about-paragraph className="isolate">
            {tokenize(p, highlights)
              .flat()
              .map((w, i) => (
                <span key={i}>
                  {/* Sin espacio antes de la puntuación que sigue a una frase resaltada */}
                  {i > 0 && !/^[.,;:!?)»]/.test(w.text) && " "}
                  <span data-word className={w.highlight ? "relative font-semibold text-night-900" : undefined}>
                    {w.text}
                    {w.highlight && (
                      <span data-mark aria-hidden className="absolute inset-x-0 bottom-0.5 -z-10 h-2 origin-left rounded-sm bg-bio-300/70" />
                    )}
                  </span>
                </span>
              ))}
          </p>
        ))}
      </div>
    </section>
  );
}
