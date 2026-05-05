'use client';

const POINTS = [
  {
    k: '01',
    t: 'Biochar no es el producto.',
    d: 'Es la infraestructura porosa donde se aloja la biología viva del suelo. Sin esa estructura, los microorganismos no tienen casa.',
  },
  {
    k: '02',
    t: 'Inoculación nativa, no genérica.',
    d: 'Colonizamos el biochar con bacterias del territorio donde será aplicado. La memoria biológica del lugar viaja con el carbón.',
  },
  {
    k: '03',
    t: '10 kg/ha vence a 5–20 t/ha.',
    d: 'Tres órdenes de magnitud menos material por el mismo —o mayor— efecto regenerativo. Cambia la economía del agricultor por completo.',
  },
  {
    k: '04',
    t: 'Carbono permanente, verificable.',
    d: 'Cada gramo de biochar aplicado es CO₂ secuestrado por más de 1 000 años, certificable bajo Puro.earth y alineado con SBTi.',
  },
];

export default function TesisSection() {
  return (
    <section id="tesis" style={{ background: '#FBF7F1', padding: '120px 0' }}>
      <div className="sirius-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            La tesis
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#0E1814', margin: 0,
          }}>
            Una sola idea, articulada con precisión.
          </h2>
        </div>

        {/* 2×2 grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1, background: 'rgba(14,24,20,0.10)',
          border: '1px solid rgba(14,24,20,0.10)',
        }} className="tesis-grid">
          {POINTS.map(p => (
            <article
              key={p.k}
              style={{ background: '#FBF7F1', padding: '40px 36px', cursor: 'default', transition: 'background .3s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F3EEE4')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FBF7F1')}
            >
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#1F5538', letterSpacing: '0.2em', marginBottom: 18 }}>
                {p.k}
              </div>
              <h3 style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 500,
                color: '#0E1814', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.01em',
              }}>
                {p.t}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#3A4540', margin: 0 }}>{p.d}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 800px) { .tesis-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
