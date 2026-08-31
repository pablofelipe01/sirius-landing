import { isMissingEnvError, optionalEnv, requireEnvVars } from '../env';
import type { AirtableRecord, AttendancePayload, EventoFields, EventoPublico } from './types';
import {
  buildConsentimientoRecords,
  buildInscripcionFields,
  buildPersonaFields,
  normalizeDocumentKey,
} from './validation';

const AIRTABLE_API = 'https://api.airtable.com/v0';

const ENV_BASE_ID = 'AIRTABLE_BASE_ID_SIRIUS_ASISTENCIA_EVENTOS';
const ENV_API_KEY = 'AIRTABLE_API_KEY_SIRIUS_ASISTENCIA_EVENTOS';

/** Nombres de tabla configurables; el default es solo el nombre visible en Airtable. */
const TABLES = {
  eventos: optionalEnv('AIRTABLE_TABLE_ASISTENCIA_EVENTOS') || 'Eventos',
  personas: optionalEnv('AIRTABLE_TABLE_ASISTENCIA_PERSONAS') || 'Personas',
  inscripciones: optionalEnv('AIRTABLE_TABLE_ASISTENCIA_INSCRIPCIONES') || 'Inscripciones',
  consentimientos: optionalEnv('AIRTABLE_TABLE_ASISTENCIA_CONSENTIMIENTOS') || 'Consentimientos',
} as const;

interface AirtableListResponse<TFields> {
  records: AirtableRecord<TFields>[];
  offset?: string;
}

class AirtableConfigError extends Error {
  readonly variables: string[];

  constructor(variables: string[]) {
    super(`Falta configurar en el entorno: ${variables.join(', ')}`);
    this.name = 'AirtableConfigError';
    this.variables = variables;
  }
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

function tableUrl(tableName: string, recordId?: string) {
  const { baseId } = getConfig();
  const encodedTable = encodeURIComponent(tableName);
  return `${AIRTABLE_API}/${baseId}/${encodedTable}${recordId ? `/${recordId}` : ''}`;
}

function escapeFormulaString(value: string) {
  return String(value).replace(/'/g, "\\'");
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
    const message = data?.error?.message || data?.error || `Airtable respondió ${response.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data as T;
}

async function listRecords<TFields>(tableName: string, params: URLSearchParams) {
  const data = await airtableFetch<AirtableListResponse<TFields>>(`${tableUrl(tableName)}?${params.toString()}`);
  return data.records;
}

async function createRecord<TFields>(tableName: string, fields: Record<string, unknown>) {
  const data = await airtableFetch<{ records: AirtableRecord<TFields>[] }>(tableUrl(tableName), {
    method: 'POST',
    body: JSON.stringify({ records: [{ fields }] }),
  });
  return data.records[0];
}

async function updateRecord<TFields>(tableName: string, recordId: string, fields: Record<string, unknown>) {
  return airtableFetch<AirtableRecord<TFields>>(tableUrl(tableName, recordId), {
    method: 'PATCH',
    body: JSON.stringify({ fields }),
  });
}

export function toEventoPublico(record: AirtableRecord<EventoFields>): EventoPublico {
  const fields = record.fields;
  return {
    id: record.id,
    codigo: fields.evento_codigo || record.id,
    nombre: fields.nombre_evento || 'Evento sin nombre',
    tipo: fields.tipo_evento,
    area: fields.organizador_area,
    fechaInicio: fields.fecha_inicio,
    fechaFin: fields.fecha_fin,
    lugar: fields.lugar,
    departamento: fields.departamento,
    municipio: fields.municipio,
    cupoMaximo: fields.cupo_maximo,
    inscritos: fields.inscritos,
    versionPolitica: fields.version_politica,
  };
}

export async function listEventosPublicos(): Promise<EventoPublico[]> {
  const params = new URLSearchParams({
    pageSize: '100',
    fields: '',
  });

  params.delete('fields');
  const records = await listRecords<EventoFields>(TABLES.eventos, params);
  return records
    .map(toEventoPublico)
    .sort((a, b) => String(a.fechaInicio || '').localeCompare(String(b.fechaInicio || '')));
}

export async function findEventoByCodigo(codigo: string) {
  const params = new URLSearchParams({
    maxRecords: '1',
    filterByFormula: `{evento_codigo} = '${escapeFormulaString(codigo)}'`,
  });
  const records = await listRecords<EventoFields>(TABLES.eventos, params);
  return records[0] || null;
}

export async function getEvento(recordId: string) {
  return airtableFetch<AirtableRecord<EventoFields>>(tableUrl(TABLES.eventos, recordId));
}

async function findPersonaByDocumentoKey(documentoKey: string) {
  const params = new URLSearchParams({
    maxRecords: '1',
    filterByFormula: `{documento_key} = '${escapeFormulaString(documentoKey)}'`,
  });
  const records = await listRecords<Record<string, unknown>>(TABLES.personas, params);
  return records[0] || null;
}

async function upsertPersona(payload: AttendancePayload) {
  const fields = buildPersonaFields(payload);
  const documentoKey = fields.documento_key as string;
  const existing = await findPersonaByDocumentoKey(documentoKey);

  if (existing) {
    return updateRecord(TABLES.personas, existing.id, fields);
  }

  return createRecord(TABLES.personas, fields);
}

async function findInscripcionById(idInscripcion: string) {
  const params = new URLSearchParams({
    maxRecords: '1',
    filterByFormula: `{id_inscripcion} = '${escapeFormulaString(idInscripcion)}'`,
  });
  const records = await listRecords<Record<string, unknown>>(TABLES.inscripciones, params);
  return records[0] || null;
}

export async function registrarAsistencia(payload: AttendancePayload, ip?: string) {
  const now = new Date().toISOString();
  const evento = payload.eventoRecordId
    ? await getEvento(payload.eventoRecordId)
    : await findEventoByCodigo(String(payload.eventoCodigo || ''));

  if (!evento) {
    throw new Error('No se encontró el evento seleccionado en Airtable');
  }

  const eventoPublico = toEventoPublico(evento);
  const persona = await upsertPersona(payload);
  const documentoKey = normalizeDocumentKey(payload.tipoDocumento, payload.numeroDocumento);
  const versionPolitica = payload.versionPolitica || eventoPublico.versionPolitica || 'vigente';

  const inscripcionFields = buildInscripcionFields(
    {
      ...payload,
      eventoRecordId: evento.id,
      eventoCodigo: eventoPublico.codigo,
      personaRecordId: persona.id,
      documentoKey,
      versionPolitica,
      ipAutorizacion: ip,
    },
    now
  );

  const idInscripcion = inscripcionFields.id_inscripcion as string;
  const existingInscripcion = await findInscripcionById(idInscripcion);
  const inscripcion = existingInscripcion
    ? await updateRecord(TABLES.inscripciones, existingInscripcion.id, inscripcionFields)
    : await createRecord(TABLES.inscripciones, inscripcionFields);

  const consentimientos = buildConsentimientoRecords({
    personaRecordId: persona.id,
    inscripcionRecordId: inscripcion.id,
    versionPolitica,
    ip,
    now,
    consentimientos: payload,
  });

  if (!existingInscripcion && consentimientos.length > 0) {
    await airtableFetch(tableUrl(TABLES.consentimientos), {
      method: 'POST',
      body: JSON.stringify({ records: consentimientos }),
    });
  }

  return {
    evento: eventoPublico,
    personaId: persona.id,
    inscripcionId: inscripcion.id,
    idInscripcion,
    actualizado: Boolean(existingInscripcion),
  };
}

export function isAirtableConfigError(error: unknown): error is AirtableConfigError {
  return error instanceof AirtableConfigError;
}
