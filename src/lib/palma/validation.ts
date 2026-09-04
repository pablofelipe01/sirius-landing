/**
 * Validacion del lead y armado de los campos que van a Airtable.
 *
 * Se valida en el servidor porque el formulario del QR es publico: cualquiera
 * puede llamar al endpoint sin pasar por la pagina.
 */

import { EVENTO, ORIGEN_LEAD, VERSION_POLITICA } from './config';
import type { LeadPayload } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

function limpiar(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeEmail(value: unknown) {
  return limpiar(value).toLowerCase();
}

export function validateLeadPayload(payload: LeadPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (limpiar(payload.nombreCompleto).length < 3) {
    errors.nombreCompleto = 'Escribe tu nombre completo';
  }

  const email = normalizeEmail(payload.email);
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Escribe un correo valido';
  }

  if (limpiar(payload.empresa).length < 2) {
    errors.empresa = 'Escribe el nombre de tu empresa';
  }

  if (payload.autorizaTratamientoDatos !== true) {
    errors.autorizaTratamientoDatos = 'Debes autorizar el tratamiento de tus datos personales';
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

/**
 * Campos tal como se llaman en la tabla Leads Feria de Sirius CRM.
 *
 * No incluye `Estado`: ese lo mueve el equipo comercial y un reescaneo del QR
 * no debe devolver a "Nuevo" un lead que ya estaba contactado.
 */
export function buildLeadFields(
  payload: LeadPayload,
  contexto: { ip?: string; now: string }
): Record<string, unknown> {
  return {
    'Evento Codigo': EVENTO.codigo,
    'Evento Nombre': EVENTO.nombre,
    'Nombre Completo': limpiar(payload.nombreCompleto),
    Email: normalizeEmail(payload.email),
    Empresa: limpiar(payload.empresa),
    Cargo: limpiar(payload.cargo) || undefined,
    Celular: limpiar(payload.celular) || undefined,
    Pais: limpiar(payload.pais) || undefined,
    Interes: limpiar(payload.interes) || undefined,
    Origen: ORIGEN_LEAD,
    'Autoriza Tratamiento Datos': true,
    'Autoriza Comunicaciones Comerciales': payload.autorizaComunicacionesComerciales === true,
    'Version Politica': payload.versionPolitica || VERSION_POLITICA,
    'Fecha Autorizacion': contexto.now,
    'IP Autorizacion': contexto.ip || 'sin-ip',
  };
}
