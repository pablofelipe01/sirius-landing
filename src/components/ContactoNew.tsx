'use client';

const ContactoFinalSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-green-900 text-white relative overflow-hidden -mt-1">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Conéctate con Sirius
          </h2>
          <p className="text-xl text-white/90">
            Regeneremos juntos. Contáctanos para saber más sobre nuestros productos, servicios o movimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70"
              />
              <textarea
                placeholder="¿Cómo podemos ayudarte?"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70"
              ></textarea>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📍</span>
                  <span>Kl-7 Vía Cabuyaro Barranca de Upía</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📞</span>
                  <span>+57 320 956 8566</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✉️</span>
                  <span>marketing@siriusregenerative.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🕒</span>
                  <span>Lun-Vie: 9am-6pm, Sáb: 9am-1pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
          <blockquote className="text-2xl font-bold mb-4 italic">
            "La tierra está esperando. Tu acción comienza ahora."
          </blockquote>
          <cite className="text-lg text-green-400">— Llamado Sirius</cite>
        </div>
      </div>
    </section>
  );
};

export default ContactoFinalSection;
