"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, shopUrl } from "@/lib/content/site";
import { ArrowUpRight, ChevronDown, Close, Menu } from "./icons";
import { getLenis } from "./motion/lenis-store";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Lenis sigue recibiendo la rueda aunque el body no se desplace; se pausa para que no acumule scroll
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        solid
          ? "bg-white/90 text-night-900 shadow-[0_1px_0_rgba(7,31,61,0.08),0_8px_24px_-12px_rgba(7,31,61,0.25)] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      {/* Velo oscuro para que logo y enlaces se lean sobre cualquier foto del hero */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-linear-to-b from-night-950/70 via-night-950/30 to-transparent transition-opacity duration-300 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-night-900"
      >
        Saltar al contenido
      </a>
      <div
        className={`container-page flex items-center justify-between gap-4 transition-[height] duration-300 ${
          solid ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24"
        }`}
      >
        <Link href="/" onClick={close} className="shrink-0" aria-label="Sirius Regenerative, ir al inicio">
          {/* El logo trae su propio contorno blanco: se lee igual sobre el hero oscuro y sobre la barra blanca */}
          <Image
            src="/img/brand/logo-sirius.webp"
            alt="Sirius"
            width={800}
            height={355}
            priority
            sizes="160px"
            className={`w-auto transition-[height,filter] duration-300 ${
              solid ? "h-9 lg:h-10" : "h-11 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] lg:h-14"
            }`}
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1 px-2 py-2 text-[0.86rem] font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-current after:transition-transform after:duration-300 xl:px-3 xl:text-[0.92rem] ${
                      active ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-100"
                    } ${solid ? (active ? "text-brand-600" : "hover:text-brand-600") : active ? "text-bio-300" : "hover:text-bio-300"}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-4 opacity-70 transition-transform duration-300 group-hover:rotate-180" />}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="min-w-64 rounded-2xl bg-white p-2 text-night-900 shadow-2xl shadow-night-950/15 ring-1 ring-night-900/5">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[0.95rem] transition-colors hover:bg-brand-100 hover:text-brand-600"
                            >
                              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-bio-500" />
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
            <li>
              <a
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-bio-500 px-5 py-2.5 text-[0.9rem] font-semibold text-night-950 shadow-lg shadow-bio-600/30 transition-all hover:-translate-y-0.5 hover:bg-bio-300 hover:shadow-xl hover:shadow-bio-600/30 xl:ml-3"
              >
                Comprar
                <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={`inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${solid ? "hover:bg-night-900/5" : "hover:bg-white/10"}`}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal" data-lenis-prevent className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/5 bg-white text-night-900 lg:hidden">
          <ul className="container-page py-4">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-paper-200">
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={close} className="flex-1 py-4 text-lg font-medium">
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className="inline-flex size-11 items-center justify-center"
                      aria-expanded={expanded === item.href}
                      aria-label={`Ver secciones de ${item.label}`}
                      onClick={() => setExpanded((v) => (v === item.href ? null : item.href))}
                    >
                      <ChevronDown className={`size-5 transition-transform ${expanded === item.href ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.children && expanded === item.href && (
                  <ul className="pb-3 pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={close} className="block py-2.5 text-muted">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-6">
              <a
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-full bg-bio-500 px-5 py-3.5 font-semibold text-night-950"
              >
                Comprar en la tienda
                <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
