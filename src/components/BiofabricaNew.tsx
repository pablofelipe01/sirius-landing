'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* Manual de Marca 2023:
   · Fondo: Imperial #1A1A33 (color de marca oscuro)
   · Texto principal: Utile Bold → DM Sans Bold
   · Labels: font-label (DM Sans Medium, tracking widest)
   · Acento cita: IvyPresto Italic → font-brand-accent (Cormorant Garamond Italic)
   · Colores: Verde Alegría #00B602 | Azul Barranca #0154AC | Azul Cielo #00A3FF
*/

const pillars = [
  {
    number: '01',
    title: 'Pirólisis',
    description: 'Proceso controlado de calor que transforma residuos orgánicos en biochar de alta calidad. Nuestra planta Rafaela 2.0 opera con precisión científica para garantizar carbono estable.',
    color: '#00B602',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2c0 6-6 8-6 13a6 6 0 0 0 12 0c0-5-6-7-6-13z" />
        <path d="M12 12c0 3-2 4.5-2 6.5a2 2 0 0 0 4 0C14 16.5 12 15 12 12z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Biotecnología',
    description: 'Microorganismos beneficiosos cultivados en nuestro laboratorio propio. Millones de bacterias especializadas que transforman la biología del suelo y potencian raíces.',
    color: '#0154AC',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
        <circle cx="12" cy="13" r="2" />
        <path d="M12 11v-2M12 17v-2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Agentics IA',
    description: 'Piroliapp y Alma: nuestros agentes inteligentes que optimizan procesos, analizan datos del suelo en tiempo real y personalizan recomendaciones para cada agricultor.',
    color: '#00A3FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="7" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="17" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Formulación',
    description: 'Soluciones personalizadas para cada tipo de suelo, cultivo e industria. Combinamos biochar, microbiología y nutrientes en formulaciones únicas de alto impacto.',
    color: '#00B602',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 3v11.5a3.5 3.5 0 0 0 7 0V3" />
        <path d="M6 3h12" />
        <path d="M7 14.5c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5" />
        <circle cx="8" cy="19" r="1" fill="currentColor" />
        <circle cx="12" cy="21" r="1" fill="currentColor" />
        <circle cx="16" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const BiofabricaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 sm:py-36 bg-[#1A1A33] overflow-hidden">
      {/* Grid pattern — Belleza de Gaia */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow Verde Alegría */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00B602]/8 blur-3xl pointer-events-none" />
      {/* Glow Azul Barranca */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#0154AC]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 sm:mb-24"
        >
          {/* Label — font-label (DM Sans Medium tracking) */}
          <p className="font-label text-[#00B602] mb-4">
            Nuestra Tecnología
          </p>

          {/* H2 — Utile Bold DM Sans Bold, -0.02em tracking */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight max-w-3xl">
            Donde el Fuego Ancestral{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00B602]">
              se Encuentra con la Ciencia Viva
            </span>
          </h2>

          {/* Frase de marca — IvyPresto Italic / Cormorant Garamond */}
          <p className="font-brand-accent text-2xl text-white/50 mt-4">
            "Nuestra Biofábrica transforma residuos en vida."
          </p>
        </motion.div>

        {/* Cards — grid con línea separadora */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px
                     bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.number}
              variants={cardVariants}
              className="group relative bg-[#1A1A33] p-8 sm:p-10 flex flex-col gap-6 cursor-default
                         hover:bg-[#1e1e3a] transition-colors duration-300"
            >
              {/* Número — font-label */}
              <span className="font-label" style={{ color: p.color, letterSpacing: '0.25em' }}>
                {p.number}
              </span>

              {/* Icono */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center
                           transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${p.color}15`, color: p.color }}
              >
                {p.icon}
              </div>

              {/* Texto */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3
                               group-hover:text-[#00A3FF] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed
                              group-hover:text-white/65 transition-colors duration-300">
                  {p.description}
                </p>
              </div>

              {/* Línea bottom animada */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                           transition-all duration-500 ease-out"
                style={{ backgroundColor: p.color }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default BiofabricaSection;
