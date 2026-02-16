/**
 * Servicio para interactuar con la API de Airtable
 * Base: Sirius Nomina Core
 */

interface TeamMember {
  id: string;
  fields: {
    'Nombre completo': string;
    'Rol'?: string[];
    'Tipo Personal': string;
    'Correo electrónico': string;
    'Estado de actividad': string;
    'Teléfono'?: string;
    'Numero Documento'?: string;
    'Fecha de nacimiento'?: string;
    'Dirección'?: string;
    'Foto URL'?: string;
    'Areas'?: string[];
  };
  createdTime: string;
}

interface RolData {
  id: string;
  fields: {
    'Rol': string;
    'Descripción del rol'?: {
      value: string;
    };
  };
}

interface AreaData {
  id: string;
  fields: {
    'Nombre del Area': string;
  };
}

interface ProcessedTeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  documentNumber?: string;
  birthDate?: string;
  address?: string;
  photoUrl?: string;
  status: string;
}

const BASE_ID = process.env.AIRTABLE_BASE_ID_SIRIUS_NOMINA_CORE;
const API_KEY = process.env.AIRTABLE_API_KEY_SIRIUS_NOMINA_CORE;
const PERSONAL_TABLE = process.env.AIRTABLE_TABLE_NOMINA_PERSONAL;
const ROLES_TABLE = process.env.AIRTABLE_TABLE_NOMINA_ROLES;
const AREAS_TABLE = process.env.AIRTABLE_TABLE_NOMINA_AREAS;

const API_BASE_URL = 'https://api.airtable.com/v0';

/**
 * Obtiene todos los empleados activos de la API de Airtable
 * @returns {Promise<ProcessedTeamMember[]>} Array de miembros del equipo procesados
 */
export const getActiveTeamMembers = async (): Promise<ProcessedTeamMember[]> => {
  try {
    if (!BASE_ID || !API_KEY) {
      console.error('Environment variables for Airtable are not configured');
      return [];
    }

    const filterFormula = "({Estado de actividad} = 'Activo')";
    const encodedFormula = encodeURIComponent(filterFormula);
    const url = `${API_BASE_URL}/${BASE_ID}/${PERSONAL_TABLE}?filterByFormula=${encodedFormula}&pageSize=100`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status}`, await response.text());
      return [];
    }

    const data = await response.json();
    const records: TeamMember[] = data.records || [];

    // Procesar los registros para extraer información relevante
    const processedMembers: ProcessedTeamMember[] = await Promise.all(
      records.map(async (record) => {
        const fields = record.fields;
        let roleName = 'Sin rol asignado';

        // Obtener nombre del rol si existe
        if (fields['Rol'] && fields['Rol'].length > 0) {
          const rolesData = await getRoleNames(fields['Rol']);
          roleName = rolesData.length > 0 ? rolesData[0] : 'Sin rol asignado';
        }

        return {
          id: record.id,
          name: fields['Nombre completo'] || 'Sin nombre',
          role: roleName,
          email: fields['Correo electrónico'] || '',
          phone: fields['Teléfono'],
          documentNumber: fields['Numero Documento'],
          birthDate: fields['Fecha de nacimiento'],
          address: fields['Dirección'],
          photoUrl: fields['Foto URL'],
          status: fields['Estado de actividad'],
        };
      })
    );

    return processedMembers;
  } catch (error) {
    console.error('Error fetching active team members:', error);
    return [];
  }
};

/**
 * Obtiene los nombres de los roles basado en sus IDs
 * @param {string[]} roleIds - Array de IDs de roles
 * @returns {Promise<string[]>} Array de nombres de roles
 */
const getRoleNames = async (roleIds: string[]): Promise<string[]> => {
  try {
    if (!BASE_ID || !API_KEY || roleIds.length === 0) {
      return [];
    }

    // Obtener todos los roles y mapear por ID
    const url = `${API_BASE_URL}/${BASE_ID}/${ROLES_TABLE}?pageSize=100`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const roles = data.records || [];

    const rolesMap = new Map(
      roles.map((role: RolData) => [role.id, role.fields['Rol']])
    );

    return roleIds.map(id => rolesMap.get(id) || 'Sin rol').filter(Boolean);
  } catch (error) {
    console.error('Error fetching role names:', error);
    return [];
  }
};

/**
 * Obtiene todas las áreas de la API de Airtable
 * @returns {Promise<AreaData[]>} Array de áreas
 */
export const getAreas = async (): Promise<AreaData[]> => {
  try {
    if (!BASE_ID || !API_KEY) {
      return [];
    }

    const url = `${API_BASE_URL}/${BASE_ID}/${AREAS_TABLE}?pageSize=100`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
};
