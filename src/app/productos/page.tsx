import type { Metadata } from 'next';
import Image from 'next/image';
import { Download, FileText } from '@/components/icons';
import { SplitWords } from '@/components/motion/SplitWords';
import { ProductNav } from '@/components/ProductNav';
import { Accent, ButtonLink, Label, PageHero, SectionHeading } from '@/components/ui';
import { lineas, productos, productosIntro } from '@/lib/content/productos';

export const metadata: Metadata = {
  title: 'Productos',
  description: productosIntro,
};

// Los bioinsumos en los gradientes azules del manual y el biochar en los verdes
const tints: Record<string, string[]> = {
  bioinsumos: ['bg-sutileza', 'bg-retono'],
  biochar: ['bg-cotiledon', 'bg-retono'],
};

export default function ProductosPage() {
  return (
    <>
      <PageHero
        label="Productos"
        title={
          <>
            Bioinsumos y biochar para <Accent>regenerar</Accent> el suelo
          </>
        }
        text={productosIntro}
        image="/img/productos/sirius-bacter.webp"
        imageAlt="Frascos con líquidos de colores entre tallos de bambú"
        tint="cotiledon"
      >
        <div data-reveal="up" data-reveal-delay="0.3" className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/contacto">Solicitar asesoría</ButtonLink>
          <ButtonLink href="#fichas" variant="light" external={false}>
            Fichas técnicas
          </ButtonLink>
        </div>
      </PageHero>

      <ProductNav items={productos} />

      {lineas.map((linea) => (
        <section key={linea.id} id={linea.id} aria-labelledby={`${linea.id}-titulo`} className="container-page scroll-mt-40 pt-14 pb-6">
          <div data-reveal="up" className="max-w-3xl">
            <Label>{linea.name}</Label>
            <p id={`${linea.id}-titulo`} className="text-lg leading-relaxed text-ink/80">
              {linea.intro}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {linea.productos.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={p.id}
                  id={p.id}
                  aria-labelledby={`${p.id}-nombre`}
                  className={`${tints[linea.id][i % 2]} scroll-mt-40 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14`}
                >
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                      <div className="arch group relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-white/50 ring-8 ring-white/70 lg:max-w-none">
                        <div data-reveal-mask className="absolute inset-0">
                          <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
                            <Image src={p.image} alt={p.alt} fill quality={90} sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                      <p data-reveal="up" className="text-sm font-semibold tracking-wide text-barranca/70 uppercase">
                        {p.rotulo}
                      </p>
                      <SplitWords as="h2" id={`${p.id}-nombre`} delay={0.05} className="heading mt-3 block text-5xl text-barranca sm:text-6xl">
                        {p.name}
                      </SplitWords>
                      <p data-reveal="up" data-reveal-delay="0.1" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
                        {p.text}
                      </p>
                      <dl data-reveal-stagger className="mt-8 grid gap-3 sm:grid-cols-2">
                        {p.datos.map((d) => (
                          <div key={d.label} className="rounded-2xl bg-white/80 px-4 py-3">
                            <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{d.label}</dt>
                            <dd className="mt-1 font-semibold text-ink">{d.value}</dd>
                          </div>
                        ))}
                        <div className="rounded-2xl bg-white/80 px-4 py-3 sm:col-span-2">
                          <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Cultivos en la ficha</dt>
                          <dd className="mt-1 font-semibold text-ink">{p.cultivos}</dd>
                        </div>
                      </dl>
                      <div data-reveal="up" data-reveal-delay="0.2" className="mt-9 flex flex-wrap gap-3">
                        <ButtonLink href={p.ficha} variant="light">
                          Ficha técnica (PDF)
                        </ButtonLink>
                        <ButtonLink href="/contacto">Preguntar por {p.name}</ButtonLink>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section id="fichas" className="container-page scroll-mt-40 py-20 sm:py-28">
        <SectionHeading
          label="Documentos"
          title="Fichas técnicas"
          text="Composición, presentación, uso y manejo de cada producto, tal como los declara su ficha. Versiones de septiembre de 2026."
        />
        <ul data-reveal-stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {productos.map((p) => (
            <li key={p.id}>
              <a
                href={p.ficha}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border-2 border-barranca bg-white p-5 transition-all hover:-translate-y-0.5 hover:bg-sutileza-50 hover:shadow-[0_14px_30px_-18px_rgba(1,84,172,0.5)]"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-barranca text-white">
                  <FileText className="size-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold text-barranca">{p.name}</span>
                  <span className="block text-sm text-muted">{p.rotulo}</span>
                </span>
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
            <p className="mt-4 text-lg text-ink/80">
              Nuestras fichas incluyen acompañamiento agronómico en campo con agendamiento previo. Escríbenos y lo coordinamos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Solicitar asesoría</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
