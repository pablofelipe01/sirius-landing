'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asegurarnos de registrar el plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Cards data
const memoCards = [
  {
    id: 1,
    title: "Regeneración Natural",
    content: "La simbiosis entre microorganismos, raíces, plantas e insectos permite un equilibrio natural, regenerando los suelos, cultivos y ecosistemas de nuestros clientes",
    borderColor: "#22c55e", // green-500
  },
  {
    id: 2,
    title: "Captura de Carbono",
    content: "Al aplicar nuestro biochar en el suelo, estamos capturando carbono (CO₂) y reduciendo la emisión de GEI en la atmósfera durante más de 100 años.",
    borderColor: "#3b82f6", // blue-500
  },
  {
    id: 3,
    title: "Biodiversidad Microbiológica",
    content: "Desde nuestro laboratorio producimos bioinsumos que inyectan más de 200 especies de microorganismos benéficos para tu suelo.",
    borderColor: "#eab308", // yellow-500
  },
];

const ZoomBackgroundSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);
  
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
          end: "+=300%", // Continúa durante 3 veces la altura de la sección
          scrub: 1, // Suavizado con 1 segundo de retraso
          // markers: true, // Útil para depuración
        }
      });
      
      // Leve efecto de zoom al inicio
      tl.to(bgRef.current, {
        scale: 1.2, 
        duration: 1,
        ease: "power1.inOut",
      }, 0);
      
      // Animar cada tarjeta secuencialmente
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Cada tarjeta aparece después de la anterior
        tl.fromTo(card, 
          { 
            x: 100, // Comienza 100px a la derecha
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7, // La duración es relativa a la línea de tiempo total
            ease: "power2.out",
          }, 
          index * 0.3 // Comienza la animación con retraso según el índice
        );
        
        // Cada tarjeta permanece visible por un tiempo
        tl.to(card, { 
          opacity: 1, 
          duration: 0.5
        });
        
        // Y luego se desvanece gradualmente
        tl.to(card, {
          opacity: 0,
          x: -50, // Sale hacia la izquierda
          duration: 0.5,
          ease: "power2.in",
        }, "+=0.2"); // Pequeña pausa antes de desvanecerse
      });
      
      // Ligero zoom final antes de terminar
      tl.to(bgRef.current, {
        scale: 1.25, 
        duration: 1,
        ease: "power1.inOut",
      }, "-=1");
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
          transformOrigin: 'center center',
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
      
      {/* Cards container - positioned on the right side */}
      <div
        className="cards-container"
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: '35%',
          maxWidth: '400px',
          zIndex: 20,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '0 1rem',
        }}
      >
        {memoCards.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardsRef.current[index] = el}
            className="card"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderLeft: `3px solid ${card.borderColor}`,
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
              width: '85%',
              boxShadow: '0 8px 15px -3px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)',
              opacity: 0, // Inicialmente invisible
              transform: 'translateX(100px) scale(0.8)', // Posición inicial
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: '400', lineHeight: '1.4' }}>
              {card.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZoomBackgroundSection;