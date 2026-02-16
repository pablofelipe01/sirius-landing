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

  const overlayOpacity = useTransform(scrollY, [0, 600], [0.45, 0.75]);
  const textY = useTransform(scrollY, [0, 400], [0, 60]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/copy_483F5DC8-DAFB-4DC4-A15F-6769312F16C7_lineav.mov" type="video/mp4" />
        </video>
        <motion.div className="absolute inset-0 bg-[#1A1A33]" style={{ opacity: overlayOpacity }} />
        {/* Gradient bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 container mx-auto px-4 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-5 py-2 rounded-full text-sm font-medium tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00B602] animate-pulse" />
          AGRICULTURA REGENERATIVA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-5xl mx-auto"
        >
          Regeneramos suelos.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00B602]">
            Transformamos
          </span>{' '}
          la agricultura.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Bioinsumos de alto impacto creados con pirólisis y biotecnología 
          para nutrir el suelo y potenciar tus cultivos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 bg-[#0154AC] text-white font-bold px-8 py-4 rounded-full hover:bg-[#00A3FF] transition-all duration-300 shadow-lg hover:shadow-[#0154AC]/30 hover:shadow-xl"
          >
            Solicitar asesoría
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="https://pedidos-sirius.vercel.app/"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-medium px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Ver productos
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;