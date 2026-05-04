'use client';

import Image from 'next/image';

const RESOURCES = [
  {
    img: '/images/regenerative-soil.jpg',
    tag: 'Whitepaper',
    title: 'Biochar como infraestructura regenerativa: fundamentos y aplicación tropical',
    desc: 'Metodología Puro.earth, curvas de carbono y protocolos de inoculación desarrollados en Meta, Colombia.',
    href: '#',
  },
  {
    img: '/images/bird-on-roots.jpg',
    tag: 'Case study',
    title: 'Resultados de 3 temporadas en Barranca de Upía: suelo, biodiversidad y rentabilidad',
    desc: 'Datos observados en campo: retención hídrica, micobiota y comparación de costos vs. agroquímicos.',
    href: '#',
  },
  {
    img: '/images/aerial-fields.jpg',
    tag: 'Memo',
    title: 'Tesis de inversión Sirius 2026: Regeneración como Servicio',
    desc: 'Modelo financiero, pipeline de créditos de carbono, hoja de ruta de biofábricas y estrategia de escala.',
    href: '#',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" style={{ background: '#FBF7F1', padding: '96px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#1F5538', marginBottom: 16,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
              Recursos
            </div>
            <h2 style={{
              fontFamily: '"Museo Slab", Georgia, serif',
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.015em',
              color: '#0E1814', margin: 0,
            }}>
              Investigación y evidencia.
            </h2>
          </div>
          <a href="#contacto" style={{
            fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1F5538', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Ver todos los recursos <span>→</span>
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="blog-grid">
          {RESOURCES.map(r => (
            <a key={r.title} href={r.href} style={{ textDecoration: 'none', display: 'block', borderRadius: 6, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(14,24,20,0.08)', transition: 'transform .25s, box-shadow .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(14,24,20,0.10)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <Image src={r.img} alt={r.title} fill style={{ objectFit: 'cover', transition: 'transform .6s' }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: '#1F5538', color: '#FBF7F1',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 3,
                }}>
                  {r.tag}
                </div>
              </div>
              <div style={{ padding: '24px 24px 28px' }}>
                <h3 style={{
                  fontFamily: '"Museo Slab", Georgia, serif',
                  fontSize: 17, fontWeight: 500, lineHeight: 1.4,
                  color: '#0E1814', margin: '0 0 12px',
                }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A4540', margin: 0 }}>{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .blog-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
