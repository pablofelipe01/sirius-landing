// Definición de tipos para todo el dashboard
export interface SimulationFormData {
  // Datos del cliente
  companyName: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  
  // Parámetros de simulación
  hectares: number;
  applicationType: 'vivero' | 'palmaJovenAdulta' | 'siembraNueva';
  cultivarType: 'elaeisGuineensis' | 'hibrido';
  numberOfPlants: number;
  
  // Escenarios de comparación
  compareScenarios: boolean;
  scenario2: {
    hectares: number;
    applicationType: 'vivero' | 'palmaJovenAdulta' | 'siembraNueva';
    cultivarType: 'elaeisGuineensis' | 'hibrido';
    numberOfPlants: number;
  };
  
  // Preferencias y opciones
  includeTransportCost: boolean;
  transportDistance: number;
  includeApplicationCost: boolean;
  applicationMethod: 'manual' | 'mecanizada' | 'mixta';
  applyRoi: boolean;
  roiPercentage: number;
  
  // Datos climáticos y de suelo
  soilType: 'arenoso' | 'arcilloso' | 'limoso' | 'francoArenoso' | 'francoArcilloso';
  annualRainfall: number; // mm por año
  
  message: string;
}

export interface SimulationResults {
  totalCost: number;
  costPerHectare: number;
  costPerPalm: number;
  totalBiocharNeeded: number;
  palmsTotal: number;
  roi?: number; // Retorno de inversión estimado
  carbonCredits?: number; // Créditos de carbono estimados
  
  // Costos adicionales
  transportCost?: number;
  applicationCost?: number;
  
  // Beneficios ambientales
  waterSavings?: number; // Ahorro estimado de agua en litros/año
  soilHealthImprovement?: number; // Estimación de mejora en %
  carbonSequestration?: number; // Toneladas de CO2 secuestrado
  
  // Beneficios económicos
  cropYieldIncrease?: number; // Aumento estimado en rendimiento
  estimatedPayback?: number; // Tiempo de recuperación en años
  fiveYearProfit?: number; // Ganancia estimada en 5 años
}

export interface ComparisonResults {
  scenario1: SimulationResults;
  scenario2: SimulationResults;
  difference: {
    totalCost: number;
    costPerHectare: number;
    costPerPalm: number;
    totalBiocharNeeded: number;
    palmsTotal: number;
    transportCost?: number;
    applicationCost?: number;
    roi?: number;
    waterSavings?: number;
    cropYieldIncrease?: number;
  };
  percentageDifference: {
    totalCost: number;
    costPerHectare: number;
    costPerPalm: number;
    totalBiocharNeeded: number;
    roi?: number;
    cropYieldIncrease?: number;
  };
}

// Constantes globales para cálculos
export const BIOCHAR_PRICE_PER_KG = 1190; // COP
export const PALMS_PER_HECTARE = {
  elaeisGuineensis: 143,
  hibrido: 128
};
export const BIOCHAR_PER_PALM = {
  vivero: 1, // kg por planta
  palmaJovenAdulta: 2, // kg por palma
  siembraNueva: 2 // kg por palma
};
export const TRANSPORT_COST_PER_KM_PER_KG = 0.5; // COP - Costo aproximado por km por kg
export const APPLICATION_COST = {
  manual: 250, // COP por kg
  mecanizada: 180, // COP por kg
  mixta: 220 // COP por kg
};
export const SOIL_WATER_RETENTION = {
  arenoso: 25, // % mejora en retención de agua para suelo arenoso
  arcilloso: 15, // % mejora para suelo arcilloso
  limoso: 20,
  francoArenoso: 22,
  francoArcilloso: 18
};
export const CARBON_CREDIT_FACTOR = 0.9; // Toneladas de CO2 equivalente por tonelada de biochar