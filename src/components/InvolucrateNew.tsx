'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* Manual de Marca 2023:
   · Fondo claro: Paleta Cotiledon-light #F2FFDD / Primera Retoño #F3F9F0
   · Color dominante: Azul Barranca #0154AC
   · Cita: IvyPresto Italic → font-brand-accent (Cormorant Garamond)
   · Labels: font-label (DM Sans Medium uppercase tracking)
   · Sin emojis — SVG icons Lucide-style
   · Combinación aprobada: Azul Barranca sobre verde-retoño claro
*/

const cards = [
  {
    tag: 'Comunidad',
    title: 'Únete al Movimiento',
    description:
      'Recibe actualizaciones, accede a contenido exclusivo y forma parte de nuestra comunidad regenerativa global.',
    cta: 'Suscribirse',
    href: '/contacto',
    color: '#0154AC',     /* Azul Barranca — dominante del manual */
    bg: '#ECF1F4',        /* Sutileza */
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    tag: 'Experiencias',
    title: 'Asiste a un Evento',
    description:
      'Talleres inmersivos en la naturaleza, visitas a nuestra Biofábrica y experiencias regenerativas para despertar tu propósito.',
    cta: 'Ver Eventos',
    href: '/contacto',
    color: '#00B602',     /* Verde Alegría */
    bg: '#F2FFDD',        /* Cotiledon light */
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    tag: '#LetsGetSirius',
    title: 'Comparte tu Historia',
    description:
      'Únete a la conversación. Muestra cómo Sirius está transformando tu suelo, tu cultivo y tu comunidad.',
    cta: 'Compartir',
    href: 'https://instagram.com',
    color: '#00A3FF',     /* Azul Cielo */
    bg: '#ECF1F4',        /* Sutileza */
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const InvolucrateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    /* Combinación aprobada manual: paleta Primera Retoño como fondo */
    <section className="relative py-28 sm:py-36 overflow-hidden bg-[#F3F9F0]">

      {/* Decoración círculos sutiles — paleta sprout */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#CFE4BF]/40
                      translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#BCD7EA]/30
                      -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto"
        >
          <p className="font-label text-[#0154AC] mb-4">Únete</p>

          <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A33] leading-[1.05] tracking-tight">
            Tu Alma Tiene un Propósito.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0154AC] to-[#00A3FF]">
              Encuéntralo con Nosotros.
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Únete a nuestra comunidad, asiste a un evento inmersivo o comparte tu historia para regenerar el mundo.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 p-8
                         shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-400
                         overflow-hidden cursor-default"
            >
              {/* Línea top hover — color de acento */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full
                           transition-all duration-500 ease-out"
                style={{ backgroundColor: card.color }}
              />

              {/* Tag — font-label */}
              <span className="font-label mb-5" style={{ color: card.color }}>
                {card.tag}
              </span>

              {/* Icono */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6
                           transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: card.bg, color: card.color }}
              >
                {card.icon}
              </div>

              {/* Título — Utile Bold / DM Sans Bold */}
              <h3 className="text-xl font-bold text-[#1A1A33] mb-3 flex-grow-0
                             group-hover:text-[#0154AC] transition-colors duration-300">
                {card.title}
              </h3>

              {/* Descripción — Utile Regular / DM Sans Regular */}
              <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                {card.description}
              </p>

              {/* CTA — Botón simple (Opción 02 del manual) */}
              <a
                href={card.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold
                           transition-all duration-250 cursor-pointer group/link"
                style={{ color: card.color }}
              >
                {card.cta}
                <svg
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Cita — IvyPresto Italic (Cormorant Garamond) — Manual p.29 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="w-10 h-px bg-[#0154AC]/25 mx-auto mb-8" />
          <blockquote className="font-brand-accent text-2xl sm:text-3xl text-[#1A1A33]/65 leading-relaxed">
            "No esperes más. Mira al interior de tu alma y ella te indicará tu camino."
          </blockquote>
          <cite className="font-label text-[#0154AC] mt-5 block not-italic">
            Filosofía Sirius
          </cite>
        </motion.div>

      </div>
    </section>
  );
};

export default InvolucrateSection;
