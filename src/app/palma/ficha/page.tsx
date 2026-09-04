/**
 * Fichas tecnicas que ve la persona despues de registrarse con el QR.
 *
 * Muestra el PDF oficial embebido. En pantallas grandes se ve dentro de la
 * pagina; en movil el embed se oculta a proposito, porque Safari y Chrome de
 * Android no renderizan PDF dentro de un iframe de forma confiable (unos lo
 * descargan, otros muestran un marco en blanco). Por eso el boton de abrir el
 * PDF esta siempre visible y es el camino principal en celular, que es donde
 * va a estar casi todo el que escanee el QR en el stand.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { EVENTO, contactosPublicables } from '@/lib/palma/config';
import { FICHAS, type FichaProducto } from '@/lib/palma/productos';
import { DIRECCION, EMAIL_CONTACTO } from '@/lib/contacto';

export const metadata: Metadata = {
  title: 'Ficha técnica | Sirius Char y Biochar Blend',
  description: `Fichas técnicas de Sirius Char y Biochar Blend presentadas en ${EVENTO.nombre}.`,
};

function FichaDisponible({ ficha }: { ficha: FichaProducto & { archivo: string } }) {
  return (
    <article id={ficha.id} className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="border-b border-slate-100 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{ficha.nombre}</h2>
        <p className="mt-1 text-base font-medium text-green-700">{ficha.claim}</p>
        {ficha.version && <p className="mt-2 text-xs text-slate-500">{ficha.version}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={ficha.archivo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-green-600 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-green-700"
          >
            Abrir la ficha técnica
          </a>
          <a
            href={ficha.archivo}
            download
            className="flex-1 rounded-xl border-2 border-slate-200 px-6 py-4 text-center text-base font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Descargar PDF{ficha.peso ? ` · ${ficha.peso}` : ''}
          </a>
        </div>
      </div>

      {/* Vista previa solo en pantallas grandes: en movil el iframe de PDF no es confiable. */}
      <div className="hidden bg-slate-100 md:block">
        <iframe
          src={`${ficha.archivo}#view=FitH`}
          title={`Ficha técnica de ${ficha.nombre}`}
          className="h-[900px] w-full border-0"
        />
      </div>
    </article>
  );
}

function FichaPendiente({ ficha }: { ficha: FichaProducto }) {
  return (
    <article id={ficha.id} className="scroll-mt-24 rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{ficha.nombre}</h2>
      <p className="mt-1 text-base font-medium text-green-700">{ficha.claim}</p>
      <p className="mt-4 text-sm text-slate-600">
        La ficha técnica de este producto está en preparación. Escríbenos y te la enviamos en cuanto
        esté lista.
      </p>
      <a
        href="#contacto"
        className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        Solicitarla
      </a>
    </article>
  );
}

export default function PalmaFichaPage() {
  const contactos = contactosPublicables();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-b from-slate-900 to-green-950 px-4 pb-14 pt-28 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
            {EVENTO.nombre} · {EVENTO.fecha}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Fichas técnicas</h1>
          <p className="mt-4 text-sm text-white/70">
            Gracias por registrarte. Aquí está la información técnica completa.
          </p>
        </div>
      </header>

      <div className="mx-auto -mt-8 max-w-4xl space-y-8 px-4 pb-16">
        {FICHAS.map((ficha) =>
          ficha.archivo ? (
            <FichaDisponible
              key={ficha.id}
              ficha={ficha as FichaProducto & { archivo: string }}
            />
          ) : (
            <FichaPendiente key={ficha.id} ficha={ficha} />
          )
        )}

        <section id="contacto" className="scroll-mt-24 rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Hablemos</h2>
          <p className="mt-2 text-sm text-white/70">
            Escríbenos y armamos una recomendación para tu cultivo.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {contactos.map((contacto) => (
              <div key={contacto.nombre} className="rounded-2xl bg-white/10 p-5">
                <p className="text-base font-bold">{contacto.nombre}</p>
                <p className="text-sm text-green-400">{contacto.cargo}</p>
                <div className="mt-4 space-y-2 text-sm">
                  {contacto.telefono && contacto.telefonoDigitos && (
                    <>
                      <a href={`tel:+${contacto.telefonoDigitos}`} className="block hover:underline">
                        📞 {contacto.telefono}
                      </a>
                      <a
                        href={`https://wa.me/${contacto.telefonoDigitos}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        💬 WhatsApp
                      </a>
                    </>
                  )}
                  {contacto.email && (
                    <a href={`mailto:${contacto.email}`} className="block break-all hover:underline">
                      ✉️ {contacto.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-1 border-t border-white/10 pt-6 text-sm text-white/70">
            <p>📍 {DIRECCION}</p>
            <p>
              ✉️{' '}
              <a href={`mailto:${EMAIL_CONTACTO}`} className="break-all hover:underline">
                {EMAIL_CONTACTO}
              </a>
            </p>
            <p>
              🌐{' '}
              <Link href="/" className="hover:underline">
                siriusregenerative.com
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
