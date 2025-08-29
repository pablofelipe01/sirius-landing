'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Estado del temporizador
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 27,
    seconds: 45
  });

  // Posiciones fijas para las plantas del escudo (evitar hidratación)
  const shieldPlants = [
    { left: '15%', top: '20%', rotate: '0deg' },
    { left: '70%', top: '15%', rotate: '60deg' },
    { left: '85%', top: '50%', rotate: '120deg' },
    { left: '70%', top: '85%', rotate: '180deg' },
    { left: '15%', top: '80%', rotate: '240deg' },
    { left: '5%', top: '50%', rotate: '300deg' }
  ];

  // Posiciones fijas para las bacterias (evitar hidratación)
  const bacteriaPositions = [
    { left: '20%', top: '30%' },
    { left: '35%', top: '50%' },
    { left: '50%', top: '25%' },
    { left: '65%', top: '45%' },
    { left: '80%', top: '35%' }
  ];
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Detectar cuando la sección entra en vista
  const isInView = useInView(contentRef, { 
    once: false, 
    margin: "-100px 0px -100px 0px" 
  });

  // Efecto de transición desde zoom
  const transitionVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.1
      }
    }
  };

  const products = [
    {
      id: 'blend',
      src: '/blend.png',
      alt: 'Biochar Blend',
      title: 'Biochar Blend',
      description: 'Mejora la estructura del suelo y activa microbios beneficiosos. Nuestra formulación premium combina biochar de alta calidad con nutrientes esenciales.',
      benefits: ['Estructura del suelo mejorada', 'Mayor retención de agua', 'Activación microbiana', 'Mayor productividad']
    },
    {
      id: 'biodust',
      src: '/biodust.png',
      alt: 'Star Dust',
      title: 'Star Dust',
      description: 'Formulación personalizada de biochar micronizado. Partículas ultrafinas que penetran profundamente en el suelo.',
      benefits: ['Absorción rápida', 'Distribución uniforme', 'Efecto prolongado', 'Fácil aplicación']
    },
    {
      id: 'combo',
      src: '/combo.png',
      alt: 'Tratamiento Preventivo',
      title: 'Tratamiento Preventivo de Plagas',
      description: 'Enfoque natural y amigable con la biodiversidad. Protege tus cultivos sin dañar el ecosistema.',
      benefits: ['100% natural', 'Amigable con polinizadores', 'Prevención efectiva', 'Sin residuos químicos']
    },
    {
      id: 'bacter',
      src: '/bacter.png',
      alt: 'Sirius Bacter',
      title: 'Sirius Bacter',
      description: 'Diversidad microbiana excepcional que transforma la biología del suelo. Millones de bacterias beneficiosas por gramo.',
      benefits: ['Diversidad microbiana', 'Mejora nutrición', 'Fortalece raíces', 'Aumenta resistencia']
    },
    {
      id: 'bacter2',
      src: '/bacter2.png',
      alt: 'Sirius Bacter Premium',
      title: 'Sirius Bacter Premium',
      description: 'Nuestra formulación más avanzada con bacterias especializadas y biochar activado para máxima efectividad.',
      benefits: ['Máxima concentración', 'Biochar activado', 'Resultados inmediatos', 'Efecto duradero']
    }
  ];

  // Animaciones de scroll más suaves
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.9, 0.9, 0.7]);

  // Variantes de animación para la entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.3
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  // Temporizador de cuenta regresiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          // Reiniciar el temporizador cuando llegue a cero
          return { days: 2, hours: 14, minutes: 27, seconds: 45 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="productos" 
      className="relative min-h-screen overflow-hidden -mt-2" // Aumentamos el margen negativo para eliminar completamente el espacio
    >
      {/* Video Background - SOLO para esta sección */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradiente superior más largo para transición suave desde la sección anterior */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 via-30% to-black/20 via-60% to-transparent"></div>
      </motion.div>

      {/* Contenido */}
      <motion.div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 pt-40 pb-20"
        variants={transitionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        
        {/* Título */}
        <motion.div 
          className="text-center mb-16 relative z-10"
          variants={titleVariants}
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h2 className="text-5xl font-light text-white tracking-wider mb-6">
            Bioinsumos que Transforman Suelos y Almas
          </h2>
          <p className="text-xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed">
            Nuestros productos no solo alimentan cultivos; regeneran ecosistemas y empoderan a los agricultores.
          </p>
          <div className="w-20 h-0.5 bg-white/60 mx-auto mt-8"></div>
        </motion.div>

        {/* Grid de productos */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ 
                y: -20,
                transition: { duration: 0.3 }
              }}
            >
              {/* Contenedor de imagen */}
              <div className="relative h-80 w-full bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 group-hover:border-white/40 transition-all duration-300">
                <motion.div
                  className="absolute inset-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="object-contain drop-shadow-xl"
                    quality={100}
                  />
                </motion.div>
                
                {/* Overlay con información expandida */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-light tracking-wide mb-2">
                      {product.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Efectos visuales especiales */}
                {product.id === 'biodust' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0
                      }}
                    />
                    <motion.div
                      className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </div>
                )}

                {product.id === 'combo' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-16 h-16 border-2 border-green-400/50 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-green-400/30 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-green-400/20 rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>
                    {/* Plantas alrededor del escudo */}
                    {shieldPlants.map((plant, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-6 bg-green-400/40 rounded-t-full"
                        style={{
                          left: plant.left,
                          top: plant.top,
                          transform: `rotate(${plant.rotate})`,
                        }}
                        animate={{
                          scaleY: [1, 1.2, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cita inspiracional */}
        <motion.div 
          className="text-center mt-16 mb-12 relative z-10"
          variants={itemVariants}
        >
          <blockquote className="text-2xl font-light text-white/95 italic max-w-3xl mx-auto leading-relaxed">
            "Sirius es una empresa con conocimiento y amor."
          </blockquote>
          <cite className="text-lg text-white/80 font-light mt-4 block">
            
          </cite>
        </motion.div>

        {/* Sección de descuentos */}
        <motion.div 
          className="text-center mt-12 mb-8 relative z-10"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-white mb-4">
              🎉 Descuento de Temporada
            </h3>
            <p className="text-white/90 mb-6">
              15% OFF en todos nuestros bioinsumos por tiempo limitado
            </p>
            <div className="flex justify-center gap-4 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-xs text-white/70">Días</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-white/70">Horas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-white/70">Min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-white/70">Seg</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA minimalista */}
        <motion.div 
          className="text-center mt-8 relative z-10"
          variants={itemVariants}
        >
          <motion.a
            href="https://pedidos-sirius.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-light text-lg tracking-wider hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Compra Ahora
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;