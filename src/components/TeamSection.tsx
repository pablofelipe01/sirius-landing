'use client';

import Image from 'next/image';

const TEAM = [
  { img: '/images/portrait-warm.jpg', role: 'Equipo fundador', area: 'Estrategia · Producto' },
  { img: '/images/farmer.jpg',        role: 'Operacion de campo', area: 'Aplicacion · Monitoreo' },
  { img: '/images/community.jpg',     role: 'Laboratorio', area: 'Cepas · Calidad' },
  { img: '/images/bird-on-roots.jpg', role: 'Comunidad', area: 'Aliados · Agricultores' },
];

export default function TeamSection() {
  return (
    <section id="equipo" style={{ background: '#FBF7F1', padding: '120px 0' }}>
      <div className="sirius-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Los seres
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#0E1814', margin: '0 0 20px',
          }}>
            Equipo pequeno. Conviccion grande.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#3A4540', maxWidth: 620, margin: 0 }}>
            Un grupo multidisciplinar de agronomos, biologos, ingenieros y agricultores.
            No nos llamamos personas. Nos llamamos seres.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="team-grid">
          {TEAM.map((m) => (
            <div key={m.role}>
              <div style={{
                position: 'relative', overflow: 'hidden', borderRadius: 4, aspectRatio: '3/4', marginBottom: 20,
              }}>
                <Image
                  src={m.img} alt={m.role} fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A857F', marginBottom: 6 }}>
                {m.role}
              </div>
              <div style={{ fontSize: 15, color: '#3A4540', lineHeight: 1.4 }}>{m.area}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 400px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}