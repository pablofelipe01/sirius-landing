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
      year: '2018',
      title: 'Planta Fundadora',
      description: 'Primera planta de pirólisis con la que inició SIRIUS, utilizada para los primeros ensayos y aprendizajes iniciales. El comienzo de una visión que transformaría la agricultura regenerativa.',
      icon: '🌱',
      highlight: 'Los primeros pasos hacia la innovación'
    },
    {
      id: 'eureka',
      year: '2019',
      title: 'Eureka',
      description: 'Segunda planta, Eureka, que sirvió como maestra de pirólisis durante 3 años, aportando hallazgos invaluables que definirían el futuro de nuestra tecnología.',
      icon: '💡',
      highlight: 'El descubrimiento que cambió todo'
    },
    {
      id: 'biologicos',
      year: 'Nov 2020',
      title: 'Inicio en Biológicos',
      description: 'Contratación del equipo de microbiología e inicio del trabajo con biológicos. Un paso crucial hacia la integración de biotecnología y agricultura regenerativa.',
      icon: '🔬',
      highlight: 'La ciencia se une a la regeneración'
    },
    {
      id: 'rafaela1',
      year: 'Ago 2022',
      title: 'Rafaela 1.0',
      description: 'Diseño y construcción del primer reactor propio. Encendido y fase de comisionamiento de más de un año, marcando nuestra independencia tecnológica.',
      icon: '⚡',
      highlight: 'Nuestra primera tecnología propia'
    },
    {
      id: 'consolidacion',
      year: '2023',
      title: 'Consolidación Comercial',
      description: 'Alcance de 8 clientes constantes en biológicos, consolidando la producción y mejorando continuamente. El mercado abraza nuestra propuesta regenerativa.',
      icon: '🌾',
      highlight: 'La confianza del mercado nos respalda'
    },
    {
      id: 'rafaela2',
      year: 'Feb 2024',
      title: 'Rafaela 2.0',
      description: 'Rediseño de la planta para eliminar proceso de condensados y enfocarse en calidad del biochar, con mejoras incrementales y aumento de capacidad.',
      icon: '🔧',
      highlight: 'Evolución continua hacia la excelencia'
    },
    {
      id: 'laboratorio',
      year: '2024',
      title: 'Laboratorio Microbiológico',
      description: 'Construcción y consolidación de un laboratorio propio para medir calidad y poblaciones microbianas en suelos de clientes.',
      icon: '🧪',
      highlight: 'Ciencia propia para resultados únicos'
    },
    {
      id: 'proyeccion',
      year: '2025',
      title: 'Proyección y Expansión',
      description: 'Meta de expansión de capacidad de pirólisis y consolidación del portafolio de biológicos y biochar blend. El futuro de la agricultura regenerativa está aquí.',
      icon: '🚀',
      highlight: 'Hacia un mundo más regenerativo'
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
          end: "+=300%", // Más tiempo para la historia extendida
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
      
      // Transición de overlay para mejorar el contraste del video
      const overlay = sectionRef.current?.querySelector('.bg-black');
      if (overlay) {
        tl.to(overlay, {
          opacity: 0.3,
          ease: "power2.inOut",
          duration: 3
        }, 0);
      }
      
      // Animación de cada milestone con efectos únicos
      storyRefs.current.forEach((milestone, index) => {
        if (!milestone) return;
        
        const delay = 1 + (index * 0.6); // Menor delay entre elementos
        const isEven = index % 2 === 0;
        
        // Entrada dramática para cada milestone
        tl.from(milestone, {
          x: isEven ? -200 : 200,
          opacity: 0,
          scale: 0.7,
          rotation: isEven ? -15 : 15,
          ease: "power3.out",
          duration: 0.8 // Duración más corta para acomodar más elementos
        }, delay)
        
        // Efecto de brillo al aparecer
        .to(milestone, {
          boxShadow: "0 0 30px rgba(90, 120, 54, 0.3)",
          ease: "power2.inOut",
          duration: 0.4
        }, delay + 0.4)
        
        // Normalizar la sombra
        .to(milestone, {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          ease: "power2.inOut",
          duration: 0.4
        }, delay + 0.8);
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="historia" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{minHeight: '100vh'}}
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src="https://res.cloudinary.com/dvnuttrox/video/upload/v1754922904/Pagina_de_inicio_vfa8yn.mov" type="video/mp4" />
        </video>
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Elementos decorativos orgánicos */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-10 z-10">
        <svg width="300" height="300" viewBox="0 0 200 200" className="text-green-400">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5">
            <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3">
            <animateTransform attributeName="transform" type="rotate" values="360 100 100;0 100 100" dur="15s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 opacity-10 z-10">
        <svg width="300" height="300" viewBox="0 0 200 200" className="text-green-300">
          <path d="M100,20 Q180,100 100,180 Q20,100 100,20" fill="none" stroke="currentColor" strokeWidth="2">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="10s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Línea de tiempo central */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-300 via-green-400 to-green-500 h-full opacity-60"
          style={{top: '200px', height: 'calc(100% - 400px)'}}
        ></div>
        
        {/* Título principal */}
        <div ref={titleRef} className="text-center mb-20 relative z-30">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">
            Nuestra Historia
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Desde 2018, un viaje de innovación continua en pirólisis y biotecnología que ha revolucionado la agricultura regenerativa.
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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg z-30">
                <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Contenido del milestone */}
              <div className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{milestone.icon}</span>
                  <div>
                    <span className="text-2xl font-bold text-green-600">{milestone.year}</span>
                    <h3 className="text-2xl font-bold text-gray-800">{milestone.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
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
      </div>
    </section>
  );
};

export default HistorySection;
