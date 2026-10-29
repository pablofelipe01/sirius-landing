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
];

/** Telefono principal: primero en la lista y destino de los enlaces directos. */
export const TELEFONO_PRINCIPAL = TELEFONOS[0];

/**
 * Linea atendida por el chatbot conversacional: es el destino del boton de
 * WhatsApp de la tarjeta digital, no de los enlaces del sitio principal.
 */
export const WHATSAPP_BOT: TelefonoContacto = {
  etiqueta: '+57 322 4183251',
  numero: '573224183251',
};

export const EMAIL_CONTACTO = 'direccion.comercial@siriusregenerative.com';

export const DIRECCION = 'Kl-7 Vía Cabuyaro Barranca de Upía';

export const WHATSAPP_URL = `https://wa.me/${TELEFONO_PRINCIPAL.numero}`;

export const MAILTO_URL = `mailto:${EMAIL_CONTACTO}`;

export const HORARIO = {
  lunesAMiercoles: 'Lunes a Miércoles: 7am - 5pm',
  jueves: 'Jueves: 7am - 4pm',
  viernes: 'Viernes: 7am - 3pm',
  resumen: 'Lun-Mié: 7am-5pm, Jue: 7am-4pm, Vie: 7am-3pm',
} as const;
