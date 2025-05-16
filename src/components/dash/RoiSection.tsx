'use client';
import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { formatCurrency, formatPercentage } from './utils';
import { 
  TrendingUp, DollarSign, Clock, CheckCircle, Award
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface RoiSectionProps {
  results: SimulationResults;
  formData: SimulationFormData;
}

/**
 * Componente para mostrar el análisis detallado de ROI
 */
const RoiSection: React.FC<RoiSectionProps> = ({ results, formData }) => {
  // Colores para gráficos
  const COLORS = ['#16a34a', '#4ade80', '#86efac', '#bbf7d0', '#34d399', '#a3e635'];
  
  // Datos para el cálculo de ROI
  const initialInvestment = results.totalCost;
  const annualBenefit = initialInvestment * ((results.cropYieldIncrease || 10) / 100);
  const paybackPeriod = results.estimatedPayback || 0;
  const fiveYearROI = ((annualBenefit * 5) / initialInvestment) - 1;
  
  // Datos para gráfica de flujo de caja acumulado
  const cashFlowData = [];
  let accumulatedCashFlow = -initialInvestment;
  
  for (let year = 0; year <= 5; year++) {
    if (year === 0) {
      cashFlowData.push({
        year: `Año ${year}`,
        cashFlow: accumulatedCashFlow,
        tooltip: 'Inversión inicial'
      });
    } else {
      accumulatedCashFlow += annualBenefit;
      cashFlowData.push({
        year: `Año ${year}`,
        cashFlow: accumulatedCashFlow,
        tooltip: `Beneficio acumulado: ${formatCurrency(accumulatedCashFlow + initialInvestment)}`
      });
    }
  }
  
  // Datos para gráfica de desglose de beneficios
  const benefitsData = [
    { name: 'Aumento de producción', value: annualBenefit * 0.65 },
    { name: 'Ahorro en fertilizantes', value: annualBenefit * 0.2 },
    { name: 'Ahorro en agua', value: annualBenefit * 0.1 },
    { name: 'Otros beneficios', value: annualBenefit * 0.05 }
  ];
  
  // Datos para análisis comparativo de ROI
  const comparativeRoiData = [
    { name: 'Biochar Blend', roi: results.roi || 15 },
    { name: 'Fertil. Químico', roi: 8 },
    { name: 'Compost', roi: 12 },
    { name: 'Sin tratamiento', roi: 0 }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <SectionHeader
          title="Análisis de ROI (Retorno de Inversión)"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
        
        {/* KPIs (Indicadores clave) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 p-5 rounded-lg border border-green-100 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ROI Anual</p>
              <p className="text-2xl font-bold text-green-700">{results.roi}%</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tiempo de Recuperación</p>
              <p className="text-2xl font-bold text-blue-700">{paybackPeriod.toFixed(1)} años</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <Award className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ROI a 5 años</p>
              <p className="text-2xl font-bold text-amber-700">{(fiveYearROI * 100).toFixed(0)}%</p>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100 flex items-center">
            <div className="rounded-full bg-emerald-100 p-3 mr-4">
              <CheckCircle className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Beneficio a 5 años</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(results.fiveYearProfit || 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de flujo de caja acumulado */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-4 text-gray-700">Flujo de Caja Acumulado</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cashFlowData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cashFlow" 
                    name="Flujo de Caja" 
                    stroke="#16a34a" 
                    activeDot={{ r: 8 }} 
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-500 text-center">
              <p>Punto de equilibrio: {paybackPeriod.toFixed(1)} años</p>
            </div>
          </div>
          
          {/* Gráfico de desglose de beneficios */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-4 text-gray-700">Desglose de Beneficios Anuales</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={benefitsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {benefitsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Gráfico comparativo de ROI */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-4 text-gray-700">ROI Comparativo con Alternativas</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparativeRoiData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="roi" name="ROI Anual %" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
          <h4 className="font-medium text-lg text-green-800 mb-2">Interpretación del Análisis</h4>
          <div className="space-y-3 text-gray-700">
            <p>
              La inversión en Biochar Blend muestra un ROI anual estimado de <span className="font-medium text-green-700">{results.roi}%</span>, 
              significativamente superior al de alternativas convencionales. Con un periodo de recuperación de 
              <span className="font-medium text-green-700"> {paybackPeriod.toFixed(1)} años</span>, 
              esta inversión ofrece beneficios financieros a mediano plazo.
            </p>
            <p>
              Los principales beneficios económicos provienen del aumento en la productividad del cultivo y la 
              reducción en costos de fertilizantes y riego. A lo largo de 5 años, el beneficio acumulado estimado 
              es de <span className="font-medium text-green-700">{formatCurrency(results.fiveYearProfit || 0)}</span>.
            </p>
            <p className="text-sm text-gray-500 italic">
              * Las proyecciones están basadas en datos históricos del rendimiento del Biochar en condiciones similares.
              Los resultados reales pueden variar según las condiciones específicas del cultivo y su manejo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoiSection;