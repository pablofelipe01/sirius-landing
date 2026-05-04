'use client';

import { useState, FormEvent } from 'react';

const INTERESTS = [
  { value: '', label: 'Seleccionar interés…' },
  { value: 'inversion',     label: 'Inversión' },
  { value: 'carbono',       label: 'Compra de créditos de carbono' },
  { value: 'raas',          label: 'Servicio RaaS (Regeneración como Servicio)' },
  { value: 'alianza',       label: 'Alianza institucional' },
  { value: 'prensa',        label: 'Prensa' },
];

export default function ContactoSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState({ nombre: '', email: '', organizacion: '', interes: '', mensaje: '' });

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'ok' : 'err');
    } catch {
      setStatus('err');
    }
  };

  const field: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontSize: 15,
    background: 'rgba(241,233,218,0.06)', border: '1px solid rgba(241,233,218,0.14)',
    borderRadius: 4, color: '#F1E9DA', outline: 'none',
    fontFamily: '"Museo Slab", Georgia, serif', letterSpacing: '0.01em',
    boxSizing: 'border-box',
    transition: 'border-color .2s',
  };

  return (
    <section id="contacto" style={{
      background: 'radial-gradient(ellipse 120% 80% at 60% 40%, #143329 0%, #0B1F17 60%, #061410 100%)',
      padding: '120px 0',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="ct-grid">

          {/* Left: copy */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#7DD3C0', marginBottom: 20,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: '#7DD3C0' }} />
              Hablemos
            </div>

            <h2 style={{
              fontFamily: '"Museo Slab", Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 54px)',
              fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.015em',
              color: '#F1E9DA', margin: '0 0 32px',
            }}>
              Inversión, carbono o regeneración. El campo espera.
            </h2>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(241,233,218,0.70)', marginBottom: 52 }}>
              Si eres inversionista, comprador de créditos, agricultor o periodista,
              cuéntanos. Respondemos en menos de 48 horas.
            </p>

            {/* Info cards */}
            {[
              { lbl: 'Ubicación',       val: 'Barranca de Upía, Meta · Colombia' },
              { lbl: 'Correo',          val: 'hola@siriusregeneration.com' },
              { lbl: 'Tiempo respuesta',val: '< 48 horas hábiles' },
            ].map(c => (
              <div key={c.lbl} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '20px 0', borderBottom: '1px solid rgba(241,233,218,0.08)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(241,233,218,0.42)', width: 130, flexShrink: 0, paddingTop: 2 }}>{c.lbl}</div>
                <div style={{ fontSize: 15, color: 'rgba(241,233,218,0.80)', lineHeight: 1.5 }}>{c.val}</div>
              </div>
            ))}
          </div>

          {/* Right: glass form */}
          <div style={{
            background: 'rgba(241,233,218,0.04)',
            border: '1px solid rgba(241,233,218,0.10)',
            borderRadius: 8,
            padding: 40,
            backdropFilter: 'blur(24px)',
          }}>
            {status === 'ok' ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
                <p style={{ fontFamily: '"Museo Slab", Georgia, serif', fontSize: 22, color: '#F1E9DA', fontWeight: 300 }}>
                  Recibido. Te contactamos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <input required style={field} placeholder="Nombre *"
                  value={form.nombre} onChange={e => set('nombre', e.target.value)} />
                <input required type="email" style={field} placeholder="Correo electrónico *"
                  value={form.email} onChange={e => set('email', e.target.value)} />
                <input style={field} placeholder="Organización"
                  value={form.organizacion} onChange={e => set('organizacion', e.target.value)} />
                <select required style={{ ...field, appearance: 'none' }}
                  value={form.interes} onChange={e => set('interes', e.target.value)}>
                  {INTERESTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <textarea required rows={5} style={{ ...field, resize: 'vertical' }}
                  placeholder="Mensaje *"
                  value={form.mensaje} onChange={e => set('mensaje', e.target.value)} />
                <button type="submit" disabled={status === 'sending'} style={{
                  padding: '16px 28px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: '#7DD3C0', color: '#0B1F17', fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'opacity .2s',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje →'}
                </button>
                {status === 'err' && (
                  <p style={{ fontSize: 13, color: '#f87171', textAlign: 'center' }}>
                    Error al enviar. Intenta de nuevo.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .ct-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        #contacto input::placeholder, #contacto textarea::placeholder { color: rgba(241,233,218,0.35); }
        #contacto select option { background: #0B1F17; color: #F1E9DA; }
      `}</style>
    </section>
  );
}
