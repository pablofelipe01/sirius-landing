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
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const InteractiveInfographic = ({ stages, hoveredIndex }) => {
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
      )}
    </AnimatePresence>
  );
};

const IconoItem = ({ stage }) => (
  <motion.div
    className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-md 
               border-2 border-white/40 rounded-full flex flex-col 
               items-center justify-center text-center text-white 
               font-bold p-2 cursor-pointer shadow-lg"
    whileHover={{
      scale: 1.15,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.6)',
      boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.4)',
    }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xl sm:text-2xl mb-1">{stage.icon}</span>
    <span className="text-[9px] sm:text-xs leading-tight font-semibold">{stage.name}</span>
  </motion.div>
);

const ZoomBackgroundSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !overlayRef.current) return;

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

      tl.to(bgRef.current, { scale: 6.5, duration: 1, ease: 'power1.inOut' }, 0);
      tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-start opacity-0 p-4 font-sans">
        {/* Título superior */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Nuestro Propósito
          </h1>
          <p className="text-base md:text-lg italic text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            "Sirius está aquí para ayudar a recordar quiénes somos."
          </p>
        </motion.div>

        {/* Núcleo interactivo */}
        <div className="relative flex-grow flex items-center justify-center w-full">
          {/* Centro con el texto dinámico */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <InteractiveInfographic stages={stages} hoveredIndex={hoveredIndex} />
          </div>

          {/* Íconos */}
          {/* Mobile → grid, Desktop → absolute */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Layout para móvil */}
            <div className="grid grid-cols-2 gap-6 sm:hidden">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.name}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <IconoItem stage={stage} />
                </motion.div>
              ))}
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
