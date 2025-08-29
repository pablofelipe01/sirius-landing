'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

// Componente para deslizador antes/después
const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg">
      {/* Imagen "Después" */}
      <Image
        src={afterImage}
        alt="Después - Suelo saludable"
        fill
        className="object-cover"
      />
      
      {/* Imagen "Antes" */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeImage}
          alt="Antes - Suelo erosionado"
          fill
          className="object-cover"
        />
      </div>

      {/* Control deslizante */}
      <div className="absolute inset-0">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
        
        {/* Línea divisoria */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute -left-3 -top-3 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Etiquetas */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        ANTES
      </div>
      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
        DESPUÉS
      </div>
    </div>
  );
};

// Componente para modelo 3D interactivo
const Interactive3DModel = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="text-6xl"
      >
        ✨
      </motion.div>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-green-800 font-semibold">Pasa el cursor para ver la rotación 3D</p>
      </div>
    </div>
  );
};

// Componente para escudo animado
const AnimatedShield = () => {
  return (
    <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-blue-50 to-green-100 rounded-lg flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-8xl"
      >
        🛡️
      </motion.div>
      
      {/* Partículas de protección */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-500 rounded-full"
          animate={{
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-4px',
            marginTop: '-4px'
          }}
        />
      ))}
    </div>
  );
};

// Componente para micro animación de bacterias
const MicroAnimation = () => {
  return (
    <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl"
        >
          🦠
        </motion.div>
      </div>

      {/* Bacterias animadas */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3
          }}
          style={{
            left: '50%',
            top: '50%'
          }}
        >
          🦠
        </motion.div>
      ))}
    </div>
  );
};

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
      description: 'Mezcla premium que mejora la estructura del suelo y activa microbios beneficiosos. Transforma suelos erosionados en ecosistemas vibrantes.',
      image: '/biocharblend.jpg',
      benefits: ['Mejora estructura del suelo', 'Activa microbios', 'Aumenta retención de agua', 'Reduce emisiones CO2'],
      hasSlider: true,
      sliderImages: ['/bio.png', '/bio2.png']
    },
    {
      id: 'star-dust',
      name: 'Star Dust',
      description: 'Formulación personalizada basada en biotecnología que potencia el crecimiento vegetal y fortalece las defensas naturales.',
      image: '/dust.png',
      benefits: ['Estimula crecimiento', 'Fortalece defensas', 'Aumenta rendimiento', 'Formulación personalizada'],
      has3DModel: true
    },
    {
      id: 'tratamiento-plagas',
      name: 'Tratamiento Preventivo de Plagas',
      description: 'Enfoque natural y amigable con la biodiversidad que protege cultivos sin dañar el ecosistema.',
      image: '/plaga2.png',
      benefits: ['100% natural', 'Amigable con biodiversidad', 'Prevención efectiva', 'Sin residuos químicos'],
      hasAnimatedShield: true
    },
    {
      id: 'sirius-bacter',
      name: 'Sirius Bacter',
      description: 'Diversidad microbiana que activa el suelo y promueve un crecimiento saludable de las plantas.',
      image: '/bacter.png',
      benefits: ['Diversidad microbiana', 'Activación del suelo', 'Crecimiento saludable', 'Mejora nutrición'],
      hasMicroAnimation: true
    }
  ];

  return (
    <section id="productos" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Imagen de fondo de alta calidad */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/bio2.png"
          alt="Fondo agrícola regenerativo"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-emerald-800/30 to-green-800/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-green-300 rounded-full opacity-15"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-green-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 shadow-lg">
            NUESTROS PRODUCTOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
            Bioinsumos que Transforman Suelos y Almas
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md mb-8">
            Nuestros productos no solo alimentan cultivos; regeneran ecosistemas y empoderan a los agricultores.
          </p>
          
          {/* Cita destacada */}
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg sm:text-xl italic text-white/95 font-medium mb-4">
              "Sirius es una empresa con conocimiento y amor."
            </blockquote>
            <cite className="text-sm sm:text-base text-white/80">
              – Luis Alberto Obando
            </cite>
          </div>
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
              className={`relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 border border-white/20 ${
                index === 0 ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
            >
              {/* Imagen del producto o elemento visual especial */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                {product.hasSlider && product.sliderImages ? (
                  <BeforeAfterSlider
                    beforeImage={product.sliderImages[0]}
                    afterImage={product.sliderImages[1]}
                  />
                ) : product.has3DModel ? (
                  <Interactive3DModel />
                ) : product.hasAnimatedShield ? (
                  <AnimatedShield />
                ) : product.hasMicroAnimation ? (
                  <MicroAnimation />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
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
                    Compra Ahora
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de descuentos con temporizador */}
        <div className="mt-12 sm:mt-16 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              🔥 ¡Descuentos de Temporada!
            </h3>
            <p className="text-lg mb-6">
              Aprovecha hasta un 30% de descuento en todos nuestros bioinsumos
            </p>
            
            {/* Temporizador de cuenta regresiva */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">15</div>
                <div className="text-xs">DÍAS</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">08</div>
                <div className="text-xs">HORAS</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs">MIN</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">22</div>
                <div className="text-xs">SEG</div>
              </div>
            </div>
            
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-colors">
              ¡Aprovechar Oferta!
            </button>
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¿Listo para transformar tu agricultura?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Descubre cómo nuestros bioinsumos pueden revolucionar tus cultivos y contribuir a un futuro más sostenible.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold transition-colors text-sm sm:text-base shadow-lg">
              Compra Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
