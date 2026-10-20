// Cinta de palabras que corre bajo el hero, separadas por los dos puntos del logo.
// Dos copias idénticas: la animación desplaza la mitad del ancho y vuelve a empezar sin salto.
// Con prefers-reduced-motion queda quieta y se ve la primera copia.
export function Ticker({ words }: { words: string[] }) {
  const set = [...words, ...words];
  return (
    <div className="overflow-hidden bg-barranca py-4 text-white">
      <ul className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {[...set, ...set].map((w, i) => (
          <li key={i} aria-hidden={i >= words.length} className="flex items-center">
            <span className="heading px-6 text-2xl whitespace-nowrap sm:text-3xl">{w}</span>
            <span aria-hidden className="inline-flex gap-1">
              <span className="size-2 rounded-full bg-cielo" />
              <span className="size-2 rounded-full bg-alegria" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
