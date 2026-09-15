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
  /** Archivo en /public/logos. */
  logo: string | null;
  /** Alto del logo. Se baja en los que son verticales o muy macizos. */
  alto?: string;
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
    // El isotipo es vertical: a la misma altura que los demas se ve enorme.
    alto: 'h-8 sm:h-9',
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
    // El monograma es macizo: a la altura de los demas pesa mucho mas.
    alto: 'h-7 sm:h-8',
    sigla: 'HG',
    halo: 'group-hover:shadow-[0_16px_38px_-18px_rgba(234,120,60,0.7)]',
  },
];

/**
 * El logo, directo sobre el vidrio de la tarjeta.
 *
 * Los logos vienen en proporciones muy distintas (Guaicaramo es apaisado, el de
 * Del Llano es vertical). La altura es fija y `object-contain` deja que cada uno
 * use el ancho que necesite sin deformarse ni desalinear las filas.
 *
 * `alt` con el nombre de la empresa es lo unico que nombra el enlace ahora que
 * no hay texto visible: sin el, un lector de pantalla solo anuncia una URL.
 */
function Logo({ entrada }: { entrada: Entrada }) {
  if (!entrada.logo) {
    return (
      <span className="relative block text-center text-2xl font-extrabold tracking-tight text-white">
        {entrada.sigla}
      </span>
    );
  }

  return (
    <Image
      src={entrada.logo}
      alt={entrada.nombre}
      width={384}
      height={160}
      className={`relative mx-auto w-auto object-contain transition duration-300 group-hover:scale-[1.04] ${
        entrada.alto ?? 'h-9 sm:h-10'
      }`}
    />
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
              </>
            );

            const clases = [
              'entrada-tarjeta group relative block overflow-hidden rounded-2xl px-6 py-2.5 sm:rounded-3xl sm:py-3',
              'bg-white/20 backdrop-blur-xl backdrop-brightness-125 backdrop-saturate-150 ring-1 ring-white/40 shadow-lg shadow-black/25',
              'transition duration-300 ease-out hover:-translate-y-1 hover:bg-white/30 hover:ring-white/60',
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
