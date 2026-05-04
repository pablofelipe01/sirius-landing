'use client';

import { useState } from 'react';

function fmt(n: number, dec: number) {
  return n.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function Slider({ label, value, setValue, min, max, step, unit }: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step: number; unit: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A857F' }}>{label}</span>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 400, color: '#0E1814', letterSpacing: '-0.01em' }}>
          {fmt(value, 0)}<span style={{ fontSize: 13, color: '#7A857F', marginLeft: 6, fontFamily: '"Museo Slab", Georgia, serif' }}>{unit}</span>
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{
          width: '100%', appearance: 'none', height: 4, borderRadius: 2, outline: 'none', cursor: 'pointer',
          background: `linear-gradient(90deg, #1F5538 0%, #1F5538 ${pct}%, rgba(14,24,20,0.10) ${pct}%, rgba(14,24,20,0.10) 100%)`,
        }}
        className="sirius-slider"
      />
      <style>{`
        .sirius-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
          background: #FBF7F1; border: 2px solid #1F5538; cursor: pointer;
          box-shadow: 0 2px 8px rgba(14,24,20,0.18);
        }
        .sirius-slider::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #FBF7F1; border: 2px solid #1F5538; cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function Output({ label, value, unit, accent }: { label: string; value: string; unit: string; accent?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A857F', marginBottom: 10 }}>{label}</div>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300,
        color: accent ? '#1F5538' : '#0E1814', letterSpacing: '-0.02em', lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: '#3A4540', marginTop: 6, letterSpacing: '0.05em' }}>{unit}</div>
    </div>
  );
}

export default function CalculadoraSection() {
  const [hectares, setHectares] = useState(100);
  const [price, setPrice] = useState(120);
  const [years, setYears] = useState(5);

  // Calculations (Puro.earth methodology)
  const biocharKg   = hectares * 10 * years;
  const co2e        = (biocharKg * 2.4) / 1000;
  const revenue     = co2e * price;
  const tradCost    = hectares * 4000 * years;
  const siriusCost  = hectares * 180 * years;
  const savings     = tradCost - siriusCost;

  return (
    <section id="calculadora" style={{ background: '#FBF7F1', padding: '120px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#1F5538', marginBottom: 18,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#1F5538' }} />
            Calculadora
          </div>
          <h2 style={{
            fontFamily: '"Museo Slab", Georgia, serif',
            fontSize: 'clamp(32px, 4.4vw, 60px)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.015em',
            color: '#0E1814', margin: '0 0 16px',
          }}>
            Modela tu impacto y retorno.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#3A4540', maxWidth: 680, margin: 0 }}>
            Ajusta hectáreas y precio del crédito. Estimaciones basadas en Puro.earth y curvas observadas en Barranca de Upía.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)', gap: 0,
          background: '#FFFFFF', border: '1px solid rgba(14,24,20,0.10)', borderRadius: 6, overflow: 'hidden',
        }} className="calc-grid">
          {/* Inputs */}
          <div style={{ padding: 40, borderRight: '1px solid rgba(14,24,20,0.10)' }} className="calc-inputs">
            <Slider label="Hectáreas a regenerar" value={hectares} setValue={setHectares} min={10} max={5000} step={10} unit="ha" />
            <Slider label="Precio crédito carbono" value={price} setValue={setPrice} min={50} max={400} step={5} unit="USD/t" />
            <Slider label="Horizonte (años)" value={years} setValue={setYears} min={1} max={20} step={1} unit="años" />
            <div style={{ marginTop: 28, fontSize: 12, color: '#7A857F', lineHeight: 1.5, paddingTop: 20, borderTop: '1px solid rgba(14,24,20,0.10)' }}>
              Estimaciones para discusión. No constituye oferta de venta de créditos.
            </div>
          </div>

          {/* Outputs */}
          <div style={{ padding: 40, background: '#F3EEE4' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, marginBottom: 32 }}>
              <Output label="CO₂ secuestrado"          value={fmt(co2e, 1)}      unit="tCO₂e"   accent />
              <Output label="Ingresos carbono est."    value={'$' + fmt(revenue, 0)}  unit="USD" />
              <Output label="Ahorro vs. tradicional"   value={'$' + fmt(savings, 0)}  unit="USD" />
              <Output label="Biochar requerido"        value={fmt(biocharKg, 0)}       unit="kg" />
            </div>
            <div style={{ paddingTop: 24, borderTop: '1px solid rgba(14,24,20,0.10)' }}>
              <a href="#contacto" className="btn-primary">Solicitar pitch deck</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .calc-grid { grid-template-columns: 1fr !important; }
          .calc-inputs { border-right: 0 !important; border-bottom: 1px solid rgba(14,24,20,0.10) !important; }
        }
      `}</style>
    </section>
  );
}
