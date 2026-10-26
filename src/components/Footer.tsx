import Image from "next/image";
import Link from "next/link";
import { contact, footer, navigation } from "@/lib/content/site";
import { Chat, Clock, Instagram, LinkedIn, Mail, MapPin, Phone } from "./icons";
import { ButtonLink, Dots } from "./ui";

export function Footer() {
  const [user, domain] = contact.email.split("@");
  return (
    <footer id="conversemos" className="bg-imperial relative scroll-mt-20 overflow-hidden text-white">
      <div className="container-page pt-20 sm:pt-24">
        <div data-reveal-stagger className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src="/img/brand/logo-sirius.webp" alt="Sirius" width={800} height={355} sizes="144px" className="h-11 w-auto" />
            <p className="heading mt-8 text-3xl sm:text-4xl">{footer.title}</p>
            <p className="mt-5 max-w-md leading-relaxed text-white/75">{footer.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contacto" variant="light">
                Escríbenos
              </ButtonLink>
              {contact.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Sirius en ${s.label}`}
                  className="inline-flex size-12 items-center justify-center rounded-2xl border-2 border-white/25 transition-colors hover:border-white hover:bg-white/10"
                >
                  {s.label === "Instagram" ? <Instagram className="size-5" /> : <LinkedIn className="size-5" />}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
              <Dots />
              Conversemos
            </h2>
            <ul className="mt-5 space-y-4 text-white/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cielo" />
                {contact.address}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-cielo" />
                <span className="flex flex-col">
                  {contact.phones.map((p) => (
                    <a key={p.href} href={p.href} className="hover:text-white hover:underline">
                      {p.label}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <Chat className="mt-0.5 size-5 shrink-0 text-cielo" />
                  WhatsApp {contact.whatsapp.label}
                </a>
              </li>
              <li>
                {/* El correo es largo: si no cabe, parte después de la @ y no en una letra suelta */}
                <a href={contact.mailto} className="flex gap-3 hover:text-white">
                  <Mail className="mt-0.5 size-5 shrink-0 text-cielo" />
                  <span className="min-w-0">
                    {user}@<wbr />
                    {domain}
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-cielo" />
                <span className="flex flex-col">
                  {contact.schedule.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3">
            <h2 className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
              <Dots />
              Explora
            </h2>
            <ul className="mt-5 space-y-2.5 text-white/85">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* El lema de la marca, a todo lo ancho. Decorativo: el texto ya está en el titular de arriba.
          El pb en em deja sitio a la cola de la "g", que con este interlineado tocaba la línea de abajo */}
      <p aria-hidden className="heading mt-10 overflow-hidden px-4 pb-[0.2em] text-center text-[16vw] leading-[0.85] whitespace-nowrap text-white/[0.07] select-none sm:mt-14">
        Let&apos;s get <span className="font-serif font-normal tracking-normal italic">Sirius!</span>
      </p>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sirius Regenerative. Barranca de Upía, Meta.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacypolicy" className="hover:text-white hover:underline">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/directorio" className="hover:text-white hover:underline">
                Empresas del grupo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
