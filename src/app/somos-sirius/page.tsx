import type { Metadata } from 'next';
import Image from 'next/image';
import { TimelineRail } from '@/components/TimelineRail';
import { Accent, Dots, Label, PageHero, SectionHeading } from '@/components/ui';
import { FOUNDED, about, mission, timeline, values, vision } from '@/lib/content/somos';

export const metadata: Metadata = {
  title: 'Somos Sirius',
  description: about.paragraphs[0],
};

const tints = { cotiledon: 'bg-cotiledon', sutileza: 'bg-sutileza', retono: 'bg-retono' } as const;

export default function SomosPage() {
  const years = new Date().getFullYear() - FOUNDED;

  return (
    <>
      <PageHero
        label="Somos Sirius"
        title={
          <>
            Sirius es <Accent>regeneración</Accent>
          </>
        }
        text={`${about.lead}.`}
        image="/img/fotos/mono-aullador.webp"
        imageAlt="Mono aullador entre las ramas del bosque"
      />

      <section id="quienes-somos" className="container-page grid scroll-mt-28 gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div data-reveal="up" className="lg:col-span-5">
          <Label>Quiénes somos</Label>
          <p className="font-serif text-4xl leading-tight text-barranca italic sm:text-5xl">“Let&apos;s get Sirius!”</p>
          <div className="mt-8 flex items-baseline gap-3">
            <span data-counter={years} className="heading text-7xl text-alegria-700">
              {years}
            </span>
            <span className="text-lg font-semibold text-ink/80">años regenerando el suelo desde Barranca de Upía</span>
          </div>
        </div>
        <div data-reveal-stagger className="space-y-6 text-lg leading-relaxed text-ink/85 lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section id="valores" className="container-page scroll-mt-28 pb-20 sm:pb-28">
        <SectionHeading
          label="Nuestros valores"
          title={
            <>
              Somos Sirius, pero no <Accent tone="alegria">tan serios</Accent>
            </>
          }
          text="Nuestra personalidad es deliberadamente humana, cálida y alegre. Somos transparentes con lo que hacemos y creemos en la transformación de los seres y la regeneración del suelo."
        />
        <ul data-reveal-stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.name} className={`${tints[v.tint]} flex flex-col rounded-[2rem] p-8 sm:p-10`}>
              <span className="font-serif text-2xl text-barranca/60 italic">0{i + 1}</span>
              <h3 className="heading mt-10 text-4xl text-barranca">{v.name}</h3>
              <p className="mt-2 font-serif text-xl text-alegria-700 italic">{v.motto}</p>
              <p className="mt-4 leading-relaxed text-ink/80">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="historia" className="bg-sutileza scroll-mt-28 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            label="Nuestra historia"
            title={
              <>
                Así empezó <Accent>el camino</Accent>
              </>
            }
            text="Desde 2018, un viaje de innovación continua en pirólisis y biotecnología."
          />
        </div>
        <div className="mt-6">
          <TimelineRail items={timeline} />
        </div>
      </section>

      <section id="mision" className="container-page scroll-mt-28 py-20 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <article data-reveal="up" className="relative overflow-hidden rounded-[2rem] bg-barranca p-8 text-white sm:p-12">
            <p className="flex items-center gap-2.5 text-sm font-semibold text-white/80">
              <Dots />
              Misión
            </p>
            <p className="heading mt-8 text-3xl sm:text-4xl">{mission}</p>
          </article>
          <article data-reveal="up" data-reveal-delay="0.12" className="bg-cotiledon relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <p className="flex items-center gap-2.5 text-sm font-semibold text-barranca">
              <Dots />
              Visión
            </p>
            <p className="heading mt-8 text-3xl text-barranca sm:text-4xl">{vision}</p>
          </article>
        </div>
        <div data-reveal="up" className="relative mt-5 aspect-[21/9] overflow-hidden rounded-[2rem]">
          <Image src="/img/campo/aerea.webp" alt="Vista aérea de un sendero entre cultivos" fill sizes="100vw" className="object-cover" />
        </div>
      </section>
    </>
  );
}
