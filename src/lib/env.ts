/**
 * Lectura de configuración sensible desde variables de entorno.
 *
 * Ningún identificador de base, tabla o cliente debe quedar escrito en el
 * código fuente: todo se lee en tiempo de ejecución desde el entorno.
 */

export class MissingEnvError extends Error {
  readonly variables: string[];

  constructor(variables: string[]) {
    super(`Faltan variables de entorno: ${variables.join(', ')}`);
    this.name = 'MissingEnvError';
    this.variables = variables;
  }
}

export function isMissingEnvError(error: unknown): error is MissingEnvError {
  return error instanceof MissingEnvError;
}

/** Devuelve el valor de la variable o `undefined` si está vacía. */
export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Devuelve el valor de la variable o lanza `MissingEnvError`. */
export function requireEnv(name: string): string {
  const value = optionalEnv(name);
  if (!value) throw new MissingEnvError([name]);
  return value;
}

/**
 * Lee varias variables a la vez y reporta en un solo error todas las que
 * falten, para no tener que descubrirlas de a una.
 */
export function requireEnvVars<TKey extends string>(names: readonly TKey[]): Record<TKey, string> {
  const missing: string[] = [];
  const values = {} as Record<TKey, string>;

  for (const name of names) {
    const value = optionalEnv(name);
    if (!value) {
      missing.push(name);
      continue;
    }
    values[name] = value;
  }

  if (missing.length > 0) throw new MissingEnvError(missing);

  return values;
}
