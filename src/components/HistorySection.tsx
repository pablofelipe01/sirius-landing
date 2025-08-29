'use client';

import { useRef, useEffect, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const historyMilestones = [
    {
      id: 'genesis',
      year: '2018',
      title: 'Planta Fundadora',
      description: 'Primera planta de pirólisis con la que inició SIRIUS, utilizada para los primeros ensayos y aprendizajes iniciales.',
      icon: '🌱',
    },
    {
      id: 'eureka',
      year: '2019',
      title: 'Eureka',
      description: 'Segunda planta, Eureka, que sirvió como maestra de pirólisis durante 3 años, aportando hallazgos invaluables.',
      icon: '💡',
    },
    {
      id: 'biologicos',
      year: 'Noviembre 2020',
      title: 'Inicio en Biológicos',
      description: 'Contratación del equipo de microbiología e inicio del trabajo con biológicos.',
      icon: '🔬',
    },
    {
      id: 'rafaela1',
      year: 'Agosto 2022',
      title: 'Rafaela 1.0',
      description: 'Diseño y construcción del primer reactor propio. Encendido y fase de comisionamiento de más de un año.',
      icon: '⚡',
    },
    {
      id: 'consolidacion',
      year: '2023',
      title: 'Consolidación Comercial en Biológicos',
      description: 'Alcance de 8 clientes constantes, consolidando la producción y mejorando continuamente.',
      icon: '🌾',
    },
    {
      id: 'rafaela2',
      year: 'Febrero 2024',
      title: 'Rafaela 2.0',
      description: 'Rediseño de la planta para eliminar proceso de condensados y enfocarse en calidad del biochar, con mejoras incrementales y aumento de capacidad.',
      icon: '🔧',
    },
    {
      id: 'laboratorio',
      year: '2024',
      title: 'Laboratorio de Análisis Microbiológico',
      description: 'Construcción y consolidación de un laboratorio propio para medir calidad y poblaciones microbianas en suelos de clientes.',
      icon: '🧪',
    },
    {
      id: 'proyeccion',
      year: '2025',
      title: 'Proyección',
      description: 'Meta de expansión de capacidad de pirólisis y consolidación del portafolio de biológicos y biochar blend.',
      icon: '🚀',
    }
  ];

  // Manejar la carga del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoLoaded(true);
      setVideoError(false);
      
      // Intentar reproducir el video
      video.play().catch((error) => {
        console.warn('Error al reproducir el video:', error);
        // Algunos navegadores bloquean autoplay, pero esto no es un error crítico
      });

      // Animación suave del video
      gsap.fromTo(video, 
        { opacity: 0 }, 
        { opacity: 1, duration: 2, ease: 'power2.out' }
      );
    };

    const handleLoadedData = () => {
      console.log('Video loaded data');
      handleCanPlay();
    };

    const handleError = (e: Event) => {
      console.error('Error cargando el video:', e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleLoadStart = () => {
      console.log('Video load started');
    };

    // Agregar múltiples listeners para mejor compatibilidad
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    // Configuración adicional del video
    video.muted = true; // Asegurar que esté silenciado
    video.playsInline = true; // Para dispositivos móviles
    video.loop = true;

    // Forzar la carga del video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  // Animaciones de aparición controladas por scroll
  useEffect(() => {
    if (!storyRefs.current) return;
    const elems = storyRefs.current.filter(Boolean) as HTMLElement[];

    // Animación del título
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { autoAlpha: 0, y: 60 }, 
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }

    // Animaciones de los milestones con stagger effect
    if (elems.length > 0) {
      gsap.fromTo(elems, 
        { autoAlpha: 0, y: 50, scale: 0.95 }, 
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: elems[0],
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      id="historia" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{minHeight: '100vh'}}
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        {/* Loader mientras carga el video */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60 text-sm">Cargando video...</p>
            </div>
          </div>
        )}

        {/* Video principal */}
        {!videoError && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              filter: 'brightness(0.4) saturate(1.3) contrast(1.15)',
              transform: 'scale(1.02)' // Prevenir bordes negros
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            {/* Solo el formato que existe */}
            <source src="/video/copy_8035F164-65BA-4EDB-902F-5E112A2522D4_w637lt.mov" type="video/quicktime" />
            <source src="/video/copy_8035F164-65BA-4EDB-902F-5E112A2522D4_w637lt.mov" type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>
        )}

        {/* Fallback si hay error con el video */}
        {videoError && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900">
            {/* Patrón de fondo alternativo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
                backgroundSize: '400px 400px'
              }}></div>
            </div>
          </div>
        )}
        
        {/* Overlays para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-slate-900/10"></div>
      </div>

      {/* Elementos decorativos - solo en desktop grande */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden xl:block">
        <div className="w-64 h-64 border border-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-8 border border-green-300/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none hidden xl:block">
        <div className="w-48 h-48 border border-green-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        {/* Título principal */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-24 relative">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 md:mb-8 text-white tracking-tight">
            Nuestra
            <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-400">
              Historia
            </span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light px-4">
            Desde 2018, un viaje de innovación continua en pirólisis y biotecnología 
            que ha revolucionado la agricultura regenerativa.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Línea de tiempo central - solo visible en desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-green-400/50 via-green-500/30 to-green-400/50"></div>

          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {historyMilestones.map((milestone, index) => (
              <div
                key={milestone.id}
                ref={(el) => { storyRefs.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Punto de la timeline - solo visible en desktop */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-lg z-10">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40"></div>
                </div>

                {/* Contenido del milestone */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/20">
                      {/* Icono */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30`}>
                        <span className="text-2xl sm:text-3xl">{milestone.icon}</span>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-green-400 bg-green-400/10 rounded-full border border-green-400/20 mb-2 sm:mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-green-400 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Espaciador para desktop */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;