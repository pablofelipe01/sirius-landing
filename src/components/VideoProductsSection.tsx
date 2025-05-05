'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asegurarnos de registrar el plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoProductsSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;
    
    const ctx = gsap.context(() => {
      // Fijar la sección durante el scroll
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=100%", // Duración del pin (altura de la pantalla)
        scrub: false,
        onEnter: () => {
          // Reproducir el video cuando entra en la vista
          if (videoRef.current) {
            videoRef.current.play();
            
            // Después de 2 segundos, mostrar el botón de CTA con animación
            gsap.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 2,
              ease: "back.out(1.7)"
            });
          }
        },
        onLeaveBack: () => {
          // Pausar el video si el usuario vuelve arriba
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
      
      // Desactivar el pin después de que termine el video o después de un tiempo específico
      const enableScrolling = () => {
        if (!scrollEnabled) {
          // Liberar el pin después de 12 segundos para permitir seguir scrolleando
          setTimeout(() => {
            scrollTrigger.disable();
            setScrollEnabled(true);
            
            // Animación para indicar que se puede seguir scrolleando
            gsap.to(".scroll-indicator", {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }, 12000); // 12 segundos o ajusta según la duración deseada
        }
      };
      
      // Iniciar el temporizador para habilitar el scroll
      enableScrolling();
      
      // Manejar cuando el video termina
      if (videoRef.current) {
        videoRef.current.addEventListener('ended', () => {
          setVideoPlayed(true);
          scrollTrigger.disable(); // Desactivar el pin cuando termina el video
          setScrollEnabled(true);
          
          // Mostrar indicador de scroll
          gsap.to(".scroll-indicator", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);
    
    return () => ctx.revert();
  }, [scrollEnabled]);

  return (
    <section 
      id="productos" 
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          muted 
          playsInline
          preload="auto"
        >
          <source src="/productos.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        
        {/* Overlay para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      {/* Título y descripción */}
      <div className="absolute top-1/4 left-0 w-full text-center px-4">
        <h2 className="text-5xl font-bold mb-4 text-white">
          Transforma tu agricultura
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Soluciones biológicas revolucionarias para un cultivo más productivo y sostenible.
        </p>
      </div>
      
      {/* Botón de CTA */}
      <div 
        ref={ctaRef}
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-10 scale-95"
      >
        <a 
          href="/ventas" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white text-xl py-4 px-10 rounded-full transition-colors shadow-xl"
        >
          Quiero más información
        </a>
      </div>
      
      {/* Indicador de scroll (aparece cuando se puede seguir scrolleando) */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-10">
        <div className="flex flex-col items-center text-white/80">
          <p className="mb-2 text-sm">Continúa explorando</p>
          <svg 
            className="w-6 h-6 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default VideoProductsSection;