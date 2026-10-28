import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from '@/components/icons';
import { LoopVideo } from '@/components/LoopVideo';
import { HorizontalGallery } from '@/components/motion/HorizontalGallery';
import { ScrubText, SplitWords } from '@/components/motion/SplitWords';
import { ViajeEstelar } from '@/components/motion/ViajeEstelar';
import { PillarTabs } from '@/components/PillarTabs';
import { SpinBadge } from '@/components/SpinBadge';
import { Ticker } from '@/components/Ticker';
import { Accent, ButtonLink, Label, SectionHeading } from '@/components/ui';
import { pilares } from '@/lib/content/biofabrica';
import { bento, galeria, hero, homeQuote, origen, ticker, ventana } from '@/lib/content/home';

export default function Home() {
  return (
    <>
      {/* Intro del logo (viaje estelar, 6 s, una vez por sesión) y al terminar entra el hero claro:
          gradiente Sutileza, titular que sube palabra por palabra y video enmarcado. Con mouse, el marco,
          el sello y la tarjeta flotan a distinta profundidad */}
      <ViajeEstelar>
        <section data-depth-scene className="bg-sutileza relative flex min-h-svh flex-col justify-center overflow-hidden">
          <div className="container-page grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-24">
            <div className="lg:col-span-7">
              <p data-reveal="up" className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-barranca shadow-sm">
                <span className="size-2 rounded-full bg-alegria" aria-hidden />
                {hero.greeting}
              </p>
              <SplitWords as="h1" delay={0.15} className="heading mt-6 block text-[3.1rem] text-barranca sm:text-7xl lg:text-[5.6rem]">
                Despierta tu alma, <Accent>regenera</Accent> el mundo.
              </SplitWords>
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

            <div data-reveal="scale" data-reveal-delay="0.2" className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div data-depth="10">
                <div className="frame relative aspect-[4/5] overflow-hidden bg-sutileza-50 ring-8 ring-white/70">
                  <div data-parallax="6" data-zoom className="absolute -inset-y-[8%] inset-x-0">
                    <LoopVideo src={hero.video} poster={hero.poster} eager className="size-full object-cover object-[64%_50%]" />
                  </div>
                  <span className="sr-only">{hero.imageAlt}</span>
                </div>
              </div>
              <div data-depth="26" className="absolute -top-4 -right-2 sm:-right-6">
                <SpinBadge />
              </div>
              {/* Producto destacado, sobre la esquina de la foto */}
              <div data-depth="18" className="absolute -bottom-6 -left-2 sm:-left-8">
                <Link
                  href={hero.product.href}
                  className="group flex max-w-[17rem] items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_20px_40px_-20px_rgba(1,84,172,0.55)] transition-transform hover:-translate-y-1"
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
          </div>
        </section>
      </ViajeEstelar>

      <Ticker words={ticker} />

      {/* Origen: el biochar a pantalla completa y el texto encima, visible desde que se llega (sin pin ni scroll).
          Mide lo mismo que la pantalla (svh: sin contar las barras del navegador del celular); solo crece si
          el texto no cabe, como en un celular acostado */}
      <section className="bg-imperial relative flex min-h-svh items-center overflow-hidden py-24">
        {/* En celular la pantalla vertical recorta los lados: se corre el encuadre hacia la flor */}
        <LoopVideo src={ventana.video} poster={ventana.poster} className="absolute inset-0 size-full object-cover object-[72%_50%] sm:object-center" />
        {/* Velo para leer el texto sobre el video: Imperial desde la izquierda, como el gradiente del manual */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(26,26,51,0.88)_0%,rgba(26,26,51,0.55)_45%,rgba(26,26,51,0.05)_80%)]" />
        <div className="container-page relative text-white">
          <div className="max-w-2xl">
            <Label tone="light">Así empezó el camino</Label>
            <h2 className="heading text-4xl sm:text-5xl lg:text-6xl">{origen.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{origen.text}</p>
          </div>
        </div>
      </section>

      {/* El camino: tres pasos sobre una línea que se llena con el scroll */}
      <section className="bg-retono py-20 sm:py-28">
        <div className="container-page">
          {/* Las líneas van fuera de la lista: la entrada escalonada anima a cada hijo de la lista */}
          <div className="relative">
            <span aria-hidden className="absolute top-2 right-0 left-0 hidden h-0.5 bg-alegria/20 sm:block" />
            <span aria-hidden data-progress className="absolute top-2 right-0 left-0 hidden h-0.5 bg-alegria sm:block" />
            <ol data-reveal-stagger className="relative grid gap-10 sm:grid-cols-3 lg:gap-6">
              {origen.puntos.map((p, i) => (
                <li key={p.title} className="relative">
                  <span aria-hidden className={`relative block size-4 rounded-full ring-4 ring-retono-50 ${i % 2 === 0 ? 'bg-cielo' : 'bg-alegria'}`} />
                  <p className="heading mt-6 text-4xl text-barranca">{p.title}</p>
                  <p className="mt-3 max-w-72 text-lg text-ink/80">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal="up" className="mt-14">
            <ButtonLink href="/somos-sirius" variant="light">
              Conoce Sirius
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Qué hacemos: cuadrícula de tarjetas de distinto tamaño */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          label="Qué hacemos"
          title={
            <>
              Bioinsumos que nacen en <Accent tone="alegria">nuestra</Accent> biofábrica
            </>
          }
          text="Bioinsumos y biochar: dos líneas de trabajo con un mismo propósito, devolverle la vida al suelo."
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
              <div data-parallax="7" data-zoom className="absolute -inset-y-[10%] inset-x-0">
                <Image src={bento.biochar.image} alt="" fill quality={90} sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
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
            <div className="frame relative mx-8 mt-auto mb-8 min-h-72 flex-1 overflow-hidden">
              <div data-parallax="7" data-zoom className="absolute -inset-y-[10%] inset-x-0">
                <LoopVideo src={bento.biologicos.video} poster={bento.biologicos.poster} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </Link>

          <Link href={bento.siriusChar.href} className="group flex items-center gap-6 rounded-[2rem] border border-line bg-white p-8 sm:p-10">
            <span className="frame relative size-28 shrink-0 overflow-hidden ring-4 ring-sutileza-50">
              <Image src={bento.siriusChar.image} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span>
              <span className="heading block text-2xl text-barranca">{bento.siriusChar.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{bento.siriusChar.text}</span>
            </span>
          </Link>

          <Link href={bento.acompanamiento.href} className="bg-imperial group relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-white sm:p-10">
            <span className="heading block text-3xl">{bento.acompanamiento.title}</span>
            <span className="mt-3 block text-white/75">{bento.acompanamiento.text}</span>
            <span className="mt-6 flex items-center gap-2 font-bold text-cielo">
              Agendar una visita <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Galería: la sección se fija y las fotos pasan de lado */}
      <HorizontalGallery
        items={galeria}
        intro={
          <>
            <Label tone="light">Del laboratorio al campo</Label>
            <h2 className="heading text-4xl sm:text-5xl">
              Lo que hacemos, <Accent tone="inherit">de cerca</Accent>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">Imágenes de la biofábrica, el laboratorio, los cultivos y la vida que los rodea.</p>
          </>
        }
      />

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
          <SplitWords as="blockquote" className="block font-serif text-5xl leading-[1.05] text-barranca italic sm:text-6xl lg:text-7xl">
            “{homeQuote.text}”
          </SplitWords>
          {/* La misión se enciende palabra por palabra mientras se lee */}
          <ScrubText className="mx-auto mt-10 max-w-3xl text-2xl leading-snug font-semibold text-barranca sm:text-3xl">{homeQuote.mission}</ScrubText>
          <div data-reveal="up" data-reveal-delay="0.3" className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contacto">Hablar con un asesor</ButtonLink>
          </div>
        </div>
      </section>

    </>
  );
}
