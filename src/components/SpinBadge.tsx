// Sello circular con el lema de la marca que gira despacio; en el centro, los dos puntos del logo.
// Decorativo (aria-hidden): el lema ya aparece en el pie de página. Quieto con prefers-reduced-motion.
export function SpinBadge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative size-32 rounded-full bg-white shadow-[0_16px_40px_-16px_rgba(1,84,172,0.5)] sm:size-36 ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="sello-circulo" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        {/* Dos vueltas del lema llenan la circunferencia (≈465 unidades) a este tamaño */}
        <text className="fill-barranca text-[15px] font-bold tracking-[0.14em] uppercase">
          <textPath href="#sello-circulo">Let&apos;s get Sirius · Let&apos;s get Sirius ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center gap-1.5">
        <span className="size-4 rounded-full bg-cielo" />
        <span className="size-4 rounded-full bg-alegria" />
      </span>
    </div>
  );
}
