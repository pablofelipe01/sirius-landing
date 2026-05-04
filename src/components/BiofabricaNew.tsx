'use client';

import Image from 'next/image';

const STATS = [
  { label: 'Ubicación',        value: 'Barranca de Upía, Meta' },
  { label: 'Capacidad actual', value: '180 t biochar / año' },
  { label: 'Cepas en banco',   value: '42 nativas' },
  { label: 'Trabajadores',     value: '24 seres' },
];

export default function BiofabricaSection() {
  return (
    <section id="proceso" style={{ background: '#FBF7F1', padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="bfab-grid">
          {/* Left: image */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
              <Image
                src="/images/biofactory.jpg"
                alt="Biofábrica Sirius en Barranca de Upía"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: 24, right: -16,
              background: '#FBF7F1', border: '1px solid rgba(14,24,20,0.10)',
              borderRadius: 4, padding: '14px 20px', boxShadow: '0 4px 24px rgba(14,24,20,0.12)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A857F' }}>Operativo</div>
              <div style={{ fontSize: 17, fontWeight: 500, color: '#1F5538', marginTop: 4 }}>Puro.earth certified</div>
            </div>
          </div>

          {/* Right: copy + stats */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#1F5538', marginBottom: 18,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
              La biofábrica
            </div>

            <h2 style={{
              fontFamily: '"Museo Slab", Georgia, serif',
              fontSize: 'clamp(28px, 3.8vw, 52px)',
              fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.015em',
              color: '#0E1814', margin: '0 0 24px',
            }}>
              Una operación visible, auditable, replicable.
            </h2>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#3A4540', marginBottom: 48 }}>
              Nuestra planta en Barranca de Upía, Meta, transforma biomasa local
              en biochar inoculado con cepas microbianas nativas. Cada lote es
              trazado desde la pirólisis hasta la hectárea aplicada.
            </p>

            <div style={{ borderTop: '1px solid rgba(14,24,20,0.10)' }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: i < STATS.length - 1 ? '1px solid rgba(14,24,20,0.10)' : 'none',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A857F' }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#0E1814', fontWeight: 400 }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .bfab-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
