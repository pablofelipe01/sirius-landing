/** Datos que envia el formulario del QR del hablador de la conferencia. */
export interface LeadPayload {
  nombreCompleto?: string;
  email?: string;
  empresa?: string;
  cargo?: string;
  celular?: string;
  pais?: string;
  interes?: string;
  /** Obligatorio: sin esta autorizacion no se guarda nada. */
  autorizaTratamientoDatos?: boolean;
  autorizaComunicacionesComerciales?: boolean;
  /** Version de la politica que vio el usuario al autorizar. */
  versionPolitica?: string;
}

export interface LeadRegistrado {
  recordId: string;
  /** true si ya existia un lead con ese correo en el evento y se actualizo. */
  actualizado: boolean;
}

export interface AirtableRecord<TFields = Record<string, unknown>> {
  id: string;
  createdTime?: string;
  fields: TFields;
}
