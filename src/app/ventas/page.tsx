'use client';

import React from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';
import { motion } from 'framer-motion';

const SalesPage = () => {
  // Datos de productos y ofertas
  const products = [
    {
      id: 'biochar-blend',
      name: 'BIOCHAR BLEND',
      description:
        'Una mezcla de biochar premium, compost enriquecido y microorganismos benéficos. Mejora la estructura del suelo, activa la vida microbiana y nutre tus cultivos desde la raíz.',
      price: 129.9,
      discountPrice: 99.9,
      quantity: '5kg',
      imageSrc: '/blend.png',
      features: [
        'Mejora la estructura del suelo',
        'Aumenta la retención de agua',
        'Incrementa la actividad microbiana',
        'Potencia el crecimiento de raíces',
        'Reduce la necesidad de fertilizantes químicos',
      ],
      tag: 'Bestseller',
    },
    {
      id: 'star-dust',
      name: 'STAR DUST',
      description:
        'Nuestro nuevo polvo de estrellas: biochar ultraporozo, fortificado con Trichoderma y bacterias benéficas. Regenera tu suelo con nuestro Star Dust, formulado a tu medida.',
      price: 99.9,
      discountPrice: 79.9,
      quantity: '3kg',
      imageSrc: '/dust.png',
      features: [
        'Regenera suelos degradados',
        'Control natural de patógenos',
        'Proporciona nutrientes de liberación lenta',
        'Mejora la salud general de las plantas',
        'Aplicación sencilla y directa',
      ],
      tag: 'Nuevo',
    },
    {
      id: 'tratamiento-plagas',
      name: 'TRATAMIENTO PREVENTIVO DE PLAGAS',
      description:
        'Tu escudo natural contra plagas. Fórmula biológica a la medida con extractos vegetales y microorganismos aliados. Protege tus cultivos mientras cuidas la biodiversidad.',
      price: 149.9,
      discountPrice: 119.9,
      quantity: '2L',
      imageSrc: '/plaga2.png',
      features: [
        'Protección natural contra múltiples plagas',
        'Preserva la biodiversidad del ecosistema',
        'No genera resistencia en los patógenos',
        'Compatible con cultivos orgánicos',
        'Aplicación preventiva y curativa',
      ],
      tag: 'Nuevo',
    },
    {
      id: 'sirius-bacter',
      name: 'SIRIUS BACTER',
      description:
        'Millones de bacterias y hongos entomopatógenos trabajando juntos por tu cultivo. Mejora la disponibilidad de nutrientes, estimula raíces y fortalece tu suelo desde lo invisible.',
      price: 109.9,
      discountPrice: 89.9,
      quantity: '1L',
      imageSrc: '/bacter2.png',
      features: [
        'Estimula el crecimiento radicular',
        'Mejora la absorción de nutrientes',
        'Incrementa la resistencia a enfermedades',
        'Promueve la salud general del suelo',
        'Reduce los requerimientos de fertilizantes',
      ],
      tag: 'Nuevo',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'HACIENDA LA CABAÑA S.A',
      role: 'Palma Africana',
      comment:
        'Desde que empecé a usar Biochar Blend, la salud de mis palmas mejoró notablemente. Mayor producción y mejor calidad en los granos. Definitivamente vale la inversión.',
      rating: 5,
      imageSrc: '/log1.png',
    },
    {
      id: 2,
      name: 'GUAICARAMO',
      role: 'Palma Africana',
      comment:
        'El Star Dust ha sido un descubrimiento increíble. Nuestros suelos retienen mejor el agua y hemos reducido un 40% el uso de químicos. ¡Nuestras palmas nunca habían tenido tanto sabor!',
      rating: 5,
      imageSrc: '/log2.png',
    },
    {
      id: 3,
      name: 'SAPUGA',
      role: 'Palma Africana',
      comment:
        'Probé el Combo Regenerativo en un área que considerábamos casi perdida. En tres meses vimos un cambio radical, ahora es una de nuestras parcelas más productivas.',
      rating: 5,
      imageSrc: '/log3.png',
    },
  ];

  return (
    <main>
      {/* HERO */}
      <div className="bg-green-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation direction="up">
            <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              ¡OFERTA ESPECIAL!
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Descuentos por Temporada de Siembra
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Es el momento perfecto para complementar tu siembra con nuestros
              bioinsumos revolucionarios y aprovechar estas ofertas por tiempo
              limitado.
            </p>
            <div className="flex justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center">
                <div className="text-3xl mr-3">⏳</div>
                <div>
                  <p className="text-white/90 text-sm">Oferta válida hasta</p>
                  <p className="font-bold">30 de Mayo, 2025</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* PRODUCTOS */}
      <section
        className="py-16 relative"
        style={{
          backgroundImage: "url('/ventas.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-white/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <div className="bg-white/90 rounded-xl shadow-lg p-8 max-w-3xl mx-auto border border-green-100">
                <h2 className="text-3xl font-bold mb-4 text-green-700">
                  Nuestros Productos en Oferta
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Selecciona el producto perfecto para tus necesidades y
                  comienza a regenerar tus suelos hoy mismo.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ScrollAnimation
                key={product.id}
                direction="up"
                delay={0.1 * index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Imagen y tags */}
                <div className="relative">
                  <div className="relative h-48">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {product.tag && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.round(
                      ((product.price - product.discountPrice) / product.price) *
                        100
                    )}
                    % OFF
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-2">
                    {product.quantity}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm h-20 overflow-y-auto">
                    {product.description}
                  </p>

                  {/* Beneficios */}
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-700 mb-2 text-sm">
                      Beneficios:
                    </h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600 text-xs">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Precios */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="text-2xl font-bold text-gray-800">
                        ${product.discountPrice.toFixed(2)}
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Ahorras $
                      {(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </div>

                  {/* BOTÓN – ahora va a /dashboard */}
                  <a
                    href="/dashboard"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold transition-colors flex items-center justify-center text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                   Simulación de costo
                  </a>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Asesoría */}
          <ScrollAnimation direction="up" delay={0.3} className="mt-16">
            <div className="bg-green-50 border border-green-100 rounded-xl p-8 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                ¿Necesitas asesoría?
              </h3>
              <p className="text-gray-700 mb-6">
                Si no estás seguro qué producto es el adecuado para tus
                necesidades específicas, nuestro equipo de expertos estará
                encantado de ayudarte.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Solicitar asesoría personalizada
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Agricultores de todo el país ya están experimentando los
                beneficios de nuestros productos.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation
                key={testimonial.id}
                direction="up"
                delay={0.1 * index}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Estrellas */}
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700">{testimonial.comment}</p>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl font-bold mb-6">
                ¡No pierdas esta oportunidad!
              </h2>
              <p className="text-xl mb-8">
                La temporada de siembra es el momento perfecto para incorporar
                nuestros bioinsumos y transformar tus cultivos. Esta oferta está
                disponible por tiempo limitado.
              </p>
              <motion.a
                href="#"
                className="inline-block bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Aprovecha ahora los descuentos!
              </motion.a>
              <p className="mt-4 text-white/80 text-sm">
                *Los precios no incluyen gastos de envío. Consulta
                disponibilidad para tu región.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SalesPage;
