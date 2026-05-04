'use client';

import Image from 'next/image';

const PRODUCTS = [
  {
    tag: 'Producto',
    title: 'Biochar Inoculado',
    desc: '10 kg/ha. Pirólisis controlada + colonización con bacterias nativas. Cada lote es trazable hasta su biofábrica de origen.',
    metric: '10 kg/ha',
    metricLabel: 'dosis efectiva',
    img: '/images/biochar-detail.jpg',
    cta: 'Ficha técnica',
  },
  {
    tag: 'Servicio',
    title: 'Regeneración como Servicio',
    desc: 'RaaS: contrato anual con el agricultor. Diagnóstico, aplicación, monitoreo satelital y reporte de carbono incluido. Sin capex para la finca.',
    metric: 'RaaS',
    metricLabel: 'modelo recurrente',
    img: '/images/regenerative-soil.jpg',
    cta: 'Ver contrato tipo',
  },
  {
    tag: 'Infraestructura',
    title: 'Biofábricas',
    desc: 'Plantas modulares de pirólisis cerca de los cultivos. Cada biofábrica produce, inocula y distribuye localmente. Meta: 10 000 unidades.',
    metric: '10K',
    metricLabel: 'biofábricas a 2050',
    img: '/images/biofactory.jpg',
    cta: 'Mapa de despliegue',
  },
];

function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  return (
    <article style={{
      background: '#FFFFFF',
      border: '1px solid rgba(14,24,20,0.10)',
      borderRadius: 6, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform .3s, box-shadow .3s, border-color .3s',
    }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 50px rgba(14,24,20,0.10)'; el.style.borderColor = 'rgba(14,24,20,0.22)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(14,24,20,0.10)'; }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(14,24,20,0.78)', backdropFilter: 'blur(6px)',
          color: '#F1E9DA', padding: '5px 12px', borderRadius: 999,
          fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          {p.tag}
        </span>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: '"Museo Slab", Georgia, serif',
          fontSize: 22, fontWeight: 500, color: '#0E1814',
          margin: '0 0 10px', letterSpacing: '-0.005em',
        }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#3A4540', margin: '0 0 20px' }}>{p.desc}</p>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8,
          paddingTop: 16, borderTop: '1px solid rgba(14,24,20,0.10)',
          marginTop: 'auto',
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 300, color: '#0E1814', letterSpacing: '-0.02em' }}>
            {p.metric}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A857F' }}>
            {p.metricLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section id="productos" style={{ background: '#FBF7F1', padding: '120px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Portafolio
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#0E1814', margin: '0 0 16px',
          }}>
            Lo que entregamos al campo y al mercado.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#3A4540', maxWidth: 600, margin: 0 }}>
            Tres productos. Una sola lógica regenerativa.
          </p>
        </div>

        {/* Products grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="prod-grid">
          {PRODUCTS.map(p => <ProductCard key={p.title} p={p} />)}
        </div>
      </div>

      <style>{`@media (max-width: 880px) { .prod-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
