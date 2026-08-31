import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeDocumentKey,
  validateAttendancePayload,
  buildPersonaFields,
  buildInscripcionFields,
} from '../src/lib/asistencia/validation.js';

test('normalizeDocumentKey normaliza tipo y número de documento', () => {
  assert.equal(normalizeDocumentKey('cc', ' 1.234 567-8 '), 'CC-12345678');
});

test('validateAttendancePayload exige datos mínimos y consentimiento de tratamiento', () => {
  const result = validateAttendancePayload({
    eventoRecordId: 'rec123',
    nombreCompleto: 'Ana Pérez',
    tipoDocumento: 'CC',
    numeroDocumento: '123',
    celular: '3001234567',
    autorizaTratamientoDatos: true,
  });

  assert.equal(result.ok, true);

  const missingConsent = validateAttendancePayload({
    eventoRecordId: 'rec123',
    nombreCompleto: 'Ana Pérez',
    tipoDocumento: 'CC',
    numeroDocumento: '123',
    celular: '3001234567',
    autorizaTratamientoDatos: false,
  });

  assert.equal(missingConsent.ok, false);
  assert.match(missingConsent.errors.autorizaTratamientoDatos, /obligatoria/i);
});

test('buildPersonaFields mapea payload al esquema Personas de Airtable', () => {
  const fields = buildPersonaFields({
    nombreCompleto: 'Ana Pérez',
    tipoDocumento: 'CC',
    numeroDocumento: '1.234',
    celular: '3001234567',
    email: 'ana@example.com',
    perfilAsistente: 'Productor / agricultor',
    departamento: 'Meta',
    municipio: 'Cabuyaro',
    cultivos: ['Palma', 'Cacao'],
  });

  assert.deepEqual(fields, {
    documento_key: 'CC-1234',
    nombre_completo: 'Ana Pérez',
    tipo_documento: 'CC',
    numero_documento: '1234',
    celular: '3001234567',
    email: 'ana@example.com',
    perfil_asistente: 'Productor / agricultor',
    departamento: 'Meta',
    municipio: 'Cabuyaro',
    cultivo_principal: ['Palma', 'Cacao'],
  });
});

test('buildInscripcionFields marca asistencia de ingreso desde formulario web', () => {
  const now = '2026-08-14T15:00:00.000Z';
  const fields = buildInscripcionFields({
    eventoRecordId: 'recEvento',
    personaRecordId: 'recPersona',
    eventoCodigo: 'EVT-001',
    documentoKey: 'CC-1234',
    jornada: 'Todo el día',
    canalEnterado: 'WhatsApp',
    autorizaTratamientoDatos: true,
    autorizaComunicacionesComerciales: true,
    autorizaUsoImagen: false,
    versionPolitica: 'v1',
  }, now);

  assert.equal(fields.id_inscripcion, 'EVT-001|CC-1234');
  assert.deepEqual(fields.evento_id, ['recEvento']);
  assert.deepEqual(fields.persona_id, ['recPersona']);
  assert.equal(fields.estado_cupo, 'Confirmado');
  assert.equal(fields.modo_registro, 'Manual (sin QR)');
  assert.equal(fields.hora_ingreso, now);
  assert.equal(fields.autoriza_tratamiento_datos, true);
  assert.equal(fields.autoriza_comunicaciones_comerciales, true);
  assert.equal(fields.autoriza_uso_imagen, false);
});
