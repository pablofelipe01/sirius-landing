/**
 * Configuracion del evento y de las opciones del formulario del QR.
 *
 * El codigo y el nombre del evento se pueden sobreescribir por entorno para
 * reutilizar el mismo flujo en otra feria sin tocar el codigo.
 */

import { optionalEnv } from '../env';

export const EVENTO = {
  codigo: optionalEnv('PALMA_EVENTO_CODIGO') || 'CONF-PALMA-2026',
  nombre: optionalEnv('PALMA_EVENTO_NOMBRE') || 'Conferencia Internacional de Palma de Aceite 2026',
  /** Se muestra en el encabezado del formulario. */
  fecha: optionalEnv('PALMA_EVENTO_FECHA') || 'Septiembre de 2026',
} as const;

/** Version de la politica de tratamiento de datos que se registra con el consentimiento. */
export const VERSION_POLITICA = optionalEnv('PALMA_VERSION_POLITICA') || '2026-09';

/** De donde llego el lead; util cuando existan varios canales de captura. */
export const ORIGEN_LEAD = 'QR hablador comercial';

/**
 * Estas cadenas deben coincidir exactamente con las opciones de los campos
 * "Interes" y "Pais" en la tabla Leads Feria de Airtable: son singleSelect y
 * rechazan cualquier valor que no exista como opcion.
 */
export const INTERES_OPTIONS = [
  'Sirius Char (biochar)',
  'Biochar Blend',
  'Ambos productos',
  'Asesoría técnica',
  'Distribución / representación comercial',
  'Solo información general',
] as const;

export const PAIS_OPTIONS = [
  'Colombia',
  'Ecuador',
  'Perú',
  'Brasil',
  'México',
  'Guatemala',
  'Honduras',
  'Costa Rica',
  'Otro',
] as const;

/**
 * Contactos que se muestran en la ficha tecnica.
 *
 * PENDIENTE: falta el numero de Alejandro; hasta que se llene, la ficha no
 * muestra esa tarjeta.
 */
export interface ContactoFicha {
  nombre: string;
  cargo: string;
  email?: string;
  /** Etiqueta visible del telefono. */
  telefono?: string;
  /** Solo digitos con indicativo, para wa.me y tel:. */
  telefonoDigitos?: string;
}

export const CONTACTOS_FICHA: ContactoFicha[] = [
  {
    nombre: 'Angélica Herrera',
    cargo: 'Dirección Comercial',
    email: 'direccion.comercial@siriusregenerative.com',
    telefono: '+57 311 8882058',
    telefonoDigitos: '573118882058',
  },
  {
    nombre: 'Alejandro',
    cargo: 'PENDIENTE',
    telefono: 'PENDIENTE',
    telefonoDigitos: 'PENDIENTE',
  },
];

/** Solo se muestran los contactos que ya tienen datos reales. */
export function contactosPublicables() {
  return CONTACTOS_FICHA.filter(
    (contacto) => contacto.telefonoDigitos !== 'PENDIENTE' && contacto.telefono !== 'PENDIENTE'
  );
}
