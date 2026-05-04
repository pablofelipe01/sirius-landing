'use client';

import Image from 'next/image';

const TICKERS = [
  'Puro.earth · validado',
  'SBTi · alineado',
  'ZOMAC · Colombia',
  'Barranca de Upía · Meta',
];

function scrollTo(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}

export default function HeroSection() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '100vh',
      background: '#FBF7F1',
      paddingTop: 110, paddingBottom: 80,
      overflow: 'hidden',
    }}>
      {/* Subtle grain overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }} className="hero-grid">

        {/* LEFT — type */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7A857F', marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1F5538', animation: 'sirius-pulse 2.5s ease-in-out infinite' }} />
            Regeneración como Servicio · Colombia
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(44px, 6.4vw, 92px)',
            fontWeight: 300, lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: '#0E1814',
            margin: '0 0 28px',
          }}>
            Biochar es la{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#1F5538', fontFamily: 'Georgia, "Museo Slab", serif' }}>
              infraestructura
            </em>
            <br />donde vive la vida.
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.55, color: '#3A4540', maxWidth: 560, margin: '0 0 36px' }}>
            Producimos biochar inoculado con bacterias nativas y lo entregamos a agricultores como un servicio.
            Donde la academia recomienda 5 a 20 toneladas por hectárea, Sirius logra el mismo efecto con{' '}
            <strong style={{ fontWeight: 600, color: '#0E1814' }}>10 kilogramos</strong>.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} className="btn-primary">
              Solicitar pitch deck
            </a>
            <a href="#tesis" onClick={e => { e.preventDefault(); scrollTo('#tesis'); }} className="btn-ghost">
              Ver tesis completa
            </a>
          </div>

          {/* Tickers */}
          <div style={{
            marginTop: 56, paddingTop: 24,
            borderTop: '1px solid rgba(14,24,20,0.10)',
            display: 'flex', flexWrap: 'wrap', gap: '12px 28px',
          }}>
            {TICKERS.map(x => (
              <span key={x} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A857F' }}>
                {x}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — hero image */}
        <div style={{ position: 'relative', minHeight: 580 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 4, overflow: 'hidden', boxShadow: '0 30px 80px rgba(14,24,20,0.18)' }}>
            <Image
              src="/images/sunrise-aerial.jpg"
              alt="Vista aérea Barranca de Upía"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 50%, rgba(14,24,20,0.35))' }} />
          </div>

          {/* Floating metric card */}
          <div style={{
            position: 'absolute', left: -32, bottom: -32,
            background: '#FFFFFF',
            border: '1px solid rgba(14,24,20,0.10)',
            padding: '20px 22px', borderRadius: 6,
            boxShadow: '0 18px 48px rgba(14,24,20,0.14)',
            maxWidth: 280, zIndex: 2,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1F5538', marginBottom: 10 }}>
              Métrica clave
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 300, color: '#0E1814', letterSpacing: '-0.03em', lineHeight: 1 }}>10</span>
              <span style={{ fontSize: 18, color: '#3A4540', fontWeight: 500 }}>kg/ha</span>
            </div>
            <div style={{ fontSize: 13, color: '#7A857F', marginTop: 6 }}>vs 5–20 t/ha académico</div>
          </div>

          {/* Place tag */}
          <div style={{
            position: 'absolute', right: 18, top: 18,
            background: 'rgba(14,24,20,0.62)',
            backdropFilter: 'blur(8px)',
            color: '#F1E9DA',
            padding: '8px 14px', borderRadius: 999,
            fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 2,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C77A2C' }} />
            Barranca de Upía · 04:42
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 32, color: '#7A857F',
        fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        Continúa
        <span style={{ display: 'inline-block', width: 1, height: 28, background: 'rgba(14,24,20,0.22)', animation: 'scrollHint 2.4s ease-in-out infinite' }} />
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { min-height: 360px !important; }
        }
        @media (max-width: 980px) {
          .hero-grid > div:last-child { position: relative !important; }
        }
      `}</style>
    </section>
  );
}
