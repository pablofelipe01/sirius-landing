import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, Download, FileText } from '@/components/icons';
import { ProductNav } from '@/components/ProductNav';
import { Accent, ButtonLink, PageHero, SectionHeading } from '@/components/ui';
import { fichas, productos, productosIntro } from '@/lib/content/productos';
import { shopUrl } from '@/lib/content/site';

export const metadata: Metadata = {
  title: 'Productos',
  description: productosIntro,
};

// Cada producto en su gradiente del manual: el biochar en verde, los biológicos en azul
const tints = ['bg-cotiledon', 'bg-sutileza', 'bg-retono', 'bg-sutileza'];

export default function ProductosPage() {
  return (
    <>
      <PageHero
        label="Productos"
        title={
          <>
            Bioinsumos que <Accent>transforman</Accent> suelos y almas
          </>
        }
        text={productosIntro}
        image="/img/productos/sirius-bacter.webp"
        imageAlt="Frascos de biológicos Sirius entre tallos de bambú"
        tint="cotiledon"
      >
        <div data-reveal="up" data-reveal-delay="0.3" className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={shopUrl}>Comprar en la tienda</ButtonLink>
          <ButtonLink href="/contacto" variant="light">
            Solicitar asesoría
          </ButtonLink>
        </div>
      </PageHero>

      <ProductNav items={productos} />

      <div className="container-page space-y-6 pt-6 pb-20 sm:pb-28">
        {productos.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <section
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-titulo`}
              className={`${tints[i % tints.length]} scroll-mt-40 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14`}
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div data-reveal="up" className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                  <div className="arch group relative mx-auto aspect-[4/5] max-w-sm overflow-hidden ring-8 ring-white/70 lg:max-w-none">
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                  <p data-reveal="up" className="font-serif text-2xl text-barranca/60 italic">
                    0{i + 1}
                  </p>
                  <h2 id={`${p.id}-titulo`} data-reveal="up" data-reveal-delay="0.05" className="heading mt-3 text-5xl text-barranca sm:text-6xl">
                    {p.name}
                  </h2>
                  <p data-reveal="up" data-reveal-delay="0.1" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
                    {p.text}
                  </p>
                  <ul data-reveal-stagger className="mt-8 flex flex-wrap gap-2">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 rounded-xl bg-white/80 px-3.5 py-2 text-sm font-semibold text-ink">
                        <Check className="size-4 shrink-0 text-alegria-700" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal="up" data-reveal-delay="0.2" className="mt-9 flex flex-wrap gap-3">
                    <ButtonLink href={shopUrl}>Comprar</ButtonLink>
                    <ButtonLink href="/contacto" variant="light">
                      Preguntar por {p.name}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section id="fichas" className="container-page scroll-mt-40 pb-20 sm:pb-28">
        <SectionHeading label="Documentos" title="Fichas técnicas" text="Consulta y descarga la información técnica de nuestros productos." />
        <ul data-reveal-stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {fichas.map((f) => (
            <li key={f.file}>
              <a
                href={f.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border-2 border-barranca bg-white p-5 transition-all hover:-translate-y-0.5 hover:bg-sutileza-50 hover:shadow-[0_14px_30px_-18px_rgba(1,84,172,0.5)]"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-barranca text-white">
                  <FileText className="size-6" />
                </span>
                <span className="flex-1 font-bold text-barranca">{f.name}</span>
                <Download className="size-5 shrink-0 text-barranca transition-transform group-hover:translate-y-0.5" />
                <span className="sr-only">(PDF, se abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        <div data-reveal="up" className="bg-sutileza flex flex-col items-start justify-between gap-8 rounded-[2.5rem] p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="heading text-4xl text-barranca sm:text-5xl">
              ¿No sabes qué necesita <Accent>tu suelo</Accent>?
            </h2>
            <p className="mt-4 text-lg text-ink/80">Nuestro equipo te ayuda a elegir la solución adecuada para tu cultivo y su estado actual.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Solicitar asesoría</ButtonLink>
            <ButtonLink href={shopUrl} variant="light">
              Ir a la tienda
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
