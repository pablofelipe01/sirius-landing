'use client';

import { useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ScrollAnimation from './ScrollAnimation';
import ProductCard from './ProductCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Asegurarnos de registrar los plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const ProductsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const productRefs = useRef([]);
  const lineRef = useRef(null);

  const products = [
    {
      id: 'biochar-blend',
      title: 'BIOCHAR BLEND',
      description: 'Una mezcla de biochar premium, compost enriquecido y microorganismos benéficos. Mejora la estructura del suelo, activa la vida microbiana y nutre tus cultivos desde la raíz. Fórmula diseñada para regenerar y fortalecer.',
      videoSrc: '/sirius-bacter.mp4', // Ya era un MP4
      tag: 'Bestseller',
      link: '/dashboard'
    },
    {
      id: 'star-dust',
      title: 'STAR DUST',
      description: 'Nuestro nuevo polvo de estrellas: biochar ultraporozo, fortificado con Trichoderma y bacterias benéficas. Regenera tu suelo con nuestro Star Dust, formulado a tu medida para potenciar tus cultivos.',
      videoSrc: '/biodust.mp4', // Cambiado de .png a .mp4
      tag: 'Nuevo',
      link: '/dashboard'
    },
    {
      id: ' TRATAMIENTO PREVENTIVO DE PLAGAS',
      title: ' TRATAMIENTO PREVENTIVO DE PLAGAS',
      description: 'Tu escudo natural contra plagas. Fórmula biológica a la medida con extractos vegetales y microorganismos aliados. Protege tus cultivos mientras cuidas la biodiversidad y el equilibrio de cada hábitat. Aplicación fácil, resultados visibles.',
      videoSrc: '/tratamiento.mp4', // Cambiado de .png a .mp4
      tag: 'Nuevo',
      link: '/dashboard'
    },
    {
      id: 'SIRIUS_BACTER',
      title: 'SIRIUS BACTER',
      description: 'Millones de bacterias y hongos entomopatógenos trabajando juntos por tu cultivo. Sirius Bacter es un consorcio rico en bacterias benéficas que mejora la disponibilidad de nutrientes, estimula raíces y fortalece tu suelo desde lo invisible',
      videoSrc: '/bacter.mp4', // Cambiado de .png a .mp4
      tag: 'Nuevo',
      link: '/dashboard'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current || !titleRef.current || !lineRef.current) return;
    
    const ctx = gsap.context(() => {
      // Creamos una línea de tiempo para coordinar las animaciones
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Fija la sección mientras se hace scroll
          start: "top top", // Comienza cuando la parte superior de la sección llega a la parte superior de la ventana
          end: "+=100%", // Continúa durante el equivalente a 1 altura de pantalla
          scrub: 0.5, // Suavizado con medio segundo de retraso
          // markers: true, // Útil para depuración
        }
      });
      
      // Animación del título
      tl.from(titleRef.current, {
        scale: 0.7, 
        opacity: 0,
        rotation: 5,
        y: -50,
        ease: "power2.out"
      }, 0);
      
      // Animación de la línea
      tl.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none"
      }, 0);
      
      // Cambio de color de fondo gradual
      tl.to(sectionRef.current, {
        backgroundColor: "rgba(236, 253, 245, 1)", // Un color verde muy claro
        ease: "none"
      }, 0);
      
      // Animación de cada tarjeta de producto
      productRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Calculamos un retraso basado en el índice para animación escalonada
        const delay = index * 0.15;
        
        tl.from(card, {
          scale: 0.6,
          opacity: 0,
          rotation: index % 2 === 0 ? 5 : -5, // Alternar la dirección de rotación
          y: 100,
          ease: "power2.out"
        }, delay);
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="productos" 
      ref={sectionRef}
      className="py-20 bg-gray-50 relative overflow-hidden transition-colors duration-500"
      style={{minHeight: '100vh'}} // Asegurar altura mínima para el pin
    >
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
        {/* Línea animada (similar al ejemplo) */}
        <div className="w-full max-w-4xl mx-auto mb-10 h-1 bg-green-500" ref={lineRef}></div>
        
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Nuestros Productos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Productos revolucionarios que están cambiando la agricultura convencional desde la raíz.
          </p>
        </div>
        
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              ref={el => productRefs.current[index] = el}
              className="product-card-wrapper"
            >
              <ProductCard
                title={product.title}
                description={product.description}
                videoSrc={product.videoSrc} // Cambiado de imageSrc a videoSrc
                tag={product.tag}
                link={product.link}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
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
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;