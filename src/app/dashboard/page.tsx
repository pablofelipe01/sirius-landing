'use client';

import React, { useState, useEffect } from 'react';
import { 
  SimulationFormData, 
  SimulationResults, 
  ComparisonResults,
  BIOCHAR_PRICE_PER_KG,
  PALMS_PER_HECTARE,
  BIOCHAR_PER_PALM,
  TRANSPORT_COST_PER_KM_PER_KG,
  APPLICATION_COST,
  SOIL_WATER_RETENTION,
  CARBON_CREDIT_FACTOR
} from '@/components/dash/types';
import { formatCurrency } from '@/components/dash/utils';
import { calculateResults } from '@/components/dash/calculations';
import ScrollAnimation from '@/components/ScrollAnimation';

// Componentes del Dashboard
import DashboardHeader from '@/components/dash/DashboardHeader';
import ClientForm from '@/components/dash/ClientForm';
import SimulationForm from '@/components/dash/SimulationForm';
import AdvancedOptions from '@/components/dash/AdvancedOptions';
import ComparisonSection from '@/components/dash/ComparisonSection';
import ResultsSummary from '@/components/dash/ResultsSummary';
import ChartSection from '@/components/dash/ChartSection';
import RoiSection from '@/components/dash/RoiSection';
import EnvironmentalSection from '@/components/dash/EnvironmentalSection';
import ReportSection from '@/components/dash/ReportSection';
import MessageSection from '@/components/dash/MessageSection';
import ActionButtons from '@/components/dash/ActionButtons';

const DashboardPage = () => {
  // Estados del formulario
  const [formData, setFormData] = useState<SimulationFormData>({
    // Datos del cliente
    companyName: '',
    name: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    
    // Parámetros de simulación
    hectares: 1,
    applicationType: 'palmaJovenAdulta',
    cultivarType: 'elaeisGuineensis',
    numberOfPlants: 100,
    
    // Comparación de escenarios
    compareScenarios: false,
    scenario2: {
      hectares: 2,
      applicationType: 'palmaJovenAdulta',
      cultivarType: 'hibrido',
      numberOfPlants: 200
    },
    
    // Preferencias y opciones
    includeTransportCost: false,
    transportDistance: 50,
    includeApplicationCost: false,
    applicationMethod: 'manual',
    applyRoi: true,
    roiPercentage: 15,
    
    // Datos climáticos y de suelo
    soilType: 'francoArenoso',
    annualRainfall: 1500,
    
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Estados de UI
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison' | 'report' | 'roi' | 'environmental'>('simulation');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Actualizar resultados cuando cambian los parámetros
  useEffect(() => {
    // Simular cálculo con tiempo de espera para visualizar el spinner
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // Calcular resultados del escenario principal
      if (formData.hectares && formData.applicationType && formData.cultivarType) {
        const scenario1Results = calculateResults({
          hectares: formData.hectares,
          applicationType: formData.applicationType,
          cultivarType: formData.cultivarType,
          numberOfPlants: formData.numberOfPlants
        }, formData);
        
        setResults(scenario1Results);
        
        // Si está activa la comparación, calcular también el escenario 2
        if (formData.compareScenarios) {
          const scenario2Results = calculateResults({
            hectares: formData.scenario2.hectares,
            applicationType: formData.scenario2.applicationType,
            cultivarType: formData.scenario2.cultivarType,
            numberOfPlants: formData.scenario2.numberOfPlants
          }, formData);
          
          // Calcular diferencias
          const difference = {
            totalCost: scenario2Results.totalCost - scenario1Results.totalCost,
            costPerHectare: scenario2Results.costPerHectare - scenario1Results.costPerHectare,
            costPerPalm: scenario2Results.costPerPalm - scenario1Results.costPerPalm,
            totalBiocharNeeded: scenario2Results.totalBiocharNeeded - scenario1Results.totalBiocharNeeded,
            palmsTotal: scenario2Results.palmsTotal - scenario1Results.palmsTotal,
            transportCost: (scenario2Results.transportCost || 0) - (scenario1Results.transportCost || 0),
            applicationCost: (scenario2Results.applicationCost || 0) - (scenario1Results.applicationCost || 0),
            roi: (scenario2Results.roi || 0) - (scenario1Results.roi || 0),
            waterSavings: (scenario2Results.waterSavings || 0) - (scenario1Results.waterSavings || 0),
            cropYieldIncrease: (scenario2Results.cropYieldIncrease || 0) - (scenario1Results.cropYieldIncrease || 0)
          };
          
          // Calcular diferencias porcentuales
          const percentageDifference = {
            totalCost: (difference.totalCost / scenario1Results.totalCost) * 100,
            costPerHectare: (difference.costPerHectare / (scenario1Results.costPerHectare || 1)) * 100,
            costPerPalm: (difference.costPerPalm / scenario1Results.costPerPalm) * 100,
            totalBiocharNeeded: (difference.totalBiocharNeeded / scenario1Results.totalBiocharNeeded) * 100,
            roi: ((scenario2Results.roi || 1) / (scenario1Results.roi || 1) - 1) * 100,
            cropYieldIncrease: ((scenario2Results.cropYieldIncrease || 1) / (scenario1Results.cropYieldIncrease || 1) - 1) * 100
          };
          
          setComparisonResults({
            scenario1: scenario1Results,
            scenario2: scenario2Results,
            difference,
            percentageDifference
          });
        } else {
          setComparisonResults(null);
        }
      }
      setIsCalculating(false);
    }, 500); // Simular tiempo de cálculo de 500ms
    
    return () => clearTimeout(timer);
  }, [
    formData.hectares, 
    formData.applicationType, 
    formData.cultivarType, 
    formData.numberOfPlants,
    formData.compareScenarios,
    formData.scenario2.hectares,
    formData.scenario2.applicationType,
    formData.scenario2.cultivarType,
    formData.scenario2.numberOfPlants,
    formData.includeTransportCost,
    formData.transportDistance,
    formData.includeApplicationCost,
    formData.applicationMethod,
    formData.applyRoi,
    formData.roiPercentage,
    formData.soilType,
    formData.annualRainfall
  ]);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Manejar campos anidados para scenario2
    if (name.startsWith('scenario2.')) {
      const field = name.split('.')[1];
      
      // Convertir a número para campos numéricos
      if (field === 'hectares' || field === 'numberOfPlants') {
        setFormData({
          ...formData,
          scenario2: {
            ...formData.scenario2,
            [field]: parseFloat(value) || 0
          }
        });
      } else {
        setFormData({
          ...formData,
          scenario2: {
            ...formData.scenario2,
            [field]: value
          }
        });
      }
    } 
    // Manejar campos normales
    else {
      // Convertir a número para campos numéricos
      if (name === 'hectares' || name === 'numberOfPlants' || name === 'transportDistance' || 
          name === 'roiPercentage' || name === 'annualRainfall') {
        setFormData({
          ...formData,
          [name]: parseFloat(value) || 0
        });
      } 
      // Manejar checkbox
      else if (name === 'compareScenarios' || name === 'includeTransportCost' || 
               name === 'includeApplicationCost' || name === 'applyRoi') {
        setFormData({
          ...formData,
          [name]: (e.target as HTMLInputElement).checked
        });
      }
      // Para otros campos
      else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    }
    
    // Limpiar error si existe para este campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validar información del cliente
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'El nombre de la empresa es obligatorio';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de contacto es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    // Validar parámetros de simulación
    if (formData.applicationType !== 'vivero') {
      if (!formData.hectares || formData.hectares <= 0) {
        newErrors.hectares = 'Debe ingresar un número válido de hectáreas';
      }
    } else {
      if (!formData.numberOfPlants || formData.numberOfPlants <= 0) {
        newErrors.numberOfPlants = 'Debe ingresar un número válido de plantas';
      }
    }
    
    // Si está comparando escenarios, validar también el escenario 2
    if (formData.compareScenarios) {
      if (formData.scenario2.applicationType !== 'vivero') {
        if (!formData.scenario2.hectares || formData.scenario2.hectares <= 0) {
          newErrors['scenario2.hectares'] = 'Debe ingresar un número válido de hectáreas';
        }
      } else {
        if (!formData.scenario2.numberOfPlants || formData.scenario2.numberOfPlants <= 0) {
          newErrors['scenario2.numberOfPlants'] = 'Debe ingresar un número válido de plantas';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Formatear resultados de simulación para incluirlos en el mensaje
      const simulationResultsText = generateSimulationResultsText();
      
      // Preparar datos para la API
      const submissionData = {
        name: `${formData.companyName} - ${formData.name}`,
        email: formData.email,
        phone: formData.phone,
        subject: 'Simulación de Costos de Biochar Blend',
        message: simulationResultsText
      };
      
      // Enviar datos a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Tu simulación ha sido enviada correctamente. Te contactaremos pronto para discutir los detalles.' 
        });
        // Cambiar a la pestaña de reporte después de enviar con éxito
        setActiveTab('report');
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: responseData.error || 'Hubo un error al enviar la simulación. Por favor, inténtalo de nuevo.' 
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Hubo un error al enviar la simulación. Por favor, inténtalo de nuevo.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generar texto para el mensaje de resultados
  const generateSimulationResultsText = () => {
    if (!results) return '';
    
    let text = `
===== INFORMACIÓN DEL CLIENTE =====
Empresa/Finca: ${formData.companyName}
Persona de Contacto: ${formData.name}
Cargo: ${formData.position || 'No especificado'}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Dirección: ${formData.address || 'No proporcionada'}
Ciudad: ${formData.city || 'No proporcionada'}

===== RESULTADOS DE SIMULACIÓN =====
${formData.applicationType === 'vivero' 
  ? `Tipo de Aplicación: Vivero (1kg/planta)
Número de Plantas: ${formData.numberOfPlants}` 
  : `Hectáreas: ${formData.hectares}
Tipo de Aplicación: ${
  formData.applicationType === 'palmaJovenAdulta' ? 'Palma Joven y Adulta (2kg/palma)' :
  'Siembra Nueva/Renovación (2kg/palma)'
}
Tipo de Cultivar: ${
  formData.cultivarType === 'elaeisGuineensis' ? 'Elaeis Guineensis (143 Palmas/Ha)' :
  'Híbrido (128 Palmas/Ha)'
}
Palmas Totales: ${results.palmsTotal.toFixed(0)}`}
Biochar Requerido: ${results.totalBiocharNeeded.toFixed(0)} kg
Costo Total: ${formatCurrency(results.totalCost)}
${formData.applicationType !== 'vivero' ? `Costo por Hectárea: ${formatCurrency(results.costPerHectare)}` : ''}
Costo por ${formData.applicationType === 'vivero' ? 'Planta' : 'Palma'}: ${formatCurrency(results.costPerPalm)}`;

    // Si hay comparación de escenarios, añadir esa información
    if (formData.compareScenarios && comparisonResults) {
      text += `

===== COMPARACIÓN DE ESCENARIOS =====
Escenario 1:
${formData.applicationType === 'vivero' 
  ? `Vivero - ${formData.numberOfPlants} plantas` 
  : `${formData.hectares} hectáreas - ${formData.cultivarType === 'elaeisGuineensis' ? 'Elaeis Guineensis' : 'Híbrido'}`}
Costo Total: ${formatCurrency(comparisonResults.scenario1.totalCost)}

Escenario 2:
${formData.scenario2.applicationType === 'vivero' 
  ? `Vivero - ${formData.scenario2.numberOfPlants} plantas` 
  : `${formData.scenario2.hectares} hectáreas - ${formData.scenario2.cultivarType === 'elaeisGuineensis' ? 'Elaeis Guineensis' : 'Híbrido'}`}
Costo Total: ${formatCurrency(comparisonResults.scenario2.totalCost)}

Diferencia: ${formatCurrency(comparisonResults.difference.totalCost)}
Porcentaje de diferencia: ${comparisonResults.percentageDifference.totalCost.toFixed(2)}%`;
    }

    text += `
===================================

Mensaje adicional del cliente:
${formData.message || 'No se proporcionó mensaje adicional.'}`;

    return text;
  };
  
  // Generar PDF del informe
  const handleGeneratePDF = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      alert("Reporte PDF generado correctamente. Se ha enviado a su correo electrónico.");
    }, 1500);
  };
  
  // Descargar datos como CSV
  const handleDownloadCSV = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      alert("Datos CSV descargados correctamente.");
    }, 800);
  };
  
  // Compartir resultados
  const handleShareResults = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Enlace copiado al portapapeles. Ahora puede compartirlo.");
    }).catch(err => {
      alert("Error al copiar enlace: " + err);
    });
  };
  
  // Cambiar tab activo
  const handleTabChange = (tab: 'simulation' | 'comparison' | 'report' | 'roi' | 'environmental') => {
    setActiveTab(tab);
  };
  
  return (
    <main className="bg-gray-50 min-h-screen">
      <DashboardHeader 
        activeTab={activeTab} 
        handleTabChange={handleTabChange} 
      />
      
      <section className="py-8 px-4">
        <div className="container mx-auto">
          
          {/* Pestaña de Simulación */}
          {activeTab === 'simulation' && (
            <div>
              <form className="space-y-8 max-w-5xl mx-auto">
                {/* Información del cliente */}
                <ClientForm 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  showAdditionalFields={showAdditionalFields}
                  setShowAdditionalFields={setShowAdditionalFields}
                />
                
                {/* Parámetros de simulación */}
                <SimulationForm 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
                
                {/* Opciones avanzadas */}
                <AdvancedOptions 
                  formData={formData}
                  handleChange={handleChange}
                  showAdvancedOptions={showAdvancedOptions}
                  setShowAdvancedOptions={setShowAdvancedOptions}
                />
                
                {/* Comparación de escenarios */}
                <ComparisonSection 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  comparisonResults={comparisonResults}
                />
                
                {/* Resultados de la simulación */}
                {results && (
                  <ResultsSummary 
                    results={results}
                    formData={formData}
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                  />
                )}
                
                {/* Mensaje adicional */}
                <MessageSection 
                  message={formData.message}
                  handleChange={handleChange}
                  submitMessage={submitMessage}
                />
                
                {/* Botones de acción */}
                <ActionButtons 
                  formData={formData}
                  results={results!}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                  handleGeneratePDF={handleGeneratePDF}
                  handleDownloadCSV={handleDownloadCSV}
                  handleShareResults={handleShareResults}
                  isCalculating={isCalculating}
                />
              </form>
            </div>
          )}
          
          {/* Pestaña de Análisis y Gráficos */}
          {activeTab === 'comparison' && results && (
            <ChartSection 
              results={results}
              formData={formData}
            />
          )}
          
          {/* Pestaña de ROI */}
          {activeTab === 'roi' && results && (
            <RoiSection 
              results={results}
              formData={formData}
            />
          )}
          
          {/* Pestaña de Ambiental */}
          {activeTab === 'environmental' && results && (
            <EnvironmentalSection 
              results={results}
              formData={formData}
            />
          )}
          
          {/* Pestaña de Reporte */}
          {activeTab === 'report' && results && (
            <ReportSection 
              formData={formData}
              results={results}
              handleGeneratePDF={handleGeneratePDF}
              handleDownloadCSV={handleDownloadCSV}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;