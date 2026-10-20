import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from '@/components/icons';
import { PolicyDock } from '@/components/PolicyDock';
import { ProductNav } from '@/components/ProductNav';
import { SplitWords } from '@/components/motion/SplitWords';
import { TiltCard } from '@/components/ui/3d-card';
import { ButtonLink, Eyebrow, PageHero } from '@/components/ui';
import { fichas, productos, productosIntro } from '@/lib/content/productos';
import { shopUrl } from '@/lib/content/site';

export const metadata: Metadata = {
  title: 'Productos',
  description: productosIntro,
};

// Color de acento por producto: insignia del código y detalle de "Beneficios"
const accents = ['#004e9d', '#6eb100', '#009dff', '#10396b'];

export default function ProductosPage() {
  return (
    <>
      <PageHero
        cinematic
        eyebrow="Productos"
        title="Bioinsumos que transforman suelos y almas"
        text={productosIntro}
        image="/img/procesos/biochar-granulado.webp"
      >
        <div data-reveal="up" data-reveal-delay="0.36" className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={shopUrl}>Comprar en la tienda</ButtonLink>
          <ButtonLink href="/contacto" variant="ghost">
            Solicitar asesoría
          </ButtonLink>
        </div>
      </PageHero>

      <ProductNav items={productos} />

      <div className="overflow-x-clip">
        {productos.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <section
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-titulo`}
              style={{ '--accent': accents[i % accents.length] } as CSSProperties}
              className={`relative scroll-mt-32 py-16 sm:py-24 ${reverse ? 'bg-paper-100' : ''}`}
            >
              {/* Código gigante de fondo que se desliza con el scroll */}
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
                {/* Imagen: se abre como cortina al entrar y se inclina siguiendo el cursor */}
                <div className={reverse ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <TiltCard className="rounded-[2rem]">
                      <div data-reveal-mask className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-paper-100 shadow-xl shadow-night-900/10">
                        {/* El zoom del hover va en un envoltorio: la <img> la anima la cortina con GSAP */}
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                          <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                        </div>
                      </div>
                    </TiltCard>
                    {/* Insignia del código que aparece girando sobre la esquina */}
                    <span
                      data-reveal="pop"
                      data-reveal-delay="0.6"
                      className={`font-display absolute -top-5 grid size-20 place-items-center rounded-full bg-(--accent) text-lg font-bold text-white shadow-lg ring-4 ring-white sm:size-24 sm:text-xl ${
                        reverse ? '-left-3 sm:-left-5' : '-right-3 sm:-right-5'
                      }`}
                    >
                      {p.code}
                    </span>
                  </div>
                </div>

                <div className={reverse ? 'lg:order-1' : ''}>
                  <p data-reveal="up" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-muted uppercase">
                    <span className="font-display text-4xl tracking-normal text-(--accent)">0{i + 1}</span>
                    <span data-bar className="h-px w-12 bg-(--accent)" />
                    Producto
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
                    {/* Franja de acento que se extiende al pasar el cursor */}
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-(--accent) transition-[width,opacity] duration-500 ease-out group-hover:w-full group-hover:opacity-10" />
                    <p className="relative flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-night-900 uppercase">
                      <span aria-hidden className="size-2 rounded-full bg-(--accent)" />
                      Beneficios
                    </p>
                    <ul className="relative mt-3 grid gap-2 text-night-900 sm:grid-cols-2">
                      {p.benefits.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check className="mt-1 size-4 shrink-0 text-(--accent)" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section id="fichas" className="container-page scroll-mt-32 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Documentos</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-night-900 sm:text-4xl">Fichas técnicas</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Consulta y descarga la información técnica de nuestros productos.</p>
          </div>
          <PolicyDock policies={fichas} />
        </div>
      </section>

      <section className="container-page grid gap-6 pb-20 sm:pb-28 md:grid-cols-2">
        <div data-reveal-mask className="relative aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src="/img/productos/biochar-blend-banner.webp" alt="Biochar Blend: compost enriquecido con biochar en un recipiente de vidrio" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div data-reveal-mask data-reveal-delay="0.2" className="relative aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src="/img/productos/biologicos-banner.webp" alt="Productos biológicos de Sirius en frascos de laboratorio" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Azul de marca y no night-950: si no, la franja se fundiría con el pie de página */}
      <section className="bg-brand-600 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div data-reveal="up" className="max-w-2xl">
            <Eyebrow tone="light">Asesoría</Eyebrow>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">¿No sabes qué producto necesita tu suelo?</h2>
            <p className="mt-4 text-lg text-white/80">
              Nuestro equipo te ayuda a elegir la solución adecuada para tu cultivo y su estado actual.
            </p>
          </div>
          <div data-reveal="up" data-reveal-delay="0.15" className="flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Solicitar asesoría</ButtonLink>
            <ButtonLink href={shopUrl} variant="ghost">
              Ir a la tienda
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
