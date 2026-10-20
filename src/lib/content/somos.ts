// Somos Sirius. Hitos, propósito y pilares del sitio anterior (HistorySection y ZoomBackgroundSection).

export const FOUNDED = 2018;

export const about = {
  lead: "Un movimiento vivo que une el alma humana con la tierra",
  paragraphs: [
    "Sirius Regenerative transforma la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian los cultivos. Desde Barranca de Upía convertimos residuos orgánicos en bioinsumos de alto impacto a través de tecnologías limpias como la pirólisis.",
    "Nuestra biofábrica es el corazón de una agricultura regenerativa y circular, diseñada para devolverle vida al suelo y resiliencia a los cultivos. Allí el fuego ancestral se encuentra con la ciencia viva: biochar, microorganismos benéficos, inteligencia artificial y formulaciones a la medida.",
    "Sirius es una empresa con conocimiento y amor. Más que una marca, somos un movimiento que invita a regenerar el mundo empezando por el suelo que nos alimenta.",
  ],
  // Frases que se resaltan; deben aparecer tal cual en los párrafos
  highlights: ["soluciones regenerativas", "la pirólisis", "agricultura regenerativa y circular", "conocimiento y amor"],
};

// Cada ilustración entra de una forma distinta (ver components/HistoryTimeline.tsx)
export type MilestoneAnim = "drive" | "pop" | "grow" | "develop" | "spin" | "slide" | "assemble" | "roll" | "rise" | "focus" | "lift" | "drift";

export type Milestone = {
  year: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  anim: MilestoneAnim;
};

export const timeline: Milestone[] = [
  {
    year: "2018",
    title: "Planta fundadora",
    text: "Primera planta de pirólisis con la que inició Sirius, utilizada para los primeros ensayos y aprendizajes.",
    image: "/img/procesos/horno.webp",
    alt: "Brasas encendidas dentro de un horno de pirólisis",
    anim: "develop",
  },
  {
    year: "2019",
    title: "Eureka",
    text: "Nuestra segunda planta sirvió como maestra de pirólisis durante tres años y nos dejó hallazgos invaluables.",
    image: "/img/procesos/biochar-salida.webp",
    alt: "Biochar saliendo del proceso de pirólisis",
    anim: "drive",
  },
  {
    year: "2020",
    title: "Inicio en biológicos",
    text: "En noviembre llegó el equipo de microbiología y empezamos a trabajar con biológicos.",
    image: "/img/laboratorio/petri.webp",
    alt: "Colonias de microorganismos en una caja de Petri",
    anim: "pop",
  },
  {
    year: "2022",
    title: "Rafaela 1.0",
    text: "En agosto diseñamos y construimos nuestro primer reactor propio. Siguió una fase de encendido y comisionamiento de más de un año.",
    image: "/img/procesos/reactor.webp",
    alt: "Interior del reactor de pirólisis",
    anim: "roll",
  },
  {
    year: "2023",
    title: "Consolidación comercial en biológicos",
    text: "Alcanzamos ocho clientes constantes, consolidamos la producción y seguimos mejorando.",
    image: "/img/fotos/encuentro-clientes.webp",
    alt: "Encuentro al aire libre con clientes y aliados",
    anim: "slide",
  },
  {
    year: "2024",
    title: "Rafaela 2.0",
    text: "En febrero rediseñamos la planta para eliminar el proceso de condensados y enfocarnos en la calidad del biochar, con mejoras incrementales y más capacidad.",
    image: "/img/procesos/planta-noche.webp",
    alt: "Planta de pirólisis de Sirius en operación durante la noche",
    anim: "lift",
  },
  {
    year: "2024",
    title: "Laboratorio de análisis microbiológico",
    text: "Construimos un laboratorio propio para medir la calidad y las poblaciones microbianas en los suelos de nuestros clientes.",
    image: "/img/laboratorio/microscopio.webp",
    alt: "Objetivo de microscopio sobre una muestra",
    anim: "focus",
  },
  {
    year: "2025",
    title: "Proyección",
    text: "Nos propusimos ampliar la capacidad de pirólisis y consolidar el portafolio de biológicos y Biochar Blend.",
    image: "/img/campo/palma-aerea.webp",
    alt: "Vista aérea de un cultivo de palma",
    anim: "drift",
  },
];

export const purpose = {
  purpose:
    "“Sirius está aquí para ayudar a recordar quiénes somos.” Sanar el ser y el entorno es el primer paso para regenerar el mundo: por eso cuidamos el suelo, a quienes lo trabajan y a la comunidad que nos rodea.",
  vision:
    "Construir un futuro climáticamente positivo. Cada producto, cada proyecto y cada alma contribuye a un planeta próspero: nuestra meta es regenerar 100.000 hectáreas para 2030.",
};

// Pilares (el "ciclo" del sitio anterior). color: fondo de la tarjeta, con contraste AA para texto blanco
export const pillars = [
  {
    name: "Regeneración holística",
    text: "**Sanar el ser y el entorno.** Devolverle la vida al suelo es también devolvérsela a quienes lo trabajan.",
    color: "#004e9d",
    image: "/img/campo/mano-biochar.webp",
    alt: "Mano con biochar sobre un cultivo",
  },
  {
    name: "Comunidad consciente",
    text: "**Una familia unida por amor y colaboración**, que crece junto a los agricultores y aliados.",
    color: "#4a7a00",
    image: "/img/fotos/encuentro-clientes.webp",
    alt: "Encuentro de Sirius con agricultores y aliados",
    position: "30% center",
  },
  {
    name: "Transformación auténtica",
    text: "**Despertar el potencial individual** de cada persona y de cada suelo.",
    color: "#0070b8",
    image: "/img/procesos/plantulas.webp",
    alt: "Plántulas creciendo en sustrato",
  },
  {
    name: "Visión regenerativa",
    text: "**Construir un futuro climáticamente positivo**, una hectárea a la vez.",
    color: "#10396b",
    image: "/img/fotos/mono-aullador.webp",
    alt: "Mono aullador en el bosque",
  },
];
