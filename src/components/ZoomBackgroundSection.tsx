'use client';

import { useEffect, useState } from 'react';

// Cards data
const memoCards = [
  {
    id: 1,
    title: "Regeneración Natural",
    content: "El biochar restaura la vitalidad de los suelos más degradados, activando procesos naturales de regeneración.",
    borderColor: "#22c55e", // green-500
    threshold: 0.2 // appears at 20% scroll
  },
  {
    id: 2,
    title: "Captura de Carbono",
    content: "Cada hectárea tratada con nuestros productos puede secuestrar hasta 10 toneladas de CO2 equivalente por año.",
    borderColor: "#3b82f6", // blue-500
    threshold: 0.4 // appears at 40% scroll
  },
  {
    id: 3,
    title: "Biodiversidad Microbiológica",
    content: "Nuestros bioinsumos introducen más de 200 especies de microorganismos benéficos para tu suelo.",
    borderColor: "#eab308", // yellow-500
    threshold: 0.6 // appears at 60% scroll
  },
  {
    id: 4,
    title: "Eficiencia Hídrica",
    content: "Reducción comprobada del 40% en necesidades de riego, gracias a la mayor retención de agua en el suelo.",
    borderColor: "#a855f7", // purple-500
    threshold: 0.8 // appears at 80% scroll
  }
];

const ZoomBackgroundSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  
  // Set up the scroll listener after the component mounts
  useEffect(() => {
    // Find the elements
    const container = document.getElementById('zoom-container');
    const element = document.getElementById('zoom-element');
    
    if (!container || !element) return;
    
    // Function to update the zoom effect and visible cards
    const updateZoom = () => {
      // Get the position of the container relative to the viewport
      const rect = container.getBoundingClientRect();
      
      // Calculate how far the section has been scrolled through
      // 0 when at the top of the viewport, 1 when at the bottom
      const scrollProgress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
      
      // Apply a more dramatic zoom from 1 to 2.5 (150% larger at end)
      const scale = 1 + (scrollProgress * 1.5);
      
      // Apply the transform
      element.style.transform = `scale(${scale})`;
      
      // Update visible cards based on scroll progress
      const newVisibleCards = memoCards
        .filter(card => scrollProgress >= card.threshold)
        .map(card => {
          // Calculate how far past the threshold we've scrolled (0 to 1)
          const cardProgress = Math.min(1, (scrollProgress - card.threshold) / 0.2);
          
          // Calculate card opacity - only fade in, stay visible until the end
          // Only fade out at the very end of the section (> 95% scrolled)
          const opacity = scrollProgress > 0.95 
            ? Math.max(0, 5 * (1 - scrollProgress)) // Quick fade out at the very end
            : Math.min(1, cardProgress * 5); // Quick fade in
          
          return {
            ...card,
            opacity,
            transform: `translateY(${(1 - cardProgress) * 30}px)`
          };
        });
      
      setVisibleCards(newVisibleCards);
    };
    
    // Initial calculation
    updateZoom();
    
    // Add event listeners
    window.addEventListener('scroll', updateZoom);
    window.addEventListener('resize', updateZoom);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', updateZoom);
      window.removeEventListener('resize', updateZoom);
    };
  }, []);
  
  return (
    <section 
      id="zoom-container" 
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div 
        id="zoom-element"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transformOrigin: 'center center',
          transition: 'transform 0.05s linear' // Add subtle smoothing
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        ></div>
      </div>
      
      {/* Content overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          zIndex: 10,
          padding: '0 1rem'
        }}
      >
        {/* <h2 
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        >
          Innovación Regenerativa
        </h2>
        <p 
          style={{
            fontSize: '1.25rem',
            maxWidth: '48rem',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          Descubre cómo nuestras soluciones están transformando la agricultura y regenerando ecosistemas
        </p> */}
      </div>
      
      {/* Cards container - positioned on the right side */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          maxWidth: '400px',
          zIndex: 20,
          pointerEvents: 'none' // prevent cards from intercepting mouse events
        }}
      >
        {visibleCards.map(card => (
          <div
            key={card.id}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.357)',
              borderLeft: `4px solid ${card.borderColor}`,
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              opacity: card.opacity,
              transform: card.transform,
              transition: 'opacity 0.3s, transform 0.3s',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#000000' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '1rem', color: '#000000', fontWeight: '500' }}>
              {card.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZoomBackgroundSection;