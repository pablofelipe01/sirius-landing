'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

const InvolucrateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'newsletter'
  });

  const tabs = [
    {
      id: 'movement',
      title: 'Únete al Movimiento',
      icon: '🌱',
      description: 'Recibe actualizaciones y forma parte de la comunidad regenerativa'
    },
    {
      id: 'events',
      title: 'Asiste a un Evento',
      icon: '🌿',
      description: 'Talleres inmersivos en la naturaleza para despertar tu alma'
    },
    {
      id: 'share',
      title: 'Comparte tu Historia',
      icon: '📱',
      description: 'Únete a la conversación con #LetsGetSirius'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Taller de Biochar',
      date: '15 Octubre 2025',
      location: 'Biofábrica Sirius, Upía',
      description: 'Aprende a crear biochar y transformar tu suelo',
      spots: '12 cupos disponibles'
    },
    {
      title: 'Regeneración Holística',
      date: '22 Noviembre 2025',
      location: 'Finca Experimental',
      description: 'Experiencia inmersiva de agricultura regenerativa',
      spots: '8 cupos disponibles'
    },
    {
      title: 'Despertar del Alma',
      date: '10 Diciembre 2025',
      location: 'Retiro en la Naturaleza',
      description: 'Conecta con tu propósito y la tierra',
      spots: '15 cupos disponibles'
    }
  ];

  const socialPosts = [
    {
      user: '@carlos_agricultor',
      content: 'Mi primer cosecha con #biochar de @sirius.colombia - ¡Increíbles resultados! #LetsGetSirius',
      image: '/img3.png',
      likes: 124
    },
    {
      user: '@maria_verde',
      content: 'El taller de regeneración cambió mi perspectiva sobre la agricultura #LetsGetSirius',
      image: '/img4.png',
      likes: 89
    },
    {
      user: '@eco_farmer',
      content: 'Suelo más vivo = cultivos más fuertes. Gracias @sirius.colombia #LetsGetSirius',
      image: '/img5.png',
      likes: 156
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden -mt-1">
      {/* Transición suave desde la sección anterior */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-transparent pointer-events-none z-10"></div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              INVOLÚCRATE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Tu Alma Tiene un Propósito. Encuéntralo con Nosotros.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Únete a nuestra comunidad, asiste a un evento inmersivo o comparte tu historia para regenerar el mundo.
            </p>
          </div>
        </ScrollAnimation>

        {/* Tabs Navigation */}
        <ScrollAnimation direction="up">
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-full shadow-lg p-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="font-medium">{tab.title}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Tab Content */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="min-h-[500px]"
        >
          {/* Únete al Movimiento */}
          {activeTab === 0 && (
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Únete al Movimiento Regenerativo
                  </h3>
                  <p className="text-gray-600">
                    Recibe actualizaciones exclusivas, tips de agricultura regenerativa y sé parte del cambio.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="newsletter">Newsletter mensual</option>
                    <option value="events">Notificaciones de eventos</option>
                    <option value="products">Lanzamientos de productos</option>
                    <option value="all">Todo lo anterior</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    Despertar mi Alma
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Asiste a un Evento */}
          {activeTab === 1 && (
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Próximos Eventos Inmersivos
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experiencias transformadoras que conectan tu alma con la naturaleza y la agricultura regenerativa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-green-100 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h4>
                      <p className="text-green-600 font-semibold">{event.date}</p>
                    </div>
                    <p className="text-gray-600 mb-2">{event.location}</p>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <p className="text-sm text-green-600 font-semibold mb-4">{event.spots}</p>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      Reservar Cupo
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comparte tu Historia */}
          {activeTab === 2 && (
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Comparte tu Historia con #LetsGetSirius
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Inspira a otros compartiendo tu experiencia con la agricultura regenerativa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Social Media Feed */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Historias de la Comunidad</h4>
                  <div className="space-y-4">
                    {socialPosts.map((post, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {post.user.charAt(1).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{post.user}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{post.content}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>❤️ {post.likes} likes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Your Story */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Comparte tu Experiencia</h4>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Cuéntanos cómo Sirius ha transformado tu cultivo o tu perspectiva..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                        📘 Facebook
                      </button>
                      <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors">
                        📷 Instagram
                      </button>
                      <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors">
                        🐦 Twitter
                      </button>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                      Compartir Historia
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Cita Inspiracional */}
        <ScrollAnimation direction="up">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center mt-16 mb-12 shadow-xl">
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 italic">
              "No esperes más. Mira al interior de tu alma y ella te indicará tu camino."
            </blockquote>
            <cite className="text-lg text-green-600 font-semibold">— Filosofía Sirius</cite>
          </div>
        </ScrollAnimation>

        {/* CTA Principal */}
        <ScrollAnimation direction="up">
          <div className="text-center">
            <button className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Comienza tu Viaje Regenerativo
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

export default InvolucrateSection;
