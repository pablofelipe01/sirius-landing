'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import VideoHero from './VideoHero';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

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
              className="inline-flex items-center bg-white/15 backdrop-blur-sm hover:bg-white/25 px-5 py-3 pr-6 rounded-full mb-8 transition-all border border-white/30"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mr-3 relative w-10 h-10">
                <Image 
                  src="/img8.png"
                  alt="CO2 Hero"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-medium">¡Hemos removido <span className="font-bold">100+ toneladas</span> de CO2!</span>
              <div className="ml-2 bg-green-500 text-xs font-bold px-2 py-0.5 rounded-full text-white">Ver</div>
            </motion.div>
          </Link>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.3}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Regenera tu suelo y potencializa tus cultivos
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.5}>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Es momento de complementar tu siembra con nuestros bioinsumos revolucionarios. 
            En Sirius traemos productos que están cambiando la agricultura convencional desde la raíz.
          </p>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={0.7}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <VideoHero />
            
            {/* Iconos de redes sociales */}
            <div className="flex items-center space-x-4">
              <motion.a 
                href="https://www.instagram.com/sirius.colombia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-pink-600 hover:bg-pink-600 hover:text-white p-3.5 rounded-full shadow-lg transition-all transform hover:scale-110"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </motion.a>
              
              <motion.a 
                href="https://www.linkedin.com/company/sirius-regenerative" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white p-3.5 rounded-full shadow-lg transition-all transform hover:scale-110"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </motion.a>
              
              <motion.a 
                href="https://wa.me/573132121019" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-green-600 hover:bg-green-600 hover:text-white p-3.5 rounded-full shadow-lg transition-all transform hover:scale-110"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </motion.a>
            </div>
          </div>
        </ScrollAnimation>
        
        {/* Imagen animada en lugar de la flecha - AHORA MÁS GRANDE */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          <a href="#productos" aria-label="Ir a productos">
            <Image 
              src="/img3.png" 
              alt="Navegar hacia abajo" 
              width={120} 
              height={120}
              className="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg"
            />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;