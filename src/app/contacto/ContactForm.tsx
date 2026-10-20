'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from '@/components/icons';

// Envía a /api/contact, que reenvía el mensaje al correo comercial y confirma al remitente.
const SUBJECTS = ['Información general', 'Compras', 'Soporte técnico', 'Visita a la biofábrica', 'Colaboración', 'Otro'];

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string };

const field =
  'w-full rounded-2xl border border-paper-200 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15';
const label = 'mb-2 block text-sm font-medium text-night-900';

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'No pudimos enviar el mensaje.');
      form.reset();
      setStatus({ state: 'sent' });
    } catch (err) {
      setStatus({
        state: 'error',
        message: err instanceof Error ? err.message : 'No pudimos enviar el mensaje. Inténtalo de nuevo.',
      });
    }
  }

  if (status.state === 'sent') {
    return (
      <div role="status" className="rounded-3xl bg-bio-100 p-8 text-center sm:p-10">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-bio-500 text-night-950">
          <Check className="size-7" />
        </span>
        <h3 className="font-display mt-5 text-2xl font-semibold text-night-900">¡Mensaje enviado!</h3>
        <p className="mt-2 text-night-900/80">Gracias por escribirnos. Te responderemos pronto.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle' })}
          className="mt-6 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const sending = status.state === 'sending';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {status.state === 'error' && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
          {status.message}
        </p>
      )}
      <div>
        <label htmlFor="name" className={label}>
          Nombre completo
        </label>
        <input id="name" name="name" required autoComplete="name" className={field} placeholder="Tu nombre" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            Correo electrónico
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="tu@correo.com" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Teléfono <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="+57 300 000 0000" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={label}>
          Asunto
        </label>
        <select id="subject" name="subject" defaultValue={SUBJECTS[0]} className={field}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={label}>
          Mensaje
        </label>
        <textarea id="message" name="message" required rows={5} className={`${field} resize-y`} placeholder="¿Cómo podemos ayudarte a regenerar tu tierra?" />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {sending ? 'Enviando…' : 'Enviar mensaje'}
        {!sending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
