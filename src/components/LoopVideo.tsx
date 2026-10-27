"use client";

import { useEffect, useRef } from "react";

// Video corto, mudo y en bucle que solo corre mientras está en pantalla: varios a la vez en una
// página se comerían la batería y los datos del celular. `paused` lo detiene aunque esté a la
// vista (p. ej. los videos apilados de PillarTabs que no son la pestaña activa). Con
// prefers-reduced-motion queda el fotograma de reposo (poster). Es decorativo: no lleva controles.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// `eager`: para el video del hero, que se ve al cargar; los demás no descargan nada hasta acercarse
export function LoopVideo({
  src,
  poster,
  paused = false,
  eager = false,
  className = "",
}: {
  src: string;
  poster: string;
  paused?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const pausedRef = useRef(paused);

  const sync = () => {
    const video = ref.current;
    if (!video || window.matchMedia(REDUCED_MOTION).matches) return;
    if (inView.current && !pausedRef.current) {
      // play() falla si el navegador bloquea el autoplay; el poster sigue visible
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    sync();
  }, [paused]);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload={eager ? "auto" : "none"} aria-hidden className={className} />;
}
