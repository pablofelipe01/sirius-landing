'use client';

const STEPS = [
  { n: '01', t: 'Biomasa', d: 'Residuos agrícolas locales: cascarilla, poda, raquis. Sin compromiso con bosque nativo.' },
  { n: '02', t: 'Pirólisis', d: 'Combustión sin oxígeno a 500–700°C. La biomasa se convierte en carbono estable.' },
  { n: '03', t: 'Inoculación', d: 'El biochar se coloniza con consorcios bacterianos nativos del territorio destino.' },
  { n: '04', t: 'Aplicación', d: '10 kg/ha aplicados directamente al suelo en surco o voleo. Una sola dosis por ciclo.' },
  { n: '05', t: 'Monitoreo', d: 'Sensores de suelo + satélite. Reporte de CO₂ secuestrado y salud del suelo cada trimestre.' },
];

export default function ComoFuncionaSection() {
  return (
    <section id="como-funciona" style={{ background: '#FBF7F1', padding: '80px 0 120px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Cómo funciona
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#0E1814', margin: 0,
          }}>
            De residuo agrícola a carbono vivo en cinco pasos.
          </h2>
        </div>

        {/* 5-step flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, position: 'relative' }} className="cf-grid">
          {/* Connector line */}
          <div aria-hidden style={{
            position: 'absolute', top: 30, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(14,24,20,0.22), transparent)',
          }} className="cf-line" />

          {STEPS.map(s => (
            <div key={s.n} style={{ position: 'relative', padding: '0 14px', textAlign: 'center' }}>
              <div style={{
                width: 60, height: 60, margin: '0 auto 18px',
                borderRadius: '50%', background: '#FBF7F1',
                border: '1px solid rgba(14,24,20,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Georgia, serif', fontSize: 22, color: '#1F5538',
                fontWeight: 300, position: 'relative', zIndex: 1,
              }}>
                {s.n}
              </div>
              <h4 style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 17, fontWeight: 600, color: '#0E1814',
                margin: '0 0 8px', letterSpacing: '-0.005em',
              }}>
                {s.t}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3A4540', margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .cf-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 16px !important; }
          .cf-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
