'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollAnimation from './ScrollAnimation';

// Registrar el plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SustainabilitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Verificar que todos los elementos necesarios existen
    if (!sectionRef.current || !containerRef.current || !panelsRef.current || panelsRef.current.length === 0) return;
    
    // Verificar que todos los paneles tienen elementos válidos
    const validPanels = panelsRef.current.filter(panel => panel && panel.parentNode);
    if (validPanels.length === 0) return;
    
    const ctx = gsap.context(() => {
      // Configurar el desplazamiento horizontal con scroll vertical
      const scrollTween = gsap.to(panelsRef.current, {
        xPercent: -100 * (panelsRef.current.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${containerRef.current?.offsetWidth ? containerRef.current.offsetWidth * (panelsRef.current.length - 1) : 0}`,
          invalidateOnRefresh: true,
        }
      });
      
      // Animaciones para cada panel cuando está en el centro
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;

        const captionContainer = panel.querySelector('.caption-container');
        if (!captionContainer) return;

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "center right",
          end: "center center",
          onEnter: () => {
            if (captionContainer && captionContainer.parentNode) {
              gsap.to(captionContainer, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          },
          onLeave: () => {
            if (captionContainer && captionContainer.parentNode) {
              gsap.to(captionContainer, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in"
              });
            }
          },
          onEnterBack: () => {
            if (captionContainer && captionContainer.parentNode) {
              gsap.to(captionContainer, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          },
          onLeaveBack: () => {
            if (captionContainer && captionContainer.parentNode) {
              gsap.to(captionContainer, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in"
              });
            }
          }
        });
      });
      
      // Indicadores en pantalla (puntos)
      const indicators = gsap.utils.toArray('.gallery-indicator');
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "center 60%",
          end: "center 40%",
          onToggle: self => {
            if (self.isActive && indicators[i]) {
              indicators.forEach((ind, idx) => {
                if (ind && typeof ind === 'object' && 'classList' in ind && ind instanceof HTMLElement && ind.parentNode) {
                  if (idx === i) {
                    ind.classList.add('active');
                  } else {
                    ind.classList.remove('active');
                  }
                }
              });
            }
          }
        });
      });
    }, sectionRef);
    
    return () => {
      // Limpiar todas las animaciones de ScrollTrigger antes de revertir el contexto
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden"
    >
      <ScrollAnimation direction="up">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/60 px-6 py-3 rounded-lg shadow-sm">
            <h2 className="text-4xl font-bold mb-0 text-gray-800">
              BioFábrica SIRIUS: 
              <br />
              Fuego Milenario, Ciencia Viva, Futuro Inteligente
            </h2>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* Contenedor principal que será fijado */}
      <div 
        ref={containerRef}
        className="gallery-container w-full h-screen flex overflow-hidden"
      >
        {/* Panel 1: Imagen de biochar */}
        <div
          ref={el => { panelsRef.current[0] = el; }}
          className="gallery-panel relative flex-shrink-0 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src="/bio.png"
              alt="Biochar y tecnología regenerativa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            <div className="caption-container absolute bottom-0 left-0 w-full p-8 opacity-0 transform translate-y-10">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-white">Biochar: Tecnología milenaria</h3>
                <p className="text-xl text-white/90">Una forma ancestral de capturar carbono y regenerar suelos</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel 2: Video de YouTube */}
        <div
          ref={el => { panelsRef.current[1] = el; }}
          className="gallery-panel relative flex-shrink-0 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background image for video panel */}
            <Image
              src="/bio2.png"
              alt="Biochar background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="video-frame w-full max-w-4xl aspect-video z-10 relative">
              <div className="absolute inset-0 rounded-xl transform -rotate-1 scale-105 bg-white/20 blur-sm"></div>
              <div className="absolute inset-0 rounded-xl transform rotate-1 scale-105 bg-white/10 blur-sm"></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/30 transform perspective-1000">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/hqCqPQWPdk0?si=FVoJNKdranbC3nBY&autoplay=1&mute=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="caption-container absolute bottom-0 left-0 w-full p-8 opacity-0 transform translate-y-10">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-white">Lo que para muchos es desecho,  </h3>
                <p className="text-xl text-white/90">para SIRIUS es un tesoro: del residuo al renacimiento a través de la pirólisis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicadores (puntos) */}
      <div className="gallery-indicators absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        <div className="gallery-indicator w-3 h-3 rounded-full bg-white/40 active" />
        <div className="gallery-indicator w-3 h-3 rounded-full bg-white/40" />
      </div>
      
      <ScrollAnimation direction="up" delay={0.3} className="mt-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white/60 px-6 py-4 rounded-lg shadow-sm inline-block">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Una sinergia única entre pirolisis milenaria.
            </h3>
            <p className="text-xl text-gray-700 mb-0">
              Biotecnología regenerativa y algoritmos inteligentes.
              <br />
              Esto es la BioFábrica SIRIUS:
              <br /> 
              un laboratorio vivo donde la materia orgánica se transforma en productos que restauran el suelo y el futuro.
            </p>
          </div>
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
        
        .video-frame {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .video-frame::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05));
          z-index: -1;
          border-radius: 16px;
          transform: translateZ(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default SustainabilitySection;