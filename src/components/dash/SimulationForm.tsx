'use client'
import React from 'react';
import { SimulationFormData } from './types';

interface SimulationFormProps {
  formData: SimulationFormData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

/**
 * Componente para el formulario de parámetros de simulación
 */
const SimulationForm: React.FC<SimulationFormProps> = ({
  formData,
  errors,
  handleChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Parámetros del Cultivo</h3>
      
      <div className="mb-6">
        <label htmlFor="applicationType" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Aplicación *
        </label>
        <select
          id="applicationType"
          name="applicationType"
          value={formData.applicationType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        >
          <option value="vivero">Vivero (1kg/planta)</option>
          <option value="palmaJovenAdulta">Palma Joven y Adulta (2kg/palma)</option>
          <option value="siembraNueva">Siembra Nueva/Renovación (2kg/palma)</option>
        </select>
      </div>
      
      {formData.applicationType === 'vivero' ? (
        <div>
          <label htmlFor="numberOfPlants" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Plantas *
          </label>
          <input
            type="number"
            id="numberOfPlants"
            name="numberOfPlants"
            min="1"
            step="1"
            value={formData.numberOfPlants}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
              errors.numberOfPlants ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.numberOfPlants && (
            <p className="mt-1 text-sm text-red-600">{errors.numberOfPlants}</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hectares" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Hectáreas *
            </label>
            <input
              type="number"
              id="hectares"
              name="hectares"
              min="0.1"
              step="0.1"
              value={formData.hectares}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 ${
                errors.hectares ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.hectares && (
              <p className="mt-1 text-sm text-red-600">{errors.hectares}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cultivarType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Cultivar *
            </label>
            <select
              id="cultivarType"
              name="cultivarType"
              value={formData.cultivarType}
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
  );
};

export default SimulationForm;