'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

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
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              NUESTRO EQUIPO
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              🔥 Cuando el trabajo en equipo se llena de energía, todo es posible! ♻️
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La creación de una planta de pirólisis no solo se trata de tecnología e innovación, 
              sino también de personas que trabajan con pasión y alegría.
            </p>
          </div>
        </ScrollAnimation>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Imagen de equipo grande */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 lg:col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image 
              src="/foto5.png" 
              alt="Equipo Sirius trabajando juntos" 
              width={800} 
              height={800}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Nuestro Equipo Completo</h3>
                <p className="text-white/80">
                  Un equipo unido transforma desafíos en oportunidades y construye un futuro más sostenible.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Imágenes individuales */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-lg group"
          >
            <video 
              src="/video/video2.mp4" 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">Investigación</h3>
                <p className="text-white/80 text-sm">Desarrollando nuevas soluciones</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image 
              src="/foto7.png" 
              alt="Miembro del equipo" 
              width={400} 
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">Producción</h3>
                <p className="text-white/80 text-sm">El corazón de nuestro trabajo</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image 
              src="/foto4.png" 
              alt="Miembro del equipo" 
              width={400} 
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">Innovación</h3>
                <p className="text-white/80 text-sm">Buscando nuevas fronteras</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image 
              src="/foto1.png" 
              alt="Miembro del equipo" 
              width={400} 
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">Aplicación</h3>
                <p className="text-white/80 text-sm">Llevando la teoría al campo</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <ScrollAnimation direction="up" delay={0.4} className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-md max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              💚 Aquí, cada sonrisa, cada esfuerzo y cada momento compartido hacen la diferencia. 
              Porque cuando disfrutamos lo que hacemos, trabajamos mejor y logramos grandes cosas juntos. 🚀
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                ¿Qué valoras más en tu equipo de trabajo? ¡Te leemos en los comentarios! 👇
              </h4>
              <a 
                href="/equipo" 
                className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Conoce más sobre nuestro equipo
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default TeamSection;