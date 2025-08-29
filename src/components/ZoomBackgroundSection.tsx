'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  { name: 'Regeneración Holística', details: 'Sanar el ser y el entorno.', icon: '🌱' },
  { name: 'Comunidad Consciente', details: 'Una familia unida por amor y colaboración.', icon: '🤝' },
  { name: 'Transformación Auténtica', details: 'Despertar el potencial individual.', icon: '🔥' },
  { name: 'Visión Regenerativa', details: 'Construir un futuro climáticamente positivo.', icon: '🌍' },
];

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' as const } },
};

const InteractiveInfographic = ({ stages, hoveredIndex, isMobile = false }) => {
  return (
    <AnimatePresence mode="wait">
      {hoveredIndex !== null && stages[hoveredIndex] ? (
        <motion.div
          key={stages[hoveredIndex].name}
          className="w-64 max-w-xs bg-white/10 backdrop-blur-md rounded-full p-6 
                     text-center flex flex-col items-center justify-center 
                     border border-white/20"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-5xl mb-2">{stages[hoveredIndex].icon}</div>
          <h4 className="font-bold text-xl text-white mb-2" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            {stages[hoveredIndex].name}
          </h4>
          <p className="text-white/80 text-base" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            {stages[hoveredIndex].details}
          </p>
        </motion.div>
      ) : (
        !isMobile ? (
          <motion.div
            key="default"
            className="text-center"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h4 className="font-bold text-2xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Nuestro Ciclo
            </h4>
            <p className="text-white/80" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Pasa el cursor sobre un ícono
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="mobile-instruction"
            className="text-center"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h4 className="font-bold text-xl text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              Toca un ícono
            </h4>
            <p className="text-white/70 text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Descubre nuestro ciclo regenerativo
            </p>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

const IconoItem = ({ stage }: { stage: { name: string; details: string; icon: string } }) => (
  <motion.div
    className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-md 
               border-2 border-white/40 rounded-full flex flex-col 
               items-center justify-center text-center text-white 
               font-bold p-2 cursor-pointer shadow-lg"
    whileHover={{
      scale: 1.15,
      backgroundColor: '#ffffff4d',
      borderColor: '#ffffff99',
      boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.4)',
    }}
    whileTap={{
      scale: 1.3,
      backgroundColor: '#ffffff66',
      borderColor: '#ffffffcc',
      boxShadow: '0px 0px 40px rgba(255, 255, 255, 0.6)',
    }}
    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
  >
    <span className="text-xl sm:text-2xl mb-1">{stage.icon}</span>
    <span className="text-[9px] sm:text-xs leading-tight font-semibold">{stage.name}</span>
  </motion.div>
);

const MobileIconoItem = ({ stage, onTouch }: { 
  stage: { name: string; details: string; icon: string }; 
  onTouch: () => void 
}) => (
  <motion.div
    className="w-24 h-24 bg-white/20 backdrop-blur-md 
               border-2 border-white/40 rounded-full flex flex-col 
               items-center justify-center text-center text-white 
               font-bold p-3 cursor-pointer shadow-lg"
    whileTap={{
      scale: 1.4,
      backgroundColor: '#ffffff66',
      borderColor: '#ffffffcc',
      boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.8)',
      rotate: [-5, 5],
    }}
    transition={{ 
      duration: 0.4, 
      type: 'spring', 
      stiffness: 200,
      damping: 10
    }}
    onTouchStart={(e) => {
      onTouch();
    }}
    onClick={onTouch}
  >
    <motion.span 
      className="text-2xl mb-1"
      animate={{ 
        scale: [1, 1.1],
        rotate: [0, 5]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity
      }}
    >
      {stage.icon}
    </motion.span>
    <span className="text-xs leading-tight font-semibold">{stage.name}</span>
  </motion.div>
);

const ZoomBackgroundSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Verificar que todos los elementos necesarios existen
    if (!sectionRef.current || !bgRef.current || !overlayRef.current) return;
    
    // Verificar que los elementos están en el DOM
    if (!bgRef.current?.parentNode || !overlayRef.current?.parentNode) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=540%',
          scrub: 1,
        },
      });

      tl.to(bgRef.current, { scale: 4.0, duration: 1, ease: 'power1.inOut' }, 0);
      tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 0.5);
    }, sectionRef);

    return () => {
      // Limpiar todas las animaciones de ScrollTrigger antes de revertir el contexto
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  // Auto-reset hover en móvil después de 3 segundos
  useEffect(() => {
    if (isMobile && hoveredIndex !== null) {
      const timer = setTimeout(() => {
        setHoveredIndex(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex, isMobile]);

  return (
    <section ref={sectionRef} className="pin-section relative w-full h-screen overflow-hidden">
      {/* Fondo con zoom */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: '58% center' }}>
        <img
          src="/agricultura-regenerativa.png"
          alt="Agricultura regenerativa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-start opacity-0 p-2 sm:p-4 font-sans">
        {/* Gradiente inferior para transición suave */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
        {/* Título superior */}
        <motion.div
          className="mt-20 sm:mt-32 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Nuestro Propósito
          </h1>
          <p className="text-sm sm:text-base md:text-lg italic text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            "Sirius está aquí para ayudar a recordar quiénes somos."
          </p>
        </motion.div>

        {/* Núcleo interactivo */}
        <div className="relative flex-grow flex items-center justify-center w-full">
          {/* Centro con el texto dinámico */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <InteractiveInfographic stages={stages} hoveredIndex={hoveredIndex} isMobile={isMobile} />
          </div>

          {/* Íconos */}
          {/* Mobile → burbujas animadas, Desktop → posiciones absolutas */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Layout para móvil - Burbujas animadas */}
            <div className="sm:hidden relative w-full h-full">
              {/* Burbuja 1 - Arriba izquierda */}
              <motion.div
                className="absolute top-[25%] left-[15%]"
                animate={{
                  y: [0, -10],
                  rotate: [0, 5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0
                }}
              >
                <MobileIconoItem 
                  stage={stages[0]} 
                  onTouch={() => setHoveredIndex(0)}
                />
              </motion.div>

              {/* Burbuja 2 - Arriba derecha */}
              <motion.div
                className="absolute top-[20%] right-[15%]"
                animate={{
                  y: [0, 15],
                  rotate: [0, -8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <MobileIconoItem 
                  stage={stages[1]} 
                  onTouch={() => setHoveredIndex(1)}
                />
              </motion.div>

              {/* Burbuja 3 - Abajo izquierda */}
              <motion.div
                className="absolute bottom-[25%] left-[20%]"
                animate={{
                  y: [0, -8],
                  rotate: [0, 6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 2
                }}
              >
                <MobileIconoItem 
                  stage={stages[2]} 
                  onTouch={() => setHoveredIndex(2)}
                />
              </motion.div>

              {/* Burbuja 4 - Abajo derecha */}
              <motion.div
                className="absolute bottom-[20%] right-[20%]"
                animate={{
                  y: [0, 12],
                  rotate: [0, -4],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <MobileIconoItem 
                  stage={stages[3]} 
                  onTouch={() => setHoveredIndex(3)}
                />
              </motion.div>
            </div>

            {/* Layout para pantallas grandes */}
            <div className="hidden sm:block absolute inset-0">
              {/* Arriba */}
              <motion.div
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-[12%] left-1/2 -translate-x-1/2"
              >
                <IconoItem stage={stages[0]} />
              </motion.div>

              {/* Derecha */}
              <motion.div
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-1/2 left-[60%] -translate-y-1/2"
              >
                <IconoItem stage={stages[1]} />
              </motion.div>

              {/* Abajo */}
              <motion.div
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-[70%] left-1/2 -translate-x-1/2"
              >
                <IconoItem stage={stages[2]} />
              </motion.div>

              {/* Izquierda */}
              <motion.div
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-1/2 left-[33.5%] -translate-y-1/2"
              >
                <IconoItem stage={stages[3]} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoomBackgroundSection;
