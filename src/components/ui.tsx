import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";
import { SplitWords } from "./motion/SplitWords";

export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  const color = tone === "light" ? "text-bio-300" : "text-brand-600";
  return (
    <p className={`mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase ${color}`}>
      <span className="h-px w-8 bg-bio-500" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  return (
    <div data-reveal="up" className={`max-w-3xl ${centered ? "mx-auto text-center [&_p:first-child]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl ${
          tone === "light" ? "text-white" : "text-night-900"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${tone === "light" ? "text-white/80" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost";
  external?: boolean;
  className?: string;
};

// primary: el verde del punto del logo, con texto oscuro para que tenga contraste AA
const buttonStyles = {
  primary: "bg-bio-500 text-night-950 hover:bg-bio-300",
  secondary: "bg-brand-600 text-white hover:bg-brand-700",
  light: "bg-white text-night-900 hover:bg-paper-100",
  ghost: "border border-current text-current hover:bg-white/10",
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/15 [&>svg]:transition-transform hover:[&>svg]:translate-x-1 ${buttonStyles[variant]} ${className}`;
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

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  cinematic = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  image: string;
  // Fondo con zoom de entrada y parallax, y título que sube palabra a palabra
  cinematic?: boolean;
  children?: ReactNode;
}) {
  const splitTitle = cinematic && typeof title === "string";
  return (
    <section className="relative isolate overflow-hidden bg-night-950 text-white">
      {cinematic ? (
        // Más alto que la sección para que el parallax no deje bordes al descubierto
        <div data-parallax="6" className="absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
          <Image data-kenburns src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        </div>
      ) : (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/20" aria-hidden />
      <div className="container-page pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div data-reveal="up">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </div>
        <h1
          data-reveal={splitTitle ? undefined : "up"}
          data-reveal-delay={splitTitle ? undefined : "0.12"}
          className="font-display max-w-4xl text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl lg:text-6xl"
        >
          {splitTitle ? <SplitWords text={title} delay={0.15} /> : title}
        </h1>
        {text && (
          <p data-reveal="up" data-reveal-delay="0.24" className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {text}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

// Separa "+1.650 ha" en prefijo, número y sufijo para que el número cuente al entrar en pantalla
const STAT_NUMBER = /^([^\d]*)(\d[\d.]*(?:,\d+)?)(.*)$/;

export function CountUp({ value }: { value: string }) {
  const match = value.match(STAT_NUMBER);
  const number = match ? Number(match[2].replace(/\./g, "").replace(",", ".")) : NaN;
  const decimals = match?.[2].split(",")[1]?.length ?? 0;
  if (!match || Number.isNaN(number)) return value;
  return (
    <>
      {match[1]}
      <span data-counter={number} data-counter-decimals={decimals}>
        {match[2]}
      </span>
      {match[3]}
    </>
  );
}

export function Stat({ value, label, tone = "dark" }: { value: string; label: string; tone?: "dark" | "light" }) {
  return (
    <div data-reveal="up">
      <p className={`font-display text-4xl font-semibold tabular-nums sm:text-5xl ${tone === "light" ? "text-bio-300" : "text-brand-600"}`}>
        <CountUp value={value} />
      </p>
      <p className={`mt-2 text-sm leading-snug ${tone === "light" ? "text-white/75" : "text-muted"}`}>{label}</p>
    </div>
  );
}
