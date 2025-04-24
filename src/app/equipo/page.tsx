'use client';

import React from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

const TeamPage = () => {
  // Datos ficticios del equipo - reemplazar con información real
  const teamMembers = [
    {
      id: 1,
      name: 'Fundador y CEO',
      role: 'Fundador y CEO',
      bio: 'Ingeniera agrónoma con más de 15 años de experiencia en agricultura regenerativa. María fundó Sirius con la visión de transformar la industria agrícola hacia prácticas más sostenibles y regenerativas.',
      imageSrc: '/martin.png',
    },
    {
      id: 2,
      name: 'Pablo Acebedo',
      role: 'CTO',
      bio: 'Publicista y Matemático con experiencia desde 1984, cuando escribió su primera línea de código. Experto en IA y machine learning, combinando análisis de datos y creatividad para desarrollar soluciones innovadoras.',
      imageSrc: '/1a.png',
    },
    {
      id: 3,
      name: 'Laura Sánchez',
      role: 'Directora de Operaciones',
      bio: 'Con experiencia en gestión de producción sostenible, Laura asegura que todos nuestros procesos sean eficientes y respeten nuestros altos estándares medioambientales.',
      imageSrc: '/foto6.png',
    },
    {
      id: 4,
      name: 'Javier López',
      role: 'Especialista en Biochar',
      bio: 'Experto en procesos de pirólisis y producción de biochar, Javier ha perfeccionado nuestras técnicas para crear el biochar de la más alta calidad.',
      imageSrc: '/foto4.png',
    },
    {
      id: 5,
      name: 'Ana Torres',
      role: 'Agrónoma de Campo',
      bio: 'Ana trabaja directamente con agricultores para implementar nuestras soluciones, recopilar datos y asegurar que nuestros productos generen resultados óptimos en diversos entornos.',
      imageSrc: '/foto5.png',
    },
    {
      id: 6,
      name: 'Miguel Ramírez',
      role: 'Director de Sostenibilidad',
      bio: 'Especialista en huella de carbono, Miguel asegura que todas nuestras operaciones contribuyan positivamente a la mitigación del cambio climático y a la regeneración de ecosistemas.',
      imageSrc: '/foto6.png',
    },
  ];

  return (
    <main>
      <div className="bg-green-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestro Equipo</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Conoce a las personas detrás de Sirius Regenerative, unidas por la pasión
              de revolucionar la agricultura a través de soluciones regenerativas.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Un equipo con propósito</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                En Sirius Regenerative creemos que el trabajo en equipo, la pasión y el compromiso 
                son la base para crear soluciones que respeten y fortalezcan los ecosistemas.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollAnimation 
                key={member.id} 
                direction="up" 
                delay={0.1 * index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative h-80">
                  <Image 
                    src={member.imageSrc} 
                    alt={member.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-96">
                <Image 
                  src="/foto7.png" 
                  alt="Equipo trabajando juntos" 
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                🔥 Cuando el trabajo en equipo se llena de energía, todo es posible! ♻️
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                La creación de una planta de pirólisis no solo se trata de tecnología e innovación, 
                sino también de personas que trabajan con pasión y alegría.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                💚 Aquí, cada sonrisa, cada esfuerzo y cada momento compartido hacen la diferencia. 
                Porque cuando disfrutamos lo que hacemos, trabajamos mejor y logramos grandes cosas juntos. 🚀
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Quieres unirte a nuestro equipo?</h3>
                <p className="text-gray-600 mb-4">
                  Estamos siempre en búsqueda de talento apasionado por la regeneración y la sostenibilidad.
                </p>
                <a href="/contacto" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Contacta con nosotros
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl font-bold mb-6">Nuestros valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2">Regeneración</h3>
                <p className="text-white/80">
                  Creemos en devolver más de lo que tomamos, regenerando el suelo y los ecosistemas.
                </p>
              </div>
              
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-2">Innovación</h3>
                <p className="text-white/80">
                  Combinamos ciencia ancestral con tecnología de vanguardia para crear soluciones efectivas.
                </p>
              </div>
              
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-xl font-bold mb-2">Colaboración</h3>
                <p className="text-white/80">
                  Trabajamos juntos, con agricultores y con la naturaleza, para lograr un impacto positivo.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;