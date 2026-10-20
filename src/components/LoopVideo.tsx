"use client";

import { useEffect, useRef } from "react";

// Video corto, mudo y en bucle que solo corre mientras está en pantalla: varios a la vez en una
// página se comerían la batería y los datos del celular. Con prefers-reduced-motion queda el
// fotograma de reposo (poster) y el video no se reproduce. Es decorativo: no lleva controles.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function LoopVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia(REDUCED_MOTION).matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() falla si el navegador bloquea el autoplay; el poster sigue visible
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
    />
  );
}
