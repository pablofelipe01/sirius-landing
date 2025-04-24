'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

const SustainabilitySection = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isVideoInView = useInView(videoRef, { once: true, margin: '-100px' });

  // Variantes para animaciones
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decoración visual */}
      <div className="absolute top-0 right-0 -mt-32 -mr-32 text-green-200 opacity-20">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 text-green-300 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ¡ALERTA! 🚨
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              SER SOSTENIBLE YA NO ES SUFICIENTE
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div ref={ref} className="flex">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full"
            >
              <p className="text-lg mb-6">
                Vivimos en un planeta que lleva décadas acumulando CO₂. Y aunque reducir las emisiones 
                es vital, no es lo único que debemos hacer.
              </p>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Cerrar el grifo</span> de la bañera representa actividades de reducción de huella de carbono.
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M19 12h.01M6 12h.01" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Para revertir el daño</span> ya hecho, necesitamos soluciones que remuevan el carbono acumulado en la atmósfera.
                  </p>
                </div>
              </div>
              
              <p className="text-lg mt-auto">
                En Sirius llevamos 5 años transformando residuos orgánicos en biochar, una forma estable 
                de carbono que puede permanecer en el suelo por siglos, nutriendo ecosistemas y regenerando suelos.
              </p>
            </motion.div>
          </div>
          
          <div ref={videoRef} className="flex">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVideoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-lg w-full flex flex-col bg-gray-800"
            >
              <div className="flex-grow flex items-center justify-center">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/hqCqPQWPdk0?si=FVoJNKdranbC3nBY" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                  style={{ maxHeight: '100%' }}
                ></iframe>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent pointer-events-none flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Biochar: Captura de carbono</h3>
                  <p className="text-white/80">
                    Una tecnología ancestral, optimizada con ciencia moderna
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <ScrollAnimation direction="up" delay={0.3} className="mt-16">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Productos que trabajan CON la naturaleza, NO EN CONTRA DE ELLA.
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              Porque para sanar el planeta no basta con menos daño.<br />
              Hay que restaurar. Hay que regenerar. Hay que remover.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default SustainabilitySection;