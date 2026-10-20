import Image from "next/image";

export type MosaicPhoto = { src: string; alt: string };

// Mosaico de tres fotos: la primera, grande a la izquierda; las otras dos apiladas a la derecha.
// En móvil se apilan todas. Cada foto se abre como cortina al entrar (data-reveal-mask).
const TILES = [
  { className: "aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto", sizes: "(min-width: 1024px) 58vw, 100vw" },
  { className: "aspect-[4/3] lg:col-span-5 lg:aspect-auto", sizes: "(min-width: 1024px) 42vw, 100vw" },
  { className: "aspect-[4/3] lg:col-span-5 lg:aspect-auto", sizes: "(min-width: 1024px) 42vw, 100vw" },
];

export function PhotoMosaic({ photos }: { photos: MosaicPhoto[] }) {
  return (
    <div className="grid gap-4 lg:h-[36rem] lg:grid-cols-12 lg:grid-rows-2">
      {photos.slice(0, TILES.length).map((photo, i) => (
        <figure
          key={photo.src}
          data-reveal-mask
          data-reveal-delay={String(i * 0.15)}
          className={`group relative overflow-hidden rounded-3xl ${TILES[i].className}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={TILES[i].sizes}
            className="object-cover transition-[scale] duration-700 group-hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}
