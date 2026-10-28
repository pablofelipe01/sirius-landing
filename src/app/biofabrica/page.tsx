import type { Metadata } from 'next';
import Image from 'next/image';
import { Clock, MapPin } from '@/components/icons';
import { LoopVideo } from '@/components/LoopVideo';
import { PillarTabs } from '@/components/PillarTabs';
import { Accent, ButtonLink, Label, PageHero, SectionHeading } from '@/components/ui';
import { biofabricaIntro, pilares, visita } from '@/lib/content/biofabrica';
import { contact } from '@/lib/content/site';

export const metadata: Metadata = {
  title: 'Biofábrica',
  description: biofabricaIntro,
};

// Collage de dos filas: campo y laboratorio arriba, laboratorio y biochar abajo. Un marco lleva un
// clip del video de marca en vez de foto (su poster es el primer fotograma).
const galeria: { image: string; alt: string; shape: string; speed: number; video?: string }[] = [
  { image: '/img/campo/aplicacion.webp', alt: 'Persona aplicando un producto Sirius al suelo', shape: 'organic', speed: 4 },
  { image: '/img/laboratorio/petri.webp', alt: 'Colonias de microorganismos en una caja de Petri', shape: 'rounded-[2rem]', speed: -6 },
  { image: '/img/procesos/plantulas.webp', alt: 'Plántulas en hileras sobre suelo oscuro', shape: 'rounded-full', speed: 9 },
  { image: '/img/laboratorio/microscopio-detalle.webp', alt: 'Objetivo de microscopio de 100 aumentos sobre una lámina', shape: 'rounded-full', speed: 6 },
  { image: '/video/web/biochar-piezas.webp', video: '/video/web/biochar-piezas.mp4', alt: 'Trozos de biochar en blanco y negro', shape: 'organic-alt', speed: -4 },
  { image: '/img/laboratorio/equipo.webp', alt: 'Mano con guante manejando un equipo de laboratorio', shape: 'rounded-[2rem]', speed: 8 },
];

export default function BiofabricaPage() {
  return (
    <>
      <PageHero
        label="Biofábrica Sirius"
        title={
          <>
            Donde el fuego ancestral se encuentra con la <Accent>ciencia viva</Accent>
          </>
        }
        text={biofabricaIntro}
      />

      {/* La ilustración de la biofábrica, como una ventana que sale del hero */}
      {/* Fondo partido: la mitad de arriba continúa el hero y la de abajo ya es la página */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-sutileza-50)_50%,#fff_50%)]">
        <div className="container-page">
          {/* La ilustración se acerca mientras se baja: arranca más pequeña y termina a todo el ancho */}
          <div data-scale-in className="relative aspect-[1297/823] overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-30px_rgba(1,84,172,0.45)] sm:aspect-[21/10]">
            <div data-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
              <Image src="/img/fotos/biofabrica-ilustracion.webp" alt="Ilustración de la biofábrica de Sirius entre la selva y las montañas" fill priority quality={90} sizes="100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          label="Cuatro pilares"
          title={
            <>
              Lo que pasa <Accent tone="alegria">adentro</Accent>
            </>
          }
          text="Pasa el cursor o toca cada pilar para verlo en acción."
        />
        <div className="mt-12">
          <PillarTabs items={pilares} detailed />
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        {/* Collage en parallax: cada columna corre a su propia velocidad y cada foto se abre como cortina */}
        <div className="grid gap-5 md:grid-cols-3 md:py-12">
          {galeria.map((g, i) => (
            <div key={g.image} data-parallax={g.speed} className={i % 3 === 1 ? 'md:mt-16' : i % 3 === 2 ? 'md:mt-8' : ''}>
              <div className={`relative aspect-[3/4] overflow-hidden ${g.shape}`}>
                <div data-reveal-mask data-reveal-delay={(i % 3) * 0.12} className="absolute inset-0">
                  {g.video ? (
                    <>
                      <LoopVideo src={g.video} poster={g.image} className="size-full object-cover" />
                      <span className="sr-only">{g.alt}</span>
                    </>
                  ) : (
                    <Image src={g.image} alt={g.alt} fill quality={90} sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        <div className="bg-retono grid gap-10 rounded-[2.5rem] p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div data-reveal="up" className="lg:col-span-7">
            <Label>Visitas</Label>
            <h2 className="heading text-4xl text-barranca sm:text-5xl">{visita.title}</h2>
            <p className="mt-4 text-lg text-ink/80">{visita.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={contact.whatsapp.href}>Programar por WhatsApp</ButtonLink>
              <ButtonLink href="/contacto" variant="light">
                Escribirnos
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="up" data-reveal-delay="0.15" className="rounded-[1.75rem] bg-white p-6 sm:p-8 lg:col-span-5">
            <p className="flex items-center gap-2 text-sm font-bold text-barranca">
              <Clock className="size-4" />
              Horarios de visita
            </p>
            <ul className="mt-4 space-y-2 text-ink/85">
              {[...contact.schedule, ...visita.notes].map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="mt-5 flex gap-2 border-t border-line pt-5 text-sm text-muted">
              <MapPin className="size-4 shrink-0 text-barranca" />
              {contact.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
