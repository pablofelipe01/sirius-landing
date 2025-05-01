'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import VideoHero from './VideoHero';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

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
          <source src="/video/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        
        {/* Overlay para mejorar legibilidad del texto */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 text-center">
        {/* Botón de calculadora CO2 con héroe */}
        <ScrollAnimation direction="down" delay={0.2}>
          <Link href="/calculadora">
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 py-2 rounded-full mb-4 transition-all border border-white/20"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-white text-sm">100+ toneladas CO2 removidas</span>
              <div className="ml-2 bg-green-500/80 text-xs px-1.5 py-0.5 rounded-full text-white">Ver</div>
            </motion.div>
          </Link>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.3}>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Regenera tu suelo y potencializa tus cultivos
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.5}>
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Es momento de complementar tu siembra con nuestros bioinsumos revolucionarios. 
            En Sirius traemos productos que están cambiando la agricultura convencional desde la raíz.
          </p>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.7}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
            {/* El VideoHero ahora se muestra en el diseño original pero no en la posición inferior */}
          </div>
        </ScrollAnimation>
        
        {/* Icono de flecha animado en lugar de la imagen grande */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          <a href="#productos" aria-label="Ir a productos">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white opacity-80 hover:opacity-100" 
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

        {/* VideoHero reposicionado a la izquierda */}
        <div className="absolute bottom-2 left-8 z-20 w-auto">
          <VideoHero />
        </div>

        {/* Iconos de redes sociales - ahora posicionados debajo de img3 pero en la derecha */}
        <div className="absolute bottom-2 right-8 z-20">
          <div className="flex items-center space-x-3">
            <motion.a 
              href="https://www.instagram.com/sirius.colombia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-pink-600 hover:bg-pink-600 hover:text-white p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/company/sirius-regenerative" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </motion.a>
            
            {/* <motion.a 
              href="https://wa.me/573132121019" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-green-600 hover:bg-green-600 hover:text-white p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </motion.a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;