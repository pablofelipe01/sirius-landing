'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import type { AttendancePayload, EventoPublico } from '@/lib/asistencia/types';
import {
  ACCESIBILIDAD_OPTIONS,
  ALIMENTACION_OPTIONS,
  ALOJAMIENTO_OPTIONS,
  AREA_HECTAREAS_OPTIONS,
  CANAL_ENTERADO_OPTIONS,
  CARGO_OPTIONS,
  CULTIVO_OPTIONS,
  EMERGENCIA_RELACION_OPTIONS,
  GENERO_OPTIONS,
  JORNADA_OPTIONS,
  PERFIL_ASISTENTE_OPTIONS,
  TEMAS_INTERES_OPTIONS,
  TIPO_DOCUMENTO_OPTIONS,
  TRANSPORTE_OPTIONS,
  USA_BIOINSUMOS_OPTIONS,
} from '@/lib/asistencia/options';

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string; idInscripcion?: string }
  | { status: 'error'; message: string; fields?: Record<string, string> };

const initialForm: AttendancePayload = {
  tipoDocumento: 'CC',
  jornada: 'Todo el día',
  canalEnterado: 'WhatsApp',
  perfilAsistente: 'Productor / agricultor',
  requiereTransporte: 'No, llego por mi cuenta',
  preferenciaAlimentacion: 'Sin preferencia',
  requiereAlojamiento: 'No',
  cultivos: [],
  temasInteres: [],
  apoyoAccesibilidad: ['No requiero'],
  autorizaTratamientoDatos: false,
  autorizaComunicacionesComerciales: false,
  autorizaUsoImagen: false,
  autorizaDatosSensibles: false,
};

function Input({
  label,
  name,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: keyof AttendancePayload;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
      />
    </label>
  );
}

function Select({
  label,
  name,
  value,
  options,
  onChange,
  required,
}: {
  label: string;
  name: keyof AttendancePayload;
  value?: string;
  options: readonly string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select
        name={name}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
      >
        <option value="">Selecciona...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGroup({
  label,
  values,
  selected,
  onToggle,
}: {
  label: string;
  values: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-700">{label}</legend>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {values.map((value) => (
          <label key={value} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
            />
            {value}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function AsistenciaPage() {
  const [selectedEvento, setSelectedEvento] = useState<EventoPublico | null>(null);
  const [loadingEvento, setLoadingEvento] = useState(true);
  const [eventLinkError, setEventLinkError] = useState<string | null>(null);
  const [form, setForm] = useState<AttendancePayload>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('evento')?.trim();

    if (!codigo) {
      setEventLinkError('Este formulario debe abrirse desde el link o QR oficial del evento. Solicita el enlace correcto al equipo organizador.');
      setLoadingEvento(false);
      return;
    }

    fetch(`/api/asistencia/eventos?codigo=${encodeURIComponent(codigo)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'No se pudo cargar el evento');
        const evento = data.evento as EventoPublico;
        setSelectedEvento(evento);
        setForm((current) => ({
          ...current,
          eventoRecordId: evento.id,
          eventoCodigo: evento.codigo,
          versionPolitica: evento.versionPolitica || 'vigente',
        }));
      })
      .catch((error) => setEventLinkError(error instanceof Error ? error.message : 'No se pudo cargar el evento'))
      .finally(() => setLoadingEvento(false));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleArrayValue = (name: 'cultivos' | 'temasInteres' | 'apoyoAccesibilidad', value: string) => {
    setForm((current) => {
      const currentValues = current[name] || [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...current, [name]: nextValues };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ status: 'loading' });

    const payload: AttendancePayload = {
      ...form,
      eventoCodigo: selectedEvento?.codigo || form.eventoCodigo,
      versionPolitica: selectedEvento?.versionPolitica || 'vigente',
    };

    try {
      const response = await fetch('/api/asistencia/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitState({
          status: 'error',
          message: data.message || data.error || 'No se pudo registrar la asistencia',
          fields: data.fields,
        });
        return;
      }

      setSubmitState({ status: 'success', message: data.message, idInscripcion: data.idInscripcion });
      setForm({ ...initialForm, eventoRecordId: form.eventoRecordId, eventoCodigo: form.eventoCodigo });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'No se pudo registrar la asistencia',
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-100 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-300">Sirius Eventos</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Formulario de asistencia</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">
            Registra asistentes, confirma ingreso, captura autorizaciones de datos y sincroniza la información con la base de Airtable de eventos.
          </p>
        </section>

        {loadingEvento && (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-700 shadow-xl">
            Cargando información del evento...
          </div>
        )}

        {!loadingEvento && eventLinkError && !selectedEvento && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-xl">
            <h2 className="text-2xl font-black">Link de asistencia requerido</h2>
            <p className="mt-3">{eventLinkError}</p>
            <p className="mt-4 text-sm">
              El enlace debe tener el código del evento, por ejemplo: <code className="rounded bg-white px-2 py-1">/asistencia?evento=CODIGO_EVENTO</code>
            </p>
          </div>
        )}

        {!loadingEvento && selectedEvento && (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-xl md:p-8">
          <section className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">1. Evento</h2>
            <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-700">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">Evento asignado por el enlace</p>
              <strong className="mt-1 block text-lg text-slate-900">{selectedEvento.nombre}</strong>
              <p className="mt-1">Código: {selectedEvento.codigo}</p>
              <p>{[selectedEvento.lugar, selectedEvento.municipio, selectedEvento.departamento].filter(Boolean).join(' · ')}</p>
              {selectedEvento.fechaInicio && <p>{new Date(selectedEvento.fechaInicio).toLocaleString('es-CO')}</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Datos personales</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Input label="Nombre completo" name="nombreCompleto" value={form.nombreCompleto} onChange={handleInputChange} required />
              <Select label="Tipo de documento" name="tipoDocumento" value={form.tipoDocumento} options={TIPO_DOCUMENTO_OPTIONS} onChange={handleInputChange} required />
              <Input label="Número de documento" name="numeroDocumento" value={form.numeroDocumento} onChange={handleInputChange} required />
              <Input label="Celular" name="celular" value={form.celular} onChange={handleInputChange} required />
              <Input label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleInputChange} />
              <Select label="Perfil del asistente" name="perfilAsistente" value={form.perfilAsistente} options={PERFIL_ASISTENTE_OPTIONS} onChange={handleInputChange} />
              <Input label="Departamento" name="departamento" value={form.departamento} onChange={handleInputChange} />
              <Input label="Municipio" name="municipio" value={form.municipio} onChange={handleInputChange} />
              <Input label="Año de nacimiento" name="anioNacimiento" type="number" value={form.anioNacimiento} onChange={handleInputChange} />
              <Select label="Género" name="genero" value={form.genero} options={GENERO_OPTIONS} onChange={handleInputChange} />
              <Select label="Cargo" name="cargo" value={form.cargo} options={CARGO_OPTIONS} onChange={handleInputChange} />
              <Select label="Área/hectáreas" name="areaHectareasRango" value={form.areaHectareasRango} options={AREA_HECTAREAS_OPTIONS} onChange={handleInputChange} />
              <Select label="Uso de bioinsumos" name="usaBioinsumos" value={form.usaBioinsumos} options={USA_BIOINSUMOS_OPTIONS} onChange={handleInputChange} />
            </div>
            <div className="mt-4">
              <CheckboxGroup label="Cultivos principales" values={CULTIVO_OPTIONS} selected={form.cultivos || []} onToggle={(value) => toggleArrayValue('cultivos', value)} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Datos del evento</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Select label="Jornada" name="jornada" value={form.jornada} options={JORNADA_OPTIONS} onChange={handleInputChange} />
              <Select label="Canal por el que se enteró" name="canalEnterado" value={form.canalEnterado} options={CANAL_ENTERADO_OPTIONS} onChange={handleInputChange} />
              <Select label="Transporte" name="requiereTransporte" value={form.requiereTransporte} options={TRANSPORTE_OPTIONS} onChange={handleInputChange} />
              <Input label="Punto de recogida" name="puntoRecogida" value={form.puntoRecogida} onChange={handleInputChange} />
              <Select label="Alimentación" name="preferenciaAlimentacion" value={form.preferenciaAlimentacion} options={ALIMENTACION_OPTIONS} onChange={handleInputChange} />
              <Input label="Restricción alimentaria médica" name="restriccionAlimentariaMedica" value={form.restriccionAlimentariaMedica} onChange={handleInputChange} />
              <Select label="Alojamiento" name="requiereAlojamiento" value={form.requiereAlojamiento} options={ALOJAMIENTO_OPTIONS} onChange={handleInputChange} />
              <Input label="EPS" name="eps" value={form.eps} onChange={handleInputChange} />
              <Input label="Acompañantes" name="numAcompanantes" type="number" value={form.numAcompanantes} onChange={handleInputChange} />
              <Input label="Placa vehículo" name="placaVehiculo" value={form.placaVehiculo} onChange={handleInputChange} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <CheckboxGroup label="Temas de interés" values={TEMAS_INTERES_OPTIONS} selected={form.temasInteres || []} onToggle={(value) => toggleArrayValue('temasInteres', value)} />
              <CheckboxGroup label="Apoyo de accesibilidad" values={ACCESIBILIDAD_OPTIONS} selected={form.apoyoAccesibilidad || []} onToggle={(value) => toggleArrayValue('apoyoAccesibilidad', value)} />
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-700">Expectativa / observaciones</span>
              <textarea
                name="expectativa"
                value={form.expectativa || ''}
                onChange={handleInputChange}
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </label>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Contacto de emergencia</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Input label="Nombre" name="emergenciaNombre" value={form.emergenciaNombre} onChange={handleInputChange} />
              <Input label="Celular" name="emergenciaCelular" value={form.emergenciaCelular} onChange={handleInputChange} />
              <Select label="Relación" name="emergenciaRelacion" value={form.emergenciaRelacion} options={EMERGENCIA_RELACION_OPTIONS} onChange={handleInputChange} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">5. Autorizaciones</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <label className="flex gap-3">
                <input type="checkbox" name="autorizaTratamientoDatos" checked={Boolean(form.autorizaTratamientoDatos)} onChange={handleInputChange} className="mt-1 h-4 w-4" required />
                <span>Autorizo el tratamiento de mis datos personales para la gestión de asistencia del evento. <strong>Obligatorio.</strong></span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="autorizaComunicacionesComerciales" checked={Boolean(form.autorizaComunicacionesComerciales)} onChange={handleInputChange} className="mt-1 h-4 w-4" />
                <span>Autorizo comunicaciones comerciales y de seguimiento de Sirius.</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="autorizaUsoImagen" checked={Boolean(form.autorizaUsoImagen)} onChange={handleInputChange} className="mt-1 h-4 w-4" />
                <span>Autorizo el uso de imagen en registros fotográficos o audiovisuales del evento.</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="autorizaDatosSensibles" checked={Boolean(form.autorizaDatosSensibles)} onChange={handleInputChange} className="mt-1 h-4 w-4" />
                <span>Autorizo el tratamiento de datos sensibles si diligencié datos de salud, alimentación o accesibilidad.</span>
              </label>
            </div>
          </section>

          {submitState.status === 'error' && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <strong>Error:</strong> {submitState.message}
              {submitState.fields && (
                <ul className="mt-2 list-inside list-disc text-sm">
                  {Object.entries(submitState.fields).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {submitState.status === 'success' && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
              <strong>{submitState.message}</strong>
              {submitState.idInscripcion && <p className="text-sm">ID: {submitState.idInscripcion}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={submitState.status === 'loading'}
            className="w-full rounded-2xl bg-green-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {submitState.status === 'loading' ? 'Registrando...' : 'Registrar asistencia'}
          </button>
        </form>
        )}
      </div>
    </main>
  );
}
