"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content/site";
import { ChevronDown, Close, Menu } from "./icons";
import { getLenis } from "./motion/lenis-store";

// Barra flotante en forma de cápsula. Las cabeceras de todas las páginas son claras, así que
// la barra es la misma de principio a fin; al bajar solo se compacta y gana sombra.
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${scrolled ? "pt-2" : "pt-4"}`}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-barranca"
      >
        Saltar al contenido
      </a>
      <div className="container-page">
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/80 px-4 backdrop-blur-xl transition-[height,box-shadow] duration-300 sm:px-5 ${
            scrolled ? "h-14 shadow-[0_10px_30px_-12px_rgba(1,84,172,0.35)]" : "h-16 shadow-[0_6px_20px_-14px_rgba(1,84,172,0.4)]"
          }`}
        >
          <Link href="/" onClick={close} className="shrink-0" aria-label="Sirius Regenerative, ir al inicio">
            <Image src="/img/brand/logo-sirius.webp" alt="Sirius" width={800} height={355} priority sizes="120px" className="h-8 w-auto sm:h-9" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-1 rounded-xl px-3 py-2 text-[0.92rem] font-semibold whitespace-nowrap transition-colors ${
                        active ? "bg-sutileza-50 text-barranca" : "text-ink/80 hover:bg-sutileza-50 hover:text-barranca"
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="size-4 opacity-60 transition-transform duration-300 group-hover:rotate-180" />}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute top-full left-0 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <ul className="min-w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_40px_-20px_rgba(1,84,172,0.35)]">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block rounded-xl px-4 py-2.5 text-[0.95rem] text-ink/85 transition-colors hover:bg-sutileza-50 hover:text-barranca">
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
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-barranca transition-colors hover:bg-sutileza-50 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {open && (
          <nav
            id="menu-movil"
            aria-label="Principal"
            data-lenis-prevent
            className="mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-line bg-white p-3 shadow-[0_20px_40px_-20px_rgba(1,84,172,0.35)] lg:hidden"
          >
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <div className="flex items-center justify-between">
                    <Link href={item.href} onClick={close} className="flex-1 px-2 py-3.5 text-lg font-semibold text-barranca">
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        className="inline-flex size-11 items-center justify-center text-barranca"
                        aria-expanded={expanded === item.href}
                        aria-label={`Ver secciones de ${item.label}`}
                        onClick={() => setExpanded((v) => (v === item.href ? null : item.href))}
                      >
                        <ChevronDown className={`size-5 transition-transform ${expanded === item.href ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded === item.href && (
                    <ul className="pb-3 pl-4">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={close} className="block py-2 text-muted">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
