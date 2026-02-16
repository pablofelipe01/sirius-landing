/**
 * Verificación simple de las variables de entorno
 * 
 * Si ves este archivo, significa que tu proyecto está estructurado correctamente.
 * Las variables de entorno deberían estar configuradas en .env.local
 * 
 * Variables requeridas:
 * - AIRTABLE_BASE_ID_SIRIUS_NOMINA_CORE
 * - AIRTABLE_API_KEY_SIRIUS_NOMINA_CORE
 * - AIRTABLE_TABLE_NOMINA_PERSONAL
 * - AIRTABLE_TABLE_NOMINA_ROLES
 * 
 * Cómo verificar:
 * 1. Ve a http://localhost:3000/api/team-members
 * 2. Deberías ver una respuesta JSON con los datos del equipo
 * 3. Si ves un error, reinicia el servidor con: npm run dev
 */

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const envVars = {
    BASE_ID: process.env.AIRTABLE_BASE_ID_SIRIUS_NOMINA_CORE ? '✓' : '✗',
    API_KEY: process.env.AIRTABLE_API_KEY_SIRIUS_NOMINA_CORE ? '✓' : '✗',
    PERSONAL_TABLE: process.env.AIRTABLE_TABLE_NOMINA_PERSONAL ? '✓' : '✗',
    ROLES_TABLE: process.env.AIRTABLE_TABLE_NOMINA_ROLES ? '✓' : '✗',
  };

  return Response.json({
    status: 'Environment check',
    variables: envVars,
    allConfigured: Object.values(envVars).every(v => v === '✓'),
  });
}
