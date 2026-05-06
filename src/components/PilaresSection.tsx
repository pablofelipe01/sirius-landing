'use client';

import Image from 'next/image';

const PILARES = [
  {
    n: '01',
    t: 'Conexión con la naturaleza',
    d: 'Trabajamos con los ciclos naturales, no contra ellos. Cada decisión agronómica parte del respeto profundo por los ecosistemas que habitamos.',
    img: '/images/portrait-warm.jpg',
  },
  {
    n: '02',
    t: 'Ampliar el margen de los cultivos',
    d: 'Insumos biológicos climáticamente positivos que reducen costos, aumentan rendimientos y construyen resiliencia productiva en cada hectárea.',
    img: '/bio2.png',
  },
  {
    n: '03',
    t: 'Regenerando la biodiversidad local',
    d: 'Cada aplicación de biochar inoculado devuelve microorganismos nativos al suelo, restaurando la red de vida que sostiene la producción agrícola.',
    img: '/bio.png',
  },
];

export default function PilaresSection() {
  return (
    <section id="pilares" style={{ background: '#0E1814', padding: '120px 0' }}>
      <div className="sirius-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#4ecdc4', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#4ecdc4' }} />
            Nuestros pilares
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#F1E9DA', margin: 0,
          }}>
            Lo que guía cada decisión que tomamos.
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }} className="pilares-grid">
          {PILARES.map(p => (
            <article
              key={p.n}
              style={{
                background: '#162218', borderRadius: 8, overflow: 'hidden',
                cursor: 'default', transition: 'transform .3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Imagen */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                <Image
                  src={p.img}
                  alt={p.t}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(14,24,20,0.7) 100%)',
                }} />
              </div>

              {/* Texto */}
              <div style={{ padding: '32px 36px 40px' }}>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: 14,
                  color: '#4ecdc4', letterSpacing: '0.2em', marginBottom: 16,
                }}>
                  {p.n}
                </div>
                <h3 style={{
                  fontFamily: '"Museo Slab", Georgia, serif',
                  fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 400,
                  color: '#F1E9DA', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.01em',
                }}>
                  {p.t}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(241,233,218,0.65)', margin: 0 }}>
                  {p.d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .pilares-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
