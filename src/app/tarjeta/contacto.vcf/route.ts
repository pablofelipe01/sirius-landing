/**
 * vCard que descarga quien escanea el QR de /tarjeta.
 *
 * Se sirve como ruta y no como archivo estatico para que los telefonos y el
 * correo salgan de `@/lib/contacto`: si cambia una linea, cambia aqui tambien
 * sin que nadie tenga que acordarse de regenerar un .vcf a mano.
 *
 * Las lineas van separadas por CRLF porque la especificacion de vCard lo exige
 * y iOS rechaza el archivo si solo lleva LF.
 */

import {
  DIRECCION,
  EMAIL_CONTACTO,
  TELEFONO_ALTERNATIVO,
  TELEFONO_PRINCIPAL,
} from '@/lib/contacto';

const SITIO = 'https://siriusregenerative.com';

export function GET() {
  const lineas = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;Sirius Regenerative;;;',
    'FN:Sirius Regenerative',
    'ORG:Sirius Regenerative Solutions',
    'TITLE:Agricultura regenerativa',
    // Solo las dos lineas que la tarjeta publica: el resto no sale a la calle.
    `TEL;TYPE=WORK,VOICE;PREF=1:+${TELEFONO_PRINCIPAL.numero}`,
    `TEL;TYPE=WORK,VOICE:+${TELEFONO_ALTERNATIVO.numero}`,
    `EMAIL;TYPE=WORK:${EMAIL_CONTACTO}`,
    `ADR;TYPE=WORK:;;${DIRECCION};Barranca de Upía;Meta;;Colombia`,
    `URL:${SITIO}`,
    'NOTE:Biochar y biológicos para agricultura regenerativa.',
    'END:VCARD',
  ];

  return new Response(`${lineas.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="sirius-regenerative.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
