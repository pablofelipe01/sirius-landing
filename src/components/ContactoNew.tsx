'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* Manual de Marca 2023:
   · Botón principal: Opción 01 — Utile Black, drop shadow 40% opacity / Azul Barranca
   · Fondo: Imperial #1A1A33 (color más oscuro de la paleta)
   · Labels: font-label (DM Sans Medium tracking)
   · Cita: IvyPresto Italic → font-brand-accent (Cormorant Garamond)
   · Icons: SVG Lucide-style, sin emojis
   · Colores info: Verde Alegría #00B602 como acento de contacto
*/

const contactInfo = [
  {
    label: 'Ubicación',
    value: 'Kl-7 Vía Cabuyaro, Barranca de Upía',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    value: '+57 320 956 8566',
    href: 'tel:+573209568566',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.07h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.21-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Correo',
    value: 'marketingsirius@siriusregenerative.com',
    href: 'mailto:marketingsirius@siriusregenerative.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Horario',
    value: 'Lun–Vie: 9am–6pm · Sáb: 9am–1pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const ContactoFinalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#1A1A33] overflow-hidden">
      {/* Grid pattern — Azul Barranca */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#0154AC 1px, transparent 1px), linear-gradient(90deg, #0154AC 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glows — Verde Alegría y Azul Barranca */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#00B602]/6 blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-[#0154AC]/8 blur-3xl pointer-events-none -translate-y-1/2" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 text-center"
        >
          <p className="font-label text-[#00B602] mb-4">Contáctanos</p>

          <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight">
            Conéctate con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#00B602]">
              Sirius
            </span>
          </h2>

          {/* Frase de marca — IvyPresto Italic */}
          <p className="font-brand-accent text-2xl text-white/45 mt-3">
            "La tierra está esperando. Tu acción comienza ahora."
          </p>
          <p className="mt-3 text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
            Regeneremos juntos. Escríbenos para saber más sobre nuestros productos, servicios o movimiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* ─── Formulario ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/4 border border-white/8 rounded-2xl p-8 sm:p-10 backdrop-blur-sm"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full gap-5 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00B602]/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00B602" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">¡Mensaje enviado!</h3>
                <p className="font-brand-accent text-xl text-white/50 italic">
                  "Buenos días en alegría!"
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white mb-2">Envíanos un Mensaje</h3>

                {[
                  { label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre', id: 'name' },
                  { label: 'Correo electrónico', type: 'email', placeholder: 'tu@email.com', id: 'email' },
                ].map((field, i) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col gap-1.5"
                  >
                    <label htmlFor={field.id} className="font-label text-white/35">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm
                                 placeholder-white/20 focus:outline-none focus:border-[#0154AC]/60 focus:bg-white/8
                                 transition-all duration-200 cursor-text"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col gap-1.5"
                >
                  <label htmlFor="message" className="font-label text-white/35">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    placeholder="¿Cómo podemos ayudarte?"
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm
                               placeholder-white/20 focus:outline-none focus:border-[#0154AC]/60 focus:bg-white/8
                               transition-all duration-200 resize-none cursor-text"
                  />
                </motion.div>

                {/* Botón Opción 01 del manual — Utile Black, drop shadow 40% Azul Barranca */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(1,84,172,0.50)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ boxShadow: '0 4px 16px rgba(1,84,172,0.40)' }}
                  className="mt-2 w-full flex items-center justify-center gap-3
                             bg-[#0154AC] hover:bg-[#00A3FF] text-white font-black py-4 rounded-full
                             transition-all duration-250 cursor-pointer
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.22-8.56" strokeLinecap="round" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* ─── Info de contacto ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Info card */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-8 sm:p-10 backdrop-blur-sm flex-grow">
              <h3 className="text-lg font-bold text-white mb-8">Información de Contacto</h3>
              <ul className="flex flex-col gap-6">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#00B602]/12 flex items-center justify-center
                                    text-[#00B602] flex-shrink-0 mt-0.5
                                    group-hover:bg-[#00B602]/22 transition-colors duration-200">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-label text-white/30 mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-white/65 hover:text-white transition-colors duration-200
                                     cursor-pointer break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/65">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote card — IvyPresto italic / Cormorant Garamond */}
            <div className="bg-gradient-to-br from-[#00B602]/10 to-[#0154AC]/10
                            border border-white/8 rounded-2xl p-8 backdrop-blur-sm">
              <blockquote className="font-brand-accent text-xl sm:text-2xl text-white/75 leading-relaxed">
                "Buenos días en alegría! Somos Sirius, pero no tan serios."
              </blockquote>
              <cite className="font-label text-[#00B602] mt-4 block not-italic">
                Filosofía Sirius
              </cite>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactoFinalSection;
