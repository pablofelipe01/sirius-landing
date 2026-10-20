import type { CSSProperties } from "react";
import Image from "next/image";

// Tarjeta de pilar: fondo de color plano arriba (rótulo, título y texto)
// y una foto abajo que se funde hacia arriba con ese mismo color.

type Props = { index: number; name: string; text: string; color: string; image: string; alt: string; position?: string };

// "**así**" → <strong>así</strong>
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part));
}

export function ValueCard({ index, name, text, color, image, alt, position = "center" }: Props) {
  return (
    <article
      style={{ "--card": color } as CSSProperties}
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-(--card) text-white"
    >
      <div className="px-7 pt-8 sm:px-8">
        <p className="text-xs font-bold tracking-[0.3em] uppercase">Pilar 0{index + 1}</p>
        <hr className="mt-5 w-4/5 border-white/70" />
        <h3 className="font-display mt-7 text-[1.65rem] font-bold min-[360px]:text-3xl [text-shadow:0_1px_2px_rgb(0_0_0/0.25)]">{name}</h3>
        <p className="mt-4 text-lg leading-relaxed font-normal">{withBold(text)}</p>
      </div>

      <div className="relative mt-6 min-h-64 flex-1">
        <Image
          src={image}
          alt={alt}
          fill
          style={{ objectPosition: position }}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Degradado del color de la tarjeta a transparente: la foto "nace" del fondo */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-(--card) via-(--card)/60 to-transparent" />
      </div>
    </article>
  );
}
