/**
 * Directorio del grupo: un solo enlace que lleva a los canales de cada empresa.
 *
 * Se llega aqui por QR o por el enlace que se pega en la bio de una red, asi
 * que vale lo mismo que en /tarjeta: pantalla de celular, una tarea, botones
 * grandes. La diferencia es que aqui la persona todavia no sabe a cual de las
 * empresas quiere entrar, por eso cada fila pesa igual y el logo manda.
 *
 * Los enlaces del grupo son Linktree: los administra cada equipo y cambian
 * sin tocar este repositorio. Solo Sirius apunta a una ruta de este sitio.
 *
 * El fondo es la foto del morichal a pantalla completa (.fondo-directorio en
 * globals.css) con un velo oscuro encima. Las tarjetas son de vidrio: dejan
 * pasar el paisaje difuminado, asi que el texto va en blanco.
 *
 * Todo es CSS: la pagina se sirve como server component, sin JS de cliente.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Directorio | Sirius Regenerative',
  description:
    'Enlaces oficiales de Sirius Regenerative, Guaicaramo, Del Llano Alto Oleico, Fundación Guaicaramo y Hato Guaicaramo.',
};

type Entrada = {
  nombre: string;
  descripcion: string;
  url: string;
  /** true cuando la URL es de este sitio: se navega con Link, sin abrir pestana. */
  interno?: boolean;
  /**
   * Archivo en /public/logos. Los cuatro logos oficiales son oscuros sobre
   * transparente, por eso la placa que los contiene es blanca: sobre el fondo
   * slate de la pagina el marron de la Fundacion y el azul de Sirius
   * desaparecerian.
   */
  logo: string | null;
  /** Relleno de la placa. Se baja para los logos que ya traen aire propio. */
  relleno?: string;
  /** Iniciales del monograma mientras no haya logo oficial. */
  sigla: string;
  /** Color del halo de la tarjeta al pasar el mouse, tomado de la marca. */
  halo: string;
};

const ENTRADAS: Entrada[] = [
  {
    nombre: 'Sirius Regenerative',
    descripcion: 'Biochar y biológicos para agricultura regenerativa',
    url: '/tarjeta',
    interno: true,
    logo: '/logos/sirius.png',
    sigla: 'SR',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(0,102,180,0.7)]',
  },
  {
    nombre: 'Guaicaramo',
    descripcion: 'Agroindustria de palma en Barranca de Upía',
    url: 'https://linktr.ee/Guaicaramo',
    logo: '/logos/guaicaramo.png',
    sigla: 'G',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(110,155,78,0.7)]',
  },
  {
    nombre: 'Del Llano Alto Oleico',
    descripcion: 'Aceite de palma alto oleico del Llano',
    url: 'https://linktr.ee/DelLlanoAltoOleico',
    logo: '/logos/del-llano.png',
    // El isotipo es vertical y sin margen propio: necesita mas aire que los demas.
    relleno: 'p-2.5 sm:p-3.5',
    sigla: 'DLL',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(0,110,80,0.7)]',
  },
  {
    nombre: 'Fundación Guaicaramo',
    descripcion: 'Programas sociales y ambientales en Barranca de Upía',
    url: 'https://linktr.ee/FundacionGuaicaramo',
    logo: '/logos/fundacion-guaicaramo.png',
    sigla: 'FG',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(140,170,110,0.7)]',
  },
  {
    nombre: 'Hato Guaicaramo',
    descripcion: 'Ganadería del grupo en el Llano',
    url: 'https://linktr.ee/HatoGuaicaramo',
    logo: '/logos/hato-guaicaramo.png',
    // El monograma viene recortado al filo de la letra: sin este aire extra
    // toca los bordes de la placa y se ve mas grande que los demas logos.
    relleno: 'px-4 py-2.5 sm:px-6 sm:py-4',
    sigla: 'HG',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(234,120,60,0.7)]',
  },
];

/**
 * Placa del logo: blanca, de tamano fijo, con el logo en `object-contain`.
 *
 * Los logos vienen en proporciones muy distintas (Guaicaramo es apaisado, el
 * de Del Llano es vertical). La placa fija el area y `object-contain` deja que
 * cada uno use lo que necesite sin deformarse ni desalinear las filas.
 *
 * En movil la placa encoge: la pagina se ve sobre la foto del morichal y cada
 * pixel que no ocupa una tarjeta es paisaje que se ve.
 */
function Logo({ entrada }: { entrada: Entrada }) {
  const placa =
    'relative flex h-14 w-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/85 backdrop-blur-sm shadow-sm ring-1 ring-white/50 transition duration-300 group-hover:scale-[1.04] group-hover:bg-white group-hover:shadow-md sm:h-[4.5rem] sm:w-24 sm:rounded-2xl';

  if (!entrada.logo) {
    return (
      <div className={placa} aria-hidden>
        <span className="text-xl font-extrabold tracking-tight text-[#6E9B4E]">
          {entrada.sigla}
        </span>
      </div>
    );
  }

  return (
    <div className={`${placa} ${entrada.relleno ?? 'p-2 sm:p-2.5'}`}>
      <Image
        src={entrada.logo}
        alt={entrada.nombre}
        width={192}
        height={144}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function DirectorioPage() {
  return (
    <main className="fondo-directorio flex min-h-screen items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-[19rem] sm:max-w-md">
        <ul className="space-y-3 sm:space-y-4">
          {ENTRADAS.map((entrada, indice) => {
            const contenido = (
              <>
                {/* Brillo que barre la tarjeta al pasar el mouse. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                />
                <Logo entrada={entrada} />
                <span className="relative min-w-0">
                  <span className="block text-sm font-bold leading-tight text-white drop-shadow-sm sm:text-base">
                    {entrada.nombre}
                  </span>
                  {/* La descripcion es lo que obliga a la tarjeta a crecer a dos
                      lineas. En movil se oculta: el logo y el nombre ya dicen a
                      donde lleva el enlace, y la foto de fondo gana el espacio. */}
                  <span className="mt-1 hidden text-xs leading-relaxed text-white/75 sm:block">
                    {entrada.descripcion}
                  </span>
                </span>
                <span
                  className="relative ml-auto text-lg text-white/50 transition-all sm:text-xl duration-300 group-hover:translate-x-1 group-hover:text-white"
                  aria-hidden
                >
                  →
                </span>
              </>
            );

            const clases = [
              'entrada-tarjeta group relative flex items-center gap-3 overflow-hidden rounded-2xl p-2.5 sm:gap-4 sm:rounded-3xl sm:p-4',
              'bg-white/10 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/25 shadow-xl shadow-black/30',
              'transition duration-300 ease-out hover:-translate-y-1 hover:bg-white/20 hover:ring-white/45',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E9B4E]',
              'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
              entrada.halo,
            ].join(' ');

            // El retardo escalona la entrada: las tarjetas caen una tras otra
            // en vez de aparecer todas de golpe.
            const estilo = { animationDelay: `${indice * 90}ms` };

            return (
              <li key={entrada.nombre}>
                {entrada.interno ? (
                  <Link href={entrada.url} className={clases} style={estilo}>
                    {contenido}
                  </Link>
                ) : (
                  <a
                    href={entrada.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clases}
                    style={estilo}
                  >
                    {contenido}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
