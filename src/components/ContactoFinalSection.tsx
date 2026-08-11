'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

const ContactoFinalSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí iría la lógica de envío del formulario
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://www.instagram.com/sirius.colombia',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/sirius-regenerative',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: 'https://wa.me/573209568566',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const contactInfo = [
    {
      icon: '📍',
      title: 'Dirección',
      info: 'Kl-7 Vía Cabuyaro Barranca de Upía',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      info: '+57 320 9568566',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: '✉️',
      title: 'Correo',
      info: 'marketing@siriusregenerative.com',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: '🕒',
      title: 'Horario',
      info: 'Lun-Vie: 9am-6pm, Sáb: 9am-1pm',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const recentPosts = [
    {
      platform: 'Instagram',
      content: '🌱 Nueva cosecha con biochar - resultados increíbles! #LetsGetSirius',
      time: 'Hace 2 horas'
    },
    {
      platform: 'LinkedIn',
      content: 'Artículo: "El futuro de la agricultura regenerativa en Colombia"',
      time: 'Hace 1 día'
    },
    {
      platform: 'Instagram',
      content: '🔬 Detrás de cámaras en nuestro laboratorio de biotecnología',
      time: 'Hace 3 días'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-green-900 text-white relative overflow-hidden -mt-1">
      {/* Transición suave desde la sección anterior */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-50/60 via-green-50/30 to-transparent pointer-events-none z-10"></div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        {/* Partículas flotantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              CONTACTO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Conéctate con Sirius
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Regeneremos juntos. Contáctanos para saber más sobre nuestros productos, servicios o movimiento.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Formulario de Contacto */}
          <ScrollAnimation direction="left">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Envíanos un Mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-white/70"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-white/70"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="¿Cómo podemos ayudarte a regenerar tu tierra?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-white/70 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Información de Contacto */}
          <ScrollAnimation direction="right">
            <div className="space-y-8">
              {/* Datos de Contacto */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${item.color} flex-shrink-0`}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-white/80 text-sm">{item.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Síguenos en Redes</h3>
                <div className="flex space-x-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} p-3 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg`}
                    >
                      <span className="text-xl">{social.icon}</span>
                    </a>
                  ))}
                </div>

                {/* Feed de Redes Sociales */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white/90">Actividad Reciente</h4>
                  {recentPosts.map((post, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-400 text-sm font-semibold">{post.platform}</span>
                        <span className="text-white/60 text-xs">{post.time}</span>
                      </div>
                      <p className="text-white/80 text-sm">{post.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Mapa y Ubicación */}
        <ScrollAnimation direction="up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Visítanos en Nuestra Biofábrica</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-white/70">Mapa interactivo</p>
                    <p className="text-sm text-white/50">Kl-7 Vía Cabuyaro Barranca de Upía</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold">¡Te esperamos en Upía!</h4>
                <p className="text-white/90">
                  Ven a conocer nuestra Biofábrica, donde transformamos residuos en vida. 
                  Programa una visita y experimenta de primera mano cómo regeneramos la tierra.
                </p>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h5 className="font-semibold text-green-400 mb-2">Horarios de Visita</h5>
                  <ul className="text-white/80 space-y-1">
                    <li>• Lunes a Viernes: 9:00 AM - 6:00 PM</li>
                    <li>• Sábados: 9:00 AM - 1:00 PM</li>
                    <li>• Visitas grupales: Con cita previa</li>
                  </ul>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  Programar Visita
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Cita Inspiracional Final */}
        <ScrollAnimation direction="up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-12">
            <blockquote className="text-2xl md:text-3xl font-bold mb-4 italic">
              "La tierra está esperando. Tu acción comienza ahora."
            </blockquote>
            <cite className="text-lg text-green-400 font-semibold">— Llamado Sirius</cite>
          </div>
        </ScrollAnimation>

        {/* CTA Final */}
        <ScrollAnimation direction="up">
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                Comenzar mi Transformación
              </button>
              <button className="border-2 border-white/30 hover:border-green-400 text-white hover:text-green-400 text-lg font-bold py-4 px-8 rounded-full transition-all duration-300">
                Descargar Catálogo
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ContactoFinalSection;
