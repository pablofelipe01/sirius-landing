'use client';

import React from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

const TeamPage = () => {
  // Datos ficticios del equipo - reemplazar con información real
  const teamMembers = [
    {
      id: 1,
      name: 'Martín',
      role: 'Fundador y CEO',
      bio: 'Sirius es un sueño hecho realidad. Surgió de un proceso profundo de sanación interior y me dio la oportunidad de alinear mi vida con un propósito verdadero. Hoy, Sirius es un vehículo de expansión para muchos: una puerta hacia el liderazgo auténtico que nace del corazón.',
      imageSrc: '/martin.png',
    },
    {
      id: 2,
      name: 'Pablo',
      role: 'CTO',
      bio: 'Publicista y Matemático con experiencia desde 1984, cuando escribió su primera línea de código. Experto en IA y machine learning, combinando análisis de datos y creatividad para desarrollar soluciones innovadoras.',
      imageSrc: '/pablo.png',
    },
    {
      id: 3,
      name: 'Alejo',
      role: 'CFO',
      bio: 'Guío la parte financiera con visión y claridad. Aquí integro estructura y alma, ayudando a que Sirius crezca con propósito, orden y sostenibilidad económica regenerativa.',
      imageSrc: '/alejo.png',
    },
    {
      id: 4,
      name: 'Lina',
      role: 'Innovación',
      bio: 'En Sirius alineo visión y alma. Como asesora estratégica, estructuro ideas vivas que conectan lo espiritual con el mercado, honrando a GAIA y sanando desde el ser.',
      imageSrc: '/lina.png',
    },
    {
      id: 5,
      name: 'Juan Ma',
      role: 'Marketing',
      bio: 'En Sirius, comunicamos con el alma. Desde el mercadeo, creo estrategias que inspiran, conecto con la naturaleza y hago visible lo invisible, alineando mi propósito con el todo.',
      imageSrc: '/juan.png',
    },
     {
      id: 8,
      name: 'Lu',
      role: 'Psicologa',
      bio: 'En Sirius alineo visión y alma. Como asesora estratégica, estructuro ideas vivas que conectan lo espiritual con el mercado, honrando a GAIA y sanando desde el ser.',
      imageSrc: '/ser3.png',
    },
     {
      id: 11,
      name: 'Fer',
      role: 'Administración',
      bio: 'Organizo y acompaño tareas administrativas con alegría. Mi rol es dar soporte, cuidar los detalles y sostener al equipo con responsabilidad, armonía y mucho corazón.',
      imageSrc: '/ser6.png',
    },
    {
      id: 6,
      name: 'David',
      role: 'Tech',
      bio: 'Diseño herramientas digitales que ayudan al equipo. En Sirius aprendí a desarrollar tecnología con alma, conectando personas, procesos y naturaleza desde una mirada regenerativa.',
      imageSrc: '/ser1.png',
    },
    {
      id: 7,
      name: 'Mario',
      role: 'Pirólisis',
      bio: 'Opero la planta con responsabilidad. El proceso de pirólisis me enseñó a ser constante, eficiente y consciente del poder regenerador de cada acción que realizamos.',
      imageSrc: '/ser2.png',
    },
   
    {
      id: 9,
      name: 'Pavy',
      role: 'Pirólisis',
      bio: 'Especialista en huella de carbono, Miguel asegura que todas nuestras operaciones contribuyan positivamente a la mitigación del cambio climático y a la regeneración de ecosistemas.',
      imageSrc: '/ser4.png',
    },
    {
      id: 10,
      name: 'Alexa',
      role: 'Lab',
      bio: 'Produzco hongos con amor y precisión. Este trabajo me ha permitido descubrir talentos, crecer interiormente y contribuir a la regeneración desde lo invisible y esencial.',
      imageSrc: '/ser5.png',
    },
   
    {
      id: 12,
      name: 'Angie Yo',
      role: 'Administración',
      bio: 'En Sirius, cada rol me transformó: limpiando, honré el espacio; en el laboratorio, cuidé la vida; y en lo administrativo, florecí en equipo y propósito.',
      imageSrc: '/ser7.png',
    },
    {
      id: 13,
      name: 'Yeison',
      role: 'Pirólisis',
      bio: 'Asisto en la pirólisis con energía y atención. Aquí he crecido como persona, aprendiendo a transformar residuos en vida y a confiar en mi proceso.',
      imageSrc: '/ser8.png',
    },
    {
      id: 13,
      name: 'Santi',
      role: 'Pirólisis',
      bio: 'Lidero la planta desde lo humano y técnico. Mi rol es guiar, escuchar y sostener procesos que producen biochar y transforman vidas con propósito regenerativo.',
      imageSrc: '/santi.png',
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