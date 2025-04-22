'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      id: 'benefit-1',
      icon: '📈',
      title: 'Regeneran suelos degradados',
      description: 'Nuestros productos restauran la salud del suelo, devolviéndole vida y nutrientes esenciales.'
    },
    {
      id: 'benefit-2',
      icon: '💧',
      title: 'Retienen agua como esponja',
      description: 'Aumenta la capacidad de retención de agua, reduciendo la necesidad de riego frecuente.'
    },
    {
      id: 'benefit-3',
      icon: '💚',
      title: 'Match perfecto con tus raíces',
      description: 'Nuestros microorganismos crean simbiosis con las raíces, mejorando la absorción de nutrientes.'
    },
    {
      id: 'benefit-4',
      icon: '🐝',
      title: 'Control de plagas natural',
      description: 'Controlan plagas sin afectar la biodiversidad benéfica para tus cultivos.'
    },
    {
      id: 'benefit-5',
      icon: '🍃',
      title: 'Fortalecen tus cultivos',
      description: 'Plantas más fuertes, más resistentes a enfermedades y con mayor productividad.'
    },
    {
      id: 'benefit-6',
      icon: '🌎',
      title: 'Amigables con el planeta',
      description: 'Productos 100% naturales que respetan el medio ambiente y contribuyen a su regeneración.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Imágenes de fondo con parallax */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0">
          <Image 
            src="/img5.png" 
            alt="Background decoration" 
            width={400} 
            height={400}
            className="opacity-30"
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <Image 
            src="/img7.png" 
            alt="Background decoration" 
            width={300} 
            height={300}
            className="opacity-30"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ¡Dile adiós a los agroquímicos! 👋
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Mientras los químicos arrasan con todo, <br className="hidden md:block" />
              nuestros aliados microscópicos...
            </h2>
          </div>
        </ScrollAnimation>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.id}
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <ScrollAnimation direction="up" delay={0.4} className="mt-16 text-center">
          <div className="bg-green-50 border border-green-100 rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              En SIRIUS combinamos ciencia + naturaleza para cultivos más resilientes y productivos. 
              Tu suelo lo agradecerá (y el planeta también) 🌎
            </p>
            <p className="text-xl font-bold text-red-600">
              ¿Sigues usando agroquímicos? 🚩🚩🚩
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default BenefitsSection;