// Funciones de utilidad para el dashboard

/**
 * Formatea un número como moneda COP
 * @param value - Valor a formatear
 * @returns Cadena formateada como moneda
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formatea un número como porcentaje
 * @param value - Valor a formatear
 * @returns Cadena formateada como porcentaje
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

/**
 * Obtiene el texto descriptivo del tipo de aplicación
 * @param type - Tipo de aplicación
 * @returns Texto descriptivo
 */
export const getApplicationTypeText = (type: 'vivero' | 'palmaJovenAdulta' | 'siembraNueva'): string => {
  switch (type) {
    case 'vivero':
      return 'Vivero (1kg/planta)';
    case 'palmaJovenAdulta':
      return 'Palma Joven y Adulta (2kg/palma)';
    case 'siembraNueva':
      return 'Siembra Nueva/Renovación (2kg/palma)';
  }
};

/**
 * Obtiene el texto descriptivo del tipo de cultivar
 * @param type - Tipo de cultivar
 * @returns Texto descriptivo
 */
export const getCultivarTypeText = (type: 'elaeisGuineensis' | 'hibrido'): string => {
  switch (type) {
    case 'elaeisGuineensis':
      return 'Elaeis Guineensis (143 Palmas/Ha)';
    case 'hibrido':
      return 'Híbrido (128 Palmas/Ha)';
  }
};

/**
 * Obtiene el texto descriptivo del tipo de suelo
 * @param type - Tipo de suelo
 * @returns Texto descriptivo
 */
export const getSoilTypeText = (type: 'arenoso' | 'arcilloso' | 'limoso' | 'francoArenoso' | 'francoArcilloso'): string => {
  switch (type) {
    case 'arenoso':
      return 'Suelo Arenoso';
    case 'arcilloso':
      return 'Suelo Arcilloso';
    case 'limoso':
      return 'Suelo Limoso';
    case 'francoArenoso':
      return 'Suelo Franco Arenoso';
    case 'francoArcilloso':
      return 'Suelo Franco Arcilloso';
  }
};

/**
 * Obtiene el texto descriptivo del método de aplicación
 * @param method - Método de aplicación
 * @returns Texto descriptivo
 */
export const getApplicationMethodText = (method: 'manual' | 'mecanizada' | 'mixta'): string => {
  switch (method) {
    case 'manual':
      return 'Aplicación Manual';
    case 'mecanizada':
      return 'Aplicación Mecanizada';
    case 'mixta':
      return 'Aplicación Mixta (Manual y Mecanizada)';
  }
};