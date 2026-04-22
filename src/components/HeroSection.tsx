'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  /* Parallax suave */
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.50, 0.80]);
  const textY          = useTransform(scrollY, [0, 400], [0, 70]);
  const textOpacity    = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Video de fondo ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay loop muted playsInline
        >
          <source
            src="/video/copy_483F5DC8-DAFB-4DC4-A15F-6769312F16C7_lineav.mov"
            type="video/mp4"
          />
        </video>

        {/* Overlay Imperial (#1A1A33) — color de marca */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: '#1A1A33', opacity: overlayOpacity }}
        />

        {/* Fade inferior hacia blanco */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* ── Contenido principal ── */}
      <motion.div
        className="relative z-20 container mx-auto px-6 text-center max-w-5xl"
        style={{ y: textY, opacity: textOpacity }}
      >

        {/* Tag — Utile Black / DM Sans Black */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md
                     border border-white/20 text-white/90 px-5 py-2 rounded-full
                     font-label text-[11px] mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#00B602] animate-pulse" />
          Agricultura Regenerativa
        </motion.span>

        {/* H1 — Utile Bold / DM Sans Bold — letra spacing -0.02em del manual */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white
                     leading-[1.05] tracking-tight mb-6"
        >
          Regeneramos suelos.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00B602]">
            Transformamos
          </span>{' '}
          la agricultura.
        </motion.h1>

        {/* Frase secundaria — IvyPresto Italic (Cormorant Garamond) */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-brand-accent text-2xl sm:text-3xl text-white/70 mb-4 leading-relaxed"
        >
          "Let's get Sirius!"
        </motion.p>

        {/* Subtítulo — Utile Regular / DM Sans Regular */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Bioinsumos de alto impacto creados con pirólisis y biotecnología
          para nutrir el suelo y potenciar tus cultivos.
        </motion.p>

        {/* CTAs — Botones Sirius (Manual p.45) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Botón Opción 01 — con drop shadow 40% / Azul Barranca */}
          <Link href="/contacto" className="btn-sirius-primary">
            Solicitar asesoría
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Botón Opción 02 — simple, sin shadow */}
          <Link href="https://pedidos-sirius.vercel.app/" className="btn-sirius-secondary">
            Ver productos
          </Link>
        </motion.div>

      </motion.div>

      {/* ── Indicador de scroll ── */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-2">
          <div className="w-1.5 h-2.5 rounded-full bg-white/50" />
        </div>
        <span className="font-label text-[9px] text-white/35 tracking-widest">scroll</span>
      </motion.div>

      {/* ── Estrella Sirius — detalle decorativo ── */}
      <motion.div
        className="absolute top-8 right-8 z-20 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse-slow" />
          <span className="font-label text-[9px] text-white/50">Sirius — La Estrella más Brillante</span>
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
