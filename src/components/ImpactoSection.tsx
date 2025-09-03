'use client';

const ImpactoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white relative overflow-hidden -mt-1">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-100/60 via-green-100/30 to-transparent pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            NUESTRO IMPACTO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Regenerando 100,000 Hectáreas para 2030
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Cada producto, cada proyecto, cada alma contribuye a un planeta próspero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">2,450</h3>
            <p className="text-lg text-white/90 mb-1">toneladas CO₂</p>
            <p className="text-white/70">Carbono Capturado</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">8,750</h3>
            <p className="text-lg text-white/90 mb-1">hectáreas</p>
            <p className="text-white/70">Hectáreas Regeneradas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">👨‍🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">340</h3>
            <p className="text-lg text-white/90 mb-1">familias</p>
            <p className="text-white/70">Agricultores Apoyados</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-12">
          <blockquote className="text-2xl md:text-3xl font-bold mb-4 italic">
            "Tu alma regenera la tierra. La tierra regenera tu alma."
          </blockquote>
          <cite className="text-lg text-green-400 font-semibold">— Filosofía Sirius</cite>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            Ver Nuestro Impacto Completo
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

  // Datos de impacto
  const impactMetrics = [
    {
      id: 'carbono',
      title: 'Carbono Capturado',
      value: '2,450',
      unit: 'toneladas CO₂',
      icon: '🌱',
      color: 'green'
    },
    {
      id: 'hectareas',
      title: 'Hectáreas Regeneradas',
      value: '8,750',
      unit: 'hectáreas',
      icon: '🌾',
      color: 'emerald'
    },
    {
      id: 'agricultores',
      title: 'Agricultores Apoyados',
      value: '340',
      unit: 'familias',
      icon: '👨‍🌾',
      color: 'blue'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Agricultor de Café',
      image: '/img1.png',
      quote: 'Desde que uso biochar de Sirius, mi producción aumentó 40% y el suelo está más vivo que nunca.',
      location: 'Huila, Colombia'
    },
    {
      name: 'María González',
      role: 'Productora de Palma',
      image: '/img2.png',
      quote: 'Los bioinsumos han transformado completamente la salud de mis cultivos. Es increíble.',
      location: 'Meta, Colombia'
    },
    {
      name: 'Santiago Amaya',
      role: 'Especialista en Pirólisis',
      image: '/santi.png',
      quote: 'Cada día vemos cómo la ciencia y la naturaleza trabajan juntas para regenerar la tierra.',
      location: 'Equipo Sirius'
    }
  ];

  // Animación del progreso hacia 100,000 hectáreas
  useEffect(() => {
    if (isInView) {
      const targetProgress = (8750 / 100000) * 100; // 8.75%
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(timer);
            return targetProgress;
          }
          return prev + 0.5;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white relative overflow-hidden -mt-1">
      {/* Transición suave desde la sección anterior */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-100/60 via-green-100/30 to-transparent pointer-events-none z-10"></div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              NUESTRO IMPACTO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Regenerando 100,000 Hectáreas para 2030
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Cada producto, cada proyecto, cada alma contribuye a un planeta próspero.
            </p>
          </div>
        </ScrollAnimation>

        {/* Barra de Progreso Principal */}
        <ScrollAnimation direction="up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Meta: 100,000 Hectáreas</h3>
              <p className="text-white/80">Progreso actual hacia nuestra meta de regeneración</p>
            </div>
            
            <div className="relative">
              <div className="w-full bg-white/20 rounded-full h-6 mb-4">
                <motion.div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              
              <div className="flex justify-between text-sm text-white/80">
                <span>0 hectáreas</span>
                <span className="font-bold text-green-400">{progress.toFixed(1)}% completado</span>
                <span>100,000 hectáreas</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Métricas de Impacto */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {impactMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-6xl mb-4">{metric.icon}</div>
              <h3 className="text-3xl font-bold mb-2 text-green-400">{metric.value}</h3>
              <p className="text-lg text-white/90 mb-1">{metric.unit}</p>
              <p className="text-white/70">{metric.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Before/After */}
        <ScrollAnimation direction="up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Transformación en Acción</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-green-400">Antes</h4>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏜️</div>
                    <p className="text-white/70">Suelo degradado</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-green-400">Después</h4>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌾</div>
                    <p className="text-white/70">Suelo regenerado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Testimonios */}
        <ScrollAnimation direction="up">
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Historias de Transformación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-white/90 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-sm text-green-400">{testimonial.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Cita Inspiracional */}
        <ScrollAnimation direction="up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-12">
            <blockquote className="text-2xl md:text-3xl font-bold mb-4 italic">
              "Tu alma regenera la tierra. La tierra regenera tu alma."
            </blockquote>
            <cite className="text-lg text-green-400 font-semibold">— Filosofía Sirius</cite>
          </div>
        </ScrollAnimation>

        {/* CTA */}
        <ScrollAnimation direction="up">
          <div className="text-center">
            <button className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Ver Nuestro Impacto Completo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ImpactoSection;
