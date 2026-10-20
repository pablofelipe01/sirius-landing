"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLAY_ONCE } from "@/components/motion/play-once";
import type { Milestone, MilestoneAnim } from "@/lib/content/somos";

// Línea de tiempo: eje central que se dibuja con el scroll, hitos alternando de lado y cada foto
// con su propia entrada. html.js deja los hitos invisibles hasta que GSAP los anima (ver globals.css).

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Cada foto entra de una forma distinta, acorde con lo que muestra
const ENTRANCES: Record<MilestoneAnim, { from: gsap.TweenVars; to?: gsap.TweenVars }> = {
  drive: { from: { x: -140, opacity: 0 }, to: { ease: "power3.out", duration: 1.3 } },
  pop: { from: { scale: 0.4, opacity: 0 }, to: { ease: "back.out(2)", duration: 1 } },
  grow: { from: { scaleY: 0.2, scaleX: 0.8, y: 50, opacity: 0, transformOrigin: "50% 100%" }, to: { ease: "elastic.out(1, 0.6)", duration: 1.6 } },
  // Se revela como una foto antigua
  develop: { from: { opacity: 0, filter: "blur(14px) sepia(1)" }, to: { filter: "blur(0px) sepia(0)", ease: "power2.out", duration: 1.6 } },
  spin: { from: { rotate: -25, scale: 0.6, y: -40, opacity: 0 }, to: { ease: "back.out(1.6)", duration: 1.2 } },
  slide: { from: { x: 140, opacity: 0 }, to: { ease: "power3.out", duration: 1.3 } },
  assemble: { from: { scale: 0.7, rotate: 4, opacity: 0 }, to: { ease: "expo.out", duration: 1.4 } },
  roll: { from: { x: -120, rotate: -8, opacity: 0 }, to: { ease: "power4.out", duration: 1.4 } },
  rise: { from: { y: 90, opacity: 0 }, to: { ease: "power3.out", duration: 1.3 } },
  focus: { from: { scale: 1.15, opacity: 0, filter: "blur(10px)" }, to: { filter: "blur(0px)", ease: "power2.out", duration: 1.4 } },
  lift: { from: { y: 120, scale: 0.9, opacity: 0 }, to: { ease: "expo.out", duration: 1.5 } },
  drift: { from: { x: 60, y: 30, opacity: 0, scale: 0.95 }, to: { ease: "sine.out", duration: 1.6 } },
};

// Deriva suave y continua, distinta para cada hito para que no vayan al unísono
const FLOAT_AMPLITUDE = [8, 11, 7, 10, 9, 12, 6, 10];

export function HistoryTimeline({ items }: { items: Milestone[] }) {
  const rootRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // El eje se dibuja a medida que se baja
      gsap.fromTo(
        "[data-tl-axis]",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 70%", scrub: 0.4 } },
      );

      root.querySelectorAll<HTMLElement>("[data-tl-item]").forEach((item, i) => {
        const anim = (item.dataset.tlItem ?? "rise") as MilestoneAnim;
        const { from, to } = ENTRANCES[anim] ?? ENTRANCES.rise;
        const q = gsap.utils.selector(item);
        const figure = q("[data-tl-figure]");
        const fromLeft = item.dataset.side === "left";

        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 78%", toggleActions: PLAY_ONCE } });

        // 1. El nodo del eje aparece
        tl.fromTo(q("[data-tl-node]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" }, 0);
        // 2. El año y el texto entran desde el lado del eje
        tl.fromTo(q("[data-tl-year]"), { x: fromLeft ? 40 : -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.1);
        tl.fromTo(q("[data-tl-text]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.3);
        // 3. La foto entra con su animación propia…
        if (figure.length) {
          tl.fromTo(
            figure,
            from,
            { x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotate: 0, opacity: 1, ...to, clearProps: "filter" },
            0.15,
          );
          // …y después queda flotando
          tl.to(
            figure,
            { y: FLOAT_AMPLITUDE[i % FLOAT_AMPLITUDE.length], duration: 2.6 + (i % 3) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
            ">-0.2",
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={rootRef} className="relative mx-auto mt-16 max-w-5xl">
      {/* Eje central */}
      <div aria-hidden className="absolute top-0 bottom-0 left-5 w-0.5 bg-night-900/10 lg:left-1/2 lg:-translate-x-1/2">
        <div data-tl-axis className="size-full bg-linear-to-b from-bio-500 via-cielo-500 to-brand-600" />
      </div>

      {items.map((m, i) => {
        const left = i % 2 === 0;
        return (
          <li
            key={`${m.year}-${m.title}`}
            data-tl-item={m.anim}
            data-side={left ? "left" : "right"}
            className="relative grid gap-6 py-10 pl-14 lg:grid-cols-2 lg:gap-16 lg:py-14 lg:pl-0"
          >
            {/* Nodo sobre el eje */}
            <span
              data-tl-node
              aria-hidden
              className="absolute top-12 left-5 size-5 -translate-x-1/2 rounded-full border-[3px] border-brand-600 bg-paper-100 ring-4 ring-paper-100 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2"
            />

            {/* Texto */}
            <div className={`self-center ${left ? "lg:pr-16 lg:text-right" : "lg:order-2 lg:pl-16"}`}>
              <p data-tl-year className={`font-display text-5xl font-semibold sm:text-6xl ${left ? "text-brand-600" : "text-bio-600"}`}>
                {m.year}
              </p>
              <div data-tl-text className="mt-3">
                <p className="text-xl leading-snug font-semibold text-night-900 sm:text-2xl">{m.title}</p>
                <p className="mt-2 text-lg text-muted">{m.text}</p>
              </div>
            </div>

            {/* Foto */}
            <div className={`relative ${left ? "lg:pl-10" : "lg:order-1 lg:pr-10"}`}>
              <div data-tl-figure className="relative mx-auto w-full max-w-md will-change-transform">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_18px_30px_rgba(7,31,61,0.18)] ring-4 ring-white">
                  <Image src={m.image} alt={m.alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
