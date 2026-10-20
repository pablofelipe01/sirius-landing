import Image from "next/image";
import { allies } from "@/lib/content/site";

// Tamaño óptico: todos los logos ocupan la misma superficie (ancho × alto), no la misma altura.
// Con altura fija un logo alargado se ve enorme y uno cuadrado diminuto. Los topes evitan que se salgan de la tarjeta.
const LOGO_AREA = 7000; // px²
const LOGO_MAX_W = 152; // ancho útil de la tarjeta (w-48 menos px-5)
const LOGO_MAX_H = 84;

// La cinta se desplaza la mitad de su ancho y vuelve a empezar: cada mitad debe cubrir
// pantallas anchas aunque el grupo tenga pocas empresas
const MIN_PER_HALF = 10;

function logoSize(width: number, height: number, scale = 1) {
  const ratio = width / height;
  let h = Math.sqrt((LOGO_AREA * scale * scale) / ratio);
  h = Math.min(h, LOGO_MAX_H, LOGO_MAX_W / ratio);
  return { width: Math.round(h * ratio), height: Math.round(h) };
}

function AllyCard({ name, logo, width = 2, height = 1, scale, href }: (typeof allies)[number]) {
  const size = logoSize(width, height, scale);
  const content = logo ? (
    <Image src={logo} alt={name} width={size.width} height={size.height} style={size} className="object-contain" />
  ) : (
    <span className="font-display text-xl font-semibold text-night-800">{name}</span>
  );
  const cls = "flex h-28 w-48 shrink-0 items-center justify-center rounded-2xl bg-white px-5 ring-1 ring-paper-200";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md`} title={name}>
      {content}
    </a>
  ) : (
    <div className={cls} title={name}>
      {content}
    </div>
  );
}

export function Allies() {
  const half = Array.from({ length: Math.ceil(MIN_PER_HALF / allies.length) }, () => allies).flat();
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap">
        {[...half, ...half].map((a, i) => (
          // Solo la primera aparición de cada empresa es accesible; las copias son decorado
          <li key={`${a.name}-${i}`} aria-hidden={i >= allies.length} inert={i >= allies.length} className={i >= allies.length ? "motion-reduce:hidden" : undefined}>
            <AllyCard {...a} />
          </li>
        ))}
      </ul>
    </div>
  );
}
