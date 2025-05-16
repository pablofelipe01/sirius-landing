'use client'


import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { formatCurrency, getSoilTypeText } from './utils';
import { 
  Leaf, CloudRain, Droplets, Thermometer, Wind, Sun,
  PieChart, BarChart2, AreaChart
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, AreaChart as RechartsAreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

interface EnvironmentalSectionProps {
  results: SimulationResults;
  formData: SimulationFormData;
}

/**
 * Componente para mostrar los análisis y beneficios ambientales
 */
const EnvironmentalSection: React.FC<EnvironmentalSectionProps> = ({ results, formData }) => {
  // Colores para gráficos
  const COLORS = ['#16a34a', '#4ade80', '#86efac', '#bbf7d0', '#34d399', '#a3e635'];
  
  // Datos para gráfico de radar de beneficios
  const radarData = [
    {
      subject: 'Retención de Agua',
      A: (results.soilHealthImprovement || 15),
      fullMark: 50,
    },
    {
      subject: 'Nutrientes',
      A: 25 + (results.cropYieldIncrease || 0) / 2,
      fullMark: 50,
    },
    {
      subject: 'Secuestro de CO2',
      A: 20 + (results.carbonSequestration || 0) * 2,
      fullMark: 50,
    },
    {
      subject: 'Fertilidad',
      A: 30 + ((results.cropYieldIncrease || 0) / 3),
      fullMark: 50,
    },
    {
      subject: 'Erosión Reducida',
      A: 28,
      fullMark: 50,
    },
  ];
  
  // Datos para gráfico de área (evolución de mejora del suelo)
  const soilEvolutionData = [];
  for (let year = 0; year <= 5; year++) {
    soilEvolutionData.push({
      name: `Año ${year}`,
      retencionAgua: Math.min(35, (results.soilHealthImprovement || 10) * (1 + year * 0.2)),
      actividadMicrobiana: Math.min(45, 15 + year * 7),
      carbono: Math.min(30, 5 + year * 5)
    });
  }
  
  // Datos para gráfico de barras de créditos de carbono
  const carbonCreditsData = [
    { name: 'Biochar', creditos: results.carbonCredits || 0 },
    { name: 'Árboles*', creditos: (results.carbonCredits || 0) * 0.4 },
    { name: 'Fertilizante', creditos: 0 },
    { name: 'Compost', creditos: (results.carbonCredits || 0) * 0.25 }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <SectionHeader
          title="Análisis de Beneficios Ambientales"
          icon={<Leaf className="w-5 h-5 text-green-600" />}
        />
        
        {/* KPIs Ambientales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-5 rounded-lg border border-green-100 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CloudRain className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ahorro de Agua</p>
              <p className="text-2xl font-bold text-green-700">{Math.round(results.waterSavings || 0)} m³/año</p>
              <p className="text-xs text-gray-500">Equivalente a {Math.round((results.waterSavings || 0) / 2.5)} duchas</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Leaf className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Secuestro de CO₂</p>
              <p className="text-2xl font-bold text-blue-700">{(results.carbonSequestration || 0).toFixed(1)} ton</p>
              <p className="text-xs text-gray-500">Equivalente a {Math.round((results.carbonSequestration || 0) * 4)} árboles/año</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <Droplets className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Mejora Salud del Suelo</p>
              <p className="text-2xl font-bold text-amber-700">{(results.soilHealthImprovement || 0).toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Incremento en actividad biológica</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Radar - Beneficios Multidimensionales */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
              <PieChart className="w-4 h-4 mr-1 text-gray-500" />
              Mejoras Multidimensionales
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 50]} />
                  <Radar
                    name="Impacto del Biochar"
                    dataKey="A"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Gráfico de Área - Evolución del Suelo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
              <AreaChart className="w-4 h-4 mr-1 text-gray-500" />
              Evolución del Suelo (5 años)
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                  data={soilEvolutionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: '% de mejora', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="retencionAgua" 
                    name="Retención de Agua" 
                    stackId="1"
                    stroke="#16a34a" 
                    fill="#16a34a" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actividadMicrobiana" 
                    name="Actividad Microbiana" 
                    stackId="2"
                    stroke="#4ade80" 
                    fill="#4ade80" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="carbono" 
                    name="Carbono Orgánico" 
                    stackId="3"
                    stroke="#86efac" 
                    fill="#86efac" 
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Gráfico de Barras - Créditos de Carbono */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h4 className="text-md font-medium mb-4 text-gray-700 flex items-center">
            <BarChart2 className="w-4 h-4 mr-1 text-gray-500" />
            Comparativa de Captura de Carbono
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={carbonCreditsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Créditos de Carbono', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="creditos" name="Créditos de Carbono" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            * Equivalente en árboles maduros durante el mismo periodo de tiempo.
          </div>
        </div>
        
        {/* Información de clima y suelo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-medium text-lg text-green-800 mb-3 flex items-center">
              <CloudRain className="w-5 h-5 mr-2 text-green-700" />
              Datos Climáticos
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Temperatura Media</p>
                  <p className="font-medium">25°C</p>
                </div>
              </div>
              <div className="flex items-center">
                <CloudRain className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Precipitación Anual</p>
                  <p className="font-medium">{formData.annualRainfall} mm</p>
                </div>
              </div>
              <div className="flex items-center">
                <Sun className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Radiación Solar</p>
                  <p className="font-medium">Alta</p>
                </div>
              </div>
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Viento</p>
                  <p className="font-medium">Moderado</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h4 className="font-medium text-lg text-amber-800 mb-3 flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-amber-700" />
              Propiedades del Suelo
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tipo de Suelo</p>
                <p className="font-medium">{getSoilTypeText(formData.soilType)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Retención de Agua</p>
                <p className="font-medium">{
                  formData.soilType === 'arenoso' ? 'Baja' :
                  formData.soilType === 'arcilloso' ? 'Alta' :
                  formData.soilType === 'limoso' ? 'Media-Alta' :
                  formData.soilType === 'francoArenoso' ? 'Media' :
                  'Media-Baja'
                }</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Drenaje</p>
                <p className="font-medium">{
                  formData.soilType === 'arenoso' ? 'Excelente' :
                  formData.soilType === 'arcilloso' ? 'Pobre' :
                  formData.soilType === 'limoso' ? 'Moderado' :
                  formData.soilType === 'francoArenoso' ? 'Bueno' :
                  'Bueno'
                }</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fertilidad Natural</p>
                <p className="font-medium">{
                  formData.soilType === 'arenoso' ? 'Baja' :
                  formData.soilType === 'arcilloso' ? 'Media-Alta' :
                  formData.soilType === 'limoso' ? 'Media' :
                  formData.soilType === 'francoArenoso' ? 'Media' :
                  'Media-Alta'
                }</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-lg text-blue-800 mb-2">Valor de los Beneficios Ambientales</h4>
          <div className="space-y-3 text-gray-700">
            <p>
              El valor monetario estimado de los beneficios ambientales a lo largo de 5 años es de 
              <span className="font-medium text-blue-700"> {formatCurrency((results.carbonCredits || 0) * 35 * 1000 + (results.waterSavings || 0) * 5 * 1.5)}</span>.
              Esto incluye:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">{formatCurrency((results.carbonCredits || 0) * 35 * 1000)}</span> en 
                créditos de carbono (valorados a 35 USD por tonelada)
              </li>
              <li>
                <span className="font-medium">{formatCurrency((results.waterSavings || 0) * 5 * 1.5)}</span> en 
                valor del agua ahorrada durante 5 años
              </li>
              <li>
                Beneficios adicionales no cuantificados como la mayor biodiversidad del suelo y 
                la reducción en el uso de fertilizantes químicos
              </li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              * Los valores monetarios son estimaciones basadas en precios promedio del mercado y 
              pueden variar según la región y el momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalSection;