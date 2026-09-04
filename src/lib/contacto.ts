/**
 * Fuente unica de la informacion de contacto publica.
 *
 * Antes estaba escrita a mano en Footer, ContactSection, ContactoNew y
 * ContactoFinalSection; cualquier cambio obligaba a tocar cuatro archivos.
 * El orden de `telefonos` es el orden en que se muestran: el primero es el
 * canal principal y el destino del boton de WhatsApp.
 */

export interface TelefonoContacto {
  /** Como se muestra en pantalla. */
  etiqueta: string;
  /** Solo digitos, con indicativo de pais, para wa.me y tel:. */
  numero: string;
}

export const TELEFONOS: TelefonoContacto[] = [
  { etiqueta: '+57 311 8882058', numero: '573118882058' },
  { etiqueta: '+57 320 9568566', numero: '573209568566' },
  { etiqueta: '+57 321 2206923', numero: '573212206923' },
];

/** Telefono principal: primero en la lista y destino de los enlaces directos. */
export const TELEFONO_PRINCIPAL = TELEFONOS[0];

export const EMAIL_CONTACTO = 'direccion.comercial@siriusregenerative.com';

export const DIRECCION = 'Kl-7 Vía Cabuyaro Barranca de Upía';

export const WHATSAPP_URL = `https://wa.me/${TELEFONO_PRINCIPAL.numero}`;

export const MAILTO_URL = `mailto:${EMAIL_CONTACTO}`;

export const HORARIO = {
  semana: 'Lunes a Viernes: 9am - 6pm',
  sabado: 'Sábados: 9am - 1pm',
  resumen: 'Lun-Vie: 9am-6pm, Sáb: 9am-1pm',
} as const;
