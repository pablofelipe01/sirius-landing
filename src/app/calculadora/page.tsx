import type { Metadata } from 'next';
import Image from 'next/image';
import { ButtonLink, Eyebrow, PageHero } from '@/components/ui';
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
        eyebrow="Calculadora de carbono"
        title="Calcula tu huella de carbono"
        text="Conócela y descubre cómo nuestros productos pueden ayudarte a compensarla."
        image="/img/campo/palma-aerea.webp"
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div data-reveal="up" className="lg:col-span-8">
          {EMBED_URL ? (
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-night-900/5 ring-1 ring-paper-200">
              <iframe src={EMBED_URL} title="Calculadora de carbono" className="block h-[40rem] w-full" />
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 ring-1 ring-paper-200 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-night-900">La calculadora no está disponible en este momento</h2>
              <p className="mt-3 text-muted">Escríbenos y te ayudamos a estimar tu huella de carbono.</p>
              <div className="mt-6">
                <ButtonLink href="/contacto" variant="secondary">
                  Contactar a un experto
                </ButtonLink>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div data-reveal="up" data-reveal-delay="0.15" className="rounded-3xl bg-bio-100 p-7 sm:p-8">
            <Eyebrow>Por qué calcularla</Eyebrow>
            <h2 className="font-display text-2xl font-semibold text-night-900">El primer paso para reducir tu impacto</h2>
            <p className="mt-4 leading-relaxed text-night-900/80">
              En Sirius Regenerative estamos comprometidos con soluciones que no solo reducen emisiones: también ayudan a capturar el carbono ya presente en la atmósfera.
            </p>
            <p className="mt-4 leading-relaxed text-night-900/80">
              Nuestro biochar captura carbono a largo plazo y, al mismo tiempo, mejora la calidad y la productividad de tus suelos.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contacto" variant="secondary">
                Contacta a nuestros expertos
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="pop" data-reveal-delay="0.3" className="float-soft mx-auto mt-8 w-56">
            <Image
              src="/img/fotos/carbono-banera.webp"
              alt="Ilustración de una bañera: el grifo reduce las emisiones y el drenaje remueve el CO₂ acumulado en la atmósfera"
              width={434}
              height={509}
              className="rounded-3xl shadow-xl"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
