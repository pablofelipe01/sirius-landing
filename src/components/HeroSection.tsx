'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Obtener altura de la ventana para cálculos de animación
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Reproducir el video automáticamente
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animación de opacidad para el overlay
  const overlayOpacity = useTransform(scrollY, [0, windowHeight * 0.5], [0.5, 0.7]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover w-auto h-auto"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/copy_483F5DC8-DAFB-4DC4-A15F-6769312F16C7_lineav.mov" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        
        {/* Overlay para mejorar legibilidad del texto */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-20 container mx-auto px-4 pt-20 sm:pt-32 pb-16 sm:pb-20 text-center">
        <ScrollAnimation direction="up" delay={0.3}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Despierta tu alma: Regenera el mundo
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.5}>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Sirius es más que una marca; es un movimiento vivo que une el alma humana con la tierra.
          </p>
        </ScrollAnimation>
        
        {/* Scroll to explore */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          <a 
            href="#movimiento" 
            aria-label="Descubre el movimiento"
            className="flex flex-col items-center gap-2 sm:gap-3 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-sm sm:text-base md:text-lg font-medium">Scroll to explore</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 sm:h-7 sm:w-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;