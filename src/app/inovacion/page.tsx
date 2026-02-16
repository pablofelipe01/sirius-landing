'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const areas = [
  {
    title: 'Pirólisis',
    description: 'Transformamos biomasa residual en biochar mediante pirólisis lenta, generando un enmienda de alto valor que secuestra carbono y revitaliza suelos degradados.',
    icon: '🔥',
    video: '/video/video2.mp4',
  },
  {
    title: 'Biotecnología',
    description: 'Formulamos bioinsumos con microorganismos benéficos que fortalecen la rizosfera, mejoran la nutrición vegetal y promueven la salud integral del cultivo.',
    icon: '🧬',
    video: '/video/video3.mp4',
  },
  {
    title: 'Agentics',
    description: 'Integramos inteligencia artificial y automatización para optimizar procesos productivos, tomar decisiones basadas en datos y escalar de forma inteligente.',
    icon: '🤖',
    video: '/video/video4.mp4',
  },
  {
    title: 'Formulación a la Medida',
    description: 'Diseñamos soluciones personalizadas según las condiciones del suelo, el clima y el cultivo, llevando la ciencia directamente al campo.',
    icon: '⚗️',
    video: '/video/video5.mp4',
  },
];

const stats = [
  { value: '100%', label: 'Tecnologías limpias' },
  { value: '4+', label: 'Áreas de I+D' },
  { value: '∞', label: 'Ciclo regenerativo' },
];

const InnovacionPage = () => {
  const heroRef = useRef(null);
  const areasRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const areasInView = useInView(areasRef, { once: true, margin: '-80px' });

  return (
    <main className="bg-white">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0">
          <video
            src="/video/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A33]/80 via-[#1A1A33]/60 to-[#1A1A33]/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-32" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-[#00B602]/15 backdrop-blur-sm border border-[#00B602]/30 text-[#BCD983] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00B602] animate-pulse" />
              BIOFÁBRICA SIRIUS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Donde la ciencia se encuentra con la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00B602]">
                regeneración
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
              Nuestra biofábrica es el corazón de una agricultura regenerativa y circular, 
              diseñada para devolverle vida al suelo y resiliencia a los cultivos.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-12">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-3xl sm:text-4xl font-bold text-[#00A3FF]">{stat.value}</p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ── Semillero Section ── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFB]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video"
            >
              <video
                src="/video/video6.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A33]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-[#00B602] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  En vivo desde planta
                </span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A33] mb-6 leading-tight">
                Semillero de Conciencia
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Un equipo unido transforma desafíos en oportunidades y construye 
                un futuro más sostenible. Cada proceso en nuestra biofábrica está diseñado 
                para cerrar ciclos y maximizar el impacto regenerativo.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Desde la recepción de materia prima hasta el producto final, cada etapa 
                es una oportunidad para innovar con responsabilidad ambiental.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Economía circular', 'Cero residuos', 'Energía limpia', 'Impacto medible'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#ECF1F4] text-[#0154AC] text-sm font-medium px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Áreas de Innovación ── */}
      <section className="py-20 sm:py-28 bg-white" ref={areasRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#0154AC] font-semibold text-sm tracking-wider uppercase">
              Nuestras Líneas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A33] mt-3 mb-4">
              Áreas de Innovación
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Cada área responde a un eslabón clave de la cadena regenerativa, 
              combinando ciencia, tecnología y trabajo de campo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {areas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 25 }}
                animate={areasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative rounded-2xl overflow-hidden bg-[#1A1A33] h-72 sm:h-80"
              >
                {/* Video fondo */}
                <video
                  src={area.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105 transform transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A33] via-[#1A1A33]/70 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                  <div className="text-3xl mb-3">{area.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{area.title}</h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md group-hover:text-white/90 transition-colors duration-300">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Cierre ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0154AC] to-[#1A1A33]" />
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3FF]/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00B602]/10 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Transformamos residuos en{' '}
              <span className="text-[#00A3FF]">soluciones regenerativas</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Bioinsumos de alto impacto creados con tecnologías limpias como la pirólisis. 
              Agricultura que regenera, no que degrada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0154AC] font-bold px-8 py-3.5 rounded-full hover:bg-[#ECF1F4] transition-colors shadow-lg"
              >
                Hablemos de tu proyecto
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/equipo"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Conoce al equipo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default InnovacionPage;