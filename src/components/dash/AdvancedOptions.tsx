'use client'

import React from 'react';
import { SimulationFormData } from './types';
import { getApplicationMethodText, getSoilTypeText } from './utils';
import { Settings } from 'lucide-react';

interface AdvancedOptionsProps {
  formData: SimulationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
}

/**
 * Componente para opciones avanzadas de simulación
 */
const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  formData,
  handleChange,
  showAdvancedOptions,
  setShowAdvancedOptions
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center text-gray-800">
          <Settings className="w-5 h-5 mr-2 text-gray-600" />
          Opciones Avanzadas
        </h3>
        <button 
          type="button"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="text-green-600 flex items-center text-sm"
        >
          {showAdvancedOptions ? (
            <>Ocultar opciones <span className="ml-1">▲</span></>
          ) : (
            <>Mostrar opciones <span className="ml-1">▼</span></>
          )}
        </button>
      </div>
      
      {showAdvancedOptions && (
        <div className="space-y-6">
          {/* Costos adicionales */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-md font-medium mb-3 text-gray-700">Costos Adicionales</h4>
            
            <div className="space-y-3">
              {/* Costos de transporte */}
              <div className="flex items-start mb-2">
                <div className="flex items-center h-5">
                  <input
                    id="includeTransportCost"
                    name="includeTransportCost"
                    type="checkbox"
                    checked={formData.includeTransportCost}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="includeTransportCost" className="font-medium text-gray-700">
                    Incluir costos de transporte
                  </label>
                  <p className="text-gray-500">Agrega el costo de transportar el Biochar a tu ubicación</p>
                </div>
              </div>
              
              {formData.includeTransportCost && (
                <div className="pl-7">
                  <label htmlFor="transportDistance" className="block text-sm font-medium text-gray-700 mb-1">
                    Distancia de transporte (km)
                  </label>
                  <input
                    type="number"
                    id="transportDistance"
                    name="transportDistance"
                    min="1"
                    step="1"
                    value={formData.transportDistance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              )}
              
              {/* Costos de aplicación */}
              <div className="flex items-start mt-4 mb-2">
                <div className="flex items-center h-5">
                  <input
                    id="includeApplicationCost"
                    name="includeApplicationCost"
                    type="checkbox"
                    checked={formData.includeApplicationCost}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="includeApplicationCost" className="font-medium text-gray-700">
                    Incluir costos de aplicación
                  </label>
                  <p className="text-gray-500">Agrega el costo de aplicar el Biochar en el cultivo</p>
                </div>
              </div>
              
              {formData.includeApplicationCost && (
                <div className="pl-7">
                  <label htmlFor="applicationMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Método de aplicación
                  </label>
                  <select
                    id="applicationMethod"
                    name="applicationMethod"
                    value={formData.applicationMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="manual">Manual (más costoso)</option>
                    <option value="mecanizada">Mecanizada (más eficiente)</option>
                    <option value="mixta">Mixta (combinada)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    {getApplicationMethodText(formData.applicationMethod)}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Parámetros de retorno */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-md font-medium mb-3 text-gray-700">Estimación de Retorno</h4>
            
            <div className="flex items-start mb-2">
              <div className="flex items-center h-5">
                <input
                  id="applyRoi"
                  name="applyRoi"
                  type="checkbox"
                  checked={formData.applyRoi}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="applyRoi" className="font-medium text-gray-700">
                  Personalizar ROI esperado
                </label>
                <p className="text-gray-500">Define tu propio porcentaje de retorno sobre la inversión</p>
              </div>
            </div>
            
            {formData.applyRoi && (
              <div className="pl-7">
                <label htmlFor="roiPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                  Porcentaje de ROI anual (%)
                </label>
                <input
                  type="number"
                  id="roiPercentage"
                  name="roiPercentage"
                  min="1"
                  max="100"
                  step="1"
                  value={formData.roiPercentage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            )}
          </div>
          
          {/* Datos de suelo y clima */}
          <div>
            <h4 className="text-md font-medium mb-3 text-gray-700">Datos de Suelo y Clima</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Suelo
                </label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="arenoso">Suelo Arenoso</option>
                  <option value="arcilloso">Suelo Arcilloso</option>
                  <option value="limoso">Suelo Limoso</option>
                  <option value="francoArenoso">Suelo Franco Arenoso</option>
                  <option value="francoArcilloso">Suelo Franco Arcilloso</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {getSoilTypeText(formData.soilType)}
                </p>
              </div>
              
              <div>
                <label htmlFor="annualRainfall" className="block text-sm font-medium text-gray-700 mb-1">
                  Precipitación anual (mm)
                </label>
                <input
                  type="number"
                  id="annualRainfall"
                  name="annualRainfall"
                  min="0"
                  step="100"
                  value={formData.annualRainfall}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;