import type { Metadata } from 'next';
import { Chat, Clock, Mail, MapPin, Phone, Plus } from '@/components/icons';
import { Accent, PageHero, SectionHeading } from '@/components/ui';
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
        label="Contacto"
        title={
          <>
            Regeneremos <Accent tone="alegria">juntos</Accent>
          </>
        }
        text="Estamos aquí para responder tus preguntas y ayudarte a elegir la mejor solución para tus necesidades de agricultura regenerativa."
        tint="cotiledon"
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div data-reveal="up" className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_30px_60px_-36px_rgba(1,84,172,0.45)] sm:p-10 lg:col-span-7">
          <h2 className="heading text-4xl text-barranca">Envíanos un mensaje</h2>
          <p className="mt-2 mb-8 text-muted">Te responderemos lo antes posible.</p>
          <ContactForm />
        </div>

        <ul data-reveal-stagger className="space-y-4 lg:col-span-5">
          {channels.map(({ icon: Icon, title, lines }) => (
            <li key={title} className="flex gap-4 rounded-[1.75rem] bg-sutileza-50 p-6">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-barranca text-white">
                <Icon className="size-6" />
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-barranca">{title}</h3>
                {lines.map((l) =>
                  'href' in l && l.href ? (
                    <a
                      key={l.label}
                      href={l.href}
                      {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="block break-all text-muted hover:text-barranca"
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

      <section className="bg-sutileza py-20 sm:py-28">
        <div className="container-page max-w-4xl">
          <SectionHeading label="Preguntas frecuentes" title="Respuestas a lo que más nos preguntan" align="center" />
          <div data-reveal-stagger className="faq mt-12 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white bg-white/90 open:shadow-[0_16px_30px_-20px_rgba(1,84,172,0.5)]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-barranca">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-alegria-700 transition-transform duration-300 group-open:rotate-45" />
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
