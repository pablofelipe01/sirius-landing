'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Asegurarnos de registrar los plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const HistorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const historyMilestones = [
    {
      id: 'genesis',
      year: '2020',
      title: 'El Despertar',
      description: 'Todo comenzó con una visión simple pero poderosa: regenerar la tierra y despertar la conciencia. Un grupo de científicos, agricultores y visionarios se unió para crear algo más que productos... un movimiento.',
      icon: '🌱',
      highlight: 'El nacimiento de una semilla de conciencia'
    },
    {
      id: 'research',
      year: '2021',
      title: 'Investigación Profunda',
      description: 'Años de investigación en microbiología del suelo, biochar y agricultura regenerativa. Cada experimento nos acercaba más a entender la conexión sagrada entre el alma humana y la tierra.',
      icon: '🔬',
      highlight: 'Ciencia con propósito y corazón'
    },
    {
      id: 'first-products',
      year: '2022',
      title: 'Primeros Frutos',
      description: 'Lanzamiento de nuestros primeros bioinsumos revolucionarios. Los agricultores comenzaron a ver resultados extraordinarios: suelos más vivos, cultivos más fuertes, una conexión renovada con la tierra.',
      icon: '🌾',
      highlight: 'Transformando campos, transformando vidas'
    },
    {
      id: 'movement',
      year: '2023-2024',
      title: 'El Movimiento Crece',
      description: 'Sirius se convierte en más que una empresa; es un movimiento que une a miles de agricultores en la misión de regenerar el mundo. Cada hectárea restaurada es un paso hacia un futuro más consciente.',
      icon: '🌍',
      highlight: 'Un movimiento vivo que une almas'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !timelineContainerRef.current || !titleRef.current || !lineRef.current) return;
    
    const ctx = gsap.context(() => {
      // Timeline principal para coordinar todas las animaciones
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=200%", // Más tiempo para la historia
          scrub: 1,
          anticipatePin: 1,
        }
      });
      
      // Animación del título con efecto dramático
      tl.from(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        y: -100,
        rotationX: 90,
        transformOrigin: "center bottom",
        ease: "power3.out",
        duration: 1
      }, 0);
      
      // Línea de tiempo que crece progresivamente
      tl.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "power2.inOut",
        duration: 2
      }, 0.5);
      
      // Transición de fondo con gradiente
      tl.to(sectionRef.current, {
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
        ease: "power2.inOut",
        duration: 3
      }, 0);
      
      // Animación de cada milestone con efectos únicos
      storyRefs.current.forEach((milestone, index) => {
        if (!milestone) return;
        
        const delay = 1 + (index * 0.8);
        const isEven = index % 2 === 0;
        
        // Entrada dramática para cada milestone
        tl.from(milestone, {
          x: isEven ? -200 : 200,
          opacity: 0,
          scale: 0.7,
          rotation: isEven ? -15 : 15,
          ease: "power3.out",
          duration: 1
        }, delay)
        
        // Efecto de brillo al aparecer
        .to(milestone, {
          boxShadow: "0 0 30px rgba(90, 120, 54, 0.3)",
          ease: "power2.inOut",
          duration: 0.5
        }, delay + 0.5)
        
        // Normalizar la sombra
        .to(milestone, {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          ease: "power2.inOut",
          duration: 0.5
        }, delay + 1);
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="historia" 
      ref={sectionRef}
      className="py-20 bg-gray-50 relative overflow-hidden"
      style={{minHeight: '100vh'}}
    >
      {/* Elementos decorativos orgánicos */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-10">
        <svg width="300" height="300" viewBox="0 0 200 200" className="text-green-600">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5">
            <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3">
            <animateTransform attributeName="transform" type="rotate" values="360 100 100;0 100 100" dur="15s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 opacity-10">
        <svg width="300" height="300" viewBox="0 0 200 200" className="text-green-400">
          <path d="M100,20 Q180,100 100,180 Q20,100 100,20" fill="none" stroke="currentColor" strokeWidth="2">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="10s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Línea de tiempo central */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-400 via-green-600 to-green-800 h-full opacity-30"
          style={{top: '200px', height: 'calc(100% - 400px)'}}
        ></div>
        
        {/* Título principal */}
        <div ref={titleRef} className="text-center mb-20 relative z-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-800">
            Nuestra Historia
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Un viaje de transformación que comenzó con una semilla de conciencia y se convirtió en un movimiento que regenera el mundo.
          </p>
        </div>
        
        {/* Timeline de milestones */}
        <div ref={timelineContainerRef} className="relative max-w-6xl mx-auto">
          {historyMilestones.map((milestone, index) => (
            <div 
              key={milestone.id} 
              ref={el => { storyRefs.current[index] = el; }}
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`}
            >
              {/* Círculo en la línea de tiempo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg z-30">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-50"></div>
              </div>
              
              {/* Contenido del milestone */}
              <div className={`bg-white rounded-2xl p-8 shadow-xl border border-green-100 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{milestone.icon}</span>
                  <div>
                    <span className="text-2xl font-bold text-green-700">{milestone.year}</span>
                    <h3 className="text-2xl font-bold text-gray-800">{milestone.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  {milestone.description}
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-800 font-semibold italic">
                    "{milestone.highlight}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action final */}
        <div className="mt-20 text-center relative z-20">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Únete a Nuestra Historia
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Cada agricultor que se une a Sirius escribe una nueva página en la historia de la regeneración mundial.
            </p>
            <a 
              href="#movimiento" 
              className="inline-block bg-white text-green-700 py-4 px-8 rounded-full hover:bg-green-50 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
            >
              Descubre el Movimiento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
