'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollAnimation from './ScrollAnimation';

// Asegurarnos de registrar el plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalGallerySection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  
  const galleryImages = [
    {
      src: '/imagen1.png',
      alt: 'Naturaleza y tecnología',
      caption: 'Biodiversidad en armonía con innovación'
    },
    {
      src: '/imagen2.png',
      alt: 'Proceso de biochar',
      caption: 'Ciencia aplicada a procesos naturales'
    },
    {
      src: '/imagen3.png',
      alt: 'Cultivos saludables',
      caption: 'Resultados visibles en nuestros cultivos'
    },
    {
      src: '/imagen4.png',
      alt: 'Equipo Sirius',
      caption: 'Nuestro equipo trabajando en campo'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Configurar el desplazamiento horizontal con scroll vertical
      const scrollTween = gsap.to(panelsRef.current, {
        xPercent: -100 * (galleryImages.length - 1),
        ease: "none", // IMPORTANTE: sin ease para que sea proporcional al scroll
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, // Fijar el contenedor durante el scroll
          scrub: 0.5, // Suavizar el movimiento
          start: "top top",
          end: () => `+=${containerRef.current.offsetWidth * (galleryImages.length - 1)}`,
          invalidateOnRefresh: true, // Recalcular en caso de cambio de tamaño
        }
      });
      
      // Animaciones para cada panel cuando está en el centro
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      panelsRef.current.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "center right",
          end: "center center",
          onEnter: () => {
            gsap.to(panel.querySelector('.caption-container'), {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(panel.querySelector('.caption-container'), {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.in"
            });
          },
          onEnterBack: () => {
            gsap.to(panel.querySelector('.caption-container'), {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(panel.querySelector('.caption-container'), {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.in"
            });
          }
        });
      });
      
      // Indicadores en pantalla (puntos)
      const indicators = document.querySelectorAll('.gallery-indicator');
      panelsRef.current.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "center 60%",
          end: "center 40%",
          onToggle: self => {
            if (self.isActive) {
              indicators.forEach((ind, idx) => {
                if (idx === i) {
                  ind.classList.add('active');
                } else {
                  ind.classList.remove('active');
                }
              });
            }
          }
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, [galleryImages.length]);

  return (
    <section 
      ref={sectionRef} 
      className="gallery-section relative overflow-hidden"
    >
      <ScrollAnimation direction="up">
        <div className="text-center py-10">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Naturaleza, tecnología y conservación en armonía 🚜💡
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Detrás de cada imagen hay una historia. En este recap, te llevamos detrás de cámaras 
            para mostrar cómo la biodiversidad y la innovación pueden coexistir.
          </p>
        </div>
      </ScrollAnimation>
      
      {/* Contenedor principal que será fijado */}
      <div 
        ref={containerRef}
        className="gallery-container w-full h-screen flex overflow-hidden"
      >
        {/* Paneles que se mueven horizontalmente */}
        {galleryImages.map((image, index) => (
          <div
            key={index}
            ref={el => { panelsRef.current[index] = el; }}
            className="gallery-panel relative flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            {/* Contenido del panel */}
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Contenedor de título y descripción */}
              <div className="caption-container absolute bottom-0 left-0 w-full p-8 opacity-0 transform translate-y-10">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold mb-2 text-white">{image.alt}</h3>
                  <p className="text-xl text-white/90">{image.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicadores (puntos) */}
      <div className="gallery-indicators absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {galleryImages.map((_, index) => (
          <div
            key={index}
            className={`gallery-indicator w-3 h-3 rounded-full bg-white/40 ${index === 0 ? 'active' : ''}`}
          />
        ))}
      </div>
      
      {/* Texto de cierre */}
      <ScrollAnimation direction="up" delay={0.4}>
        <div className="text-center max-w-3xl mx-auto py-16 px-4">
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
      
      <style jsx>{`
        .gallery-indicator.active {
          background-color: rgba(255, 255, 255, 1);
          transform: scale(1.2);
        }
        
        .gallery-indicator {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default HorizontalGallerySection;