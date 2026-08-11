'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS TYPESCRIPT
// ═══════════════════════════════════════════════════════════════════════════════
interface MicroorganismoDetalle {
  nombre: string;
  categoria: string;
  presupuestado: number;
  entregado: number;
  diferencia: number;
  porcentajeAvance: number;
}

interface CategoriaResumen {
  nombre: string;
  presupuestado: number;
  entregado: number;
  porcentajeAvance: number;
}

interface ProductoNoPresupuestado {
  idProducto: string;
  entregado: number;
}

interface DashboardData {
  metadata: {
    generadoEl: string;
    numeroRemisiones: number;
    cliente: string;
    periodo: string;
  };
  microorganismos: MicroorganismoDetalle[];
  totales: {
    presupuestado: number;
    entregado: number;
    diferencia: number;
    porcentajeAvance: number;
  };
  categorias: CategoriaResumen[];
  noPresupuestados: ProductoNoPresupuestado[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// PALETA DE COLORES
// ═══════════════════════════════════════════════════════════════════════════════
const COLORS = {
  entregado: '#00B602',
  presupuestado: '#0154AC',
  alerta: '#F59E0B',
  negativo: '#EF4444',
  neutro: '#6B7280',
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDADES DE FORMATO
// ═══════════════════════════════════════════════════════════════════════════════
const formatNumber = (num: number): string => {
  return num.toLocaleString('es-ES');
};

const formatPercentage = (num: number): string => {
  return num.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
const BioinsumosDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/dashboard-bioinsumos');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar los datos');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Estado de cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Cargando datos en vivo...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error al cargar datos</h2>
          <p className="text-gray-600 text-center">{error || 'No se pudieron cargar los datos'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Preparar datos para gráficos
  const chartDataBarras = data.microorganismos.map((m) => ({
    nombre: m.nombre.split(' ')[0], // Solo primera palabra para el eje X
    Presupuestado: m.presupuestado,
    Entregado: m.entregado,
  }));

  const chartDataAvance = data.microorganismos.map((m) => ({
    nombre: m.nombre.split(' ')[0],
    porcentaje: m.porcentajeAvance,
    superaCien: m.porcentajeAvance > 100,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* ENCABEZADO */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard de Aplicaciones de Bioinsumos 2026 — Presupuestado vs. Entregado
          </h1>
          <p className="text-gray-600">
            Cliente {data.metadata.cliente} · Datos en vivo · {data.metadata.numeroRemisiones}{' '}
            remisiones entregadas
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TARJETAS KPI */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Presupuesto Total */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Presupuesto Total</h3>
            <p className="text-3xl font-bold text-blue-700">
              {formatNumber(data.totales.presupuestado)} L
            </p>
          </div>

          {/* Total Entregado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Total Entregado</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatNumber(data.totales.entregado)} L
            </p>
          </div>

          {/* Diferencia */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Diferencia</h3>
            <p
              className={`text-3xl font-bold ${
                data.totales.diferencia < 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {data.totales.diferencia < 0 ? '' : '+'}
              {formatNumber(data.totales.diferencia)} L
            </p>
          </div>

          {/* Avance Global */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Avance Global</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {formatPercentage(data.totales.porcentajeAvance)}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(data.totales.porcentajeAvance, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* GRÁFICO DE BARRAS AGRUPADAS */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Comparativo: Presupuestado vs. Entregado
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartDataBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis label={{ value: 'Litros (L)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value: number) => formatNumber(value) + ' L'}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
              />
              <Legend />
              <Bar dataKey="Presupuestado" fill={COLORS.presupuestado} />
              <Bar dataKey="Entregado" fill={COLORS.entregado} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* GRÁFICO DE % DE AVANCE */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Porcentaje de Avance por Microorganismo</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartDataAvance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis label={{ value: '% Avance', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value: number) => formatPercentage(value) + '%'}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
              />
              <Bar dataKey="porcentaje">
                {chartDataAvance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.superaCien ? COLORS.alerta : COLORS.entregado} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: COLORS.alerta }}></span>{' '}
            = Supera el 100% del presupuesto
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* COMPARATIVO POR CATEGORÍA */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {data.categorias.map((cat) => (
            <div key={cat.nombre} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{cat.nombre}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Presupuestado:</span>
                  <span className="font-semibold text-blue-700">{formatNumber(cat.presupuestado)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entregado:</span>
                  <span className="font-semibold text-green-600">{formatNumber(cat.entregado)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">% Avance:</span>
                  <span className="font-semibold text-gray-800">
                    {formatPercentage(cat.porcentajeAvance)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.min(cat.porcentajeAvance, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TABLA DE DETALLE */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detalle por Microorganismo</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="py-3 px-4 font-semibold text-gray-700">Microorganismo</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Categoría</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">Presupuestado (L)</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">Entregado (L)</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">Diferencia (L)</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">% Avance</th>
              </tr>
            </thead>
            <tbody>
              {data.microorganismos.map((m, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{m.nombre}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{m.categoria}</td>
                  <td className="py-3 px-4 text-right text-blue-700 font-semibold">
                    {formatNumber(m.presupuestado)}
                  </td>
                  <td className="py-3 px-4 text-right text-green-600 font-semibold">
                    {formatNumber(m.entregado)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-semibold ${
                      m.diferencia < 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {m.diferencia < 0 ? '' : '+'}
                    {formatNumber(m.diferencia)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-800 font-semibold">
                    {formatPercentage(m.porcentajeAvance)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PRODUCTOS NO PRESUPUESTADOS (si existen) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {data.noPresupuestados.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">
              ⚠️ Productos No Presupuestados
            </h2>
            <p className="text-yellow-700 mb-3">
              Los siguientes productos fueron entregados pero no están en el presupuesto anual:
            </p>
            <ul className="space-y-2">
              {data.noPresupuestados.map((p, idx) => (
                <li key={idx} className="flex justify-between bg-white p-3 rounded border border-yellow-200">
                  <span className="font-semibold text-gray-800">{p.idProducto}</span>
                  <span className="text-gray-600">{formatNumber(p.entregado)} L</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* PIE DE PÁGINA */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Nota:</strong> Datos en vivo de remisiones en estado "Entregada" del cliente{' '}
            {data.metadata.cliente} durante {data.metadata.periodo}. El presupuesto proviene del
            cronograma anual de aplicaciones. Trichoderma es de aplicación preventiva concentrada en
            el segundo semestre. Reporte generado el {formatDate(data.metadata.generadoEl)}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioinsumosDashboard;
