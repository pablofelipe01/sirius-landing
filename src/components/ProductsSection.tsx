'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import ProductCard from './ProductCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const products = [
    {
      id: 'biochar-blend',
      title: 'BIOCHAR BLEND',
      description: 'Una mezcla potente de biochar premium, compost enriquecido y microorganismos poderosos. Suelos más vivos = cultivos más sanos.',
      imageSrc: '/biocharblend.jpg',
      tag: 'Bestseller',
      link: '/productos#biochar-blend'
    },
    {
      id: 'star-dust',
      title: 'STAR DUST',
      description: 'El nuevo polvo de estrellas: biochar ultra poroso, fortificado con Trichoderma y bacterias benéficas. Regenera el suelo y potencia tus cultivos.',
      imageSrc: '/biodust.png',
      tag: 'Nuevo',
      link: '/productos#star-dust'
    }
  ];

  // Variantes para la animación de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="productos" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-green-300 opacity-20">
          <path fill="currentColor" d="M47.2,-57.1C59.6,-45.2,67.4,-28.5,69.4,-11.1C71.3,6.3,67.3,24.4,56.6,36.8C45.9,49.3,28.4,56.1,9.8,61.4C-8.9,66.8,-28.7,70.6,-42.9,63.5C-57.1,56.3,-65.6,38.2,-69.9,19.2C-74.1,0.1,-74,-19.8,-65.2,-34.7C-56.4,-49.6,-39,-59.3,-22.1,-67.7C-5.2,-76.1,11.1,-83.1,25.4,-78.4C39.8,-73.7,52.1,-57.3,47.2,-57.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-green-500 opacity-10">
          <path fill="currentColor" d="M41.3,-51.2C54.4,-42.9,66.6,-31.6,71.7,-17.1C76.8,-2.6,74.8,15.2,66.7,29.5C58.7,43.8,44.6,54.8,29.4,60.4C14.2,65.9,-2.2,66.1,-17.8,62C-33.4,57.9,-48.1,49.5,-58.3,36.5C-68.5,23.6,-74.1,6.2,-71.3,-9.3C-68.6,-24.9,-57.4,-38.6,-44.2,-47C-31,-55.4,-15.5,-58.5,-0.2,-58.2C15,-57.9,30.1,-54.1,41.3,-51.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Nuestros Productos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Productos revolucionarios que están cambiando la agricultura convencional desde la raíz.
            </p>
          </div>
        </ScrollAnimation>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {products.map(product => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard
                title={product.title}
                description={product.description}
                imageSrc={product.imageSrc}
                tag={product.tag}
                link={product.link}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <ScrollAnimation direction="up" delay={0.2} className="mt-16 text-center">
          <div className="inline-block bg-green-100 border border-green-200 rounded-lg p-4 md:p-6">
            <p className="text-lg md:text-xl text-green-800 font-bold mb-2">
              ¡APROVECHA NUESTROS DESCUENTOS POR TEMPORADA DE SIEMBRA!
            </p>
            <a 
              href="/ventas" 
              className="inline-block mt-2 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-colors"
            >
              Ver ofertas
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProductsSection;