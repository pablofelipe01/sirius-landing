'use client'
import React from 'react';
import { Calculator, Check, ChevronDown, ChevronUp, Download, BarChart2, 
  PieChart as PieChartIcon, TrendingUp, Save, Send, FileText } from 'lucide-react';

interface DashboardHeaderProps {
  activeTab: 'simulation' | 'comparison' | 'report' | 'roi' | 'environmental';
  handleTabChange: (tab: 'simulation' | 'comparison' | 'report' | 'roi' | 'environmental') => void;
}

/**
 * Componente para el encabezado del dashboard con las pestañas de navegación
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <div className="bg-green-700 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <br />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simulador de Costos Interactivo</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Calcula el costo de aplicación de Biochar Blend para tu cultivo, visualiza comparativas
            y obtén un reporte detallado para tomar mejores decisiones.
          </p>
        </div>
      </div>
      
      {/* Tabs para navegación */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => handleTabChange('simulation')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'simulation' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Simulación
            </button>
            <button 
              onClick={() => handleTabChange('comparison')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'comparison' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              Análisis y Gráficos
            </button>
            <button 
              onClick={() => handleTabChange('roi')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'roi' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              ROI
            </button>
            <button 
              onClick={() => handleTabChange('environmental')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'environmental' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <PieChartIcon className="w-4 h-4 mr-2" />
              Ambiental
            </button>
            <button 
              onClick={() => handleTabChange('report')}
              className={`py-4 px-6 font-medium text-sm flex items-center ${
                activeTab === 'report' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Reporte
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;