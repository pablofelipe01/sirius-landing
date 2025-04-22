'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const galleryImages = [
    {
      src: '/foto4.png',
      alt: 'Naturaleza y tecnología',
      caption: 'Biodiversidad en armonía con innovación'
    },
    {
      src: '/foto5.png',
      alt: 'Proceso de biochar',
      caption: 'Ciencia aplicada a procesos naturales'
    },
    {
      src: '/foto6.png',
      alt: 'Cultivos saludables',
      caption: 'Resultados visibles en nuestros cultivos'
    },
    {
      src: '/foto7.png',
      alt: 'Equipo Sirius',
      caption: 'Nuestro equipo trabajando en campo'
    }
  ];

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Naturaleza, tecnología y conservación en armonía 🚜💡
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detrás de cada imagen hay una historia. En este recap, te llevamos detrás de cámaras 
              para mostrar cómo la biodiversidad y la innovación pueden coexistir.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          {/* Galería principal */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl mb-8 aspect-[16/9]"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Image 
              src={galleryImages[activeIndex].src} 
              alt={galleryImages[activeIndex].alt}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-xl font-bold">{galleryImages[activeIndex].caption}</p>
              </div>
            </div>
            {/* Controles */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full shadow transition-colors"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full shadow transition-colors"
              aria-label="Imagen siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Miniaturas */}
          <div className="flex justify-center space-x-2 mt-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-green-600' : 'bg-gray-300'
                } transition-colors`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <ScrollAnimation direction="up" delay={0.4} className="mt-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-gray-700">
              Desde la fotografía de vida silvestre hasta el impacto del biochar y la inteligencia 
              artificial en la agricultura, en Sirius trabajamos con un propósito claro: desarrollar 
              soluciones que respeten y fortalezcan los ecosistemas. 🌱🌎
            </p>
            <p className="text-xl font-bold mt-4 text-gray-800">
              Porque el futuro de la agroindustria no está en elegir entre productividad y naturaleza, 
              sino en hacer que ambas prosperen juntas. 💚✨
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default GallerySection;