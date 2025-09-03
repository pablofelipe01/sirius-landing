'use client';

const InvolucrateSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden -mt-1">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Tu Alma Tiene un Propósito. Encuéntralo con Nosotros.
          </h2>
          <p className="text-xl text-gray-600">
            Únete a nuestra comunidad, asiste a un evento inmersivo o comparte tu historia para regenerar el mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4 text-center">🌱</div>
            <h3 className="text-xl font-bold mb-4 text-center">Únete al Movimiento</h3>
            <p className="text-gray-600 text-center mb-6">Recibe actualizaciones y forma parte de la comunidad regenerativa</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg">
              Suscribirse
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4 text-center">🌿</div>
            <h3 className="text-xl font-bold mb-4 text-center">Asiste a un Evento</h3>
            <p className="text-gray-600 text-center mb-6">Talleres inmersivos en la naturaleza para despertar tu alma</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg">
              Ver Eventos
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4 text-center">📱</div>
            <h3 className="text-xl font-bold mb-4 text-center">Comparte tu Historia</h3>
            <p className="text-gray-600 text-center mb-6">Únete a la conversación con #LetsGetSirius</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg">
              Compartir
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center">
          <blockquote className="text-2xl font-bold text-gray-800 mb-4 italic">
            "No esperes más. Mira al interior de tu alma y ella te indicará tu camino."
          </blockquote>
          <cite className="text-lg text-green-600">— Filosofía Sirius</cite>
        </div>
      </div>
    </section>
  );
};

export default InvolucrateSection;
