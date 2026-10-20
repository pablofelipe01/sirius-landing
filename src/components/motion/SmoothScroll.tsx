"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "./lenis-store";

// Scroll suave en todo el sitio. Lenis ya respeta prefers-reduced-motion por sí mismo.
// Comparte el ticker de GSAP para que ScrollTrigger y el scroll vayan en el mismo frame.
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      // Enlaces #ancla con el alto del navbar descontado
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
