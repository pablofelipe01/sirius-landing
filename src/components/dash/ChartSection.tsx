'use client';
import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { formatCurrency } from './utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { BarChart2, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface ChartSectionProps {
  results: SimulationResults;
  formData: SimulationFormData;
}

/**
 * Componente para mostrar gráficos de análisis
 */
const ChartSection: React.FC<ChartSectionProps> = ({
  results,
  formData
}) => {
  // Colores para gráficos
  const COLORS = ['#16a34a', '#4ade80', '#86efac', '#bbf7d0', '#34d399', '#a3e635'];
  
  // Datos para gráfico de barras de costos
  const barData = [
    {
      name: 'Costos Biochar',
      total: results.totalCost - (results.transportCost || 0) - (results.applicationCost || 0),
      porUnidad: results.costPerPalm * 0.85,
      porHectarea: formData.applicationType !== 'vivero' ? results.costPerHectare * 0.85 : 0
    }
  ];
  
  if (results.transportCost) {
    barData.push({
      name: 'Costos Transporte',
      total: results.transportCost,
      porUnidad: results.costPerPalm * 0.08,
      porHectarea: formData.applicationType !== 'vivero' ? results.costPerHectare * 0.08 : 0
    });
  }
  
  if (results.applicationCost) {
    barData.push({
      name: 'Costos Aplicación',
      total: results.applicationCost,
      porUnidad: results.costPerPalm * 0.07,
      porHectarea: formData.applicationType !== 'vivero' ? results.costPerHectare * 0.07 : 0
    });
  }
  
  // Datos para gráfico de torta (distribución de costos)
  const pieData = [
    { 
      name: 'Costo Biochar', 
      value: results.totalCost - (results.transportCost || 0) - (results.applicationCost || 0) 
    }
  ];
  
  if (results.transportCost) {
    pieData.push({ name: 'Costo Transporte', value: results.transportCost });
  }
  
  if (results.applicationCost) {
    pieData.push({ name: 'Costo Aplicación', value: results.applicationCost });
  }
  
  if (!results.transportCost && !results.applicationCost) {
    pieData.push({ name: 'Costo Mano de Obra (Est.)', value: results.totalCost * 0.15 });
    pieData.push({ name: 'Costo Transporte (Est.)', value: results.totalCost * 0.08 });
  }
  
  // Datos para gráfico de línea (proyección de beneficios a 5 años)
  const lineData = [];
  for (let year = 0; year <= 5; year++) {
    const baseMultiplier = (results.cropYieldIncrease || 10) / 100;
    
    lineData.push({
      name: year === 0 ? 'Inversión' : `Año ${year}`,
      beneficio: year === 0 ? -results.totalCost : Math.round(results.totalCost * baseMultiplier * year)
    });
  }
  
  // Formateador para tooltips
  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <SectionHeader
        title="Análisis Visual"
        icon={<BarChart2 className="w-5 h-5 text-green-600" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de barras */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
            <BarChart2 className="w-4 h-4 mr-1 text-gray-500" /> 
            Distribución de Costos
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Bar dataKey="total" name="Costo Total" fill="#16a34a" />
                {formData.applicationType !== 'vivero' && (
                  <Bar dataKey="porHectarea" name="Costo por Hectárea" fill="#4ade80" />
                )}
                <Bar 
                  dataKey="porUnidad" 
                  name={`Costo por ${formData.applicationType === 'vivero' ? 'Planta' : 'Palma'}`} 
                  fill="#86efac" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Gráfico de torta */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
            <PieChartIcon className="w-4 h-4 mr-1 text-gray-500" />
            Composición de Costos
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Gráfico de línea proyección */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1 text-gray-500" />
          Proyección de Beneficios (5 años)
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="beneficio" 
                name="Beneficio Estimado" 
                stroke="#16a34a" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          * Proyección basada en estimaciones de rendimiento y precio promedio de la industria.
        </div>
      </div>
    </div>
  );
};

export default ChartSection;