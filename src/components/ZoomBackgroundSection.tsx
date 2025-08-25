'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asegurarnos de registrar el plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ZoomBackgroundSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  
  // Set up GSAP animations after the component mounts
  useEffect(() => {
    // Asegurarnos que los refs están disponibles
    if (!sectionRef.current || !bgRef.current) return;
    
    // Crear contexto para limpiar las animaciones cuando se desmonte el componente
    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Fija la sección mientras se hace scroll
          start: "top top", // Comienza cuando la parte superior de la sección llega a la parte superior de la ventana
          end: "+=540%", // Scroll reducido proporcionalmente al zoom
          scrub: 1, // Suavizado con 1 segundo de retraso
          // markers: true, // Útil para depuración
        }
      });
      
      // Zoom progresivo mucho más extenso para llegar al ojo
      tl.to(bgRef.current, {
        scale: 6.5, // Zoom reducido pero significativo
        duration: 1,
        ease: "power1.inOut",
      }, 0);
      
    }, sectionRef);
    
    // Limpiar todas las animaciones cuando se desmonte
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="pin-section"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div 
        ref={bgRef}
        className="background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transformOrigin: '58% center', // Un poquito hacia la izquierda
        }}
      >
        {/* Background image */}
        <img 
          src="/agricultura-regenerativa.png" 
          alt="Agricultura regenerativa" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)' // Overlay sutil
          }}
        ></div>
      </div>
    </section>
  );
};

export default ZoomBackgroundSection;