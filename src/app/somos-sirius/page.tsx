import type { Metadata } from 'next';
import { AboutIntro } from '@/components/AboutIntro';
import { HistoryTimeline } from '@/components/HistoryTimeline';
import { MissionVisionCard } from '@/components/MissionVisionCard';
import { ValueCard } from '@/components/ValueCard';
import { TiltCard } from '@/components/ui/3d-card';
import { PageHero, SectionHeading } from '@/components/ui';
import { FOUNDED, about, pillars, purpose, timeline } from '@/lib/content/somos';

export const metadata: Metadata = {
  title: 'Somos Sirius',
  description: about.paragraphs[0],
};

export default function SomosPage() {
  return (
    <>
      <PageHero eyebrow="Somos Sirius" title={about.lead} image="/img/campo/aerea.webp" />

      <AboutIntro
        eyebrow="Quiénes somos"
        title="Una empresa con conocimiento y amor"
        image="/img/campo/aplicacion.webp"
        imageAlt="Integrante de Sirius aplicando un bioinsumo en el suelo"
        years={new Date().getFullYear() - FOUNDED}
        paragraphs={about.paragraphs}
        highlights={about.highlights}
      />

      <section id="historia" className="relative scroll-mt-24 overflow-hidden bg-paper-100 pt-20 pb-40 sm:pt-28 sm:pb-56">
        {/* Manchas de luz con los colores del logo */}
        <div aria-hidden className="drift-blob pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-cielo-300/25 blur-3xl" />
        <div aria-hidden className="drift-blob-reverse pointer-events-none absolute top-1/2 -left-32 size-96 rounded-full bg-bio-300/25 blur-3xl" />

        <div className="container-page relative">
          <SectionHeading
            eyebrow="Nuestra historia"
            title={
              <>
                Así empezó <span className="text-brand-600 underline decoration-bio-500/70 decoration-4 underline-offset-8">el camino.</span>
              </>
            }
            text="Desde 2018, un viaje de innovación continua en pirólisis y biotecnología."
          />
          <HistoryTimeline items={timeline} />

          <div data-reveal="up" className="relative mt-20 border-l-4 border-bio-500 pl-6">
            <p className="font-display text-3xl font-semibold text-night-900 sm:text-4xl">
              Nuestra historia <span className="text-brand-600">sigue creciendo</span>
            </p>
          </div>
        </div>

        {/* Lomas al pie de la sección, en los verdes y azules de la marca */}
        <svg aria-hidden viewBox="0 0 1440 180" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-28 w-full sm:h-40">
          <path d="M0 120 C 200 40, 380 40, 560 110 S 900 170, 1100 90 S 1350 40, 1440 80 V180 H0 Z" className="fill-bio-500/80" />
          <path d="M0 150 C 260 90, 480 90, 700 140 S 1100 190, 1440 120 V180 H0 Z" className="fill-brand-600" />
        </svg>
      </section>

      <section id="proposito" className="container-page scroll-mt-24 py-20 sm:py-28">
        <SectionHeading title="Propósito y visión" />
        <div data-reveal-stagger className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            { label: 'Propósito', text: purpose.purpose, front: 'bg-brand-100 text-night-900', back: 'bg-brand-600 text-white', accent: 'text-cielo-300' },
            { label: 'Visión', text: purpose.vision, front: 'bg-bio-100 text-night-900', back: 'bg-night-900 text-white', accent: 'text-bio-300' },
          ].map((b) => (
            <MissionVisionCard key={b.label} {...b} />
          ))}
        </div>
      </section>

      <section id="pilares" className="scroll-mt-24 bg-paper-100 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Nuestro ciclo" title="Los pilares de un movimiento regenerativo" />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p.name} className="lg:min-h-[34rem]">
                <TiltCard className="h-full rounded-3xl">
                  <ValueCard index={i} {...p} />
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
