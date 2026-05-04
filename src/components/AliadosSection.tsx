'use client';

const PARTNERS = [
  'Puro.earth', 'SBTi', 'ICA Colombia',
  'Cámara de Comercio', 'Universidad de los Llanos', 'Agrosavia',
];

const QUOTES = [
  {
    text: '"El biochar inoculado representa la convergencia más prometedora entre restauración ecológica y finanzas climáticas en América Latina."',
    source: 'Semana Sostenible',
    date: 'Mar 2026',
  },
  {
    text: '"Sirius demuestra que la bioeconomía regenerativa puede ser rentable, trazable y replicable en el trópico."',
    source: 'La República',
    date: 'Feb 2026',
  },
  {
    text: '"Un modelo que combina captura de carbono permanente con soberanía alimentaria — raro y necesario."',
    source: 'Bloomberg Línea',
    date: 'Ene 2026',
  },
];

export default function AliadosSection() {
  return (
    <section id="aliados" style={{ background: '#FBF7F1', padding: '96px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Section header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Aliados y prensa
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(28px, 3.6vw, 48px)',
            fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.015em',
            color: '#0E1814', margin: 0,
          }}>
            Quiénes nos acompañan, quiénes nos cubren.
          </h2>
        </div>

        {/* Partners strip */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '16px 56px',
          paddingBottom: 56, marginBottom: 56,
          borderBottom: '1px solid rgba(14,24,20,0.10)',
        }}>
          {PARTNERS.map(p => (
            <span key={p} style={{
              fontFamily: '"Museo Slab", Georgia, serif',
              fontSize: 22, fontWeight: 400, color: '#7A857F',
              letterSpacing: '-0.01em', lineHeight: 1,
              transition: 'color .2s', cursor: 'default',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0E1814'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#7A857F'}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Press quotes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="quote-grid">
          {QUOTES.map(q => (
            <figure key={q.source} style={{
              margin: 0, padding: '28px 0',
              borderTop: '2px solid #0E1814',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#1F5538', marginBottom: 14,
                fontFamily: '"Museo Slab", Georgia, serif',
              }}>
                {q.source}
              </div>
              <blockquote style={{
                fontFamily: '"Museo Slab", Georgia, serif',
                fontSize: 18, fontWeight: 300, fontStyle: 'italic',
                lineHeight: 1.5, color: '#0E1814',
                margin: '0 0 14px', letterSpacing: '-0.005em',
              }}>
                {q.text}
              </blockquote>
              <figcaption style={{ fontSize: 12, color: '#7A857F', letterSpacing: '0.06em' }}>
                {q.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .quote-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
