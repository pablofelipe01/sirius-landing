/**
 * Tarjeta de presentacion de Sirius para compartir por QR.
 *
 * Se llega aqui escaneando el codigo impreso en el hablador, la camiseta o la
 * firma de correo: la persona esta de pie, con una mano ocupada y sin contexto
 * previo. Por eso la pagina cabe en una pantalla de celular, dice en dos lineas
 * que hace la empresa y deja los canales de contacto como botones grandes.
 * Todo el dato de contacto sale de `@/lib/contacto`, que es la fuente unica.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import {
  DIRECCION,
  EMAIL_CONTACTO,
  TELEFONO_ALTERNATIVO,
  TELEFONO_PRINCIPAL,
} from '@/lib/contacto';

const SITIO = 'siriusregenerative.com';

export const metadata: Metadata = {
  title: 'Sirius Regenerative | Contáctanos',
  description:
    'Biológicos y biochar para agricultura regenerativa. Escríbenos por WhatsApp, teléfono o correo.',
};

/** Lo que hacemos, en el orden en que lo cuenta el equipo comercial. */
const SOLUCIONES = [
  'Biochar Blend',
  'Sirius Bacter',
  'Control preventivo de plagas y enfermedades',
];

/**
 * Redes con el icono de marca actual (pack fa6). El color de hover es el de
 * cada marca: a ese tamano el icono se reconoce por color antes que por forma.
 */
const REDES = [
  {
    nombre: 'Instagram',
    url: 'https://www.instagram.com/sirius.colombia',
    Icono: FaInstagram,
    hover: 'hover:text-pink-400',
  },
  {
    nombre: 'YouTube',
    url: 'https://www.youtube.com/@thesiriuschannel',
    Icono: FaYoutube,
    hover: 'hover:text-red-500',
  },
  {
    nombre: 'Facebook',
    // URL canonica a la que redirige el enlace de compartir facebook.com/share/1JFvttHx2u:
    // los share links de Facebook caducan, el perfil por id no.
    url: 'https://www.facebook.com/people/Sirius-Regenerative/61575309277208/',
    Icono: FaFacebookF,
    hover: 'hover:text-blue-500',
  },
  {
    nombre: 'LinkedIn',
    url: 'https://www.linkedin.com/company/sirius-regenerative',
    Icono: FaLinkedinIn,
    hover: 'hover:text-sky-400',
  },
];

export default function TarjetaPage() {
  const whatsapp = `https://wa.me/${TELEFONO_PRINCIPAL.numero}?text=${encodeURIComponent(
    'Hola Sirius, escaneé su código QR y quiero más información.'
  )}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-green-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md">
        <header className="text-center">
          <Image
            src="/logo.png"
            alt="Sirius Regenerative"
            width={180}
            height={60}
            priority
            className="mx-auto h-auto w-40"
          />
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
            Agricultura regenerativa,
            <span className="block text-green-400">con resultados en campo</span>
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            Biochar y biológicos hechos en Barranca de Upía. Suelo vivo, menos química de síntesis y cultivos más resistentes a plagas y enfermedades.
          </p>
        </header>

        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {SOLUCIONES.map((solucion) => (
            <li
              key={solucion}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
            >
              {solucion}
            </li>
          ))}
        </ul>

        {/* Canales directos: son la razon de ser de la pagina, van antes que nada mas. */}
        <div className="mt-8 space-y-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-green-500 px-6 py-4 text-center text-base font-bold text-slate-900 transition hover:bg-green-400"
          >
            💬 Escríbenos por WhatsApp
          </a>
          <a
            href={`tel:+${TELEFONO_PRINCIPAL.numero}`}
            className="block rounded-2xl border-2 border-white/20 px-6 py-4 text-center text-base font-bold transition hover:border-white/40 hover:bg-white/5"
          >
            📞 Llamar {TELEFONO_PRINCIPAL.etiqueta}
          </a>
          <a
            href={`mailto:${EMAIL_CONTACTO}`}
            className="block break-all rounded-2xl border-2 border-white/20 px-6 py-4 text-center text-sm font-bold transition hover:border-white/40 hover:bg-white/5"
          >
            ✉️ {EMAIL_CONTACTO}
          </a>
        </div>

        <section className="mt-8 space-y-2 rounded-2xl bg-white/5 p-5 text-sm text-white/75">
          <p>📍 {DIRECCION}, Meta, Colombia</p>
          <p>
            ☎️ Linea alterna:{' '}
            <a
              href={`tel:+${TELEFONO_ALTERNATIVO.numero}`}
              className="font-medium text-white hover:underline"
            >
              {TELEFONO_ALTERNATIVO.etiqueta}
            </a>
          </p>
        </section>

        <footer className="mt-8 text-center text-sm">
          <Link href="/" className="font-semibold text-green-400 hover:underline">
            🌐 {SITIO}
          </Link>
          <div className="mt-5 flex justify-center gap-3">
            {REDES.map(({ nombre, url, Icono, hover }) => (
              <a
                key={nombre}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={nombre}
                title={nombre}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 ${hover}`}
              >
                <Icono size={18} />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
