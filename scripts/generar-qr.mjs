/**
 * Genera el QR para imprimir en el hablador comercial.
 *
 * Salida en SVG (vectorial, escala a cualquier tamano sin perder nitidez, es
 * lo que pide la imprenta) y en PNG de alta resolucion como respaldo.
 *
 *   node scripts/generar-qr.mjs https://siriusregenerative.com/palma
 *
 * Opciones:
 *   --nombre <base>   nombre base de los archivos (default: qr-palma)
 *   --salida <dir>    carpeta destino (default: public/qr)
 *   --px <numero>     ancho del PNG en pixeles (default: 3000, ~10 cm a 750 dpi)
 *
 * Nivel de correccion de errores: Q (30% aprox.). Sube la tolerancia a
 * rayones y a suciedad en un hablador que va a estar en un stand.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import QRCode from 'qrcode';

function parseArgs(argv) {
  const posicionales = [];
  const opciones = { nombre: 'qr-palma', salida: 'public/qr', px: 3000 };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--nombre' || arg === '--salida') {
      opciones[arg.slice(2)] = argv[i + 1];
      i += 1;
    } else if (arg === '--px') {
      opciones.px = Number(argv[i + 1]);
      i += 1;
    } else {
      posicionales.push(arg);
    }
  }

  return { url: posicionales[0], opciones };
}

const { url, opciones } = parseArgs(process.argv.slice(2));

if (!url) {
  console.error('Falta la URL. Ejemplo:');
  console.error('  node scripts/generar-qr.mjs https://siriusregenerative.com/palma');
  process.exit(1);
}

try {
  // Falla temprano si la URL esta mal escrita: un QR con typo no se detecta
  // hasta que ya esta impreso.
  new URL(url);
} catch {
  console.error(`URL invalida: ${url}`);
  process.exit(1);
}

if (!Number.isFinite(opciones.px) || opciones.px < 500) {
  console.error('--px debe ser un numero mayor o igual a 500');
  process.exit(1);
}

const config = {
  errorCorrectionLevel: 'Q',
  margin: 4, // Zona de silencio recomendada: 4 modulos.
  color: { dark: '#000000', light: '#FFFFFF' },
};

const dirSalida = resolve(process.cwd(), opciones.salida);
await mkdir(dirSalida, { recursive: true });

const rutaSvg = join(dirSalida, `${opciones.nombre}.svg`);
const rutaPng = join(dirSalida, `${opciones.nombre}.png`);

const svg = await QRCode.toString(url, { ...config, type: 'svg' });
await writeFile(rutaSvg, svg, 'utf8');

const png = await QRCode.toBuffer(url, { ...config, type: 'png', width: opciones.px });
await mkdir(dirname(rutaPng), { recursive: true });
await writeFile(rutaPng, png);

console.log(`URL codificada: ${url}`);
console.log(`SVG (para imprenta): ${rutaSvg}`);
console.log(`PNG ${opciones.px}px:      ${rutaPng}`);
console.log('Nivel de correccion: Q. Imprimir a 3 cm de lado como minimo.');
