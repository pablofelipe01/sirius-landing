// Biofábrica. Pilares del sitio anterior (/inovacion y sección Biofábrica), con los hitos de la historia.

export const biofabricaIntro =
  "Nuestra biofábrica es el corazón de una agricultura regenerativa y circular, diseñada para devolverle vida al suelo y resiliencia a los cultivos.";

export type Pilar = {
  id: string;
  name: string;
  tagline: string;
  code: string;
  video: string;
  poster: string;
  text: string;
  detailTitle: string;
  detail: string;
};

export const pilares: Pilar[] = [
  {
    id: "pirolisis",
    name: "Pirólisis",
    tagline: "Proceso controlado de calor",
    code: "01",
    video: "/video/video2.mp4",
    poster: "/img/procesos/horno.webp",
    text: "Transformamos residuos orgánicos en biochar con un proceso controlado de calor. Desde 2018 hemos diseñado y operado nuestras propias plantas: la planta fundadora, Eureka y Rafaela, nuestro reactor propio.",
    detailTitle: "Rafaela 2.0",
    detail: "Rediseñada en 2024 para eliminar el proceso de condensados y enfocarse en la calidad del biochar, con más capacidad.",
  },
  {
    id: "biotecnologia",
    name: "Biotecnología",
    tagline: "Microorganismos benéficos",
    code: "02",
    video: "/video/video3.mp4",
    poster: "/img/laboratorio/microscopio.webp",
    text: "Desde 2020 nuestro equipo de microbiología trabaja con bacterias y hongos benéficos que mejoran la disponibilidad de nutrientes, estimulan las raíces y protegen los cultivos.",
    detailTitle: "Laboratorio propio",
    detail: "Medimos la calidad de cada lote y las poblaciones microbianas en los suelos de nuestros clientes.",
  },
  {
    id: "agentics",
    name: "Agentics IA",
    tagline: "Piroliapp y Alma",
    code: "03",
    video: "/video/video4.mp4",
    poster: "/img/procesos/tablero.webp",
    text: "Desarrollamos nuestras propias herramientas de inteligencia artificial, como Piroliapp y Alma, para registrar, medir y mejorar cada etapa de la operación.",
    detailTitle: "Nuevas fronteras",
    detail: "Tecnología que acompaña al equipo en la planta y en el campo, sin perder el contacto con la tierra.",
  },
  {
    id: "formulacion",
    name: "Formulación a la medida",
    tagline: "Soluciones personalizadas",
    code: "04",
    video: "/video/video5.mp4",
    poster: "/img/procesos/plantulas.webp",
    text: "Cada suelo y cada cultivo son distintos. Combinamos biochar y biológicos en formulaciones personalizadas, llevando la teoría al campo.",
    detailTitle: "Antes de aplicar",
    detail: "Recomendamos un análisis previo del suelo para adaptar la solución a las necesidades de tu cultivo.",
  },
];

export const visita = {
  title: "Visítanos en nuestra biofábrica",
  text: "Ven a conocer la biofábrica donde transformamos residuos en vida. Programa una visita y experimenta de primera mano cómo regeneramos la tierra.",
  notes: ["Visitas grupales con cita previa"],
};
