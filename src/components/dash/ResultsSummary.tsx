'use client'

import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { Calculator } from 'lucide-react';
import { formatCurrency, getApplicationTypeText, getCultivarTypeText } from './utils';
import SectionHeader from './SectionHeader';

interface ResultsSummaryProps {
  results: SimulationResults;
  formData: SimulationFormData;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

/**
 * Componente para mostrar el resumen de resultados de la simulación
 */
const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  formData,
  showDetails,
  setShowDetails
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <SectionHeader 
        title="Resultados de la Simulación" 
        expandable={true}
        expanded={showDetails}
        onToggle={() => setShowDetails(!showDetails)}
        icon={<Calculator className="w-5 h-5 text-green-600" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de resultados - Siempre visible */}
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
          <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            Resultados Principales
          </h4>
          
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-md border border-green-50">
              <div className="text-sm text-gray-500">Costo Total</div>
              <div className="text-2xl font-bold text-green-700">{formatCurrency(results.totalCost)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-md border border-green-50">
                <div className="text-sm text-gray-500">
                  Biochar Requerido
                </div>
                <div className="text-xl font-semibold text-gray-800">
                  {results.totalBiocharNeeded.toFixed(0)} kg
                </div>
              </div>
              
              <div className="p-3 bg-white rounded-md border border-green-50">
                <div className="text-sm text-gray-500">
                  {formData.applicationType === 'vivero' ? 'Plantas' : 'Palmas'} Totales
                </div>
                <div className="text-xl font-semibold text-gray-800">
                  {results.palmsTotal.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detalles - Visibles al hacer clic en "Ver detalles" */}
        {showDetails && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Detalles</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-sm text-gray-500">Tipo de Aplicación</div>
                  <div className="text-base font-medium text-gray-800">
                    {getApplicationTypeText(formData.applicationType)}
                  </div>
                </div>
                
                {formData.applicationType !== 'vivero' && (
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Tipo de Cultivar</div>
                    <div className="text-base font-medium text-gray-800">
                      {getCultivarTypeText(formData.cultivarType)}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {formData.applicationType !== 'vivero' && (
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Costo por Hectárea</div>
                    <div className="text-base font-medium text-gray-800">
                      {formatCurrency(results.costPerHectare)}
                    </div>
                  </div>
                )}
                
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-sm text-gray-500">
                    Costo por {formData.applicationType === 'vivero' ? 'Planta' : 'Palma'}
                  </div>
                  <div className="text-base font-medium text-gray-800">
                    {formatCurrency(results.costPerPalm)}
                  </div>
                </div>
              </div>
              
              {/* Costos adicionales si están habilitados */}
              {(results.transportCost || results.applicationCost) && (
                <div className="grid grid-cols-2 gap-3">
                  {results.transportCost > 0 && (
                    <div className="p-3 bg-white rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Costo de Transporte</div>
                      <div className="text-base font-medium text-gray-800">
                        {formatCurrency(results.transportCost)}
                      </div>
                    </div>
                  )}
                  
                  {results.applicationCost > 0 && (
                    <div className="p-3 bg-white rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Costo de Aplicación</div>
                      <div className="text-base font-medium text-gray-800">
                        {formatCurrency(results.applicationCost)}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-sm text-gray-500">ROI Estimado</div>
                  <div className="text-base font-medium text-green-700">
                    {results.roi}%
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-sm text-gray-500">Tiempo de Recuperación</div>
                  <div className="text-base font-medium text-green-700">
                    {results.estimatedPayback?.toFixed(1)} años
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSummary;