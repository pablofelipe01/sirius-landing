'use client';

const CERTS = [
  {
    name: 'Puro.earth',
    desc: 'Registro internacional de biochar para captura de CO₂ permanente. Nuestro pipeline activo está en proceso de verificación.',
    tag: 'CO₂ permanente',
    color: '#1F5538',
  },
  {
    name: 'SBTi',
    desc: 'Metas basadas en ciencia (Science Based Targets initiative) alineadas con el Acuerdo de París y temperatura de 1.5 °C.',
    tag: 'Science Based Targets',
    color: '#3D8F5F',
  },
  {
    name: 'ZOMAC',
    desc: 'Zona Más Afectada por el Conflicto — beneficios tributarios colombianos para inversión en territorios prioritarios.',
    tag: 'Beneficio tributario Colombia',
    color: '#C77A2C',
  },
  {
    name: 'ICA Colombia',
    desc: 'Instituto Colombiano Agropecuario — registro oficial de bioinsumos de uso agrícola para comercialización nacional.',
    tag: 'Bioinsumos registrados',
    color: '#3A4540',
  },
];

export default function CertificacionesSection() {
  return (
    <section id="certificaciones" style={{ background: '#F3EEE4', padding: '96px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Certificaciones y marcos
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(28px, 3.6vw, 48px)',
            fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.015em',
            color: '#0E1814', margin: 0,
          }}>
            Estándares que respaldan cada tonelada.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="cert-grid">
          {CERTS.map(c => (
            <div key={c.name} style={{
              background: '#FBF7F1', border: '1px solid rgba(14,24,20,0.08)',
              borderRadius: 6, padding: 28,
              transition: 'transform .25s, box-shadow .25s', cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(14,24,20,0.10)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'inline-block', padding: '4px 10px', borderRadius: 3,
                background: c.color, color: '#FBF7F1',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                {c.tag}
              </div>
              <h3 style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 22, fontWeight: 500, color: '#0E1814', margin: '0 0 12px',
              }}>
                {c.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A4540', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .cert-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </section>
  );
}
