export interface AirtableRecord<TFields = Record<string, unknown>> {
  id: string;
  createdTime?: string;
  fields: TFields;
}

export interface EventoFields {
  evento_codigo?: string;
  nombre_evento?: string;
  tipo_evento?: string;
  organizador_area?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  lugar?: string;
  departamento?: string;
  municipio?: string;
  cupo_maximo?: number;
  cupo_manana?: number;
  cupo_tarde?: number;
  emite_certificado?: boolean;
  minutos_minimos_certificado?: number;
  version_politica?: string;
  inscritos?: number;
}

export interface EventoPublico {
  id: string;
  codigo: string;
  nombre: string;
  tipo?: string;
  area?: string;
  fechaInicio?: string;
  fechaFin?: string;
  lugar?: string;
  departamento?: string;
  municipio?: string;
  cupoMaximo?: number;
  inscritos?: number;
  versionPolitica?: string;
}

export interface AttendancePayload {
  eventoRecordId?: string;
  eventoCodigo?: string;
  nombreCompleto?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  celular?: string;
  email?: string;
  perfilAsistente?: string;
  departamento?: string;
  municipio?: string;
  anioNacimiento?: string | number;
  genero?: string;
  cargo?: string;
  cultivos?: string[];
  areaHectareasRango?: string;
  usaBioinsumos?: string;
  emergenciaNombre?: string;
  emergenciaCelular?: string;
  emergenciaRelacion?: string;
  jornada?: string;
  canalEnterado?: string;
  temasInteres?: string[];
  expectativa?: string;
  numAcompanantes?: string | number;
  requiereTransporte?: string;
  puntoRecogida?: string;
  requiereParqueadero?: boolean;
  placaVehiculo?: string;
  preferenciaAlimentacion?: string;
  restriccionAlimentariaMedica?: string;
  apoyoAccesibilidad?: string[];
  eps?: string;
  requiereAlojamiento?: string;
  entregoKit?: boolean;
  observaciones?: string;
  autorizaTratamientoDatos?: boolean;
  autorizaComunicacionesComerciales?: boolean;
  autorizaUsoImagen?: boolean;
  autorizaDatosSensibles?: boolean;
  versionPolitica?: string;
  ipAutorizacion?: string;
}
