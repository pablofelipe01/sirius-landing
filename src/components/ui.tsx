import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

// Los dos puntos del logo (celeste y verde) marcan cada sección: es el símbolo de la marca
export function Dots({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center gap-1 ${className}`}>
      <span className="size-2 rounded-full bg-cielo" />
      <span className="size-2 rounded-full bg-alegria" />
    </span>
  );
}

export function Label({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={`mb-4 flex items-center gap-2.5 text-sm font-semibold ${tone === "light" ? "text-white/90" : "text-barranca"}`}>
      <Dots />
      {children}
    </p>
  );
}

// Frase de marca dentro de un titular: IvyPresto Italic en el manual (aquí Instrument Serif)
export function Accent({ children, tone = "cielo" }: { children: ReactNode; tone?: "cielo" | "alegria" | "inherit" }) {
  const color = { cielo: "text-cielo-700", alegria: "text-alegria-700", inherit: "" }[tone];
  return <em className={`font-serif font-normal tracking-normal italic ${color}`}>{children}</em>;
}

export function SectionHeading({
  label,
  title,
  text,
  align = "left",
  tone = "dark",
}: {
  label?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  return (
    <div data-reveal="up" className={`max-w-3xl ${centered ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      {label && <Label tone={tone}>{label}</Label>}
      <h2 className={`heading text-4xl sm:text-5xl lg:text-6xl ${tone === "light" ? "text-white" : "text-barranca"}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed text-pretty ${tone === "light" ? "text-white/80" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "soft" | "leaf" | "light";
  external?: boolean;
  className?: string;
};

// Botones del manual (p. 45): esquinas redondeadas, borde Azul Barranca, relleno en gradiente
// de la paleta y sombra suave
const buttonStyles = {
  primary: "border-barranca bg-barranca text-white hover:bg-barranca-700 hover:border-barranca-700",
  soft: "border-barranca bg-sutileza text-barranca hover:bg-white",
  leaf: "border-barranca bg-cotiledon text-barranca hover:bg-white",
  light: "border-white bg-white text-barranca hover:bg-sutileza-50",
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 px-6 py-3 text-[0.95rem] font-bold shadow-[0_6px_16px_-6px_rgba(1,84,172,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(1,84,172,0.45)] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5 ${buttonStyles[variant]} ${className}`;
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {newTab ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

type Tint = "sutileza" | "cotiledon" | "retono";
const tints: Record<Tint, string> = { sutileza: "bg-sutileza", cotiledon: "bg-cotiledon", retono: "bg-retono" };

// Cabecera de las páginas internas: fondo claro en gradiente, titular grande y, si hay, foto en arco
export function PageHero({
  label,
  title,
  text,
  image,
  imageAlt = "",
  tint = "sutileza",
  children,
}: {
  label: string;
  title: ReactNode;
  text?: ReactNode;
  image?: string;
  imageAlt?: string;
  tint?: Tint;
  children?: ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden ${tints[tint]}`}>
      <div className={`container-page grid items-end gap-10 pt-36 pb-16 sm:pt-40 sm:pb-20 ${image ? "lg:grid-cols-12" : ""}`}>
        <div className={image ? "lg:col-span-7 lg:pb-8" : "max-w-4xl"}>
          <div data-reveal="up">
            <Label>{label}</Label>
          </div>
          <h1 data-reveal="up" data-reveal-delay="0.1" className="heading text-5xl text-barranca sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {text && (
            <p data-reveal="up" data-reveal-delay="0.2" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl">
              {text}
            </p>
          )}
          {children}
        </div>
        {image && (
          <div data-reveal="up" data-reveal-delay="0.15" className="lg:col-span-5">
            <div className="arch relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden ring-8 ring-white/60 lg:max-w-none">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
