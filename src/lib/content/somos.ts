// Somos Sirius. Misión, visión y valores del Manual de Marca 2023 (pp. 6-7);
// hitos del sitio anterior (HistorySection).

export const FOUNDED = 2018;

export const about = {
  lead: "Un movimiento vivo que une el alma humana con la tierra",
  paragraphs: [
    "Sirius Regenerative transforma la agricultura convencional con soluciones regenerativas que nutren el suelo y potencian los cultivos. Desde Barranca de Upía convertimos residuos orgánicos en bioinsumos de alto impacto a través de tecnologías limpias como la pirólisis.",
    "Nuestra biofábrica es el corazón de una agricultura regenerativa y circular, diseñada para devolverle vida al suelo y resiliencia a los cultivos. Allí el fuego ancestral se encuentra con la ciencia viva: biochar, microorganismos benéficos, inteligencia artificial y formulaciones a la medida.",
  ],
};

export type Milestone = {
  year: string;
  title: string;
  text: string;
  image: string;
  alt: string;
};

export const timeline: Milestone[] = [
  {
    year: "2018",
    title: "Planta fundadora",
    text: "Primera planta de pirólisis con la que inició Sirius, utilizada para los primeros ensayos y aprendizajes.",
    image: "/img/procesos/horno.webp",
    alt: "Brasas encendidas dentro de un horno de pirólisis",
  },
  {
    year: "2019",
    title: "Eureka",
    text: "Nuestra segunda planta sirvió como maestra de pirólisis durante tres años y nos dejó hallazgos invaluables.",
    image: "/img/procesos/biochar-salida.webp",
    alt: "Biochar saliendo del proceso de pirólisis",
  },
  {
    year: "2020",
    title: "Inicio en biológicos",
    text: "En noviembre llegó el equipo de microbiología y empezamos a trabajar con biológicos.",
    image: "/img/laboratorio/petri.webp",
    alt: "Colonias de microorganismos en una caja de Petri",
  },
  {
    year: "2022",
    title: "Rafaela 1.0",
    text: "Diseñamos y construimos nuestro primer reactor propio. Siguió una fase de encendido y comisionamiento de más de un año.",
    image: "/img/procesos/reactor.webp",
    alt: "Interior del reactor de pirólisis",
  },
  {
    year: "2023",
    title: "Consolidación comercial",
    text: "Alcanzamos ocho clientes constantes en biológicos, consolidamos la producción y seguimos mejorando.",
    image: "/img/fotos/encuentro-clientes.webp",
    alt: "Encuentro al aire libre con clientes y aliados",
  },
  {
    year: "2024",
    title: "Rafaela 2.0",
    text: "Rediseñamos la planta para eliminar el proceso de condensados y enfocarnos en la calidad del biochar, con más capacidad.",
    image: "/img/procesos/planta-noche.webp",
    alt: "Planta de pirólisis de Sirius en operación durante la noche",
  },
  {
    year: "2024",
    title: "Laboratorio propio",
    text: "Construimos un laboratorio para medir la calidad y las poblaciones microbianas en los suelos de nuestros clientes.",
    image: "/img/laboratorio/microscopio.webp",
    alt: "Objetivo de microscopio sobre una muestra",
  },
  {
    year: "2025",
    title: "Proyección",
    text: "Nos propusimos ampliar la capacidad de pirólisis y consolidar el portafolio de biológicos y Biochar Blend.",
    image: "/img/campo/palma-aerea.webp",
    alt: "Vista aérea de un cultivo de palma",
  },
];

// Manual de Marca 2023, p. 6 (la frase corta de cada una)
export const mission =
  "Ser una guía que brinda las herramientas para llevar el campo hacia la regeneración del suelo, de la biodiversidad y de los seres.";
export const vision = "Capturar CO₂ en el orden de gigatoneladas y alimentar de manera sana y consciente a millones de seres.";

// Las tres regeneraciones que nombra la misión (suelo, biodiversidad, seres), con nombre en voz de marca
export const regeneracion = [
  { name: "Suelo vivo", image: "/img/fotos/textura-raices.webp", alt: "Raíces finas y materia orgánica vistas de cerca" },
  { name: "Biodiversidad que vuelve", image: "/img/fotos/rana.webp", alt: "Rana arborícola sobre una rama" },
  {
    name: "Seres que despiertan",
    image: "/video/web/encuentro.webp",
    video: "/video/web/encuentro.mp4",
    alt: "Encuentro al aire libre con clientes y aliados",
  },
];

// Manual de Marca 2023, p. 7
export const values = [
  {
    name: "Alegría",
    motto: "We are Sirius, but not that serious.",
    text: "La alegría es la manifestación de los seres al celebrar la oportunidad de cada día estar con vida.",
    tint: "cotiledon" as const,
  },
  {
    name: "Transparencia",
    motto: "Reales en los datos y en la esencia.",
    text: "La transparencia se manifiesta en todas nuestras acciones. Somos reales en nuestros datos y en nuestra esencia.",
    tint: "sutileza" as const,
  },
  {
    name: "Energía limpia",
    motto: "Todo es energía.",
    text: "La transformación energética va más allá de la red. Buscamos esa transformación en todos los seres y agradecemos el regalo de cada experiencia.",
    tint: "retono" as const,
  },
];
