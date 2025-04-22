'use client';

import React from 'react';
import ContactSection from '@/components/ContactSection';
import ScrollAnimation from '@/components/ScrollAnimation';

const ContactPage = () => {
  return (
    <main>
      <div className="bg-green-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Estamos aquí para responder tus preguntas y ayudarte a elegir la mejor solución 
              para tus necesidades de agricultura regenerativa.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      
      <ContactSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Preguntas Frecuentes</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Respuestas a las preguntas más comunes sobre nuestros productos y servicios.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Cómo puedo comenzar a utilizar vuestros productos?</h3>
                <p className="text-gray-600">
                  Nuestros productos son fáciles de usar. Puedes comenzar adquiriendo un paquete de 
                  prueba en nuestra tienda o contactándonos para recibir asesoría personalizada 
                  según las necesidades específicas de tu cultivo.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Son efectivos sus productos en todo tipo de suelos?</h3>
                <p className="text-gray-600">
                  Sí, nuestros productos están diseñados para funcionar en diversos tipos de suelos. 
                  Sin embargo, para obtener resultados óptimos, recomendamos un análisis previo del 
                  suelo para adaptar la solución a tus necesidades específicas.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Cuánto tiempo tarda en verse los resultados?</h3>
                <p className="text-gray-600">
                  Los primeros resultados pueden observarse entre 2 y 4 semanas después de la aplicación, 
                  dependiendo del estado inicial del suelo y el tipo de cultivo. La regeneración completa 
                  del suelo es un proceso continuo que mejora con el tiempo.
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Ofrecen envíos internacionales?</h3>
                <p className="text-gray-600">
                  Sí, realizamos envíos a nivel internacional. Los costos y tiempos de envío varían 
                  según la ubicación. Contacta con nuestro equipo para obtener información detallada 
                  sobre envíos a tu región.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;