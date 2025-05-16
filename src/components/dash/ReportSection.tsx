'use client'
import React from 'react';
import { SimulationResults, SimulationFormData } from './types';
import { formatCurrency, getApplicationTypeText, getCultivarTypeText, getSoilTypeText, getApplicationMethodText } from './utils';
import { FileText, Download } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface ReportSectionProps {
  formData: SimulationFormData;
  results: SimulationResults;
  handleGeneratePDF: () => void;
  handleDownloadCSV: () => void;
}

/**
 * Componente para la sección de reportes
 */
const ReportSection: React.FC<ReportSectionProps> = ({
  formData,
  results,
  handleGeneratePDF,
  handleDownloadCSV
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="Reporte de Simulación"
            icon={<FileText className="w-5 h-5 text-green-600" />}
            actionButton={
              <div className="flex gap-2">
                <button
                  onClick={handleGeneratePDF}
                  className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <Download className="w-3 h-3 mr-1" />
                  PDF
                </button>
                
                <button
                  onClick={handleDownloadCSV}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors border border-gray-300 flex items-center"
                >
                  <Download className="w-3 h-3 mr-1" />
                  CSV
                </button>
              </div>
            }
          />
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="text-lg font-medium text-green-800 mb-2">Información del Cliente</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Empresa/Finca</div>
              <div className="font-medium">{formData.companyName || 'No especificado'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Persona de Contacto</div>
              <div className="font-medium">{formData.name || 'No especificado'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{formData.email || 'No especificado'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Teléfono</div>
              <div className="font-medium">{formData.phone || 'No proporcionado'}</div>
            </div>
            {formData.position && (
              <div>
                <div className="text-sm text-gray-500">Cargo</div>
                <div className="font-medium">{formData.position}</div>
              </div>
            )}
            {formData.address && (
              <div>
                <div className="text-sm text-gray-500">Dirección</div>
                <div className="font-medium">{formData.address}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="text-lg font-medium text-green-800 mb-2">Parámetros de la Simulación</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Tipo de Aplicación</div>
              <div className="font-medium">
                {getApplicationTypeText(formData.applicationType)}
              </div>
            </div>
            
            {formData.applicationType === 'vivero' ? (
              <div>
                <div className="text-sm text-gray-500">Número de Plantas</div>
                <div className="font-medium">{formData.numberOfPlants}</div>
              </div>
            ) : (
              <>
                <div>
                  <div className="text-sm text-gray-500">Número de Hectáreas</div>
                  <div className="font-medium">{formData.hectares}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tipo de Cultivar</div>
                  <div className="font-medium">
                    {getCultivarTypeText(formData.cultivarType)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Palmas Totales</div>
                  <div className="font-medium">{results.palmsTotal.toFixed(0)}</div>
                </div>
              </>
            )}
          </div>
          
          {/* Opciones avanzadas si están habilitadas */}
          {(formData.includeTransportCost || formData.includeApplicationCost || 
            formData.applyRoi || formData.soilType) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-md font-medium text-gray-700 mb-2">Opciones Avanzadas</div>
              <div className="grid grid-cols-2 gap-3">
                {formData.includeTransportCost && (
                  <div>
                    <div className="text-sm text-gray-500">Distancia de Transporte</div>
                    <div className="font-medium">{formData.transportDistance} km</div>
                  </div>
                )}
                
                {formData.includeApplicationCost && (
                  <div>
                    <div className="text-sm text-gray-500">Método de Aplicación</div>
                    <div className="font-medium">{getApplicationMethodText(formData.applicationMethod)}</div>
                  </div>
                )}
                
                {formData.applyRoi && (
                  <div>
                    <div className="text-sm text-gray-500">ROI Personalizado</div>
                    <div className="font-medium">{formData.roiPercentage}%</div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm text-gray-500">Tipo de Suelo</div>
                  <div className="font-medium">{getSoilTypeText(formData.soilType)}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Precipitación Anual</div>
                  <div className="font-medium">{formData.annualRainfall} mm/año</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="text-lg font-medium text-green-800 mb-2">Resultados</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Biochar Requerido</div>
              <div className="font-medium">{results.totalBiocharNeeded.toFixed(0)} kg</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Precio Unitario</div>
              <div className="font-medium">{formatCurrency(1190)}/kg</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Costo Total</div>
              <div className="text-xl font-bold text-green-700">{formatCurrency(results.totalCost)}</div>
            </div>
            
            {/* Costos adicionales si están habilitados */}
            {(results.transportCost || results.applicationCost) && (
              <>
                {results.transportCost > 0 && (
                  <div>
                    <div className="text-sm text-gray-500">Costo de Transporte</div>
                    <div className="font-medium">{formatCurrency(results.transportCost)}</div>
                  </div>
                )}
                
                {results.applicationCost > 0 && (
                  <div>
                    <div className="text-sm text-gray-500">Costo de Aplicación</div>
                    <div className="font-medium">{formatCurrency(results.applicationCost)}</div>
                  </div>
                )}
              </>
            )}
            
            {formData.applicationType !== 'vivero' && (
              <div>
                <div className="text-sm text-gray-500">Costo por Hectárea</div>
                <div className="font-medium">{formatCurrency(results.costPerHectare)}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500">
                Costo por {formData.applicationType === 'vivero' ? 'Planta' : 'Palma'}
              </div>
              <div className="font-medium">{formatCurrency(results.costPerPalm)}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-lg font-medium text-green-800 mb-2">Beneficios Estimados</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">ROI Estimado</div>
              <div className="font-medium text-green-700">{results.roi}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tiempo de Recuperación</div>
              <div className="font-medium">{results.estimatedPayback?.toFixed(1)} años</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Beneficio a 5 Años</div>
              <div className="font-medium text-green-700">{formatCurrency(results.fiveYearProfit || 0)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Créditos de Carbono Potenciales</div>
              <div className="font-medium">{results.carbonCredits?.toFixed(1)} créditos</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ahorro de Agua Estimado</div>
              <div className="font-medium">{Math.round(results.waterSavings || 0)} m³/año</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Mejora de Salud del Suelo</div>
              <div className="font-medium">{results.soilHealthImprovement?.toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-md text-sm text-gray-600 border border-green-100">
            <div className="font-medium text-green-800 mb-1">Nota:</div>
            <p>
              Esta simulación es una estimación basada en los parámetros proporcionados. 
              Los resultados reales pueden variar dependiendo de factores específicos como 
              condiciones del suelo, clima, técnicas de aplicación y manejo del cultivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;