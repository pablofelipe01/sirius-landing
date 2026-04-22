'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* Manual de Marca 2023:
   · Paleta: Verde Alegría #00B602 | Azul Barranca #0154AC (dominante) | Azul Cielo #00A3FF
   · Fondo: combinar Imperial #1A1A33 con cotiledon/gradiente para luz cálida
   · Cita final: IvyPresto Italic → font-brand-accent
   · Números grandes: Utile Black → DM Sans Black (font-weight: 900)
   · Labels: font-label
*/

function useCountUp(target: number, isActive: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);
  return value;
}

const stats = [
  {
    value: 2450,
    suffix: '',
    label: 'Toneladas CO₂',
    sub: 'Capturadas del ambiente',
    color: '#00B602',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 22c0-4 2-7 6-8.5C10 12 12 9 12 6a4 4 0 0 1 8 0c0 4-3 7-6 8.5C11 16 9 19 9 22" />
        <path d="M12 22c0-2.5 1-5 3-6.5" />
      </svg>
    ),
  },
  {
    value: 8750,
    suffix: '',
    label: 'Hectáreas',
    sub: 'Regeneradas activamente',
    color: '#0154AC',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 7h18M3 12h18M3 17h18" />
        <path d="M7 3v4M12 3v4M17 3v4M7 17v4M12 17v4M17 17v4" />
      </svg>
    ),
  },
  {
    value: 340,
    suffix: '+',
    label: 'Agricultores',
    sub: 'Apoyados en regeneración',
    color: '#00A3FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const StatCard = ({ stat, isActive, index }: { stat: typeof stats[0]; isActive: boolean; index: number }) => {
  const count = useCountUp(stat.value, isActive, 2000 + index * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col gap-6 p-10 sm:p-12 rounded-2xl border border-white/8
                 bg-white/4 backdrop-blur-sm hover:bg-white/7 transition-all duration-400 overflow-hidden"
    >
      {/* Glow radial hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${stat.color}12 0%, transparent 65%)` }}
      />

      {/* Icono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
      >
        {stat.icon}
      </div>

      {/* Número — Utile Black / DM Sans Black 900 */}
      <div>
        <div className="flex items-end gap-1">
          <span
            className="font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: stat.color }}
          >
            {count.toLocaleString('es-CO')}
          </span>
          <span className="font-black text-2xl pb-2" style={{ color: stat.color }}>
            {stat.suffix}
          </span>
        </div>
        {/* Label — Utile Bold */}
        <p className="text-2xl font-bold text-white mt-1">{stat.label}</p>
        {/* Sub — font-label */}
        <p className="font-label text-white/35 mt-2">{stat.sub}</p>
      </div>

      {/* Línea acento */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-16 group-hover:w-full transition-all duration-700 ease-out"
        style={{ backgroundColor: stat.color }}
      />
    </motion.div>
  );
};

const ImpactoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    /* Fondo: Imperial + gradiente hacia Cotiledon-light — "Belleza de Gaia" */
    <section className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #07080F 0%, #0D1520 60%, #0a150a 100%)' }}
    >
      {/* Textura dots — Verde Alegría */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#00B602 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      {/* Transiciones suaves entre secciones */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1A1A33] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A33] to-transparent pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <p className="font-label text-[#00B602] mb-4">Impacto Real</p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
            Regenerando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B602] to-[#00A3FF]">
              100,000 Hectáreas
            </span>{' '}
            para 2030
          </h2>
          <p className="mt-5 text-lg text-white/50 leading-relaxed">
            Cada producto, cada proyecto, cada alma contribuye a un planeta próspero.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} isActive={isInView} index={i} />
          ))}
        </div>

        {/* Cita — IvyPresto Italic / Cormorant Garamond — Manual p.29 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative border-l-2 border-[#00B602]/40 pl-8 max-w-xl"
        >
          <blockquote className="font-brand-accent text-2xl sm:text-3xl text-white/75 leading-relaxed">
            "Tu alma regenera la tierra. La tierra regenera tu alma."
          </blockquote>
          <cite className="font-label text-[#00B602] mt-4 block not-italic">
            Filosofía Sirius
          </cite>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactoSection;
