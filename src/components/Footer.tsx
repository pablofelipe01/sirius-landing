import Image from "next/image";
import Link from "next/link";
import { contact, footer, navigation } from "@/lib/content/site";
import { Chat, Clock, Instagram, LinkedIn, Mail, MapPin, Phone } from "./icons";

export function Footer() {
  return (
    <footer id="conversemos" className="scroll-mt-20 bg-night-950 text-white">
      <div data-reveal-stagger className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image src="/img/brand/logo-sirius.webp" alt="Sirius" width={800} height={355} sizes="144px" className="h-12 w-auto" />
          <p className="font-display mt-8 text-3xl leading-tight font-semibold text-balance sm:text-4xl">{footer.title}</p>
          <p className="mt-5 max-w-md leading-relaxed text-white/75">{footer.text}</p>
          <div className="mt-8 flex gap-3">
            {contact.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sirius en ${s.label}`}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-600"
              >
                {s.label === "Instagram" ? <Instagram className="size-5" /> : <LinkedIn className="size-5" />}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-bio-300 uppercase">Conversemos</h2>
          <ul className="mt-5 space-y-4 text-white/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-bio-300" />
              {contact.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-bio-300" />
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
                <Chat className="mt-0.5 size-5 shrink-0 text-bio-300" />
                WhatsApp {contact.whatsapp.label}
              </a>
            </li>
            <li>
              {/* El correo es largo: si no cabe, parte después de la @ y no en una letra suelta */}
              <a href={contact.mailto} className="flex gap-3 hover:text-white">
                <Mail className="mt-0.5 size-5 shrink-0 text-bio-300" />
                <span className="min-w-0">
                  {contact.email.split("@")[0]}@<wbr />
                  {contact.email.split("@")[1]}
                </span>
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-bio-300" />
              <span className="flex flex-col">
                {contact.schedule.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <nav aria-label="Pie de página" className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-bio-300 uppercase">Explora</h2>
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
