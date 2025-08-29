'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 right-0 w-60 h-60 bg-green-300 rounded-full opacity-10 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-green-100 rounded-full opacity-30 transform translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-green-100 text-green-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            BIOFABRICA SIRIUS
          </span>
          <h2 className="text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
            Donde la ciencia se encuentra con la regeneración ♻️
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Nuestra biofábrica es el corazón de una agricultura regenerativa y circular, 
            diseñada para devolverle vida al suelo y resiliencia a los cultivos.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Imagen de equipo grande - Ahora con altura completa */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-xl group h-64 sm:h-80 lg:h-full"
          >
            <div className="absolute inset-0 w-full h-full">
              <video 
                src="/video/video1.mp4" 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
              <div className="p-4 sm:p-6 lg:p-8 text-white">
                <h3 className="text-2xl font-bold mb-2 sm:mb-3">Semillero de Conciencia</h3>
                <p className="text-sm sm:text-base lg:text-lg text-white/90">
                  Un equipo unido transforma desafíos en oportunidades y construye un futuro más sostenible.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Imágenes individuales */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-xl group"
          >
            <video 
              src="/video/video2.mp4" 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
              <div className="p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Pirólisis</h3>
                <p className="text-sm sm:text-base text-white/90">Desarrollando nuevas soluciones</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-xl group"
          >
           <video 
              src="/video/video3.mp4" 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
              <div className="p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Biotecnología</h3>
                <p className="text-sm sm:text-base text-white/90">El corazón de nuestro trabajo</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-xl group"
          >
            <video 
              src="/video/video4.mp4" 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
              <div className="p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Agentics</h3>
                <p className="text-sm sm:text-base text-white/90">Buscando nuevas fronteras</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-xl group"
          >
             <video 
              src="/video/video5.mp4" 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
              <div className="p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Formulación a la Medida</h3>
                <p className="text-sm sm:text-base text-white/90">Llevando la teoría al campo</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto border border-green-100">
            <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">
            Transformamos residuos orgánicos en bioinsumos de alto impacto
            a través de tecnologías limpias como la pirólisis.
            </p>
            {/* <div className="mt-6">
             
              <a 
                href="/equipo" 
                className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Conoce más sobre nuestro equipo
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;