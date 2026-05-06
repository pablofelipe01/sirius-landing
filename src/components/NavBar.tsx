'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SlideNav } from '@/components/ui/nav-header';

const NAV_LINKS = [
  { href: '#tesis',       label: 'Tesis' },
  { href: '#productos',   label: 'Productos' },
  { href: '#impacto',     label: 'Impacto' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#proceso',     label: 'Proceso' },
  { href: '#equipo',      label: 'Equipo' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const ink = '#F1E9DA';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'transparent',
      transition: 'padding 0.3s ease',
      padding: '20px 0',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        {/* Wordmark */}
        <a href="#top" onClick={e => { e.preventDefault(); scrollTo('#top'); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/logo-sirius.png"
            alt="Sirius"
            width={160}
            height={64}
            className="sirius-logo"
            style={{ objectFit: 'contain' }}
            priority
          />
        </a>

        {/* Desktop slide-cursor nav */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }} className="sirius-nav-links">
          <SlideNav links={NAV_LINKS} scrolled={false} onNavClick={scrollTo} />
        </div>

        {/* Hamburger (mobile only) */}
        <button className="sirius-hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Menú" style={{
          display: 'none', appearance: 'none', background: 'transparent', border: 0,
          cursor: 'pointer', padding: 8, color: ink,
        }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {mobileOpen
              ? <><path d="M6 18L18 6"/><path d="M6 6l12 12"/></>
              : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: 'rgba(5,5,16,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(241,233,218,0.08)', padding: '16px 32px 28px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }} style={{
              display: 'block', padding: '13px 0',
              fontSize: 16, fontWeight: 600, color: ink,
              textDecoration: 'none', fontFamily: '"Museo Slab", Georgia, serif',
              borderBottom: '1px solid rgba(241,233,218,0.08)',
            }}>
              {l.label}
            </a>
          ))}

        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .sirius-nav-links { display: none !important; }
          .sirius-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .sirius-logo { width: 120px !important; height: auto !important; }
        }
      `}</style>
    </nav>
  );
}
