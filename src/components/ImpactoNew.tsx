'use client';

const ImpactoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white relative overflow-hidden -mt-1">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Regenerando 100,000 Hectáreas para 2030
          </h2>
          <p className="text-xl text-white/90">
            Cada producto, cada proyecto, cada alma contribuye a un planeta próspero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">2,450</h3>
            <p className="text-white/70">Toneladas CO₂ Capturadas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">8,750</h3>
            <p className="text-white/70">Hectáreas Regeneradas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">👨‍🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">340</h3>
            <p className="text-white/70">Agricultores Apoyados</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-12">
          <blockquote className="text-2xl font-bold mb-4 italic">
            "Tu alma regenera la tierra. La tierra regenera tu alma."
          </blockquote>
          <cite className="text-lg text-green-400">— Filosofía Sirius</cite>
        </div>
      </div>
    </section>
  );
};

export default ImpactoSection;
