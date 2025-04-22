'use client';

import React from 'react';
import ScrollAnimation from '@/components/ScrollAnimation';

const CarbonCalculatorPage = () => {
  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Calculadora de Carbono
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Calcula tu huella de carbono y descubre cómo nuestros productos pueden ayudarte a compensarla.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 md:p-0">
              <iframe 
                className="airtable-embed w-full h-[533px] border border-gray-200 rounded-lg"
                src="https://airtable.com/embed/apprXBBomgiKhVc50/shr6xsVYrJJe428P1" 
                frameBorder="0"
                style={{ background: 'transparent' }}
                title="Calculadora de Carbono"
              ></iframe>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.4}>
          <div className="bg-green-50 border border-green-100 rounded-xl p-6 md:p-8 mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ¿Por qué calcular tu huella de carbono?
            </h2>
            <p className="text-gray-700 mb-4">
              Conocer tu huella de carbono es el primer paso para reducir tu impacto ambiental. En Sirius Regenerative 
              estamos comprometidos con soluciones que no solo reducen emisiones, sino que ayudan a capturar el carbono 
              ya presente en la atmósfera.
            </p>
            <p className="text-gray-700">
              Nuestro biochar es una solución efectiva para la captura de carbono a largo plazo, contribuyendo activamente 
              a la lucha contra el cambio climático mientras mejora la calidad y productividad de tus suelos.
            </p>
            <div className="mt-6">
              <a 
                href="/contacto" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Contacta con nuestros expertos
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  );
};

export default CarbonCalculatorPage;