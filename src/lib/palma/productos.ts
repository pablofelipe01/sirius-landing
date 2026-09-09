/**
 * Fichas tecnicas que se muestran tras el registro del QR.
 *
 * Se sirve el PDF oficial tal cual, no una version rearmada en HTML: el PDF ya
 * viene disenado, versionado y aprobado, y asi no hay dos fuentes de verdad que
 * se puedan desincronizar cuando cambie un valor de laboratorio.
 *
 * Para actualizar una ficha: reemplaza el archivo en public/fichas/ y sube la
 * `version` de abajo. Para agregar un producto: copia su PDF a public/fichas/ y
 * agrega su entrada aqui.
 */

export interface FichaProducto {
  id: string;
  nombre: string;
  /** Bajada corta del producto, la que trae la ficha bajo el nombre. */
  claim: string;
  /** Ruta publica del PDF, o null mientras no exista el archivo. */
  archivo: string | null;
  /** Version y fecha que declara el PDF, para que se vea qué se está mostrando. */
  version: string | null;
  /** Peso aproximado, para avisar antes de abrirlo con datos moviles. */
  peso: string | null;
}

// El orden de este arreglo es el orden en que se muestran las fichas.
export const FICHAS: FichaProducto[] = [
  {
    id: 'sirius-char-filtro',
    nombre: 'Sirius Char Filtro',
    claim: 'Biochar filtrante de pirólisis controlada',
    archivo: '/fichas/sirius-char-filtro-ficha-tecnica.pdf',
    // PENDIENTE: confirmar la version y fecha que declara el PDF.
    version: null,
    peso: '172 KB',
  },
  {
    id: 'biochar-blend',
    nombre: 'Biochar Blend',
    claim: 'Acondicionador Orgánico de Suelos',
    archivo: '/fichas/biochar-blend-ficha-tecnica.pdf',
    version: 'Versión 2.0 · Abril 2026',
    peso: '197 KB',
  },
];

/** Fichas que ya tienen su PDF cargado. */
export function fichasDisponibles() {
  return FICHAS.filter((ficha) => ficha.archivo !== null);
}

/** Fichas anunciadas pero cuyo PDF todavia no existe. */
export function fichasPendientes() {
  return FICHAS.filter((ficha) => ficha.archivo === null);
}
