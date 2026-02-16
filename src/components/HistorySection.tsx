'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  {
    year: '2018',
    title: 'Planta Fundadora',
    description: 'Primera planta de pirólisis con la que inició SIRIUS, utilizada para los primeros ensayos y aprendizajes iniciales.',
    accent: '#00B602',
  },
  {
    year: '2019',
    title: 'Eureka',
    description: 'Segunda planta que sirvió como maestra de pirólisis durante 3 años, aportando hallazgos invaluables.',
    accent: '#00A3FF',
  },
  {
    year: '2020',
    title: 'Inicio en Biológicos',
    description: 'Contratación del equipo de microbiología e inicio del trabajo con bioinsumos microbianos.',
    accent: '#0154AC',
  },
  {
    year: '2022',
    title: 'Rafaela 1.0',
    description: 'Diseño y construcción del primer reactor propio. Encendido y fase de comisionamiento de más de un año.',
    accent: '#00B602',
  },
  {
    year: '2023',
    title: 'Consolidación Comercial',
    description: 'Alcance de 8 clientes constantes en biológicos, consolidando la producción y mejorando continuamente.',
    accent: '#00A3FF',
  },
  {
    year: '2024',
    title: 'Rafaela 2.0 + Laboratorio',
    description: 'Rediseño de la planta enfocada en calidad del biochar. Construcción de laboratorio microbiológico propio.',
    accent: '#0154AC',
  },
  {
    year: '2025',
    title: 'Expansión',
    description: 'Meta de expansión de capacidad de pirólisis y consolidación del portafolio de biológicos y biochar blend.',
    accent: '#00B602',
  },
];

const HistorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      {/* Subtle decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ECF1F4] rounded-full -translate-y-1/2 translate-x-1/3 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F2FFDD] rounded-full translate-y-1/2 -translate-x-1/3 opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-[#0154AC] font-semibold text-sm tracking-wider uppercase">
            Nuestra Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A33] mt-3 mb-5">
            7 años de innovación
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Desde 2018, un viaje de innovación continua en pirólisis y biotecnología
            que ha revolucionado la agricultura regenerativa.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year + m.title}
                  initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`relative flex flex-col md:flex-row items-center md:mb-16 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full border-[3px] border-white shadow-md"
                      style={{ backgroundColor: m.accent }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                    <div className="group bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-3">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: m.accent }}
                        >
                          {m.year}
                        </span>
                        {/* Mobile dot */}
                        <div
                          className="md:hidden w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: m.accent }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A33] mb-2 group-hover:text-[#0154AC] transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;