'use client';

import { useRef, useEffect, useState } from 'react';

const STATS = [
  { n: '10',     u: 'kg/ha',  l: 'Dosis Sirius',             s: 'vs 5–20 t/ha académico' },
  { n: '300',    u: '+',      l: 'Agricultores activos',      s: 'pequeños y medianos' },
  { n: '1 200',  u: 'tCO₂e', l: 'Secuestrado verificado',   s: 'Puro.earth pipeline' },
  { n: '1 000',  u: 'años',   l: 'Permanencia carbono',       s: 'biochar estable' },
  { n: '10 000', u: '',       l: 'Biofábricas · meta',        s: 'visión global 2050' },
  { n: '100',    u: '%',      l: 'Trazable',                  s: 'lote a hectárea' },
];

export default function ImpactoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="impacto" style={{ background: '#0E1814', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Accent glow */}
      <div aria-hidden style={{
        position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(31,85,56,0.22), transparent)', pointerEvents: 'none',
      }} />

      <div className="sirius-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', position: 'relative' }} ref={ref}>
        {/* Eyebrow */}
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#C77A2C', marginBottom: 18,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ display: 'inline-block', width: 18, height: 1, background: '#C77A2C' }} />
          Tracción · 2026
        </div>

        <h2 style={{
          fontFamily: '"Museo Slab", Georgia, serif',
          fontSize: 'clamp(32px, 4.4vw, 60px)',
          fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
          color: '#F1E9DA', margin: '0 0 64px', maxWidth: 900,
        }}>
          Capturamos CO₂. Regeneramos suelos. Construimos el operativo.
        </h2>

        {/* 3×2 metric grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="imp-grid">
          {STATS.map((m, i) => (
            <div key={m.l} style={{
              padding: '36px 28px',
              borderTop: '1px solid rgba(241,233,218,0.16)',
              borderRight: i % 3 !== 2 ? '1px solid rgba(241,233,218,0.16)' : 'none',
              transition: 'background .3s', cursor: 'default',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(241,233,218,0.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(48px, 5.5vw, 76px)',
                  fontWeight: 300, color: '#F1E9DA', letterSpacing: '-0.03em', lineHeight: 1,
                  display: 'inline-block',
                  opacity: seen ? 1 : 0,
                  transform: seen ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.8s ${i * 0.08}s, transform 0.8s ${i * 0.08}s`,
                }}>
                  {m.n}
                </span>
                <span style={{ fontSize: 16, color: 'rgba(241,233,218,0.72)', fontWeight: 500 }}>{m.u}</span>
              </div>
              <div style={{ marginTop: 18, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F1E9DA' }}>
                {m.l}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(241,233,218,0.56)', marginTop: 6 }}>{m.s}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 880px) { .imp-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 480px) { .imp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
