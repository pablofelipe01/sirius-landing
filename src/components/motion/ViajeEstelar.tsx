"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR, LETRAS, PUNTO_AZUL, PUNTO_VERDE, RADIO_PUNTO } from "./viaje-estelar-logo";

// Intro del inicio: el "viaje estelar" del logo, la misma animación aprobada en Motion pero dibujada
// en SVG y movida por el scroll. La escena queda fija (sticky) mientras se baja: un cielo de estrellas
// avanza hacia la estrella azul, que crece hasta llenar la pantalla de blanco; desde muy cerca del
// punto de la i la toma se aleja, aparece el logo completo y entra el lema. Después el contenido que
// se le pasa (el hero) sube por encima mientras la escena se queda atrás más despacio.
// Todo sale de una sola función del tiempo, dibujar(t): subir el scroll devuelve la animación exacta.
// Sin JS o con prefers-reduced-motion (sin la clase html.js del layout) la intro no se muestra.

const SCRUB = 4; // pantallas de scroll que dura la animación
const COVER = 1; // pantalla en la que el contenido siguiente sube por encima de la escena
const FIN = 14.2; // segundos de la animación que recorre el scroll (los 15 s menos la pausa final)

// Comienzo de cada escena, en segundos (los mismos de la película)
const VIAJE = 3.5;
const LLEGADA = 7.5;
const CIERRE = 11.5;

// La escena se compone en un lienzo de 1920×1080 centrado en (960, 540), como la película. En
// pantallas angostas el encuadre se abre hacia arriba y abajo para que el logo quepa de ancho.
const CX = 960;
const CY = 540;
const ESCALA = 1.8; // tamaño del logo armado
const LOGO_X = CX - 316 * ESCALA; // el logo mide 632 de ancho y su centro vertical está en 62
const LOGO_Y = CY - 62 * ESCALA;
const DOT = [LOGO_X + PUNTO_AZUL[0] * ESCALA, LOGO_Y + PUNTO_AZUL[1] * ESCALA] as const;
const ZOOM_LLEGADA = 6; // la llegada arranca con el punto azul visto así de cerca
const RADIO_DISCO = RADIO_PUNTO * ESCALA * ZOOM_LLEGADA;
const LEMA_Y = 793;

// Colores de la noche: Azul Barranca hacia un azul casi negro, y la luz de la estrella mezclada con blanco
const CIELO_CENTRO = "#044081";
const CIELO_BORDE = "#0A2C57";
const LUZ = "#A6DDFF";
const POLVO = "#D1EDFF";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const eo = (x: number) => 1 - (1 - x) ** 3;
const ei = (x: number) => x ** 3;
const eio = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const eob = (x: number, s = 1.4) => 1 + (s + 1) * (x - 1) ** 3 + s * (x - 1) ** 2;
const titila = (t: number) => Math.sin((t * 2 * Math.PI) / 1.6);
const n1 = (x: number) => x.toFixed(1);

// Estrella de cuatro puntas de radio r; k abomba los lados (0.17 es la estrella, 0.914 casi un círculo)
function destello(r: number, k: number) {
  const a = r * k;
  return `M0 ${-r}Q${a} ${-a} ${r} 0Q${a} ${a} 0 ${r}Q${-a} ${a} ${-r} 0Q${-a} ${-a} 0 ${-r}Z`;
}

// Campo de estrellas en profundidad: cada una vuelve al fondo cuando la cámara la pasa.
// Fijas con semilla, así el servidor y el cliente pintan lo mismo al hidratar.
const PROF = 4;
const ESTRELLAS = (() => {
  let s = 31;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 120 }, () => ({ x: r() * 2 - 1, y: r() * 2 - 1, p: r() * PROF, w: 0.6 + r() * 0.8 }));
})();

// Distancia que lleva la cámara a los t segundos: deriva lenta y luego una aceleración larga
function recorrido(t: number) {
  const u = clamp01((t - VIAJE) / 4);
  return 0.3 * t + 9 * u ** 3;
}

function profundidad(Z: number, p: number) {
  let m = (Z + p) % PROF;
  if (m < 0) m += PROF;
  return PROF - m;
}

type Encuadre = { x: number; y: number; w: number; h: number };
const ENCUADRE_BASE: Encuadre = { x: 0, y: 0, w: 1920, h: 1080 };

// 1080 de alto en pantallas horizontales; en las verticales, al menos 1400 de ancho para que quepa el logo
function encuadre(W: number, H: number): Encuadre {
  const ar = W / H;
  const w = Math.max(1080 * ar, 1400);
  const h = w / ar;
  return { x: CX - w / 2, y: CY - h / 2, w, h };
}

// Cada estrella es una línea de su posición anterior a la actual: quieta es un punto, rápida una estela
function linea(i: number, t: number, vb: Encuadre, grosor: number) {
  const e = ESTRELLAS[i];
  const z1 = profundidad(recorrido(t), e.p);
  let z0 = profundidad(recorrido(t - 0.06), e.p);
  if (z0 < z1) z0 = z1; // acaba de volver al fondo: sin estela
  const X = e.x * 2600 * (vb.w / 1920);
  const Y = e.y * 1500 * (vb.h / 1080);
  return {
    x1: CX + X / z0,
    y1: CY + Y / z0,
    x2: CX + X / z1,
    y2: CY + Y / z1,
    w: e.w * Math.min(9, Math.max(1.6, 5 / z1)) * grosor,
    o: Math.min(1, (PROF - z1) / 0.7),
  };
}

// La estrella azul: lejana y titilando en el cosmos; en el viaje crece, abre sus rayos y se vuelve el punto
function estrella(t: number) {
  if (t < VIAJE) {
    const tw = titila(t) * (1 - seg(t, 2.9, 3.5));
    return {
      s: (0.25 + 0.05 * t) * (1 + 0.08 * tw),
      k: 0.17,
      rot: 10 * t,
      halo: lerp(0.5, 0.7, eo(seg(t, 0, 3.5))) * (1 + 0.05 * tw),
      haloA: 0.8,
      rayo: lerp(0.15, 0.3, eio(seg(t, 0, 3.5))),
      rayoA: 0.5,
      nucleo: 1,
    };
  }
  const v = t - VIAJE;
  const grande = 0.425 * Math.exp(3 * ei(seg(v, 0, 3.2)));
  const m = eio(seg(v, 3.2, 3.9));
  return {
    s: lerp(grande, 4.9, m),
    k: lerp(0.17, 0.914, m),
    rot: 35 + 15 * v,
    halo: lerp(0.7, 3.5, ei(seg(v, 0.5, 3))),
    haloA: (0.8 + 0.2 * seg(v, 0, 1.5)) * (1 - eio(seg(v, 3, 3.8))),
    rayo: lerp(0.3, 1.4, eio(seg(v, 0.5, 2.6))),
    rayoA: lerp(0.5, 0.9, seg(v, 0.3, 1.5)) * (1 - eio(seg(v, 2.4, 3.2))),
    nucleo: 1 - seg(v, 3.2, 3.7),
  };
}

const RAYOS = [
  { a: 0, k: 1 },
  { a: 90, k: 1 },
  { a: 45, k: 0.5 },
  { a: 135, k: 0.5 },
];
const rayoTransform = (a: number, rot: number, largo: number) => `translate(${CX} ${CY}) rotate(${n1(a + rot)}) scale(${largo.toFixed(3)} 1)`;
const estrellaTransform = (rot: number, s: number) => `translate(${CX} ${CY}) rotate(${n1(rot)}) scale(${s.toFixed(4)})`;

// Primer cuadro, igual en servidor y cliente
const E0 = estrella(0);
const LINEAS0 = ESTRELLAS.map((_, i) => linea(i, 0, ENCUADRE_BASE, 1));

// La intro se muestra solo con html.js; ahí el contenido siguiente sube una pantalla para cubrir la escena
const CSS = `html:not(.js) [data-viaje-pista]{display:none}html.js [data-viaje-siguiente]{margin-top:-100vh;margin-top:-100svh}`;

export function ViajeEstelar({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = root.current;
    if (!wrap || !document.documentElement.classList.contains("js")) return;
    gsap.registerPlugin(ScrollTrigger);

    const uno = <T extends Element>(sel: string) => wrap.querySelector<T>(sel)!;
    const todos = <T extends Element>(sel: string) => Array.from(wrap.querySelectorAll<T>(sel));
    const pista = uno<HTMLElement>("[data-viaje-pista]");
    const escena = uno<HTMLElement>("[data-escena]");
    const capa = uno<HTMLElement>("[data-capa]");
    const sombra = uno<HTMLElement>("[data-sombra]");
    const cue = uno<HTMLElement>("[data-desliza]");
    const svg = uno<SVGSVGElement>("[data-svg]");
    const cielo = uno<SVGRectElement>("[data-cielo]");
    const campo = uno<SVGGElement>("[data-campo]");
    const lineas = todos<SVGLineElement>("[data-campo] line");
    const revelado = uno<SVGCircleElement>("[data-revelado]");
    const astro = uno<SVGGElement>("[data-astro]");
    const halo = uno<SVGCircleElement>("[data-halo]");
    const rayos = todos<SVGRectElement>("[data-rayo]");
    const chispa = uno<SVGGElement>("[data-chispa]");
    const punta = uno<SVGPathElement>("[data-punta]");
    const nucleo = uno<SVGPathElement>("[data-nucleo]");
    const disco = uno<SVGCircleElement>("[data-disco]");
    const camara = uno<SVGGElement>("[data-camara]");
    const letras = uno<SVGGElement>("[data-letras]");
    const verde = uno<SVGCircleElement>("[data-verde]");
    const lema = uno<SVGTextElement>("[data-lema]");
    const brillos = todos<SVGGElement>("[data-brillo]");
    if (!pista || !escena || !svg || lineas.length === 0) return;

    let vb = ENCUADRE_BASE;
    let grosor = 1;
    let radioBlanco = 1300;
    let medida = "";
    let ultimo = -1;

    const mostrar = (el: SVGElement, si: boolean) => el.setAttribute("display", si ? "inline" : "none");
    const attr = (el: Element, nombre: string, valor: number | string) => el.setAttribute(nombre, String(valor));

    // Encuadre según el tamaño de la escena fija; devuelve true si cambió
    const encuadrar = () => {
      const W = escena.clientWidth;
      const H = escena.clientHeight;
      const clave = `${W}x${H}`;
      if (!W || !H || clave === medida) return false;
      medida = clave;
      vb = encuadre(W, H);
      grosor = Math.max(1, (vb.w / W) * 0.9);
      radioBlanco = (Math.hypot(vb.w, vb.h) / 2 / 0.9) * 1.02;
      attr(svg, "viewBox", `${n1(vb.x)} ${n1(vb.y)} ${n1(vb.w)} ${n1(vb.h)}`);
      attr(svg, "preserveAspectRatio", "xMidYMid meet");
      attr(cielo, "x", n1(vb.x - 10));
      attr(cielo, "y", n1(vb.y - 10));
      attr(cielo, "width", n1(vb.w + 20));
      attr(cielo, "height", n1(vb.h + 20));
      // El lema no baja de unos 15 px en pantalla (en celular el encuadre lo achicaría demasiado)
      const fs = Math.max(46, (15 * vb.w) / W);
      attr(lema, "font-size", n1(fs));
      attr(lema, "letter-spacing", n1(fs * 0.34));
      attr(lema, "x", n1(CX + fs * 0.17));
      return true;
    };

    const dibujar = (t: number) => {
      const antes = t < LLEGADA;
      const cierre = t >= CIERRE;
      for (const el of [cielo, campo, revelado, astro, disco]) mostrar(el, antes);
      mostrar(camara, !antes);
      mostrar(lema, cierre);
      for (const b of brillos) mostrar(b, cierre);

      if (antes) {
        // El cosmos y el viaje
        const v = t - VIAJE;
        const alfa = t < VIAJE ? 1 : 1 - eio(seg(v, 2.4, 3.2));
        lineas.forEach((l, i) => {
          const g = linea(i, t, vb, grosor);
          attr(l, "x1", n1(g.x1));
          attr(l, "y1", n1(g.y1));
          attr(l, "x2", n1(g.x2));
          attr(l, "y2", n1(g.y2));
          attr(l, "stroke-width", g.w.toFixed(2));
          attr(l, "opacity", (g.o * alfa).toFixed(3));
        });
        attr(revelado, "r", n1((t < VIAJE ? 0 : eio(seg(v, 2.3, 3.3))) * radioBlanco));
        const e = estrella(t);
        attr(chispa, "transform", estrellaTransform(e.rot, e.s));
        attr(punta, "d", destello(60, e.k));
        attr(nucleo, "opacity", e.nucleo.toFixed(3));
        attr(halo, "r", n1(320 * e.halo));
        attr(halo, "opacity", e.haloA.toFixed(3));
        rayos.forEach((r, i) => {
          attr(r, "transform", rayoTransform(RAYOS[i].a, e.rot, e.rayo * RAYOS[i].k));
          attr(r, "opacity", e.rayoA.toFixed(3));
        });
        attr(disco, "opacity", (t < VIAJE ? 0 : seg(v, 3.75, 3.95)).toFixed(3));
        return;
      }

      if (!cierre) {
        // La llegada: la toma se aleja del punto azul y aparece el logo
        const l = t - LLEGADA;
        const e = eio(seg(l, 0.3, 2.7));
        const zc = Math.exp(lerp(Math.log(ZOOM_LLEGADA), 0, e));
        const z = zc * (1 + 0.01 * seg(l, 2.7, 4));
        // El centro de la toma se corre de forma que el punto viaje parejo por la pantalla
        const cx = DOT[0] - ((DOT[0] - CX) * e) / zc;
        const cy = DOT[1] - ((DOT[1] - CY) * e) / zc;
        attr(camara, "transform", `translate(${CX} ${CY}) scale(${z.toFixed(4)}) translate(${n1(-cx)} ${n1(-cy)})`);
        attr(letras, "opacity", eo(seg(l, 0.15, 0.9)).toFixed(3));
        attr(verde, "transform", `translate(${PUNTO_VERDE[0]} ${PUNTO_VERDE[1]}) scale(${eob(seg(l, 2.5, 3), 1.8).toFixed(4)})`);
        attr(verde, "opacity", seg(l, 2.5, 2.6).toFixed(3));
        return;
      }

      // El cierre: el logo sube un poco, entra el lema y el punto azul destella una vez
      const c = t - CIERRE;
      const m = eio(seg(c, 0.15, 1));
      const cy = lerp(CY, 470, m);
      const k = lerp(1.01, 0.94, m) + 0.012 * seg(c, 1, 3.5);
      attr(camara, "transform", `translate(${CX} ${n1(cy)}) scale(${k.toFixed(4)}) translate(${-CX} ${-CY})`);
      attr(letras, "opacity", 1);
      attr(verde, "transform", `translate(${PUNTO_VERDE[0]} ${PUNTO_VERDE[1]})`);
      attr(verde, "opacity", 1);
      const a = eo(seg(c, 0.75, 1.45));
      attr(lema, "opacity", a.toFixed(3));
      attr(lema, "transform", `translate(${n1((1 - a) * 26)} 0)`);
      const gl = Math.sin(Math.PI * seg(c, 1.7, 2.5));
      const gx = CX + (DOT[0] - CX) * k;
      const gy = cy + (DOT[1] - CY) * k;
      const tr = `translate(${n1(gx)} ${n1(gy)}) rotate(${n1(lerp(-20, 70, eo(seg(c, 1.7, 2.5))))}) scale(${gl.toFixed(4)})`;
      for (const b of brillos) attr(b, "transform", tr);
    };

    const pintar = (self: ScrollTrigger) => {
      const cambio = encuadrar();
      const H = escena.clientHeight || window.innerHeight;
      const u = (self.progress * (self.end - self.start)) / H; // pantallas recorridas
      const s = clamp01(u / SCRUB);
      const c = clamp01((u - SCRUB) / COVER);
      const t = s * FIN;
      if (cambio || t !== ultimo) {
        dibujar(t);
        ultimo = t;
      }
      // Mientras el contenido siguiente sube, la escena se queda atrás a un tercio de su velocidad
      capa.style.transform = `translate3d(0, ${(-c * H * 0.3).toFixed(1)}px, 0)`;
      sombra.style.opacity = (c * 0.2).toFixed(3);
      cue.style.opacity = (1 - clamp01(s / 0.04)).toFixed(3);
    };

    const st = ScrollTrigger.create({ trigger: pista, start: "top top", end: "bottom bottom", onUpdate: pintar, onRefresh: pintar });
    pintar(st);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={root} data-viaje>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* La pista mide el scroll de la animación más el del cruce con el contenido, más la pantalla de la escena */}
      <div data-viaje-pista className="relative" style={{ height: `${(SCRUB + COVER + 1) * 100}svh` }}>
        <div data-escena className="sticky top-0 h-svh overflow-hidden bg-white">
          <div data-capa className="absolute inset-0">
            <svg
              data-svg
              className="absolute inset-0 size-full"
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Sirius Regenerative Solutions"
            >
              <defs>
                <radialGradient id="viaje-cielo" cx="0.5" cy="0.5" r="0.6">
                  <stop offset="0" stopColor={CIELO_CENTRO} />
                  <stop offset="1" stopColor={CIELO_BORDE} />
                </radialGradient>
                <radialGradient id="viaje-halo">
                  <stop offset="0" stopColor={COLOR.estrella} stopOpacity="0.6" />
                  <stop offset="0.55" stopColor={COLOR.estrella} stopOpacity="0.16" />
                  <stop offset="1" stopColor={COLOR.estrella} stopOpacity="0" />
                </radialGradient>
                <linearGradient id="viaje-rayo">
                  <stop offset="0" stopColor={LUZ} stopOpacity="0" />
                  <stop offset="0.5" stopColor={LUZ} />
                  <stop offset="1" stopColor={LUZ} stopOpacity="0" />
                </linearGradient>
                <radialGradient id="viaje-blanco">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="0.9" stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect data-cielo x="-10" y="-10" width="1940" height="1100" fill="url(#viaje-cielo)" />
              <g data-campo stroke={POLVO} strokeLinecap="round">
                {LINEAS0.map((g, i) => (
                  <line key={i} x1={n1(g.x1)} y1={n1(g.y1)} x2={n1(g.x2)} y2={n1(g.y2)} strokeWidth={g.w.toFixed(2)} opacity={g.o.toFixed(3)} />
                ))}
              </g>
              <circle data-revelado cx={CX} cy={CY} r="0" fill="url(#viaje-blanco)" />

              <g data-astro>
                <circle data-halo cx={CX} cy={CY} r={n1(320 * E0.halo)} opacity={E0.haloA} fill="url(#viaje-halo)" />
                {RAYOS.map((r) => (
                  <rect
                    key={r.a}
                    data-rayo
                    x="-800"
                    y="-2"
                    width="1600"
                    height="4"
                    rx="2"
                    fill="url(#viaje-rayo)"
                    opacity={E0.rayoA}
                    transform={rayoTransform(r.a, E0.rot, E0.rayo * r.k)}
                  />
                ))}
                <g data-chispa transform={estrellaTransform(E0.rot, E0.s)}>
                  <path data-punta d={destello(60, E0.k)} fill={COLOR.estrella} />
                  <path data-nucleo d={destello(24, 0.22)} fill="#fff" />
                </g>
              </g>
              <circle data-disco cx={CX} cy={CY} r={n1(RADIO_DISCO)} fill={COLOR.estrella} opacity="0" />

              {/* Cierre: un destello azul por detrás del punto y uno blanco por delante */}
              <g data-brillo display="none">
                <path d={destello(84, 0.11)} fill={COLOR.estrella} />
              </g>
              <g data-camara display="none">
                <g transform={`translate(${n1(LOGO_X)} ${n1(LOGO_Y)}) scale(${ESCALA})`}>
                  <g data-letras fill={COLOR.tinta}>
                    {Object.entries(LETRAS).map(([k, d]) => (
                      <path key={k} d={d} />
                    ))}
                  </g>
                  <circle cx={PUNTO_AZUL[0]} cy={PUNTO_AZUL[1]} r={RADIO_PUNTO} fill={COLOR.estrella} />
                  <circle data-verde r={RADIO_PUNTO} fill={COLOR.hoja} transform={`translate(${PUNTO_VERDE[0]} ${PUNTO_VERDE[1]})`} />
                </g>
              </g>
              <g data-brillo display="none">
                <path d={destello(30, 0.2)} fill="#fff" />
              </g>
              <text
                data-lema
                display="none"
                x={CX + 7.8}
                y={LEMA_Y}
                textAnchor="middle"
                fontSize="46"
                fontWeight="600"
                letterSpacing="15.6"
                fill={COLOR.tinta}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                REGENERATIVE SOLUTIONS
              </text>
            </svg>
          </div>
          <div data-sombra className="bg-imperial pointer-events-none absolute inset-0 opacity-0" />
          <div
            data-desliza
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-xs font-semibold tracking-[0.3em] text-white/80 uppercase"
          >
            Desliza
            <span className="h-10 w-px animate-pulse bg-white/60" />
          </div>
        </div>
      </div>

      {/* El contenido arranca una pantalla antes de que termine la pista, así sube por encima de la escena */}
      <div data-viaje-siguiente className="relative z-10">
        {children}
      </div>
    </div>
  );
}
