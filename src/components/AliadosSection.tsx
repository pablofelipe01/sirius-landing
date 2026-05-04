const PARTNERS = [
  'Puro.earth', 'SBTi', 'ICA Colombia',
  'Cámara de Comercio', 'Universidad de los Llanos', 'Agrosavia',
];

const QUOTES = [
  {
    text: '"El biochar inoculado representa la convergencia más prometedora entre restauración ecológica y finanzas climáticas en América Latina."',
    source: 'Semana Sostenible',
  },
  {
    text: '"Sirius demuestra que la bioeconomía regenerativa puede ser rentable, trazable y replicable en el trópico."',
    source: 'La República',
  },
  {
    text: '"Un modelo que combina captura de carbono permanente con soberanía alimentaria — raro y necesario."',
    source: 'Bloomberg Línea',
  },
];

export default function AliadosSection() {
  return (
    <section id="aliados" style={{ background: '#0E1814', padding: '96px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Partners strip */}
        <div style={{ marginBottom: 80 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(241,233,218,0.40)', marginBottom: 32,
          }}>
            Aliados y homologaciones
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 48px', alignItems: 'center' }}>
            {PARTNERS.map(p => (
              <span key={p} style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 18, fontWeight: 300, color: 'rgba(241,233,218,0.56)',
                letterSpacing: '0.01em', lineHeight: 1,
              }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(241,233,218,0.10)', marginBottom: 80 }} />

        {/* Press quotes */}
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(241,233,218,0.40)', marginBottom: 36,
        }}>
          Prensa
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="quote-grid">
          {QUOTES.map(q => (
            <div key={q.source} style={{
              borderLeft: '2px solid rgba(199,122,44,0.50)',
              paddingLeft: 24,
            }}>
              <p style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 16, fontWeight: 300, fontStyle: 'italic',
                lineHeight: 1.65, color: 'rgba(241,233,218,0.72)',
                margin: '0 0 16px',
              }}>
                {q.text}
              </p>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C77A2C' }}>
                {q.source}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .quote-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
