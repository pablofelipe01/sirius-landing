import type { Metadata } from 'next';
import { Chat, Clock, Mail, MapPin, Phone, Plus } from '@/components/icons';
import { PageHero, SectionHeading } from '@/components/ui';
import { faqs } from '@/lib/content/productos';
import { contact } from '@/lib/content/site';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos para saber más sobre nuestros productos, programar una visita a la biofábrica o recibir asesoría para tu cultivo.',
};

export default function ContactoPage() {
  const channels = [
    { icon: MapPin, title: 'Dirección', lines: [{ label: contact.address }] },
    { icon: Phone, title: 'Teléfonos', lines: contact.phones },
    { icon: Chat, title: 'WhatsApp', lines: [{ label: contact.whatsapp.label, href: contact.whatsapp.href, external: true }] },
    { icon: Mail, title: 'Correo', lines: [{ label: contact.email, href: contact.mailto }] },
    { icon: Clock, title: 'Horario', lines: contact.schedule.map((label) => ({ label })) },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Regeneremos juntos"
        text="Estamos aquí para responder tus preguntas y ayudarte a elegir la mejor solución para tus necesidades de agricultura regenerativa."
        image="/img/campo/atardecer.webp"
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div data-reveal="up" className="rounded-3xl bg-white p-6 shadow-xl shadow-night-900/5 ring-1 ring-paper-200 sm:p-10 lg:col-span-7">
          <h2 className="font-display text-3xl font-semibold text-night-900">Envíanos un mensaje</h2>
          <p className="mt-2 mb-8 text-muted">Te responderemos lo antes posible.</p>
          <ContactForm />
        </div>

        <ul data-reveal-stagger className="space-y-4 lg:col-span-5">
          {channels.map(({ icon: Icon, title, lines }) => (
            <li key={title} className="flex gap-4 rounded-3xl bg-paper-100 p-6">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Icon className="size-6" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-night-900">{title}</h3>
                {lines.map((l) =>
                  'href' in l && l.href ? (
                    <a
                      key={l.label}
                      href={l.href}
                      {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="block break-all text-muted hover:text-brand-600"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <p key={l.label} className="text-muted">
                      {l.label}
                    </p>
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper-100 py-20 sm:py-28">
        <div className="container-page max-w-4xl">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Respuestas a lo que más nos preguntan" align="center" />
          <div data-reveal-stagger className="faq mt-12 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white ring-1 ring-paper-200 open:shadow-lg open:shadow-night-900/5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-semibold text-night-900">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-brand-600 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
