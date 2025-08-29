'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  const products = [
    {
      id: 'biochar-blend',
      name: 'Biochar Blend',
      description: 'Mezcla premium de biochar con nutrientes esenciales para mejorar la estructura del suelo y aumentar la retención de agua.',
      image: '/biocharblend.jpg',
      benefits: ['Aumenta fertilidad', 'Mejora retención de agua', 'Reduce emisiones CO2']
    },
    {
      id: 'star-dust',
      name: 'Star Dust',
      description: 'Producto innovador basado en biotecnología que potencia el crecimiento vegetal y fortalece las defensas naturales.',
      image: '/dust.png',
      benefits: ['Estimula crecimiento', 'Fortalece defensas', 'Aumenta rendimiento']
    }
  ];

  return (
    <section id="productos" className="py-16 sm:py-20 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-green-300 rounded-full opacity-15"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-green-100 text-green-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            NUESTROS PRODUCTOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
            Soluciones para la agricultura regenerativa
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Descubre nuestros productos innovadores diseñados para transformar tu agricultura
            en un sistema regenerativo y sostenible.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                index === 0 ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
            >
              {/* Imagen del producto */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Contenido */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Beneficios */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-700 text-sm sm:text-base mb-3">Beneficios principales:</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm sm:text-base text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón */}
                <div className="mt-6">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                    Más información
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Llamado a la acción */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto border border-green-100">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¿Quieres conocer más sobre nuestros productos?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Contáctanos para obtener información detallada, precios y asesoría personalizada
              para tu proyecto agrícola.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
