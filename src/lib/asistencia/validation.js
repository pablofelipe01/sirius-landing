const REQUIRED_MESSAGE = 'Este campo es obligatorio';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeDocumentNumber(numeroDocumento) {
  return cleanString(numeroDocumento).replace(/[^0-9A-Za-z]/g, '').toUpperCase();
}

function normalizeDocumentKey(tipoDocumento, numeroDocumento) {
  const tipo = cleanString(tipoDocumento).toUpperCase();
  const numero = normalizeDocumentNumber(numeroDocumento);
  return `${tipo}-${numero}`;
}

function compactFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

function validateAttendancePayload(payload = {}) {
  const errors = {};

  if (!cleanString(payload.eventoRecordId) && !cleanString(payload.eventoCodigo)) {
    errors.evento = REQUIRED_MESSAGE;
  }
  if (!cleanString(payload.nombreCompleto)) errors.nombreCompleto = REQUIRED_MESSAGE;
  if (!cleanString(payload.tipoDocumento)) errors.tipoDocumento = REQUIRED_MESSAGE;
  if (!cleanString(payload.numeroDocumento)) errors.numeroDocumento = REQUIRED_MESSAGE;
  if (!cleanString(payload.celular)) errors.celular = REQUIRED_MESSAGE;

  const email = cleanString(payload.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Correo electrónico inválido';
  }

  if (payload.autorizaTratamientoDatos !== true) {
    errors.autorizaTratamientoDatos = 'La autorización de tratamiento de datos es obligatoria';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

function buildPersonaFields(payload = {}) {
  const tipoDocumento = cleanString(payload.tipoDocumento).toUpperCase();
  const numeroDocumento = normalizeDocumentNumber(payload.numeroDocumento);

  return compactFields({
    documento_key: normalizeDocumentKey(tipoDocumento, numeroDocumento),
    nombre_completo: cleanString(payload.nombreCompleto),
    tipo_documento: tipoDocumento,
    numero_documento: numeroDocumento,
    celular: cleanString(payload.celular),
    email: cleanString(payload.email),
    perfil_asistente: cleanString(payload.perfilAsistente),
    departamento: cleanString(payload.departamento),
    municipio: cleanString(payload.municipio),
    anio_nacimiento: payload.anioNacimiento ? Number(payload.anioNacimiento) : undefined,
    genero: cleanString(payload.genero),
    cargo: cleanString(payload.cargo),
    cultivo_principal: Array.isArray(payload.cultivos) ? payload.cultivos.filter(Boolean) : undefined,
    area_hectareas_rango: cleanString(payload.areaHectareasRango),
    usa_bioinsumos: cleanString(payload.usaBioinsumos),
    emergencia_nombre: cleanString(payload.emergenciaNombre),
    emergencia_celular: cleanString(payload.emergenciaCelular),
    emergencia_relacion: cleanString(payload.emergenciaRelacion),
  });
}

function buildInscripcionFields(payload = {}, now = new Date().toISOString()) {
  const eventoCodigo = cleanString(payload.eventoCodigo) || cleanString(payload.eventoRecordId);
  const documentoKey = cleanString(payload.documentoKey) || normalizeDocumentKey(payload.tipoDocumento, payload.numeroDocumento);

  return compactFields({
    id_inscripcion: `${eventoCodigo}|${documentoKey}`,
    evento_id: [cleanString(payload.eventoRecordId)],
    persona_id: [cleanString(payload.personaRecordId)],
    fecha_inscripcion: now,
    canal_enterado: cleanString(payload.canalEnterado),
    jornada: cleanString(payload.jornada) || 'Todo el día',
    temas_interes: Array.isArray(payload.temasInteres) ? payload.temasInteres.filter(Boolean) : undefined,
    expectativa: cleanString(payload.expectativa),
    num_acompanantes: payload.numAcompanantes ? Number(payload.numAcompanantes) : 0,
    estado_cupo: 'Confirmado',
    requiere_transporte: cleanString(payload.requiereTransporte),
    punto_recogida: cleanString(payload.puntoRecogida),
    requiere_parqueadero: Boolean(payload.requiereParqueadero),
    placa_vehiculo: cleanString(payload.placaVehiculo),
    preferencia_alimentacion: cleanString(payload.preferenciaAlimentacion),
    restriccion_alimentaria_medica: cleanString(payload.restriccionAlimentariaMedica),
    apoyo_accesibilidad: Array.isArray(payload.apoyoAccesibilidad) ? payload.apoyoAccesibilidad.filter(Boolean) : undefined,
    eps: cleanString(payload.eps),
    requiere_alojamiento: cleanString(payload.requiereAlojamiento),
    hora_ingreso: now,
    registrado_por: 'Formulario web de asistencia',
    modo_registro: 'Manual (sin QR)',
    entrego_kit: Boolean(payload.entregoKit),
    obs_registro: cleanString(payload.observaciones),
    estado_certificado: 'Pendiente',
    autoriza_tratamiento_datos: payload.autorizaTratamientoDatos === true,
    autoriza_comunicaciones_comerciales: payload.autorizaComunicacionesComerciales === true,
    autoriza_uso_imagen: payload.autorizaUsoImagen === true,
    autoriza_datos_sensibles: payload.autorizaDatosSensibles === true,
    version_politica: cleanString(payload.versionPolitica),
    fecha_autorizacion: now,
    ip_autorizacion: cleanString(payload.ipAutorizacion),
  });
}

function buildConsentimientoRecords({ personaRecordId, inscripcionRecordId, versionPolitica, ip, now, consentimientos }) {
  const finalidadByKey = {
    autorizaTratamientoDatos: 'Tratamiento de datos',
    autorizaComunicacionesComerciales: 'Comunicaciones comerciales',
    autorizaUsoImagen: 'Uso de imagen',
    autorizaDatosSensibles: 'Datos sensibles',
  };

  return Object.entries(finalidadByKey)
    .filter(([key]) => consentimientos?.[key] === true)
    .map(([, finalidad]) => ({
      fields: compactFields({
        consentimiento_id: `${inscripcionRecordId}|${finalidad}`,
        persona_id: [personaRecordId],
        inscripcion_origen: [inscripcionRecordId],
        finalidad,
        estado: 'Otorgado',
        fecha: now,
        canal: 'Formulario web',
        version_politica: cleanString(versionPolitica),
        ip: cleanString(ip),
      }),
    }));
}

exports.cleanString = cleanString;
exports.normalizeDocumentNumber = normalizeDocumentNumber;
exports.normalizeDocumentKey = normalizeDocumentKey;
exports.validateAttendancePayload = validateAttendancePayload;
exports.buildPersonaFields = buildPersonaFields;
exports.buildInscripcionFields = buildInscripcionFields;
exports.buildConsentimientoRecords = buildConsentimientoRecords;
