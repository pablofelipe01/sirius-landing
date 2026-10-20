import Image from "next/image";
import type { HomeLine } from "@/lib/content/home";
import { ArrowRight, Flame, Microscope, Sprout } from "./icons";
import { ButtonLink } from "./ui";
import { PerspectiveFlipCard } from "./ui/perspective-flip-card";

const ICONS = { flame: Flame, sprout: Sprout, microscope: Microscope };

// Tarjeta de línea de trabajo en el inicio: foto al frente, datos clave al girar
export function LineFlipCard({ line: l }: { line: HomeLine }) {
  const Icon = ICONS[l.icon];
  return (
    <PerspectiveFlipCard
      className="aspect-[4/5] w-full cursor-pointer"
      // Sin overflow-hidden ni isolate en las caras: ambos aplanan el 3D y anulan los translateZ
      frontClassName="text-white"
      backClassName="bg-night-900 text-white ring-1 ring-white/10"
      front={
        <div className="flex size-full flex-col justify-end p-7 [transform-style:preserve-3d]">
          <Image src={l.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-10 rounded-3xl object-cover" />
          <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-t from-night-950/90 via-night-950/30 to-transparent" aria-hidden />
          <span className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-white/90 text-brand-600 [transform:translateZ(60px)]">
            <Icon className="size-7" />
          </span>
          <h3 className="font-display text-3xl font-semibold [transform:translateZ(50px)]">{l.title}</h3>
          <p className="mt-1 text-sm text-white/75 [transform:translateZ(40px)]">{l.tagline}</p>
          <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-bio-300 [transform:translateZ(40px)]">
            Conocer más <ArrowRight className="size-4" />
          </span>
        </div>
      }
      back={
        <div className="flex size-full flex-col items-center justify-center p-7 text-center [transform-style:preserve-3d]">
          <ul className="flex w-full justify-center gap-2.5 [transform-style:preserve-3d]">
            {l.highlights.map((h, i) => (
              <li
                key={h.label}
                className={`flex min-w-0 flex-1 flex-col items-center rounded-2xl bg-white/10 px-2 py-4 ring-1 ring-white/10 ${
                  i === 1 ? "[transform:translateZ(110px)]" : "[transform:translateZ(80px)]"
                }`}
              >
                <span className="font-display text-lg leading-none font-semibold text-bio-300">{h.value}</span>
                <span className="mt-1.5 text-[11px] leading-tight text-white/70">{h.label}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-display mt-8 text-2xl font-semibold [transform:translateZ(60px)]">{l.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80 [transform:translateZ(40px)]">{l.text}</p>
          <div className="mt-7 [transform:translateZ(90px)]">
            <ButtonLink href={l.href} className="shadow-lg shadow-black/30">
              Conocer más
            </ButtonLink>
          </div>
        </div>
      }
    />
  );
}
