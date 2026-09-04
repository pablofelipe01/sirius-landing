/**
 * Extraccion de los campos del formulario a partir de lo que la persona dicto.
 *
 * La transcripcion llega del navegador (Web Speech API) y aqui se convierte en
 * campos estructurados con Claude. Se usa una herramienta con esquema en vez de
 * pedir "responde en JSON" porque el esquema obliga la forma de la respuesta y
 * evita tener que adivinar si vino texto suelto alrededor.
 */

import { requireEnv } from '../env';
import { INTERES_OPTIONS, PAIS_OPTIONS } from './config';

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
const MODELO = 'claude-sonnet-5';

/** Tope defensivo: el endpoint es publico y no queremos pagar transcripciones enormes. */
export const MAX_CARACTERES_TRANSCRIPCION = 2000;

/** Campos que la persona puede dictar. `null` = no se dijo o no se entendio. */
export interface CamposDictados {
  nombreCompleto: string | null;
  email: string | null;
  empresa: string | null;
  cargo: string | null;
  celular: string | null;
  pais: string | null;
  interes: string | null;
}

const HERRAMIENTA = {
  name: 'registrar_datos_contacto',
  description:
    'Registra los datos de contacto que la persona dicto en voz alta para llenar un formulario de feria.',
  input_schema: {
    type: 'object' as const,
    properties: {
      nombreCompleto: {
        type: ['string', 'null'],
        description: 'Nombre y apellidos de la persona, con mayuscula inicial en cada palabra.',
      },
      email: {
        type: ['string', 'null'],
        description:
          'Correo electronico en minusculas y sin espacios. Convierte lo dictado: "arroba" es @, "punto" es ., "guion" es -, "guion bajo" o "piso" es _. Si el dominio se dicto letra por letra, unelo.',
      },
      empresa: { type: ['string', 'null'], description: 'Nombre de la empresa u organizacion.' },
      cargo: { type: ['string', 'null'], description: 'Cargo o rol de la persona en la empresa.' },
      celular: {
        type: ['string', 'null'],
        description: 'Telefono celular solo con digitos y espacios, conservando el indicativo si lo dijo.',
      },
      pais: {
        type: ['string', 'null'],
        enum: [...PAIS_OPTIONS, null],
        description: 'Pais de la persona. Usa "Otro" si menciona un pais que no esta en la lista.',
      },
      interes: {
        type: ['string', 'null'],
        enum: [...INTERES_OPTIONS, null],
        description: 'La opcion de la lista que mas se parezca a lo que dijo que le interesa.',
      },
    },
    required: [
      'nombreCompleto',
      'email',
      'empresa',
      'cargo',
      'celular',
      'pais',
      'interes',
    ] as string[],
  },
} as const;

const INSTRUCCIONES = [
  'Recibes la transcripcion de una nota de voz grabada en un stand de feria, en espanol.',
  'La transcripcion viene de reconocimiento de voz y trae errores: palabras pegadas, falta de puntuacion y numeros escritos en letras.',
  'Llena unicamente los campos que la persona realmente dijo. Si un dato no aparece o no estas seguro, pon null en ese campo: es mejor dejarlo vacio que inventarlo, porque la persona va a revisar el formulario despues.',
  'Nunca completes un correo o un dominio que no se dicto.',
].join(' ');

interface AnthropicResponse {
  content: Array<{ type: string; name?: string; input?: unknown }>;
}

const CAMPOS: (keyof CamposDictados)[] = [
  'nombreCompleto',
  'email',
  'empresa',
  'cargo',
  'celular',
  'pais',
  'interes',
];

function limpiarCampo(valor: unknown): string | null {
  if (typeof valor !== 'string') return null;
  const limpio = valor.trim();
  if (!limpio) return null;
  // El modelo a veces devuelve la palabra "null" como texto.
  if (limpio.toLowerCase() === 'null') return null;
  return limpio;
}

/** Normaliza la respuesta del modelo a la forma que espera el formulario. */
function normalizar(input: unknown): CamposDictados {
  const datos = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const resultado = {} as CamposDictados;

  for (const campo of CAMPOS) {
    resultado[campo] = limpiarCampo(datos[campo]);
  }

  // El correo dictado casi siempre trae espacios sobrantes alrededor de @ y de los puntos.
  if (resultado.email) {
    resultado.email = resultado.email.replace(/\s+/g, '').toLowerCase();
  }

  // Solo aceptamos valores que existan en los selects del formulario.
  if (resultado.pais && !PAIS_OPTIONS.includes(resultado.pais as (typeof PAIS_OPTIONS)[number])) {
    resultado.pais = 'Otro';
  }
  if (
    resultado.interes &&
    !INTERES_OPTIONS.includes(resultado.interes as (typeof INTERES_OPTIONS)[number])
  ) {
    resultado.interes = null;
  }

  return resultado;
}

export async function extraerCamposDeTranscripcion(transcripcion: string): Promise<CamposDictados> {
  const apiKey = requireEnv('ANTHROPIC_API_KEY');

  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 1024,
      system: INSTRUCCIONES,
      tools: [HERRAMIENTA],
      tool_choice: { type: 'tool', name: HERRAMIENTA.name },
      messages: [
        {
          role: 'user',
          content: `Transcripcion de la nota de voz:\n\n"""${transcripcion}"""`,
        },
      ],
    }),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error?.message || `Anthropic respondio ${response.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  const bloque = (data as AnthropicResponse).content?.find(
    (item) => item.type === 'tool_use' && item.name === HERRAMIENTA.name
  );

  if (!bloque) {
    throw new Error('El modelo no devolvio los campos del formulario');
  }

  return normalizar(bloque.input);
}
