'use client';

import { useEffect, useState } from 'react';
import { ProfileCarousel } from '@/components/ui/profile-card-testimonial-carousel';
import type { TeamMemberCard } from '@/components/ui/profile-card-testimonial-carousel';

// Roles ordenados de mayor a menor jerarquía
const ROLE_PRIORITY: string[] = [
  'ceo', 'chief executive', 'fundador', 'cofundador', 'co-fundador', 'founder', 'co-founder',
  'cto', 'chief technology', 'coo', 'chief operating', 'cfo', 'chief financial',
  'director', 'gerente general', 'president',
  'vp', 'vice president', 'vicepresidente',
  'gerente', 'manager', 'lead', 'lider', 'líder', 'jefe',
  'coordinador', 'coordinator', 'supervisor',
  'senior', 'sr.',
  'ingeniero', 'engineer', 'desarrollador', 'developer',
  'analista', 'analyst',
];

function rolePriority(role: string): number {
  const normalized = role.toLowerCase();
  const idx = ROLE_PRIORITY.findIndex(keyword => normalized.includes(keyword));
  return idx === -1 ? ROLE_PRIORITY.length : idx;
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMemberCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team-members')
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          const filtered = json.data.filter((m: TeamMemberCard) =>
            m.name.toLowerCase().trim() !== 'omaira suarez villamil'
          );
          const sorted = [...filtered].sort((a: TeamMemberCard, b: TeamMemberCard) =>
            rolePriority(a.role) - rolePriority(b.role)
          );
          setMembers(sorted);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="equipo" style={{ background: '#FBF7F1', padding: '120px 0' }}>
      <div className="sirius-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
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
            Equipo pequeño, convicción grande.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#3A4540', maxWidth: 620, margin: 0 }}>
            Un grupo multidisciplinar de agrónomos, biólogos, ingenieros y agricultores.
            No nos llamamos personas. Nos llamamos seres.
          </p>
        </div>

        {/* Carousel */}
        {loading ? (
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <div style={{
              width: 420, height: 480, borderRadius: 24, flexShrink: 0,
              background: 'linear-gradient(90deg, #EDE8E0 25%, #E4DED5 50%, #EDE8E0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
            }} />
            <div style={{ flex: 1, maxWidth: 400 }}>
              <div style={{ height: 12, width: '40%', background: '#EDE8E0', borderRadius: 4, marginBottom: 20 }} />
              <div style={{ height: 32, width: '80%', background: '#E4DED5', borderRadius: 4, marginBottom: 14 }} />
              <div style={{ height: 14, width: '55%', background: '#EDE8E0', borderRadius: 4 }} />
            </div>
          </div>
        ) : (
          <ProfileCarousel members={members} />
        )}
      </div>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}