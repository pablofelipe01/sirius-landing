'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  {
    year: '2018',
    title: 'Planta Fundadora',
    description: 'Primera planta de pirólisis con la que inició SIRIUS, utilizada para los primeros ensayos y aprendizajes iniciales.',
    color: '#00B602',   /* Verde Alegría */
  },
  {
    year: '2019',
    title: 'Eureka',
    description: 'Segunda planta que sirvió como maestra de pirólisis durante 3 años, aportando hallazgos invaluables.',
    color: '#0154AC',   /* Azul Barranca — dominante */
  },
  {
    year: '2020',
    title: 'Inicio en Biológicos',
    description: 'Contratación del equipo de microbiología e inicio del trabajo con bioinsumos microbianos.',
    color: '#00A3FF',   /* Azul Cielo */
  },
  {
    year: '2022',
    title: 'Rafaela 1.0',
    description: 'Diseño y construcción del primer reactor propio. Encendido y fase de comisionamiento de más de un año.',
    color: '#00B602',
  },
  {
    year: '2023',
    title: 'Consolidación Comercial',
    description: 'Alcance de 8 clientes constantes en biológicos, consolidando la producción y mejorando continuamente.',
    color: '#0154AC',
  },
  {
    year: '2024',
    title: 'Rafaela 2.0 + Laboratorio',
    description: 'Rediseño de la planta enfocada en calidad del biochar. Construcción de laboratorio microbiológico propio.',
    color: '#00A3FF',
  },
  {
    year: '2025',
    title: 'Expansión',
    description: 'Meta de expansión de capacidad de pirólisis y consolidación del portafolio de biológicos y biochar blend.',
    color: '#00B602',
  },
];

const HistorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-white relative overflow-hidden"
    >
      {/* Decoración — paleta Sirius sprout-light */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#ECF1F4] -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[#F2FFDD] translate-y-1/2 -translate-x-1/3 opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 sm:mb-24"
        >
          {/* Label — Utile / DM Sans — font-label */}
          <span className="font-label text-[#0154AC] text-[11px] mb-4 block">
            Nuestra Trayectoria
          </span>

          {/* H2 — Utile Bold / DM Sans Bold — tracking tight del manual */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A33] leading-[1.05] tracking-tight mb-5">
            7 años de innovación
          </h2>

          {/* Frase de marca — IvyPresto Italic (Cormorant Garamond) */}
          <p className="font-brand-accent text-2xl text-[#0154AC]/70 mb-4">
            "Sirius es regeneración"
          </p>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Desde 2018, un viaje de innovación continua en pirólisis y biotecnología
            que ha revolucionado la agricultura regenerativa.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-4xl mx-auto">

          {/* Línea vertical — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px
                          bg-gradient-to-b from-transparent via-[#BCD7EA] to-transparent
                          -translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year + m.title}
                  initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative flex flex-col md:flex-row items-center md:mb-14 last:mb-0
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot en la línea */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-4 h-4 rounded-full border-[3px] border-white shadow-md"
                      style={{ backgroundColor: m.color }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                    <div className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm
                                    hover:shadow-lg hover:border-[#BCD7EA] transition-all duration-300
                                    relative overflow-hidden">

                      {/* Línea top animada hover — color de marca */}
                      <div
                        className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                        style={{ backgroundColor: m.color }}
                      />

                      <div className="flex items-center gap-3 mb-3">
                        {/* Año — Utile Black / DM Sans Black */}
                        <span
                          className="font-black text-sm px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.year}
                        </span>
                        {/* Dot mobile */}
                        <div
                          className="md:hidden w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-[#1A1A33] mb-2
                                     group-hover:text-[#0154AC] transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Espaciador */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CTA final — Botón Opción 01 del manual ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a href="/contacto" className="btn-sirius-primary inline-flex">
            Únete al movimiento
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default HistorySection;
