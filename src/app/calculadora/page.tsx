import type { Metadata } from 'next';
import Image from 'next/image';
import { Accent, ButtonLink, Label, PageHero } from '@/components/ui';
import { optionalEnv } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Calculadora de carbono',
  description: 'Calcula tu huella de carbono y descubre cómo el biochar de Sirius ayuda a compensarla mientras mejora tus suelos.',
};

// El formulario vive en Airtable. Su enlace de inserción se lee del entorno para no dejar
// el ID de la base escrito en el código; sin la variable, la página ofrece el contacto.
const EMBED_URL = optionalEnv('CALCULADORA_CARBONO_EMBED_URL');

export default function CalculadoraPage() {
  return (
    <>
      <PageHero
        label="Calculadora de carbono"
        title={
          <>
            Calcula tu <Accent tone="alegria">huella</Accent> de carbono
          </>
        }
        text="Conócela y descubre cómo nuestros productos pueden ayudarte a compensarla."
        tint="retono"
      />

      <section className="container-page grid gap-8 py-16 sm:py-24 lg:grid-cols-12">
        <div data-reveal="up" className="lg:col-span-8">
          {EMBED_URL ? (
            <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_30px_60px_-36px_rgba(1,84,172,0.45)]">
              <iframe src={EMBED_URL} title="Calculadora de carbono" className="block h-[40rem] w-full" />
            </div>
          ) : (
            <div className="rounded-[2rem] border border-line bg-white p-8 sm:p-10">
              <h2 className="heading text-3xl text-barranca">La calculadora no está disponible en este momento</h2>
              <p className="mt-3 text-muted">Escríbenos y te ayudamos a estimar tu huella de carbono.</p>
              <div className="mt-6">
                <ButtonLink href="/contacto">Contactar a un experto</ButtonLink>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div data-reveal="up" data-reveal-delay="0.15" className="bg-cotiledon rounded-[2rem] p-7 sm:p-8">
            <Label>Por qué calcularla</Label>
            <h2 className="heading text-3xl text-barranca">El primer paso para reducir tu impacto</h2>
            <p className="mt-4 leading-relaxed text-ink/80">
              En Sirius Regenerative estamos comprometidos con soluciones que no solo reducen emisiones: también ayudan a capturar el carbono ya presente en la atmósfera.
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">
              Nuestro biochar captura carbono a largo plazo y, al mismo tiempo, mejora la calidad y la productividad de tus suelos.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contacto">Contacta a nuestros expertos</ButtonLink>
            </div>
          </div>
          <div data-reveal="up" data-reveal-delay="0.3" className="mx-auto w-56">
            <Image
              src="/img/fotos/carbono-banera.webp"
              alt="Ilustración de una bañera: el grifo reduce las emisiones y el drenaje remueve el CO₂ acumulado en la atmósfera"
              width={434}
              height={509}
              className="rounded-[1.75rem] shadow-[0_20px_40px_-20px_rgba(1,84,172,0.5)]"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
