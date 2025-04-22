'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'Información general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Resetear el formulario después de mostrarse el mensaje de éxito
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          subject: 'Información general'
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-20 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 transform -translate-x-1/3 -translate-y-1/3">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-green-100">
          <path fill="currentColor" d="M51.2,-59.2C62.9,-45.9,66.9,-26.2,68.1,-7.5C69.3,11.2,67.8,29.1,57.9,40.7C48,52.3,29.8,57.6,10.7,62C-8.3,66.4,-28.3,69.9,-42.7,62.1C-57.1,54.3,-65.8,35.3,-69.1,15.7C-72.3,-3.9,-70,-24,-60,-39.1C-49.9,-54.1,-33.1,-64.1,-14.9,-66.6C3.4,-69.1,21.8,-64,35.9,-62.4C50,-60.7,67.8,-62.5,76.5,-56.6" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-green-50">
          <path fill="currentColor" d="M41.9,-57.5C55.9,-52.9,69.9,-43.8,76.1,-30.5C82.3,-17.2,80.8,0.3,73.8,13.9C66.8,27.5,54.4,37.3,41.8,47.4C29.2,57.5,16.4,67.9,0.2,67.6C-16,67.4,-32.1,56.5,-45.5,43.7C-58.9,30.9,-69.7,16.1,-72.6,-0.7C-75.5,-17.4,-70.5,-35.1,-59.3,-44.3C-48.1,-53.5,-30.8,-54.3,-16.1,-58.6C-1.4,-62.9,10.7,-70.6,24.2,-71.6C37.7,-72.5,53.7,-66.7,62.4,-53.9C71.2,-41.2,75,-20.6,71.8,-3.8C68.7,13,58.7,25.9,49.2,36.9C39.7,47.9,30.7,57,19.1,64.8C7.4,72.6,-6.9,79.1,-20.7,79.1C-34.5,79.2,-47.7,72.7,-57.7,62.2C-67.7,51.7,-74.4,37.1,-78.2,21.7" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              CONTACTO
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Conéctate con nosotros
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¿Quieres saber más sobre nuestros productos o servicios? Estamos aquí para ayudarte 
              a regenerar tus suelos y potenciar tus cultivos.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario de contacto */}
          <ScrollAnimation direction="left" className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Envíanos un mensaje</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
              >
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-bold text-green-800 mb-2">¡Mensaje enviado!</h4>
                <p className="text-green-700">
                  Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="+123 456 7890"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="Información general">Información general</option>
                    <option value="Compras">Compras</option>
                    <option value="Soporte técnico">Soporte técnico</option>
                    <option value="Colaboración">Colaboración</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </button>
                </div>
              </form>
            )}
          </ScrollAnimation>
          
          {/* Información de contacto */}
          <ScrollAnimation direction="right" className="flex flex-col justify-between">
            <div className="bg-green-50 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Información de contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">Dirección</h4>
                    <p className="text-gray-600">Av. Siempreverde 123, Ciudad Verde</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">Teléfono</h4>
                    <p className="text-gray-600">+57 313 212 1019</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">Correo</h4>
                    <p className="text-gray-600">info@siriusregenerative.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700">Horario</h4>
                    <p className="text-gray-600">Lunes a Viernes: 9am - 6pm</p>
                    <p className="text-gray-600">Sábados: 9am - 1pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/sirius.colombia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/sirius-regenerative" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://wa.me/573132121019" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </div>
              
              <p className="mt-6 text-white/80">
                Únete a nuestra comunidad y mantente actualizado sobre nuestras últimas novedades, consejos 
                de agricultura regenerativa y ofertas especiales.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;