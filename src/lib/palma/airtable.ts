/**
 * Acceso a la tabla Leads Feria de la base Sirius CRM en Airtable.
 *
 * Base y API key salen del entorno; el nombre de la tabla es configurable por
 * si cambia el nombre visible en Airtable.
 */

import { isMissingEnvError, optionalEnv, requireEnvVars } from '../env';
import { EVENTO } from './config';
import { buildLeadFields, normalizeEmail } from './validation';
import type { AirtableRecord, LeadPayload, LeadRegistrado } from './types';

const AIRTABLE_API = 'https://api.airtable.com/v0';

const ENV_BASE_ID = 'AIRTABLE_BASE_ID_SIRIUS_CRM';
const ENV_API_KEY = 'AIRTABLE_API_KEY_SIRIUS_CRM';

const TABLA_LEADS = optionalEnv('AIRTABLE_TABLE_LEADS_FERIA') || 'Leads Feria';

class AirtableConfigError extends Error {
  readonly variables: string[];

  constructor(variables: string[]) {
    super(`Falta configurar en el entorno: ${variables.join(', ')}`);
    this.name = 'AirtableConfigError';
    this.variables = variables;
  }
}

export function isAirtableConfigError(error: unknown): error is AirtableConfigError {
  return error instanceof AirtableConfigError;
}

function getConfig() {
  try {
    const env = requireEnvVars([ENV_BASE_ID, ENV_API_KEY] as const);
    return { baseId: env[ENV_BASE_ID], apiKey: env[ENV_API_KEY] };
  } catch (error) {
    if (isMissingEnvError(error)) throw new AirtableConfigError(error.variables);
    throw error;
  }
}

function tableUrl(recordId?: string) {
  const { baseId } = getConfig();
  return `${AIRTABLE_API}/${baseId}/${encodeURIComponent(TABLA_LEADS)}${recordId ? `/${recordId}` : ''}`;
}

function escapeFormulaString(value: string) {
  return String(value).replace(/'/g, "\'");
}

async function airtableFetch<T>(url: string, init: RequestInit = {}): Promise<T> {
  const { apiKey } = getConfig();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: ['Bearer', apiKey].join(' '),
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error?.message || data?.error || `Airtable respondio ${response.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data as T;
}

/** Evita duplicados cuando alguien escanea el QR dos veces. */
async function findLeadByEmail(email: string) {
  const params = new URLSearchParams({
    maxRecords: '1',
    filterByFormula: `AND({Email} = '${escapeFormulaString(email)}', {Evento Codigo} = '${escapeFormulaString(EVENTO.codigo)}')`,
  });
  const data = await airtableFetch<{ records: AirtableRecord[] }>(`${tableUrl()}?${params.toString()}`);
  return data.records[0] || null;
}

export async function registrarLead(payload: LeadPayload, ip?: string): Promise<LeadRegistrado> {
  const now = new Date().toISOString();
  const fields = buildLeadFields(payload, { ip, now });
  const existente = await findLeadByEmail(normalizeEmail(payload.email));

  if (existente) {
    const actualizado = await airtableFetch<AirtableRecord>(tableUrl(existente.id), {
      method: 'PATCH',
      body: JSON.stringify({ fields }),
    });
    return { recordId: actualizado.id, actualizado: true };
  }

  // El estado inicial solo se escribe al crear, nunca al actualizar.
  const creado = await airtableFetch<{ records: AirtableRecord[] }>(tableUrl(), {
    method: 'POST',
    body: JSON.stringify({ records: [{ fields: { ...fields, Estado: 'Nuevo' } }] }),
  });

  return { recordId: creado.records[0].id, actualizado: false };
}
