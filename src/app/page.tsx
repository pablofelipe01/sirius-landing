import Image from 'next/image';
import Link from 'next/link';
import { Allies } from '@/components/Allies';
import { ArrowRight, Check } from '@/components/icons';
import { PillarTabs } from '@/components/PillarTabs';
import { SpinBadge } from '@/components/SpinBadge';
import { Ticker } from '@/components/Ticker';
import { Accent, ButtonLink, Label, SectionHeading } from '@/components/ui';
import { pilares } from '@/lib/content/biofabrica';
import { bento, hero, homeMilestones, homeQuote, ticker } from '@/lib/content/home';

export default function Home() {
  return (
    <>
      {/* Hero claro: gradiente Sutileza, titular grande y foto en arco */}
      <section className="bg-sutileza relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-7">
            <p data-reveal="up" className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-barranca shadow-sm">
              <span className="size-2 rounded-full bg-alegria" aria-hidden />
              {hero.greeting}
            </p>
            <h1 data-reveal="up" data-reveal-delay="0.1" className="heading mt-6 text-[3.1rem] text-barranca sm:text-7xl lg:text-[5.6rem]">
              Despierta tu alma, <Accent>regenera</Accent> el mundo.
            </h1>
            <p data-reveal="up" data-reveal-delay="0.2" className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
              {hero.text}
            </p>
            <div data-reveal="up" data-reveal-delay="0.3" className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/productos">Ver productos</ButtonLink>
              <ButtonLink href="/somos-sirius" variant="leaf">
                Conoce Sirius
              </ButtonLink>
            </div>
            <ul data-reveal="up" data-reveal-delay="0.4" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-barranca">
              {hero.facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-alegria-700" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="up" data-reveal-delay="0.2" className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden ring-8 ring-white/70">
              <div data-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
                <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute -top-4 -right-2 sm:-right-6">
              <SpinBadge />
            </div>
            {/* Producto destacado, sobre la esquina de la foto */}
            <Link
              href={hero.product.href}
              className="group absolute -bottom-6 -left-2 flex max-w-[17rem] items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_20px_40px_-20px_rgba(1,84,172,0.55)] transition-transform hover:-translate-y-1 sm:-left-8"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={hero.product.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span>
                <span className="block font-bold text-barranca">{hero.product.name}</span>
                <span className="block text-sm leading-snug text-muted">{hero.product.text}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-barranca transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <Ticker words={ticker} />

      {/* Qué hacemos: cuadrícula de tarjetas de distinto tamaño */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          label="Qué hacemos"
          title={
            <>
              Bioinsumos que nacen en <Accent tone="alegria">nuestra</Accent> biofábrica
            </>
          }
          text="Biochar, biológicos y análisis de laboratorio: tres líneas de trabajo con un mismo propósito, devolverle la vida al suelo."
        />

        <div data-reveal-stagger className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <Link href={bento.biochar.href} className="bg-cotiledon group relative grid overflow-hidden rounded-[2rem] sm:grid-cols-2 lg:col-span-2">
            <div className="flex flex-col p-8 sm:p-10">
              <h3 className="heading text-4xl text-barranca">{bento.biochar.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/80">{bento.biochar.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 font-bold text-barranca">
                Conocer el producto <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative m-4 min-h-64 overflow-hidden rounded-[1.5rem] sm:ml-0">
              <Image src={bento.biochar.image} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Link>

          <Link href={bento.biologicos.href} className="bg-sutileza group relative flex flex-col overflow-hidden rounded-[2rem] lg:row-span-2">
            <div className="p-8 sm:p-10">
              <h3 className="heading text-4xl text-barranca">{bento.biologicos.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/80">{bento.biologicos.text}</p>
              <span className="mt-6 flex items-center gap-2 font-bold text-barranca">
                Ver biológicos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="arch relative mx-8 mt-auto mb-8 min-h-72 flex-1 overflow-hidden">
              <Image src={bento.biologicos.image} alt="" fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Link>

          <Link href={bento.laboratorio.href} className="group flex items-center gap-6 rounded-[2rem] border border-line bg-white p-8 sm:p-10">
            {/* Lo micro en un círculo: la muestra vista al microscopio */}
            <span className="relative size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-sutileza-50">
              <Image src={bento.laboratorio.image} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span>
              <span className="heading block text-2xl text-barranca">{bento.laboratorio.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{bento.laboratorio.text}</span>
            </span>
          </Link>

          <Link href={bento.carbono.href} className="bg-imperial group relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-white sm:p-10">
            <span className="heading block text-3xl">{bento.carbono.title}</span>
            <span className="mt-3 block text-white/75">{bento.carbono.text}</span>
            <span className="mt-6 flex items-center gap-2 font-bold text-cielo">
              Calcular ahora <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* El camino: cuatro hitos sobre una línea horizontal */}
      <section className="bg-retono py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              label="Así empezó el camino"
              title={
                <>
                  Desde 2018 aprendiendo del <Accent tone="alegria">fuego</Accent> y del suelo
                </>
              }
            />
            <div data-reveal="up" data-reveal-delay="0.15">
              <ButtonLink href="/somos-sirius#historia" variant="light">
                Recorre nuestra historia
              </ButtonLink>
            </div>
          </div>
          <ol data-reveal-stagger className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute top-2 right-0 left-0 hidden h-0.5 bg-alegria/30 lg:block" />
            {homeMilestones.map((m, i) => (
              <li key={m.year} className="relative">
                <span aria-hidden className={`relative block size-4 rounded-full ring-4 ring-retono-50 ${i % 2 === 0 ? 'bg-cielo' : 'bg-alegria'}`} />
                <p data-counter={m.year} data-counter-from={String(Number(m.year) - 10)} data-counter-grouping="false" className="heading mt-6 text-6xl text-barranca tabular-nums">
                  {m.year}
                </p>
                <p className="mt-3 max-w-60 text-lg text-ink/80">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Biofábrica: pilares como pestañas con su video */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          label="Biofábrica Sirius"
          title={
            <>
              Donde la ciencia se encuentra con la <Accent>regeneración</Accent>
            </>
          }
        />
        <div className="mt-12">
          <PillarTabs items={pilares} />
        </div>
        <div data-reveal="up" className="mt-12">
          <ButtonLink href="/biofabrica" variant="soft">
            Conoce la biofábrica
          </ButtonLink>
        </div>
      </section>

      {/* Filosofía: la frase de marca en la serif, sobre Cotiledón */}
      <section className="bg-cotiledon relative overflow-hidden py-24 sm:py-32">
        <div className="container-page max-w-5xl text-center">
          <div data-reveal="up" className="flex justify-center">
            <Label>{homeQuote.source}</Label>
          </div>
          <blockquote data-reveal="up" data-reveal-delay="0.1" className="font-serif text-5xl leading-[1.05] text-barranca italic sm:text-6xl lg:text-7xl">
            “{homeQuote.text}”
          </blockquote>
          <p data-reveal="up" data-reveal-delay="0.2" className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">
            {homeQuote.mission}
          </p>
          <div data-reveal="up" data-reveal-delay="0.3" className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contacto">Hablar con un asesor</ButtonLink>
          </div>
        </div>
      </section>

      {/* Grupo empresarial */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading label="Grupo empresarial" title="Crecemos junto a las empresas del grupo" align="center" />
        <div className="mt-12">
          <Allies />
        </div>
      </section>
    </>
  );
}
