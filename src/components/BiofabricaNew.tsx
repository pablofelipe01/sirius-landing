'use client';

const BiofabricaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden -mt-1">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Donde el Fuego Ancestral se Encuentra con la Ciencia Viva
          </h2>
          <p className="text-xl text-gray-600">
            Nuestra Biofábrica transforma residuos orgánicos en bioinsumos que dan vida al suelo y al futuro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-2">Pirólisis</h3>
            <p className="text-gray-600">Proceso controlado de calor</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-bold mb-2">Biotecnología</h3>
            <p className="text-gray-600">Microorganismos beneficiosos</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Agentics IA</h3>
            <p className="text-gray-600">Piroliapp y Alma</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-4">⚗️</div>
            <h3 className="text-xl font-bold mb-2">Formulación</h3>
            <p className="text-gray-600">Soluciones personalizadas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiofabricaSection;
