'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#tesis',       label: 'Tesis' },
  { href: '#productos',   label: 'Productos' },
  { href: '#impacto',     label: 'Impacto' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#proceso',     label: 'Proceso' },
  { href: '#equipo',      label: 'Equipo' },
];

function SiriusMark({ color = '#0E1814', size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1.4" opacity="0.9" />
      <circle cx="16" cy="6" r="2" fill="#00A3FF" />
      <circle cx="16" cy="26" r="2" fill="#00B602" />
      <circle cx="16" cy="16" r="3" fill={color} />
    </svg>
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      let cur = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 140) cur = id;
      }
      setActiveSection(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    if (id === 'top') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false); return; }
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navBg = scrolled ? 'rgba(251,247,241,0.93)' : 'transparent';
  const borderBottom = scrolled ? '1px solid rgba(14,24,20,0.10)' : '1px solid transparent';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg,
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none' as string,
      borderBottom,
      transition: 'background 0.4s ease, border-color 0.4s ease, padding 0.3s ease',
      padding: scrolled ? '12px 0' : '22px 0',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        {/* Wordmark */}
        <a href="#top" onClick={e => scrollTo(e, '#top')} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#0E1814' }}>
          <SiriusMark color="#0E1814" size={22} />
          <span style={{ fontFamily: '"Museo Slab", Georgia, serif', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em', color: '#0E1814' }}>
            sirius<span style={{ color: '#1F5538' }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }} className="sirius-nav-links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} style={{
              padding: '8px 14px', fontSize: 13, fontWeight: 500,
              letterSpacing: '0.04em', textDecoration: 'none',
              color: activeSection === l.href.slice(1) ? '#1F5538' : '#3A4540',
              borderBottom: activeSection === l.href.slice(1) ? '1px solid #1F5538' : '1px solid transparent',
              transition: 'color .2s, border-color .2s',
              fontFamily: '"Museo Slab", Georgia, serif',
            }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#contacto" onClick={e => scrollTo(e, '#contacto')} className="sirius-nav-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#1F5538', color: '#FFFFFF',
            padding: '11px 22px', borderRadius: 999,
            fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
            boxShadow: '0 6px 22px rgba(31,85,56,0.28)',
            transition: 'transform .2s, box-shadow .2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 10px 28px rgba(31,85,56,0.42)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 6px 22px rgba(31,85,56,0.28)'; }}
          >
            Hablar con inversiones <span style={{ fontSize: 14 }}>→</span>
          </a>

          <button className="sirius-hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Menú" style={{
            display: 'none', appearance: 'none', background: 'transparent', border: 0,
            cursor: 'pointer', padding: 8, color: '#0E1814',
          }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {mobileOpen
                ? <><path d="M6 18L18 6"/><path d="M6 6l12 12"/></>
                : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: 'rgba(251,247,241,0.98)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(14,24,20,0.10)', padding: '16px 32px 24px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)} style={{
              display: 'block', padding: '12px 0',
              fontSize: 16, fontWeight: 500, color: '#0E1814',
              textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
              borderBottom: '1px solid rgba(14,24,20,0.08)',
            }}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" onClick={e => scrollTo(e, '#contacto')} style={{
            display: 'inline-flex', marginTop: 20,
            background: '#1F5538', color: '#fff',
            padding: '13px 28px', borderRadius: 999,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
          }}>
            Hablar con inversiones →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .sirius-nav-links { display: none !important; }
          .sirius-nav-cta   { display: none !important; }
          .sirius-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
