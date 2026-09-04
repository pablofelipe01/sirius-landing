'use client';

/**
 * Primera pantalla del QR del hablador comercial: toma de datos basica.
 *
 * Al guardar correctamente redirige a la ficha tecnica. Si en este dispositivo
 * ya hubo un registro, se muestra un atajo a la ficha pero NO se redirige
 * automaticamente: el formulario siempre queda accesible. Redirigir dejaba
 * encerrado a quien quisiera volver, y sobre todo impedia registrar a un
 * segundo visitante si en el stand se comparte un mismo dispositivo.
 */

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EVENTO, INTERES_OPTIONS, PAIS_OPTIONS, VERSION_POLITICA } from '@/lib/palma/config';
import type { LeadPayload } from '@/lib/palma/types';

const STORAGE_KEY = 'palma-lead-registrado';

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string; fields?: Record<string, string> };

const initialForm: LeadPayload = {
  nombreCompleto: '',
  email: '',
  empresa: '',
  cargo: '',
  celular: '',
  pais: 'Colombia',
  interes: 'Ambos productos',
  autorizaTratamientoDatos: false,
  autorizaComunicacionesComerciales: false,
};

function inputClass(error?: string) {
  const borde = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
    : 'border-slate-200 focus:border-green-500 focus:ring-green-100';
  return `w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:ring-4 ${borde}`;
}

function Campo({
  label,
  error,
  requerido,
  children,
}: {
  label: string;
  error?: string;
  requerido?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label} {requerido && <span className="text-red-500">*</span>}
      </span>
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1 block text-sm font-medium text-red-600">{error}</span>}
    </label>
  );
}

export default function PalmaRegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState<LeadPayload>(initialForm);
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' });
  /** Hubo un registro previo en este dispositivo: solo cambia el atajo a la ficha. */
  const [registroPrevio, setRegistroPrevio] = useState(false);

  useEffect(() => {
    try {
      setRegistroPrevio(window.localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      // Si el navegador bloquea localStorage, seguimos con el formulario limpio.
    }
  }, []);

  const errores = submit.status === 'error' ? submit.fields || {} : {};

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmit({ status: 'loading' });

    try {
      const response = await fetch('/api/palma/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, versionPolitica: VERSION_POLITICA }),
      });
      const data = await response.json();

      if (!response.ok) {
        setSubmit({
          status: 'error',
          message: data?.message || data?.error || 'No pudimos guardar tus datos',
          fields: data?.fields,
        });
        return;
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // No es critico: solo evita repetir el formulario en este dispositivo.
      }

      router.push('/palma/ficha');
    } catch {
      setSubmit({ status: 'error', message: 'Revisa tu conexion e intenta de nuevo' });
    }
  }

  const cargando = submit.status === 'loading';

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-green-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Sirius Regenerative" width={160} height={54} priority />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
            {EVENTO.nombre}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Ficha técnica de Sirius Char y Biochar Blend
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Déjanos tus datos y accede de inmediato a la información técnica completa. Te tomará
            menos de un minuto.
          </p>
        </div>

        {registroPrevio && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/80">
              Ya hubo un registro en este dispositivo.
            </p>
            <Link
              href="/palma/ficha"
              className="rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-green-700"
            >
              Ver las fichas técnicas
            </Link>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8"
        >
          <Campo label="Nombre completo" error={errores.nombreCompleto} requerido>
            <input
              name="nombreCompleto"
              value={form.nombreCompleto ?? ''}
              onChange={handleChange}
              autoComplete="name"
              required
              className={inputClass(errores.nombreCompleto)}
            />
          </Campo>

          <Campo label="Correo electrónico" error={errores.email} requerido>
            <input
              name="email"
              type="email"
              inputMode="email"
              value={form.email ?? ''}
              onChange={handleChange}
              autoComplete="email"
              required
              className={inputClass(errores.email)}
            />
          </Campo>

          <Campo label="Empresa" error={errores.empresa} requerido>
            <input
              name="empresa"
              value={form.empresa ?? ''}
              onChange={handleChange}
              autoComplete="organization"
              required
              className={inputClass(errores.empresa)}
            />
          </Campo>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo label="Cargo">
              <input
                name="cargo"
                value={form.cargo ?? ''}
                onChange={handleChange}
                autoComplete="organization-title"
                className={inputClass()}
              />
            </Campo>

            <Campo label="Celular / WhatsApp">
              <input
                name="celular"
                type="tel"
                inputMode="tel"
                value={form.celular ?? ''}
                onChange={handleChange}
                autoComplete="tel"
                className={inputClass()}
              />
            </Campo>

            <Campo label="País">
              <select
                name="pais"
                value={form.pais ?? ''}
                onChange={handleChange}
                className={inputClass()}
              >
                {PAIS_OPTIONS.map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo label="Me interesa">
              <select
                name="interes"
                value={form.interes ?? ''}
                onChange={handleChange}
                className={inputClass()}
              >
                {INTERES_OPTIONS.map((interes) => (
                  <option key={interes} value={interes}>
                    {interes}
                  </option>
                ))}
              </select>
            </Campo>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                name="autorizaTratamientoDatos"
                type="checkbox"
                checked={form.autorizaTratamientoDatos ?? false}
                onChange={handleChange}
                required
                className="mt-1 h-5 w-5 flex-shrink-0 rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              <span>
                Autorizo a Sirius Regenerative Solutions el tratamiento de mis datos personales para
                fines comerciales y de contacto, conforme a la{' '}
                <Link
                  href="/privacypolicy"
                  target="_blank"
                  className="font-semibold text-green-700 underline"
                >
                  política de tratamiento de datos
                </Link>
                . <span className="text-red-500">*</span>
              </span>
            </label>
            {errores.autorizaTratamientoDatos && (
              <p className="text-sm font-medium text-red-600">{errores.autorizaTratamientoDatos}</p>
            )}

            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                name="autorizaComunicacionesComerciales"
                type="checkbox"
                checked={form.autorizaComunicacionesComerciales ?? false}
                onChange={handleChange}
                className="mt-1 h-5 w-5 flex-shrink-0 rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              <span>Quiero recibir novedades técnicas y comerciales de Sirius (opcional).</span>
            </label>
          </div>

          {submit.status === 'error' && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submit.message}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-xl bg-green-600 px-6 py-4 text-base font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-600/60"
          >
            {cargando ? 'Guardando…' : 'Ver la ficha técnica'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          {EVENTO.fecha} · Política versión {VERSION_POLITICA}
        </p>
      </div>
    </main>
  );
}
