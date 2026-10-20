// Inicio. Textos tomados del sitio anterior de Sirius (hero, historia, biofábrica, productos).

import { shopUrl } from "./site";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
  image: string;
  cta?: { label: string; href: string; external?: boolean };
  list?: string[];
  figure?: { src: string; alt: string; width: number; height: number };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "movimiento",
    eyebrow: "Sirius Regenerative",
    title: "Despierta tu alma: regenera el mundo",
    text: "Sirius es más que una marca: es un movimiento vivo que une el alma humana con la tierra.",
    image: "/img/campo/mano-biochar.webp",
    cta: { label: "Conoce Sirius", href: "/somos-sirius" },
  },
  {
    id: "bioinsumos",
    eyebrow: "Bioinsumos",
    title: "Biochar y biológicos que transforman suelos y almas",
    text: "Nuestros productos no solo alimentan cultivos: regeneran ecosistemas y empoderan a los agricultores.",
    image: "/img/productos/biochar-blend.webp",
    cta: { label: "Ver productos", href: "/productos" },
  },
  {
    id: "biofabrica",
    eyebrow: "Biofábrica",
    title: "Donde el fuego ancestral se encuentra con la ciencia viva",
    text: "Nuestra biofábrica transforma residuos orgánicos en bioinsumos que dan vida al suelo y al futuro.",
    image: "/img/procesos/horno.webp",
    cta: { label: "Recorre la biofábrica", href: "/biofabrica" },
    list: [
      "Pirólisis: proceso controlado de calor",
      "Biotecnología: microorganismos benéficos",
      "Agentics IA: Piroliapp y Alma",
      "Formulación: soluciones personalizadas",
    ],
  },
  {
    id: "carbono",
    eyebrow: "Calculadora de carbono",
    title: "Conoce tu huella y empieza a compensarla",
    text: "Calcula tu huella de carbono y descubre cómo el biochar captura carbono a largo plazo mientras mejora tus suelos.",
    image: "/img/campo/palma-aerea.webp",
    cta: { label: "Calcular mi huella", href: "/calculadora" },
    figure: {
      src: "/img/fotos/carbono-banera.webp",
      alt: "Ilustración de una bañera: el grifo reduce las emisiones y el drenaje remueve el CO₂ acumulado en la atmósfera",
      width: 434,
      height: 509,
    },
  },
];

export type HomeLine = {
  title: string;
  tagline: string;
  href: string;
  image: string;
  icon: "flame" | "sprout" | "microscope";
  // Cara trasera de la tarjeta: tres datos clave y un resumen
  highlights: { value: string; label: string }[];
  text: string;
};

export const homeLines: HomeLine[] = [
  {
    title: "Biochar",
    tagline: "Biochar Blend",
    href: "/productos#biochar-blend",
    image: "/img/productos/biochar-blend.webp",
    icon: "flame",
    highlights: [
      { value: "Blend", label: "con compost" },
      { value: "Poroso", label: "retiene agua" },
      { value: "Propio", label: "por pirólisis" },
    ],
    text: "Biochar de alta calidad producido en nuestra biofábrica: mejora la estructura del suelo, retiene agua y activa la vida microbiana.",
  },
  {
    title: "Biológicos",
    tagline: "Sirius Bacter y control preventivo",
    href: "/productos#sirius-bacter",
    image: "/img/productos/sirius-bacter.webp",
    icon: "sprout",
    highlights: [
      { value: "Bacterias", label: "benéficas" },
      { value: "Hongos", label: "aliados" },
      { value: "A medida", label: "de tu cultivo" },
    ],
    text: "Microorganismos que mejoran la disponibilidad de nutrientes, fortalecen las raíces y protegen los cultivos cuidando la biodiversidad.",
  },
  {
    title: "Laboratorio",
    tagline: "Análisis microbiológico de suelos",
    href: "/biofabrica#biotecnologia",
    image: "/img/laboratorio/petri.webp",
    icon: "microscope",
    highlights: [
      { value: "Calidad", label: "de cada lote" },
      { value: "Microbios", label: "en tu suelo" },
      { value: "Propio", label: "desde 2024" },
    ],
    text: "Un laboratorio propio para medir la calidad de nuestros bioinsumos y las poblaciones microbianas en los suelos de nuestros clientes.",
  },
];

export const homeMilestones = [
  { year: "2018", text: "Encendimos la primera planta de pirólisis, la de nuestros primeros ensayos." },
  { year: "2024", text: "Construimos un laboratorio propio de análisis microbiológico." },
];

// Pilares de la biofábrica: video corto en bucle y fotograma de reposo para quien pide menos movimiento
export const homePillars = [
  { id: "pirolisis", title: "Pirólisis", text: "Desarrollando nuevas soluciones", video: "/video/video2.mp4", poster: "/img/procesos/horno.webp" },
  { id: "biotecnologia", title: "Biotecnología", text: "El corazón de nuestro trabajo", video: "/video/video3.mp4", poster: "/img/laboratorio/microscopio.webp" },
  { id: "agentics", title: "Agentics IA", text: "Buscando nuevas fronteras", video: "/video/video4.mp4", poster: "/img/procesos/tablero.webp" },
  { id: "formulacion", title: "Formulación a la medida", text: "Llevando la teoría al campo", video: "/video/video5.mp4", poster: "/img/procesos/plantulas.webp" },
];

export const homeQuote = {
  text: "Tu alma regenera la tierra. La tierra regenera tu alma.",
  source: "Filosofía Sirius",
  goal: "Nuestra meta: regenerar 100.000 hectáreas para 2030.",
  shop: shopUrl,
};
