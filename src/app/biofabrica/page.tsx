import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Clock, Cpu, Flame, Flask, Microscope } from '@/components/icons';
import { LoopVideo } from '@/components/LoopVideo';
import { PhotoMosaic } from '@/components/PhotoMosaic';
import { ProductNav } from '@/components/ProductNav';
import { SplitWords } from '@/components/motion/SplitWords';
import { TiltCard } from '@/components/ui/3d-card';
import { ButtonLink, Eyebrow, PageHero } from '@/components/ui';
import { biofabricaIntro, pilares, visita } from '@/lib/content/biofabrica';
import { contact } from '@/lib/content/site';

export const metadata: Metadata = {
  title: 'Biofábrica',
  description: biofabricaIntro,
};

const accents = ['#004e9d', '#6eb100', '#009dff', '#10396b'];
const ICONS = { pirolisis: Flame, biotecnologia: Microscope, agentics: Cpu, formulacion: Flask } as const;

export default function BiofabricaPage() {
  return (
    <>
      <PageHero
        cinematic
        eyebrow="Biofábrica Sirius"
        title="Donde el fuego ancestral se encuentra con la ciencia viva"
        text={biofabricaIntro}
        image="/img/fotos/biofabrica-ilustracion.webp"
      />

      <ProductNav label="Pilares de la biofábrica" items={pilares} />

      <div className="overflow-x-clip">
        {pilares.map((p, i) => {
          const reverse = i % 2 === 1;
          const Icon = ICONS[p.id as keyof typeof ICONS];
          return (
            <section
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-titulo`}
              style={{ '--accent': accents[i % accents.length] } as CSSProperties}
              className={`relative scroll-mt-32 py-16 sm:py-24 ${reverse ? 'bg-paper-100' : ''}`}
            >
              <span
                aria-hidden
                data-parallax="25"
                className={`font-display pointer-events-none absolute top-1/2 -translate-y-1/2 text-[28vw] leading-none font-bold text-night-900/[0.035] select-none lg:text-[18rem] ${
                  reverse ? 'left-0 lg:left-[4%]' : 'right-0 lg:right-[4%]'
                }`}
              >
                {p.code}
              </span>

              <div className="container-page relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={reverse ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <TiltCard className="rounded-[2rem]">
                      <div data-reveal-mask className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-night-900 shadow-xl shadow-night-900/10">
                        <LoopVideo src={p.video} poster={p.poster} className="absolute inset-0 size-full object-cover" />
                      </div>
                    </TiltCard>
                    <span
                      data-reveal="pop"
                      data-reveal-delay="0.6"
                      className={`absolute -top-5 grid size-20 place-items-center rounded-full bg-(--accent) text-white shadow-lg ring-4 ring-white sm:size-24 ${
                        reverse ? '-left-3 sm:-left-5' : '-right-3 sm:-right-5'
                      }`}
                    >
                      <Icon className="size-9 sm:size-10" />
                    </span>
                  </div>
                </div>

                <div className={reverse ? 'lg:order-1' : ''}>
                  <p data-reveal="up" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-muted uppercase">
                    <span className="font-display text-4xl tracking-normal text-(--accent)">{p.code}</span>
                    <span data-bar className="h-px w-12 bg-(--accent)" />
                    {p.tagline}
                  </p>
                  <h2 id={`${p.id}-titulo`} className="font-display mt-4 text-4xl leading-tight font-semibold text-night-900 sm:text-5xl">
                    <SplitWords text={p.name} />
                  </h2>
                  <p data-reveal="up" data-reveal-delay="0.15" className="mt-6 text-lg leading-relaxed text-muted">
                    {p.text}
                  </p>
                  <div
                    data-reveal="up"
                    data-reveal-delay="0.3"
                    className="group relative mt-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-paper-200 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-(--accent) transition-[width,opacity] duration-500 ease-out group-hover:w-full group-hover:opacity-10" />
                    <p className="relative flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-night-900 uppercase">
                      <span aria-hidden className="size-2 rounded-full bg-(--accent)" />
                      {p.detailTitle}
                    </p>
                    <p className="relative mt-2 text-night-900">{p.detail}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="container-page py-20 sm:py-28">
        <PhotoMosaic
          photos={[
            { src: '/img/procesos/planta-noche.webp', alt: 'Planta de pirólisis de Sirius en operación durante la noche' },
            { src: '/img/laboratorio/equipo.webp', alt: 'Equipo de laboratorio para el análisis de muestras' },
            { src: '/img/procesos/biochar-salida.webp', alt: 'Biochar recién salido del proceso de pirólisis' },
          ]}
        />
      </section>

      <section className="bg-brand-600 text-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div data-reveal="up" className="lg:col-span-7">
            <Eyebrow tone="light">Visitas</Eyebrow>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{visita.title}</h2>
            <p className="mt-4 text-lg text-white/85">{visita.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={contact.whatsapp.href}>Programar por WhatsApp</ButtonLink>
              <ButtonLink href="/contacto" variant="ghost">
                Escribirnos
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="up" data-reveal-delay="0.15" className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md sm:p-8 lg:col-span-5">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-bio-300 uppercase">
              <Clock className="size-4" />
              Horarios de visita
            </p>
            <ul className="mt-4 space-y-2 text-white/90">
              {[...contact.schedule, ...visita.notes].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/15 pt-5 text-sm text-white/75">{contact.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
