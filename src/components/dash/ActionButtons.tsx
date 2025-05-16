'use client'

import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { formatCurrency } from './utils';
import { Download, FileText, Send, Share2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface ActionButtonsProps {
  formData: SimulationFormData;
  results: SimulationResults;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleGeneratePDF: () => void;
  handleDownloadCSV: () => void;
  handleShareResults: () => void;
  isCalculating: boolean;
}

/**
 * Componente para los botones de acción (guardar, descargar, compartir)
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  formData,
  results,
  isSubmitting,
  handleSubmit,
  handleGeneratePDF,
  handleDownloadCSV,
  handleShareResults,
  isCalculating
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleGeneratePDF}
          disabled={isCalculating}
          className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-50"
        >
          {isCalculating ? (
            <><span className="animate-spin mr-1">⟳</span> Generando...</>
          ) : (
            <><FileText className="w-4 h-4 mr-2" /> Generar PDF</>
          )}
        </button>
        
        <button
          type="button"
          onClick={handleDownloadCSV}
          disabled={isCalculating}
          className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors border border-gray-300 flex items-center disabled:opacity-50"
        >
          {isCalculating ? (
            <><span className="animate-spin mr-1">⟳</span> Descargando...</>
          ) : (
            <><Download className="w-4 h-4 mr-2" /> Descargar CSV</>
          )}
        </button>
        
        <button
          type="button"
          onClick={handleShareResults}
          className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors border border-blue-300 flex items-center"
        >
          <Share2 className="w-4 h-4 mr-2" /> Compartir
        </button>
      </div>
      
      <button
        type="button"
        onClick={(e) => handleSubmit(e as unknown)}
        disabled={isSubmitting || isCalculating}
        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center"
      >
        {isSubmitting ? (
          <><span className="animate-spin mr-2">⟳</span> Enviando...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Enviar Simulación</>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;