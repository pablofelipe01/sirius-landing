export const TIPO_DOCUMENTO_OPTIONS = ['CC', 'CE', 'PA', 'PPT/PEP', 'TI', 'NIT'] as const;

export const PERFIL_ASISTENTE_OPTIONS = [
  'Productor / agricultor',
  'Técnico o agrónomo',
  'Distribuidor o comercializador',
  'Estudiante',
  'Docente / investigador',
  'Entidad pública o gremio',
  'Proveedor / aliado',
  'Otro',
] as const;

export const GENERO_OPTIONS = ['Femenino', 'Masculino', 'Otro', 'Prefiero no responder'] as const;

export const CARGO_OPTIONS = [
  'Propietario / gerente',
  'Administrador de finca',
  'Jefe técnico',
  'Asesor técnico',
  'Operario de campo',
  'Comprador / compras',
  'Comercial',
  'Estudiante',
  'Docente / investigador',
  'Otro',
] as const;

export const CULTIVO_OPTIONS = [
  'Palma',
  'Caña',
  'Arroz',
  'Café',
  'Cacao',
  'Banano / plátano',
  'Aguacate',
  'Cítricos',
  'Hortalizas',
  'Flores',
  'Pastos / ganadería',
  'Forestales',
  'Otro',
] as const;

export const AREA_HECTAREAS_OPTIONS = [
  'Menos de 5 ha',
  '5-20 ha',
  '21-100 ha',
  '101-500 ha',
  'Más de 500 ha',
  'No aplica',
] as const;

export const USA_BIOINSUMOS_OPTIONS = [
  'Sí, de forma regular',
  'Sí, en pruebas',
  'No, pero me interesa',
  'No',
] as const;

export const JORNADA_OPTIONS = ['Mañana (8:00-12:00)', 'Tarde (1:00-5:00)', 'Todo el día'] as const;

export const CANAL_ENTERADO_OPTIONS = [
  'WhatsApp',
  'Instagram',
  'LinkedIn',
  'Correo de Sirius',
  'Invitación de un asesor',
  'Recomendación de un colega',
  'Gremio o asociación',
  'Otro',
] as const;

export const TEMAS_INTERES_OPTIONS = [
  'Biofertilizantes',
  'Control biológico',
  'Biochar / enmiendas',
  'Suelos y microbiología',
  'Reducción de costos de fertilización',
  'Certificaciones y mercados',
  'Casos de finca',
  'Investigación y desarrollo',
] as const;

export const TRANSPORTE_OPTIONS = [
  'No, llego por mi cuenta',
  'Sí, en el bus desde Bogotá',
  'Sí, en el bus desde Villavicencio',
] as const;

export const ALIMENTACION_OPTIONS = [
  'Sin preferencia',
  'Vegetariano',
  'Vegano',
  'Sin gluten',
  'Sin lactosa',
  'Otra',
] as const;

export const ACCESIBILIDAD_OPTIONS = ['No requiero', 'Movilidad reducida', 'Apoyo visual', 'Apoyo auditivo', 'Otro'] as const;

export const ALOJAMIENTO_OPTIONS = ['No', 'Sí, noche anterior', 'Sí, noche del evento', 'Sí, ambas'] as const;

export const EMERGENCIA_RELACION_OPTIONS = [
  'Pareja',
  'Padre/madre',
  'Hijo/hija',
  'Hermano/hermana',
  'Amigo/a',
  'Compañero de trabajo',
  'Otro',
] as const;
