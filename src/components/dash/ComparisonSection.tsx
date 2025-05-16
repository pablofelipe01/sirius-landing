'use client';
import React from 'react';
import { SimulationFormData, ComparisonResults } from './types';
import { BarChart2 } from 'lucide-react';
import { formatCurrency, getApplicationTypeText, getCultivarTypeText } from './utils';

interface ComparisonSectionProps {
  formData: SimulationFormData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  comparisonResults: ComparisonResults | null;
}

/**
 * Componente para la comparación de escenarios
 */
const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  formData,
  errors,
  handleChange,
  comparisonResults
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Comparación de Escenarios</h3>
      
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="compareScenarios"
          name="compareScenarios"
          checked={formData.compareScenarios}
          onChange={handleChange}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label htmlFor="compareScenarios" className="ml-2 block text-sm font-medium text-gray-700">
          Comparar con otro escenario
        </label>
      </div>
      
      {formData.compareScenarios && (
        <div className="pl-4 border-l-4 border-green-100 mt-4">
          <h4 className="text-md font-medium mb-4 text-gray-800">Escenario 2</h4>
          
          <div className="mb-4">
            <label htmlFor="scenario2.applicationType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Aplicación (Escenario 2) *
            </label>
            <select
              id="scenario2.applicationType"
              name="scenario2.applicationType"
              value={formData.scenario2.applicationType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="vivero">Vivero (1kg/planta)</option>
              <option value="palmaJovenAdulta">Palma Joven y Adulta (2kg/palma)</option>
              <option value="siembraNueva">Siembra Nueva/Renovación (2kg/palma)</option>
            </select>
          </div>
          
          {formData.scenario2.applicationType === 'vivero' ? (
            <div>
              <label htmlFor="scenario2.numberOfPlants" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Plantas (Escenario 2) *
              </label>
              <input
                type="number"
                id="scenario2.numberOfPlants"
                name="scenario2.numberOfPlants"
                min="1"
                step="1"
                value={formData.scenario2.numberOfPlants}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
                  errors['scenario2.numberOfPlants'] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors['scenario2.numberOfPlants'] && (
                <p className="mt-1 text-sm text-red-600">{errors['scenario2.numberOfPlants']}</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="scenario2.hectares" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Hectáreas (Escenario 2) *
                </label>
                <input
                  type="number"
                  id="scenario2.hectares"
                  name="scenario2.hectares"
                  min="0.1"
                  step="0.1"
                  value={formData.scenario2.hectares}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
                    errors['scenario2.hectares'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['scenario2.hectares'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['scenario2.hectares']}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="scenario2.cultivarType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Cultivar (Escenario 2) *
                </label>
                <select
                  id="scenario2.cultivarType"
                  name="scenario2.cultivarType"
                  value={formData.scenario2.cultivarType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="elaeisGuineensis">Elaeis Guineensis (143 Palmas/Ha)</option>
                  <option value="hibrido">Híbrido (128 Palmas/Ha)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Resultados de la comparación */}
      {formData.compareScenarios && comparisonResults && (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 mt-6">
          <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
            Resultados de la Comparación
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-md shadow-sm">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Costo Total</div>
                <div className="text-xs text-gray-400">Diferencia</div>
              </div>
              <div className="flex justify-between items-end mt-1">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {formatCurrency(comparisonResults.scenario1.totalCost)}
                  </div>
                  <div className="text-sm text-gray-500">Escenario 1</div>
                </div>
                <div className="text-base font-medium">
                  <span className={comparisonResults.difference.totalCost < 0 ? 'text-green-600' : 'text-red-600'}>
                    {comparisonResults.difference.totalCost < 0 ? '-' : '+'} 
                    {formatCurrency(Math.abs(comparisonResults.difference.totalCost))}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-800 mt-2 pt-2 border-t border-gray-100">
                {formatCurrency(comparisonResults.scenario2.totalCost)}
              </div>
              <div className="text-sm text-gray-500">Escenario 2</div>
            </div>
            
            <div className="p-3 bg-white rounded-md shadow-sm">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Cantidad de Biochar</div>
                <div className="text-xs text-gray-400">Diferencia</div>
              </div>
              <div className="flex justify-between items-end mt-1">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {comparisonResults.scenario1.totalBiocharNeeded.toFixed(0)} kg
                  </div>
                  <div className="text-sm text-gray-500">Escenario 1</div>
                </div>
                <div className="text-base font-medium">
                  <span className={comparisonResults.difference.totalBiocharNeeded < 0 ? 'text-green-600' : 'text-red-600'}>
                    {comparisonResults.difference.totalBiocharNeeded < 0 ? '-' : '+'} 
                    {Math.abs(comparisonResults.difference.totalBiocharNeeded).toFixed(0)} kg
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-800 mt-2 pt-2 border-t border-gray-100">
                {comparisonResults.scenario2.totalBiocharNeeded.toFixed(0)} kg
              </div>
              <div className="text-sm text-gray-500">Escenario 2</div>
            </div>
            
            <div className="p-3 bg-white rounded-md shadow-sm">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Costo por {formData.applicationType === 'vivero' ? 'Planta' : 'Palma'}
                </div>
                <div className="text-xs text-gray-400">Diferencia</div>
              </div>
              <div className="flex justify-between items-end mt-1">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {formatCurrency(comparisonResults.scenario1.costPerPalm)}
                  </div>
                  <div className="text-sm text-gray-500">Escenario 1</div>
                </div>
                <div className="text-base font-medium">
                  <span className={comparisonResults.difference.costPerPalm < 0 ? 'text-green-600' : 'text-red-600'}>
                    {comparisonResults.difference.costPerPalm < 0 ? '-' : '+'} 
                    {formatCurrency(Math.abs(comparisonResults.difference.costPerPalm))}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-800 mt-2 pt-2 border-t border-gray-100">
                {formatCurrency(comparisonResults.scenario2.costPerPalm)}
              </div>
              <div className="text-sm text-gray-500">Escenario 2</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-md border border-blue-50">
            <div className="text-sm font-medium text-blue-700 mb-2">Resumen de la comparación:</div>
            <p className="text-sm text-gray-600">
              El Escenario 2 es 
              <span className={comparisonResults.percentageDifference.totalCost < 0 ? ' text-green-700 font-medium' : ' text-red-700 font-medium'}>
                {' '}{comparisonResults.percentageDifference.totalCost < 0 ? 'más económico' : 'más costoso'}{' '}
                ({Math.abs(comparisonResults.percentageDifference.totalCost).toFixed(1)}%)
              </span>
              {' '}que el Escenario 1, pero requiere
              <span className={comparisonResults.percentageDifference.totalBiocharNeeded < 0 ? ' text-green-700 font-medium' : ' text-red-700 font-medium'}>
                {' '}{comparisonResults.percentageDifference.totalBiocharNeeded < 0 ? 'menos' : 'más'} Biochar
                {' '}({Math.abs(comparisonResults.percentageDifference.totalBiocharNeeded).toFixed(1)}%)
              </span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonSection;