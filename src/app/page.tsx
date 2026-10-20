import Image from 'next/image';
import Link from 'next/link';
import { Allies } from '@/components/Allies';
import { HeroSlider } from '@/components/HeroSlider';
import { ArrowRight } from '@/components/icons';
import { LineFlipCard } from '@/components/LineFlipCard';
import { LoopVideo } from '@/components/LoopVideo';
import { ButtonLink, Eyebrow, SectionHeading } from '@/components/ui';
import { heroSlides, homeLines, homeMilestones, homePillars, homeQuote } from '@/lib/content/home';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Sirius Regenerative: biochar y biológicos para la agricultura regenerativa</h1>
      <HeroSlider slides={heroSlides} />

      {/* Qué hacemos */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Qué hacemos"
          title="Bioinsumos que nacen en nuestra biofábrica"
          text="Biochar, biológicos y análisis de laboratorio: tres líneas de trabajo con un mismo propósito, devolverle la vida al suelo."
        />
        <ul data-reveal-stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {homeLines.map((l) => (
            <li key={l.href}>
              <LineFlipCard line={l} />
            </li>
          ))}
        </ul>
      </section>

      {/* Historia */}
      <section className="relative overflow-hidden bg-paper-100">
        <div className="container-page grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Así empezó el camino" title="Desde 2018 aprendiendo del fuego y del suelo" />
            <ol className="relative mt-10 space-y-8 pl-8">
              <span data-line className="absolute inset-y-0 left-0 w-px bg-brand-600/30" aria-hidden />
              {homeMilestones.map((m, i) => (
                <li key={m.year} data-reveal="left" data-reveal-delay={String(i * 0.15)} className="relative">
                  <span className="absolute top-2 -left-[2.4rem] size-3 rounded-full bg-bio-500 ring-4 ring-paper-100" aria-hidden />
                  <p data-counter={m.year} data-counter-from={String(Number(m.year) - 10)} data-counter-grouping="false" className="font-display text-5xl font-semibold text-brand-600 tabular-nums">
                    {m.year}
                  </p>
                  <p className="mt-2 text-lg text-night-900">{m.text}</p>
                </li>
              ))}
            </ol>
            <div data-reveal="up" data-reveal-delay="0.3">
              <p className="mt-10 text-muted">Sigue el camino completo.</p>
              <div className="mt-5">
                <ButtonLink href="/somos-sirius#historia" variant="secondary">
                  Recorre nuestra historia
                </ButtonLink>
              </div>
            </div>
          </div>
          <div data-reveal="scale" className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
            {/* Más alta que su marco para que el parallax no deje bordes vacíos */}
            <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
              <Image src="/img/campo/aplicacion.webp" alt="Aplicación de un bioinsumo de Sirius en el suelo" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Biofábrica */}
      <section className="container-page py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Biofábrica Sirius" title="Donde la ciencia se encuentra con la regeneración" />
          <div data-reveal="up" data-reveal-delay="0.15">
            <ButtonLink href="/biofabrica" variant="secondary">
              Conoce la biofábrica
            </ButtonLink>
          </div>
        </div>
        <ul data-reveal-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homePillars.map((p) => (
            <li key={p.id}>
              <Link
                href={`/biofabrica#${p.id}`}
                className="group relative isolate flex aspect-[4/5] flex-col sm:aspect-[3/4] justify-end overflow-hidden rounded-3xl p-6 text-white"
              >
                <LoopVideo src={p.video} poster={p.poster} className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-night-950/90 via-night-950/30 to-transparent" aria-hidden />
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-white/80">{p.text}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-bio-300">
                  Explorar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Filosofía */}
      <section className="relative isolate overflow-hidden bg-night-950 py-28 text-white sm:py-36">
        <div data-parallax="10" className="absolute inset-x-0 -top-[15%] -z-10 h-[130%]">
          <Image src="/img/fotos/mono-aullador.webp" alt="" fill sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-night-950/90 via-night-950/60 to-night-950/30" aria-hidden />
        <div className="container-page max-w-4xl">
          <div data-reveal="up">
            <Eyebrow tone="light">{homeQuote.source}</Eyebrow>
          </div>
          <blockquote data-reveal="up" data-reveal-delay="0.1" className="font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
            “{homeQuote.text}”
          </blockquote>
          <p data-reveal="up" data-reveal-delay="0.2" className="mt-8 text-xl text-white/85">
            {homeQuote.goal}
          </p>
          <div data-reveal="up" data-reveal-delay="0.3" className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={homeQuote.shop}>Comprar bioinsumos</ButtonLink>
            <ButtonLink href="/contacto" variant="ghost">
              Hablar con un asesor
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Grupo empresarial */}
      <section className="bg-paper-100 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Grupo empresarial" title="Crecemos junto a las empresas del grupo" align="center" />
        </div>
        <div data-reveal="fade" data-reveal-delay="0.2" className="mt-12">
          <Allies />
        </div>
      </section>
    </>
  );
}
