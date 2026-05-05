'use client';

import { useEffect, useRef, useState } from 'react';
import Globe from '@/components/ui/globe';

// ─── PALETA COSMIC ──────────────────────────────────────────
const C = {
  bg:         '#050510',
  ink:        '#e8d5b7',
  inkSoft:    'rgba(232,213,183,0.72)',
  inkDim:     'rgba(232,213,183,0.42)',
  accent:     '#4ecdc4',
  rule:       'rgba(232,213,183,0.12)',
  ruleStrong: 'rgba(232,213,183,0.28)',
};

const METRICS = [
  { n: '10',    u: 'kg/ha',  l: 'DOSIS SIRIUS' },
  { n: '300',   u: '+',      l: 'AGRICULTORES ACTIVOS' },
  { n: '1 200', u: 'tCO₂e', l: 'SECUESTRADO · PIPELINE' },
  { n: '1 000', u: 'años',   l: 'PERMANENCIA CARBONO' },
];

// ─── STARFIELD ──────────────────────────────────────────────
function Starfield({ count = 220 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars = Array.from({ length: count }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     0.2 + Math.random() * 1.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
    }));

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const t0 = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = (Math.sin(elapsed * s.speed + s.phase) * 0.35 + 0.65) * 0.8;
        ctx.globalAlpha = a;
        ctx.fillStyle = '#e8d5b7';
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas ref={ref} aria-hidden style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
    }} />
  );
}

// ─── WATER-RIPPLE CURSOR ─────────────────────────────────────
// Ported from Animations.jsx del reference pack — teal (#4ecdc4)
function WaterCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const SCALE = 4;
    let raf = 0, W = 0, H = 0, gw = 0, gh = 0;
    let prev: Float32Array = new Float32Array(0);
    let curr: Float32Array = new Float32Array(0);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const d = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width  = Math.floor(W * d);
      canvas.height = Math.floor(H * d);
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(d, 0, 0, d, 0, 0);
      gw = Math.ceil(W / SCALE);
      gh = Math.ceil(H / SCALE);
      prev = new Float32Array(gw * gh);
      curr = new Float32Array(gw * gh);
    };
    resize();

    let lastX = -1, lastY = -1, lastDrop = 0;

    const dropAt = (clientX: number, clientY: number) => {
      const x = Math.floor(clientX / SCALE);
      const y = Math.floor(clientY / SCALE);
      if (x < 1 || y < 1 || x >= gw - 1 || y >= gh - 1) return;
      const now = performance.now();
      if (now - lastDrop < 14) return;
      lastDrop = now;
      const dx  = lastX < 0 ? 0 : x - lastX;
      const dy  = lastY < 0 ? 0 : y - lastY;
      const v   = Math.min(28, Math.sqrt(dx * dx + dy * dy));
      const amp = 180 + v * 22;
      for (let oy = -1; oy <= 1; oy++)
        for (let ox = -1; ox <= 1; ox++)
          curr[(y + oy) * gw + (x + ox)] -= amp * ((ox === 0 && oy === 0) ? 1 : 0.55);
      lastX = x; lastY = y;
    };

    const onMove = (e: MouseEvent) => dropAt(e.clientX, e.clientY);

    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        dropAt(t.clientX, t.clientY);
      }
    };

    const burstAt = (clientX: number, clientY: number) => {
      const x = Math.floor(clientX / SCALE);
      const y = Math.floor(clientY / SCALE);
      if (x < 2 || y < 2 || x >= gw - 2 || y >= gh - 2) return;
      for (let oy = -2; oy <= 2; oy++)
        for (let ox = -2; ox <= 2; ox++) {
          const d = Math.sqrt(ox * ox + oy * oy);
          if (d > 2.2) continue;
          curr[(y + oy) * gw + (x + ox)] -= 600 * (1 - d / 2.4);
        }
    };

    const onClick  = (e: MouseEvent)  => burstAt(e.clientX, e.clientY);
    const onTap    = (e: TouchEvent)  => { if (e.touches.length === 1) burstAt(e.touches[0].clientX, e.touches[0].clientY); };

    // teal: r=78 g=205 b=196
    const [aR, aG, aB] = [78, 205, 196];

    const tick = () => {
      const next = prev;
      for (let y = 1; y < gh - 1; y++) {
        let i = y * gw + 1;
        for (let x = 1; x < gw - 1; x++, i++) {
          const v = (curr[i-1] + curr[i+1] + curr[i-gw] + curr[i+gw]) * 0.5 - prev[i];
          next[i] = v * 0.972;
        }
      }
      prev = curr; curr = next;

      const fullImg = ctx.createImageData(gw, gh);
      const data = fullImg.data;
      for (let i = 0, p = 0; i < curr.length; i++, p += 4) {
        const hv = curr[i];
        const a  = Math.min(255, Math.abs(hv) * 0.9);
        if (a < 3) { data[p + 3] = 0; continue; }
        const t2 = Math.max(-1, Math.min(1, hv / 200));
        data[p]     = Math.min(255, aR +  60 * t2);
        data[p + 1] = Math.min(255, aG + 110 * (0.4 + 0.6 * Math.abs(t2)));
        data[p + 2] = Math.min(255, aB + 140 * (0.6 + 0.4 * Math.abs(t2)));
        data[p + 3] = a;
      }

      ctx.clearRect(0, 0, W, H);
      const tmp = document.createElement('canvas');
      tmp.width = gw; tmp.height = gh;
      tmp.getContext('2d')!.putImageData(fullImg, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(tmp, 0, 0, gw, gh, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('touchmove',  onTouch, { passive: true });
    window.addEventListener('touchstart', onTap,   { passive: true });
    window.addEventListener('click',      onClick);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('touchmove',  onTouch);
      window.removeEventListener('touchstart', onTap);
      window.removeEventListener('click',      onClick);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden style={{
      position: 'fixed', inset: 0, pointerEvents: 'none',
      zIndex: 9998, mixBlendMode: 'screen', opacity: 0.85,
    }} />
  );
}

// ─── HERO ────────────────────────────────────────────────────
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <WaterCursor />

      <section id="top" style={{
        position: 'relative',
        minHeight: '100vh',
        background: C.bg,
        color: C.ink,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Starfield count={280} />

        {/* Anillos decorativos */}
        <div aria-hidden className="hero-rings" style={{
          position: 'absolute', right: '-6vw', top: '50%',
          transform: 'translateY(-50%)',
          width: '56vw', maxWidth: 820, aspectRatio: '1/1',
          borderRadius: '50%',
          border: `1px solid ${C.accent}1a`,
          pointerEvents: 'none', zIndex: 1,
        }} />
        <div aria-hidden className="hero-rings" style={{
          position: 'absolute', right: '2vw', top: '50%',
          transform: 'translateY(-50%)',
          width: '40vw', maxWidth: 580, aspectRatio: '1/1',
          borderRadius: '50%',
          border: `1px solid ${C.accent}12`,
          pointerEvents: 'none', zIndex: 1,
        }} />
        <div aria-hidden className="hero-rings" style={{
          position: 'absolute', right: '10vw', top: '50%',
          transform: 'translateY(-50%)',
          width: '36vw', maxWidth: 500, aspectRatio: '1/1',
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${C.accent}10, transparent)`,
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Globe centrado en los anillos decorativos */}
        <div className="hero-globe" style={{
          position: 'absolute', right: 'calc(22vw - 170px)', top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2, pointerEvents: 'none',
        }}>
          <Globe size={320} />
        </div>

        {/* Contenido */}
        <div className="hero-content sirius-container" style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1320, margin: '0 auto',
          padding: '130px 48px 60px',
          width: '100%',
          boxSizing: 'border-box',
          opacity:   loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>



          {/* H1 */}
          <h1 className="hero-h1" style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(36px, 6.8vw, 102px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: C.ink,
            margin: '0 0 28px',
            maxWidth: 860,
          }}>
            Devolverle vida a la tierra es{' '}
            <em style={{
              fontStyle: 'italic', fontWeight: 300,
              color: C.accent,
              fontFamily: 'Georgia, serif',
            }}>
              devolverle futuro
            </em>
            <br />
            al planeta.
          </h1>

          {/* Lede */}
          <p className="hero-lede" style={{
            fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: 1.65,
            color: C.inkSoft,
            maxWidth: 560, margin: '0 0 44px',
            fontFamily: '"Museo Slab", Georgia, serif',
            fontWeight: 300,
          }}>
            Producimos biochar inoculado con bacterias nativas y lo entregamos a
            agricultores como un servicio. Donde la academia recomienda 5 a 20
            toneladas por hectárea, Sirius logra el mismo efecto con 10 kilogramos.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 72 }}>
            <a href="#contacto" onClick={e => {
              e.preventDefault();
              const el = document.getElementById('contacto');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.accent, color: '#050510',
              padding: '14px 28px', borderRadius: 999,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
              boxShadow: `0 8px 28px ${C.accent}44`,
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 14px 36px ${C.accent}66`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = `0 8px 28px ${C.accent}44`; }}
            >
              Solicitar pitch deck <span style={{ fontSize: 14 }}>→</span>
            </a>

            <a href="#tesis" onClick={e => {
              e.preventDefault();
              const el = document.getElementById('tesis');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent',
              border: `1px solid ${C.ruleStrong}`,
              color: C.ink,
              padding: '13px 26px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
              transition: 'border-color .2s, color .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.accent; el.style.color = C.accent; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.ruleStrong; el.style.color = C.ink; }}
            >
              Ver tesis completa
            </a>
          </div>

          {/* Tira de métricas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${C.rule}`,
          }} className="hero-metrics">
            {METRICS.map((m, i) => (
              <div key={m.l} className="hero-metric-cell" style={{
                padding: '28px 0 8px',
                borderRight: i < METRICS.length - 1 ? `1px solid ${C.rule}` : 'none',
                paddingRight: i < METRICS.length - 1 ? 24 : 0,
                paddingLeft:  i > 0 ? 24 : 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(36px, 4.5vw, 60px)',
                    fontWeight: 300, color: C.ink,
                    letterSpacing: '-0.03em', lineHeight: 1,
                  }}>
                    {m.n}
                  </span>
                  <span style={{ fontSize: 16, color: C.inkSoft, fontWeight: 500 }}>{m.u}</span>
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: C.inkDim, fontFamily: '"Museo Slab", Georgia, serif',
                }}>
                  {m.l}
                </div>
              </div>
            ))}
          </div>

          {/* Globe mobile — solo visible en ≤768px */}
          <div className="hero-globe-mobile" style={{
            display: 'none',
            justifyContent: 'center',
            marginTop: 40,
            paddingBottom: 16,
          }}>
            <Globe size={220} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          bottom: 28, display: 'flex', alignItems: 'center', gap: 10,
          color: C.inkDim, fontSize: 9, fontWeight: 600,
          letterSpacing: '0.32em', textTransform: 'uppercase',
          fontFamily: '"Museo Slab", Georgia, serif', zIndex: 2,
        }}>
          Continúa
          <span style={{
            display: 'inline-block', width: 1, height: 26,
            background: C.inkDim,
            animation: 'scrollHint 2.4s ease-in-out infinite',
          }} />
        </div>

        <style>{`
          @keyframes siriusPulse {
            0%,100% { opacity:0.55; transform:scale(1);    }
            50%     { opacity:1;    transform:scale(1.2);  }
          }
          @keyframes heroFadeUp {
            from { opacity:0; transform:translateY(24px); }
            to   { opacity:1; transform:translateY(0);    }
          }
          @keyframes scrollHint {
            0%,100% { opacity:0.3; transform:scaleY(0.6); }
            50%     { opacity:1;   transform:scaleY(1);   }
          }

          /* ── Tablet (≤880px) ── */
          @media (max-width: 880px) {
            .hero-metrics { grid-template-columns: repeat(2,1fr) !important; }
            .hero-metric-cell { padding-left: 16px !important; padding-right: 16px !important; }
            .hero-metric-cell:nth-child(2n) { border-right: none !important; }
            .hero-metric-cell:nth-child(odd) { padding-left: 0 !important; }
          }

          /* ── Mobile (≤768px) ── */
          @media (max-width: 768px) {
            .hero-content  { padding: 96px 28px 48px !important; }
            .hero-rings    { display: none !important; }
            .hero-globe    { display: none !important; }
            .hero-globe-mobile { display: flex !important; }
            .hero-h1       { max-width: 100% !important; }
            .hero-lede     { max-width: 100% !important; }
            .hero-ctas     { margin-bottom: 48px !important; }
          }

          /* ── Small mobile (≤480px) ── */
          @media (max-width: 480px) {
            .hero-content  { padding: 88px 20px 40px !important; }
            .hero-h1       { font-size: clamp(30px, 9vw, 52px) !important; margin-bottom: 18px !important; }
            .hero-lede     { margin-bottom: 28px !important; }
            .hero-ctas     { flex-direction: column; align-items: stretch; margin-bottom: 36px !important; }
            .hero-ctas a   { text-align: center; justify-content: center; }
            .hero-metrics  { grid-template-columns: repeat(2,1fr) !important; }
            .hero-metric-cell { padding: 20px 8px 6px !important; }
            .hero-metric-cell:nth-child(odd)  { padding-left: 0 !important; border-right: 1px solid rgba(232,213,183,0.12) !important; }
            .hero-metric-cell:nth-child(even) { border-right: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}


