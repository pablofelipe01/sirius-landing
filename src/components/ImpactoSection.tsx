'use client';

const ImpactoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white relative overflow-hidden -mt-1">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-100/60 via-green-100/30 to-transparent pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            NUESTRO IMPACTO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Regenerando 100,000 Hectáreas para 2030
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Cada producto, cada proyecto, cada alma contribuye a un planeta próspero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">2,450</h3>
            <p className="text-lg text-white/90 mb-1">toneladas CO₂</p>
            <p className="text-white/70">Carbono Capturado</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">8,750</h3>
            <p className="text-lg text-white/90 mb-1">hectáreas</p>
            <p className="text-white/70">Hectáreas Regeneradas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">👨‍🌾</div>
            <h3 className="text-3xl font-bold mb-2 text-green-400">340</h3>
            <p className="text-lg text-white/90 mb-1">familias</p>
            <p className="text-white/70">Agricultores Apoyados</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-12">
          <blockquote className="text-2xl md:text-3xl font-bold mb-4 italic">
            &quot;Tu alma regenera la tierra. La tierra regenera tu alma.&quot;
          </blockquote>
          <cite className="text-lg text-green-400 font-semibold">— Filosofía Sirius</cite>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            Ver Nuestro Impacto Completo
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactoSection;
