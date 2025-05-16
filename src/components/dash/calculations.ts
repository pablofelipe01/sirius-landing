import { 
  SimulationFormData, 
  SimulationResults,
  BIOCHAR_PRICE_PER_KG,
  PALMS_PER_HECTARE,
  BIOCHAR_PER_PALM,
  TRANSPORT_COST_PER_KM_PER_KG,
  APPLICATION_COST,
  SOIL_WATER_RETENTION,
  CARBON_CREDIT_FACTOR
} from './types';

/**
 * Calcula los resultados de la simulación basados en los parámetros proporcionados
 * @param data - Datos del escenario
 * @param formData - Datos completos del formulario (para opciones adicionales)
 * @param includeAdditionalCosts - Si se deben incluir costos adicionales
 * @returns Resultados de la simulación
 */
export const calculateResults = (
  data: {
    hectares: number,
    applicationType: 'vivero' | 'palmaJovenAdulta' | 'siembraNueva',
    cultivarType: 'elaeisGuineensis' | 'hibrido',
    numberOfPlants: number
  }, 
  formData: SimulationFormData,
  includeAdditionalCosts: boolean = true
): SimulationResults => {
  let totalPalms: number;
  let biocharPerPalm: number;
  
  if (data.applicationType === 'vivero') {
    // Para vivero, usar directamente el número de plantas especificado
    totalPalms = data.numberOfPlants;
    biocharPerPalm = BIOCHAR_PER_PALM.vivero;
  } else {
    // Para otros tipos, calcular basado en hectáreas y tipo de cultivar
    const palmsPerHectare = PALMS_PER_HECTARE[data.cultivarType];
    totalPalms = palmsPerHectare * data.hectares;
    biocharPerPalm = BIOCHAR_PER_PALM[data.applicationType];
  }
  
  const totalBiocharNeeded = totalPalms * biocharPerPalm;
  let totalCost = totalBiocharNeeded * BIOCHAR_PRICE_PER_KG;
  
  // Cálculo de costos adicionales
  let transportCost = 0;
  let applicationCost = 0;
  
  if (includeAdditionalCosts) {
    if (formData.includeTransportCost) {
      transportCost = totalBiocharNeeded * TRANSPORT_COST_PER_KM_PER_KG * formData.transportDistance;
      totalCost += transportCost;
    }
    
    if (formData.includeApplicationCost) {
      applicationCost = totalBiocharNeeded * APPLICATION_COST[formData.applicationMethod];
      totalCost += applicationCost;
    }
  }
  
  const costPerHectare = data.applicationType === 'vivero' ? 0 : (totalCost / data.hectares);
  const costPerPalm = totalCost / totalPalms;
  
  // Cálculos de ROI y beneficios
  const roiValue = formData.applyRoi ? formData.roiPercentage : 
                  data.applicationType === 'vivero' ? 15 : 
                  (data.applicationType === 'palmaJovenAdulta' ? 22 : 28);
                  
  // Cálculo de créditos de carbono
  const carbonCredits = totalBiocharNeeded * 0.001 * CARBON_CREDIT_FACTOR; // Conversión de kg a toneladas
  
  // Cálculos de beneficios ambientales
  const soilRetentionImprovement = SOIL_WATER_RETENTION[formData.soilType];
  const waterSavings = data.applicationType !== 'vivero' ? 
                      data.hectares * 10000 * 0.1 * soilRetentionImprovement / 100 * formData.annualRainfall / 1000 :
                      0; // Estimación del ahorro de agua en m3/año
  
  const soilHealthImprovement = 15 + (soilRetentionImprovement / 2); // Estimación entre 15-30% según tipo de suelo
  
  // Cálculos económicos
  const cropYieldIncrease = roiValue * 0.8; // Estimado como 80% del ROI
  const estimatedPayback = totalCost / (totalCost * (cropYieldIncrease / 100));
  const fiveYearProfit = totalCost * (cropYieldIncrease / 100) * 5 - totalCost;
  
  return {
    totalCost,
    costPerHectare,
    costPerPalm,
    totalBiocharNeeded,
    palmsTotal: totalPalms,
    roi: roiValue,
    carbonCredits,
    transportCost,
    applicationCost,
    waterSavings,
    soilHealthImprovement,
    carbonSequestration: carbonCredits * 3.67, // Factor de conversión de C a CO2
    cropYieldIncrease,
    estimatedPayback,
    fiveYearProfit
  };
};